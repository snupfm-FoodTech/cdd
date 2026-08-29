package egovframework.let.diet.service.impl;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.com.cmm.dto.PagingWrapperDto;
import egovframework.com.cmm.exception.CustomAuthorizationException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.service.EgovCommonService;
import egovframework.com.cmm.service.impl.CommonDAO;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.diet.dto.*;
import egovframework.let.diet.entity.*;
import egovframework.let.diet.param.*;
import egovframework.let.diet.service.EgovDietService;
import egovframework.let.diet.util.DietExcelExporter;
import egovframework.let.role.RoleDAO;
import egovframework.let.role.RoleEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class EgovDietServiceImpl extends EgovAbstractServiceImpl implements EgovDietService {
    private static final String USR_STD_CD = "USR";
    private static final String USR_STD_NM = "사용자 식단";
    private final DietDAO dietDAO;
    private final EgovMessageSource messageService;
    private final ModelMapper modelMapper;
    private final RoleDAO roleDAO;
    private final EgovCommonService commonService;
    private final CommonDAO commonDAO;

    private boolean compareTwoListOfInt(List<Integer> arrOne, List<Integer> arrTwo) {
        if (arrOne == null || arrTwo == null) return false;
        if (arrOne.size() != arrTwo.size()) return false;

        List<Integer> sortedOne = new ArrayList<>(arrOne);
        List<Integer> sortedTwo = new ArrayList<>(arrTwo);
        Collections.sort(sortedOne);
        Collections.sort(sortedTwo);

        return sortedOne.equals(sortedTwo);
    }

    private boolean compareTwoDietFoodDtoArrays(List<DietTrayDetailEntity> oldFoods,
                                                List<DietTrayDetailEntity> newFoods) {
        if (oldFoods != null && !oldFoods.isEmpty() && newFoods != null && !newFoods.isEmpty()) {
            if (oldFoods.size() == newFoods.size()) { // same size => check each item
                int length = oldFoods.size();
                for (int i = 0; i < length; i++) {
                    DietTrayDetailEntity oldF = oldFoods.get(i);
                    DietTrayDetailEntity newF = newFoods.get(i);

                    // Compare sequence
                    if (!Objects.equals(oldF.getFdSeq(), newF.getFdSeq())) {
                        return false;
                    }

                    // Compare typeCode with null checks
                    if (oldF.getFdTpCd() != null ? !oldF.getFdTpCd().equals(newF.getFdTpCd())
                            : newF.getFdTpCd() != null) {
                        return false;
                    }
                }
            } else { // If not the same => clear then add
                return false;
            }
        } else if ((oldFoods == null || oldFoods.isEmpty()) && (newFoods != null && !newFoods.isEmpty())
                || (newFoods == null || newFoods.isEmpty()) && (oldFoods != null && !oldFoods.isEmpty())) {
            return false;
        }
        return true;
    }

    private boolean isDefaultTrayDataChanged(DietTrayDto oldTray, DietTrayParam newTray) {
        //check tray data
        if (!Objects.equals(oldTray.getName(), newTray.getName())) { //modified name
            return true;
        }

        if (!Objects.equals(oldTray.getRepresentativeTrayCode(),
                newTray.getRepresentativeTrayCode())) { //modified rep_tray_cd
            return true;
        }

        //check food data
        List<DietFoodDto> oldFoods = oldTray.getFoods();
        List<DietFoodParam> newFoods = newTray.getFoods();
        if (oldFoods == null && newFoods == null) {
            return false;
        }

        if (oldFoods == null && newFoods != null ||
                oldFoods != null && newFoods == null ||
                oldFoods.size() != newFoods.size()) {
            return true;
        }

        if (oldFoods.isEmpty() && newFoods.isEmpty()) {
            return false;
        }

        List<DietFoodParam> arrangedOldFoods = new ArrayList<>();
        //arrange old food to be the exact order like new food
        for (int i = 0; i < newFoods.size(); i++) {
            DietFoodParam newFd = newFoods.get(i);
            for (int j = 0; j < oldFoods.size(); j++) {
                DietFoodDto oldFd = oldFoods.get(j);
                if (Objects.equals(oldFd.getTypeCode(), newFd.getTypeCode())
                        && Objects.equals(oldFd.getMandatoryFlag(), newFd.getMandatoryFlag())
                        && Objects.equals(oldFd.getSeparatedFlag(), newFd.getSeparatedFlag())
                ) { //match
                    //create data and add
                    DietFoodParam fd = new DietFoodParam();
                    fd.setTypeCode(oldFd.getTypeCode());
                    fd.setMandatoryFlag(oldFd.getMandatoryFlag());
                    fd.setSeparatedFlag(oldFd.getSeparatedFlag());
                    fd.setCapacityVolume(newFd.getCapacityVolume());
                    arrangedOldFoods.add(fd);

                    //remove from oldFoods after moving to the new arranged place
                    oldFoods.remove(j);
                }
            }
        }
        //compare new foods and arranged old foods
        return newFoods.size() != arrangedOldFoods.size();
    }

    private boolean doesDietBelongToCurrentUser(int dietId) {
        Integer usrId = AppUtil.getUserIdFromToken();
        if (usrId == null) {
            throw new CustomAuthorizationException("Forbidden");
        }

        Integer dietUsrId = dietDAO.findUserIdByDietId(dietId);
        if (dietUsrId == null) {
            throw new CustomNotFoundException(messageService.get("diet.id.not-found", dietId));
        }
        return Objects.equals(dietUsrId, usrId);
    }

    private boolean doesTrayBelongToCurrentUser(int trayId) {
        Integer usrId = AppUtil.getUserIdFromToken();
        if (usrId == null) {
            throw new CustomAuthorizationException("Forbidden");
        }

        Integer trayUsrId = dietDAO.findUserIdByTrayId(trayId);
        if (trayUsrId == null) {
            throw new CustomNotFoundException(messageService.get("diet-tray.id.not-found", trayId));
        }

        return Objects.equals(trayUsrId, usrId);
    }

    /**
     * Create a new user tray template from tray data
     *
     * @param trayData Tray data from request
     * @return Created UserTrayEntity with generated trayId
     */
    private UserTrayEntity createUserTrayTemplate(DietTrayDataParam trayData, Integer dietId) {
        // Validate food type codes
        validateFoodTypeCode(trayData.getFoods().stream().map(f -> f.getTypeCode()).toList());

        // Create tray entity
        UserTrayEntity tray = new UserTrayEntity();
        tray.setUsrId(AppUtil.getUserIdFromToken());
        tray.setTrayNm(trayData.getName());
        tray.setRepTrayCd(trayData.getRepresentativeTrayCode());
        tray.setTrayMandFlg(trayData.getMandatoryFlag() != null ? trayData.getMandatoryFlag() : "N");
        tray.setDietId(dietId);  // dietId 설정

        // Insert tray to generate ID
        dietDAO.addNewUserTray(tray);

        // Create tray detail entities (foods)
        List<UserTrayDetailEntity> foods = IntStream.range(0, trayData.getFoods().size())
                .mapToObj(i -> {
                    DietFoodParam food = trayData.getFoods().get(i);
                    UserTrayDetailEntity entity = new UserTrayDetailEntity();
                    entity.setTrayId(tray.getTrayId());
                    entity.setFdSeq(i + 1);
                    entity.setFdTpCd(food.getTypeCode());
                    entity.setFdCapaVol(food.getCapacityVolume());
                    entity.setFdMandFlg(food.getMandatoryFlag());
                    entity.setFdSepFlg(food.getSeparatedFlag());
                    entity.setUnitCd(AppUtil.UNIT_ML);
                    return entity;
                })
                .collect(Collectors.toList());

        // Insert tray details
        dietDAO.addNewUserTrayDetail(foods);

        return tray;
    }

    /**
     * Update existing user tray template
     *
     * @param trayId   ID of tray to update
     * @param trayData New tray data
     */
    private void updateUserTrayTemplate(Integer trayId, DietTrayDataParam trayData) {
        // Validate food type codes
        validateFoodTypeCode(trayData.getFoods().stream().map(f -> f.getTypeCode()).toList());

        // Update tray basic info
        UserTrayEntity tray = new UserTrayEntity();
        tray.setTrayId(trayId);
        tray.setTrayNm(trayData.getName());
        tray.setRepTrayCd(trayData.getRepresentativeTrayCode());
        tray.setTrayMandFlg(trayData.getMandatoryFlag());

        dietDAO.updateDietTrayTemplate(tray);

        // Recreate tray details (foods)
        dietDAO.deleteFoodsFromTray(trayId);

        List<UserTrayDetailEntity> foods = IntStream.range(0, trayData.getFoods().size())
                .mapToObj(i -> {
                    DietFoodParam food = trayData.getFoods().get(i);
                    UserTrayDetailEntity entity = new UserTrayDetailEntity();
                    entity.setTrayId(trayId);
                    entity.setFdSeq(i + 1);
                    entity.setFdTpCd(food.getTypeCode());
                    entity.setFdCapaVol(food.getCapacityVolume());
                    entity.setFdMandFlg(food.getMandatoryFlag());
                    entity.setFdSepFlg(food.getSeparatedFlag());
                    entity.setUnitCd(AppUtil.UNIT_ML);
                    return entity;
                })
                .collect(Collectors.toList());

        dietDAO.addNewUserTrayDetail(foods);
    }

    private void validateFoodTypeCode(List<String> codeList) {
        if (codeList != null && !codeList.isEmpty()) {
            List<String> invalidFdCd = dietDAO.checkInvalidFdTpCd(codeList);

            if (!invalidFdCd.isEmpty()) {
                throw new ValidationException(messageService.get("diet-fd.tp-code.invalid", invalidFdCd.toString()));
            }
        }
    }

    private void validateFoodCode(List<String> codeList) {
        if (codeList != null && !codeList.isEmpty()) {
            List<String> invalidFdCd = dietDAO.checkInvalidFdCd(codeList);

            if (!invalidFdCd.isEmpty()) {
                throw new ValidationException(messageService.get("diet-fd.code.invalid", invalidFdCd.toString()));
            }
        }
    }

    private void validateMaterialCode(List<String> codeList) {
        if (codeList != null && !codeList.isEmpty()) {
            List<String> invalidMatCd = dietDAO.checkInvalidMatCd(codeList);

            if (!invalidMatCd.isEmpty()) {
                throw new ValidationException(messageService.get("diet-mat.code.invalid", invalidMatCd.toString()));
            }
        }
    }

    private void validateNutrientCode(List<String> codeList) {
        if (codeList != null && !codeList.isEmpty()) {
            List<String> invalidNutrCd = dietDAO.checkInvalidNutrCd(codeList);

            if (!invalidNutrCd.isEmpty()) {
                throw new ValidationException(messageService.get("diet-nutr.code.invalid", invalidNutrCd.toString()));
            }
        }
    }

    private void validateAllergenId(List<Integer> allergenIds) {
        if (allergenIds != null && !allergenIds.isEmpty()) {
            List<Integer> invalidAllergenIds = dietDAO.checkInvalidAllergenId(allergenIds);

            if (!invalidAllergenIds.isEmpty()) {
                throw new ValidationException(messageService.get("diet-alrg.id.invalid", invalidAllergenIds.toString()));
            }
        }
    }

    private List<List<CustomRecFoodDto>> separateFoodsIntoGroups(List<CustomRecFoodDto> list, int groupSize) {
        if (list == null) {
            throw new ValidationException(messageService.get("diet-tray.food-list.not-empty"));
        }

        if (list.size() <= groupSize) {
            return List.of(list);
        }

        List<List<CustomRecFoodDto>> output = new ArrayList<List<CustomRecFoodDto>>();
        //length > 4 => loop to fill to output
        for (int i = 0; i < list.size(); i += groupSize) {
            output.add(list.subList(i, Math.min(i + groupSize, list.size())));
        }

        return output;
    }

    @Override
    public List<DietCommonInfoDto> findAllDiet() {
        return dietDAO.findAllDietMgmt(FindAllDietParam.builder().usrId(AppUtil.getUserIdFromToken()).build());
    }

    @Override
    public DietDetailDto findDietDetailById(int dietId) {
        if (!doesDietBelongToCurrentUser(dietId)) {
            throw new CustomAuthorizationException(messageService.get("diet.id.not-belong.user"));
        }

        DietDetailDto diet = dietDAO.findDietDetailById(dietId)
                .orElseThrow(() -> new CustomNotFoundException(messageService.get("diet.id.not-found", dietId)));

        return diet;
    }

    @Transactional
    @Override
    public DietDetailDto addNewDiet(AddDietParam param) {
        // verify diet name (unique), param.getName() is not nullable due to @NotNull annotation
        if (!dietDAO
                .findAllDietMgmt(
                        FindAllDietParam.builder().usrId(AppUtil.getUserIdFromToken()).dietNm(param.getName()).build())
                .isEmpty()) {
            throw new ValidationException(messageService.get("diet.name.existed", param.getName()));
        }

        // verify standard code and name
        DietStandardDto standard = null;
        String stdCd = param.getStandardCode();
        String stdNm = param.getStandardName();

        if (USR_STD_CD.equals(stdCd)) {
            if (!USR_STD_NM.equals(stdNm)) {
                throw new ValidationException(messageService.get("diet-std.name-or-code.invalid"));
            }

            // verify nutrients
            validateNutrientCode(param.getNutrients().stream().map(nutr -> nutr.getCode()).toList());
        } else {
            standard = dietDAO.findAllDietStandardTemplate(null, null).stream()
                    .filter(item -> item.getCode().equals(stdCd) && item.getName().equals(stdNm)).findFirst()
                    .orElseThrow(() -> {
                        throw new ValidationException(messageService.get("diet-std.name-or-code.invalid"));
                    });
        }

        // validate allergenIds if exists
        validateAllergenId(param.getExcludedAllergenIds());

        // 1. Diet 먼저 생성 (trayId 없이 임시로 생성)
        DietEntity diet = new DietEntity();
        diet.setUsrId(AppUtil.getUserIdFromToken());
        diet.setDietNm(param.getName());
        diet.setDietDesc(param.getDescription());
        diet.setStdCd(stdCd);
        diet.setStdNm(stdNm);
        diet.setDietFavFlg("N");

        // 임시 trayId 설정 (나중에 업데이트)
        diet.setTrayId(null);

        dietDAO.addNewDietMgmt(diet);
        Integer dietId = diet.getDietId(); // 생성된 dietId

        // 2. Trays 일괄 생성
        List<DietTrayDataParam> traysData = param.getTrays();
        List<Integer> createdTrayIds = new ArrayList<>();
        List<DietTrayDataParam> trayDataForDietDetails = new ArrayList<>();

        for (DietTrayDataParam trayData : traysData) {
            // 새 tray 생성 + dietId 설정
            UserTrayEntity userTray = createUserTrayTemplate(trayData, dietId);
            createdTrayIds.add(userTray.getTrayId());
            trayDataForDietDetails.add(trayData);
        }

        // 3. Diet의 trayId 설정 (사용자가 선택한 대표 tray)
        Integer repTrayIndex = param.getRepresentativeTrayIndex();

        // 인덱스 유효성 검증
        if (repTrayIndex == null || repTrayIndex < 0 || repTrayIndex >= createdTrayIds.size()) {
            repTrayIndex = 0; // 기본값: 첫 번째
        }

        Integer representativeTrayId = createdTrayIds.get(repTrayIndex);
        DietTrayDataParam representativeTrayData = trayDataForDietDetails.get(repTrayIndex);

        // Diet 업데이트 (대표 tray 정보 설정)
        diet.setTrayId(representativeTrayId);
        diet.setTrayNm(representativeTrayData.getName());
        diet.setRepTrayCd(representativeTrayData.getRepresentativeTrayCode());
        diet.setTrayMandFlg(representativeTrayData.getMandatoryFlag());

        dietDAO.updateDietMgmt(diet);

        // add to diet_std_dtl_mgmt
        List<DietStandardDetailEntity> nutrients = new ArrayList<>();
        if (USR_STD_CD.equals(stdCd)) { // user standard
            nutrients = param.getNutrients().stream().map(nutr -> {
                DietStandardDetailEntity e = modelMapper.map(nutr, DietStandardDetailEntity.class);
                e.setDietId(diet.getDietId());
                return e;
            }).toList();
        } else { // default standards
            nutrients = standard.getNutrients().stream().map(nutr -> {
                DietStandardDetailEntity e = modelMapper.map(nutr, DietStandardDetailEntity.class);
                e.setDietId(diet.getDietId());
                return e;
            }).toList();
        }
        dietDAO.addNewDietStdDtlMgmt(nutrients);

        // 4. add to diet_tray_dtl_mgmt (대표 tray의 foods만 추가)
        List<DietTrayDetailEntity> foods = IntStream.range(0, representativeTrayData.getFoods().size()).mapToObj(i -> {
            DietTrayDetailEntity foodEntity = modelMapper.map(representativeTrayData.getFoods().get(i), DietTrayDetailEntity.class);
            foodEntity.setDietId(diet.getDietId());
            foodEntity.setFdSeq(i + 1);
            foodEntity.setUnitCd(AppUtil.UNIT_ML);
            return foodEntity;
        }).collect(Collectors.toList());

        dietDAO.addNewTrayDtlMgmt(foods);

        // add allergen data if exists
        addExcludedAllergenToDiet(diet.getDietId(), param.getExcludedAllergenIds());

        // recommend foods and replace allergen foods — on recommendation failure, diet is committed as-is with empty food slots
        try {
            return recommendFoodByDietId(diet.getDietId(), LocalDateTime.now().getMonthValue());
        } catch (CustomNotFoundException e) {
            // no foods found for this nutrition standard — return diet as-is with empty food slots
            log.warn("Food recommendation failed for diet {}: {}", diet.getDietId(), e.getMessage());
            return findDietDetailById(diet.getDietId());
        }
    }

    @Transactional
    @Override
    public DietDetailDto updateDietById(int dietId, UpdateDietParam param) {
        // verify diet
        if (!doesDietBelongToCurrentUser(dietId)) {
            throw new CustomAuthorizationException(messageService.get("diet.id.not-belong.user"));
        }
        // verify diet name (unique)
        if (param.getName() != null && !"".equals(param.getName()) && !dietDAO
                .findAllDietMgmt(
                        FindAllDietParam.builder().usrId(AppUtil.getUserIdFromToken()).dietNm(param.getName()).build())
                .stream().filter(diet -> !Objects.equals(diet.getId(), dietId)).toList().isEmpty()) {
            throw new ValidationException(messageService.get("diet.name.existed", param.getName()));
        }

        // verify stand name & code
        DietStandardDto standard = null;
        String stdCd = param.getStandardCode();
        String stdNm = param.getStandardName();
        if (stdCd != null && !"".equals(stdCd) || stdNm != null && !"".equals(stdNm)) {
            // if not null & not blank => verify
            if (USR_STD_CD.equals(stdCd)) {
                if (!USR_STD_NM.equals(stdNm)) {
                    throw new ValidationException(messageService.get("diet-std.name-or-code.invalid"));
                }

                if (param.getNutrients() == null) {
                    throw new ValidationException(messageService.get("diet-std.nutr-list.not-empty"));
                }

                // verify nutrients
                validateNutrientCode(param.getNutrients().stream().map(nutr -> nutr.getCode()).toList());
            } else {
                standard = dietDAO.findAllDietStandardTemplate(null, null).stream()
                        .filter(item -> item.getCode().equals(stdCd) && item.getName().equals(stdNm)).findFirst()
                        .orElseThrow(() -> {
                            throw new ValidationException(messageService.get("diet-std.name-or-code.invalid"));
                        });
            }
        }

        // validate allergens
        validateAllergenId(param.getExcludedAllergenIds());

        // Handle tray logic: three scenarios
        DietTrayDataParam trayData = param.getTray();
        Integer trayId = trayData.getId();
        DietDetailDto currentDiet = dietDAO.findDietDetailById(dietId)
                .orElseThrow(() -> new CustomNotFoundException(messageService.get("diet.id.not-found", dietId)));
        Integer originalTrayId = currentDiet.getTray() != null ? currentDiet.getTray().getId() : null;

        if (trayId == null) {
            // Case 1: New tray - create new tray-template (validation happens inside)
            UserTrayEntity newTray = createUserTrayTemplate(trayData, dietId);
            trayId = newTray.getTrayId();

        } else if (trayId.equals(originalTrayId)) {
            // Case 2: Existing tray being modified - update tray-template (validation happens inside)
            updateUserTrayTemplate(trayId, trayData);

        } else {
            // Case 3: Different existing tray selected - just use the new trayId
            // Verify the tray exists and belongs to current user
            if (!doesTrayBelongToCurrentUser(trayId)) {
                throw new CustomAuthorizationException(messageService.get("diet-tray.id.not-belong.user"));
            }
            // Validate food type codes for the new tray data
            validateFoodTypeCode(trayData.getFoods().stream().map(f -> f.getTypeCode()).toList());
        }

        // update diet_mgmt
        DietEntity diet = modelMapper.map(param, DietEntity.class);
        diet.setDietId(dietId);
        diet.setTrayId(trayId);
        diet.setTrayNm(trayData.getName());
        diet.setRepTrayCd(trayData.getRepresentativeTrayCode());
        diet.setTrayMandFlg(trayData.getMandatoryFlag());

        dietDAO.updateDietMgmt(diet);

        // update diet_std_dtl_mgmt
        if (stdCd != null && !"".equals(stdCd) || stdNm != null && !"".equals(stdNm)) {
            List<DietStandardDetailEntity> nutrients = new ArrayList<>();
            if (stdCd.equals(USR_STD_CD)) { // user standard
                nutrients = param.getNutrients().stream().map(nutr -> {
                    DietStandardDetailEntity e = modelMapper.map(nutr, DietStandardDetailEntity.class);
                    e.setDietId(diet.getDietId());
                    return e;
                }).toList();
            } else { // default standards
                nutrients = standard.getNutrients().stream().map(nutr -> {
                    DietStandardDetailEntity e = modelMapper.map(nutr, DietStandardDetailEntity.class);
                    e.setDietId(diet.getDietId());
                    return e;
                }).toList();
            }

            // clear old
            dietDAO.deleteDietStdDtlMgmtByDietId(dietId);

            // add new
            dietDAO.addNewDietStdDtlMgmt(nutrients);
        }

        // update diet_tray_dtl_mgmt
        List<DietTrayDetailEntity> oldFoods = dietDAO.findDietTrayDtlMgmtById(dietId).stream()
                .map(item -> modelMapper.map(item, DietTrayDetailEntity.class)).toList();

        List<DietTrayDetailEntity> newFoods = IntStream.range(0, trayData.getFoods().size()).mapToObj(i -> {
            DietTrayDetailEntity foodEntity = modelMapper.map(trayData.getFoods().get(i), DietTrayDetailEntity.class);
            foodEntity.setDietId(dietId);
            foodEntity.setFdSeq(i + 1);
            foodEntity.setUnitCd(AppUtil.UNIT_ML);
            return foodEntity;
        }).collect(Collectors.toList());

        boolean removeFdFlg = false; // a flag to know whether should we remove all foods or keep
        List<Integer> excludedAllergenIds = dietDAO.getAllAllergenByDiet(dietId).stream().map(e -> e.getId()).toList();

        // if two tray are different -> they change the tray, the foods can't fulfill the trays anymore
        if (!compareTwoDietFoodDtoArrays(oldFoods, newFoods)) {
            removeFdFlg = true;
        } else if (param.getExcludedAllergenIds() != null && // allergen param is not null meaning they want to change it
                !compareTwoListOfInt(param.getExcludedAllergenIds(), excludedAllergenIds)) { // and the allergen data has changed
            removeFdFlg = true;
        } else if ("SD00000008".equals(stdCd) || "SD00000011".equals(stdCd)) { // standards with no recipe templates
            removeFdFlg = true;
        }

        if (removeFdFlg) { //remove action
            // clear the foods to recommend again
            dietDAO.deleteDietTrayDtlMgmtByDietId(dietId); // clear tray details and food details (on cascade delete)
            dietDAO.deleteDietReceiptByDietId(dietId); // clear diet receipt information
            dietDAO.deleteDietAccessoryByDietId(dietId); // clear accessories
            if (newFoods != null && !newFoods.isEmpty()) { // add new tray details if not null or empty
                // add new
                dietDAO.addNewTrayDtlMgmt(newFoods);
            }
        } else if (newFoods != null && !newFoods.isEmpty()) {
            // otherwise only update tray details
            dietDAO.updateTrayDtlMgmt(newFoods);
        }

        // update allergen data (diet_alrg_mgmt)
        addExcludedAllergenToDiet(dietId, param.getExcludedAllergenIds());

        // replace allergen foods with alternatives if foods are already filled
        return replaceAllergenFoodInDiet(SaveExcludedAllergenToDietParam.builder()
                .dietId(dietId)
                .excludedAllergenIds(param.getExcludedAllergenIds())
                .build());
    }

    @Transactional
    @Override
    public void modifyDietFavFlag(int dietId, String favFlag) {
        // verify diet
        if (!doesDietBelongToCurrentUser(dietId)) {
            throw new CustomAuthorizationException(messageService.get("diet.id.not-belong.user"));
        }

        // set flag
        DietEntity diet = new DietEntity();
        diet.setDietId(dietId);
        diet.setDietFavFlg(favFlag);
        dietDAO.updateDietMgmt(diet);
    }

    @Transactional
    @Override
    public void deleteDietById(int dietId) {
        // verify diet
        if (!doesDietBelongToCurrentUser(dietId)) {
            throw new CustomAuthorizationException(messageService.get("diet.id.not-belong.user"));
        }

        // delete diet_std_dtl_mgmt
        dietDAO.deleteDietStdDtlMgmtByDietId(dietId);

        // delete diet_tray_dtl_mgmt
        dietDAO.deleteDietTrayDtlMgmtByDietId(dietId);

        // delete diet_mgmt
        dietDAO.deleteDietMgmt(dietId);
    }

    @Transactional
    @Override
    public DietDetailDto addFoodToTray(int dietId, AddFoodToTrayParam param) {
        //HANDLE ADDING FOODS
        List<AddFoodToTrayFoodParam> foodParams = param.getFoods();

        // verify diet and tray
        DietDetailDto diet = findDietDetailById(dietId);
        DietTrayDto tray = diet.getTray();

        if (tray.getFoods() == null || tray.getFoods().isEmpty()) { // If there's no vacancy
            throw new ValidationException(messageService.get("diet-tray.food-list.not-empty"));
        }

        // validate food code
        validateFoodCode(foodParams.stream().map(food -> food.getCode()).toList());

        // validate material code
        List<String> materialCodes = foodParams.stream()
                .flatMap(food -> Optional.ofNullable(food.getMaterials()).map(List::stream).orElseGet(Stream::empty))
                .map(material -> material.getCode()).toList();

        validateMaterialCode(materialCodes);

        // check duplicated material code for each food
        foodParams.stream().forEach(food -> {
            List<String> matCodes = food.getMaterials().stream().map(mat -> mat.getCode()).toList();
            Set<String> uniqueMatCodes = matCodes.stream().collect(Collectors.toSet());
            if (uniqueMatCodes.size() != matCodes.size()) {
                throw new ValidationException(messageService.get("diet-fd.mat-code.duplicated", food.getSequence()));
            }
        });

        // for each food => set code and recipe description
        if (foodParams != null) {
            dietDAO.deleteDietFdDtlMgmtByDietId(dietId); // clear food detail
            dietDAO.clearFoodOnTrayDtlMgmtByDietId(dietId); // set food null on tray detail
            dietDAO.deleteDietReceiptByDietId(dietId); //clear diet receipt information
            dietDAO.deleteDietAccessoryByDietId(dietId); // clear accessories

            // update tray detail
            List<DietTrayDetailEntity> foods = foodParams.stream().map(f -> {
                // check if this sequence actually exists?
                if (tray.getFoods().stream().noneMatch(space -> Objects.equals(f.getSequence(), space.getSequence()))) {
                    throw new ValidationException(messageService.get("diet-tray.food-list.no-sequence",
                            String.valueOf(tray.getId()), String.valueOf(f.getSequence())));
                }

                DietTrayDetailEntity e = new DietTrayDetailEntity();
                e.setDietId(dietId);
                e.setFdSeq(f.getSequence());
                e.setFdCd(f.getCode());
                e.setFdNm(f.getName());
                e.setFdRcpDesc(f.getRecipeDescription());
                return e;
            }).toList();
            dietDAO.updateTrayDtlMgmt(foods);

            // with each food => add food detail
            foodParams.stream().forEach(f -> {
                List<AddFoodToTrayMaterialParam> materialParams = f.getMaterials();
                if (materialParams != null && !materialParams.isEmpty()) {
                    dietDAO.addNewDietFdDtlMgmt(materialParams.stream().map(m -> {
                        DietFoodDetailEntity e = new DietFoodDetailEntity();
                        e.setDietId(dietId);
                        e.setFdSeq(f.getSequence());
                        e.setMatCd(m.getCode());
                        e.setMatRcpWgt(m.getRecipeWeight());
                        e.setMatCalcWgt(m.getCalculationWeight());
                        return e;
                    }).toList());
                }
            });
        }

        //HANDLE CHANGING NUTRITION STANDARD
        if (param.getChangeStandardFlag() != null && "Y".equals(param.getChangeStandardFlag())) {
            Optional<DietStandardDto> usrStd = dietDAO.findDietStandardTemplateByCode(USR_STD_CD);
            if (usrStd.isPresent()) {
                //update diet_mgmt
                dietDAO.updateDietMgmt(DietEntity.builder()
                        .dietId(dietId)
                        .stdCd(usrStd.get().getCode())
                        .stdNm(usrStd.get().getName())
                        .build());

                //delete and add new
                dietDAO.deleteDietStdDtlMgmtByDietId(dietId);

                //add new diet_std_dtl_mgmt
                dietDAO.addNewDietStdDtlMgmt(usrStd.get().getNutrients()
                        .stream()
                        .map(dto -> {
                            DietStandardDetailEntity e = modelMapper.map(dto, DietStandardDetailEntity.class);
                            e.setDietId(dietId);
                            return e;
                        })
                        .toList());
            }
        }

        // after successfully adding food to tray, modify excluded allergen if exists
        addExcludedAllergenToDiet(dietId, param.getExcludedAllergenIds());

        // replace allergen foods with alternatives if possible, fallback to removal
        return replaceAllergenFoodInDiet(SaveExcludedAllergenToDietParam.builder()
                .dietId(dietId)
                .excludedAllergenIds(param.getExcludedAllergenIds())
                .build());
    }

    @Transactional
    @Override
    public DietDetailDto addPriceToDiet(int dietId, AddPriceToDietParam param) {
        // validate
        DietDetailDto diet = findDietDetailById(dietId);
        DietTrayDto tray = diet.getTray();
        if (tray == null) {
            throw new ValidationException(
                    messageService.get("diet-tray.not-applied.current-diet", String.valueOf(dietId)));
        }

        List<DietFoodDto> foods = tray.getFoods();
        if (foods == null || foods.isEmpty()) {
            throw new ValidationException(messageService.get("diet-tray.food-list.not-empty"));
        }

        // check food sequence and material code then update price
        if (param.getFoods() != null && !param.getFoods().isEmpty()) {
            List<DietFoodDetailEntity> updatedList = new ArrayList<>();
            param.getFoods().stream().forEach(foodParam -> {
                // find food
                DietFoodDto food = foods.stream()
                        .filter(f -> Objects.equals(f.getSequence(), foodParam.getSequence())).findFirst()
                        .orElseThrow(() -> new ValidationException(messageService.get("diet-tray.food-list.no-sequence",
                                String.valueOf(tray.getId()), String.valueOf(foodParam.getSequence()))));

                // find material
                food.getMaterials().stream().forEach(mat -> {
                    Optional<AddPriceToDietMaterialParam> matOpt = foodParam.getMaterials().stream()
                            .filter(matParam -> Objects.equals(matParam.getCode(), mat.getCode())).findFirst();
                    if (matOpt.isPresent()) {
                        DietFoodDetailEntity e = new DietFoodDetailEntity();
                        e.setDietId(dietId);
                        e.setFdSeq(foodParam.getSequence());
                        e.setMatCd(matOpt.get().getCode());
                        e.setMatPrc(matOpt.get().getPrice());
                        e.setRctInclFlg(matOpt.get().getReceiptIncludeFlag());
                        updatedList.add(e);
                    }
                });

                // update food list if not empty
                if (!updatedList.isEmpty()) {
                    dietDAO.updateFoodDtlMgmt(updatedList);
                }
                updatedList.clear();
            });
        }

        // check accessories to add price
        if (param.getAccessories() != null) {
            dietDAO.deleteDietAccessoryByDietId(dietId); //clear old
            if (!param.getAccessories().isEmpty()) { //if not empty add new
                List<DietAccessoryEntity> accessories = IntStream.range(0, param.getAccessories().size()).mapToObj(i -> {
                    DietAccessoryEntity newAccs = modelMapper.map(param.getAccessories().get(i), DietAccessoryEntity.class);
                    newAccs.setDietId(dietId);
                    newAccs.setAccsSeq(i + 1);
                    return newAccs;
                }).collect(Collectors.toList());

                dietDAO.addDietAccessory(accessories);
            }
        }

        //create entity
        DietReceiptEntity receipt = DietReceiptEntity
                .builder()
                .dietId(dietId)
                .servQty(param.getServingQuantity())
                .adjPct(param.getAdjustmentPercent())
                .unitPrc(BigDecimal.valueOf(param.getUnitPrice()))
                .fnlPrc(BigDecimal.valueOf(param.getFinalPrice()))
                .build();

        // check whether receipt exists
        Optional<DietReceiptEntity> optRct = dietDAO.findDietReceiptByDietId(dietId);
        if (optRct.isEmpty()) {
            // insert
            dietDAO.insertDietReceipt(receipt);
        } else {
            // update
            receipt.setRctId(optRct.get().getRctId());
            dietDAO.updateDietReceipt(receipt);
        }

        return dietDAO.findDietDetailById(dietId)
                .orElseThrow(() -> new CustomNotFoundException(messageService.get("diet.id.not-found", dietId)));
    }

    @Transactional
    @Override
    public DietDetailDto recommendFoodByDietId(int dietId, int month) {
        //find diet
        DietDetailDto diet = findDietDetailById(dietId);

        //verify tray & standard before auto fill foods on tray
        if (diet.getTray() == null || diet.getStandard() == null ||
                diet.getTray().getFoods() == null || diet.getTray().getFoods().isEmpty()) {
            return diet;
        }

        //get tray
        DietTrayDto tray = diet.getTray();

        //if tray already had foods => skip
        if (tray.getFoods().stream()
                .map(fd -> fd.getCode())
                .anyMatch(code -> code != null && !"".equals(code))) {
            return diet;
        }
        ;
        String standardCode = diet.getStandard().getCode();

        //find default recommended foods (based on tray name, standard code and current month)
        List<DietFoodDto> recFoods = dietDAO.findDefaultRecFood(tray.getName(), standardCode, month);

        boolean defaultFlag = false;
        List<Integer> excludedAllergenIds = diet.getExcludedAllergens().stream().map(alrg -> alrg.getId()).toList();

        if ((recFoods == null || recFoods.isEmpty()) && standardCode != null
                && !USR_STD_CD.equals(standardCode) && !"SD00000008".equals(standardCode)
                && !"SD00000011".equals(standardCode)) {
            // if default search failed => try to find with custom.
            // This feature is used for only with default nutrition standards except SD00000008 and SD00000011 (no recipe templates)
            List<CustomRecFoodDto> params = new ArrayList<>();
            for (int i = 0; i < tray.getFoods().size(); i++) {
                CustomRecFoodDto param = CustomRecFoodDto.builder()
                        .typeCode(tray.getFoods().get(i).getTypeCode())
                        .alias("fd" + (i + 1))
                        .build();
                params.add(param);
            }

            try {
                List<List<CustomRecFoodDto>> groups = new ArrayList<List<CustomRecFoodDto>>();
                switch (standardCode) {
                    case "SD00000001", "SD00000002", "SD00000003",
//						"SD00000008", 
                         "SD00000009", "SD00000010":
                        groups.addAll(separateFoodsIntoGroups(params, 3));
                        for (int i = 0; i < groups.size(); i++) {
                            recFoods.addAll(dietDAO.findCustomRecFood(
                                    standardCode,
                                    groups.get(i),
                                    String.valueOf(groups.get(i).size()) + " / " + String.valueOf(params.size()),
                                    excludedAllergenIds
                            ));
                        }
                        break;
                    case "SD00000004", "SD00000005",
//						"SD00000006", 
                         "SD00000007":
                        recFoods.addAll(dietDAO.findCustomRecFood(standardCode, params, null, excludedAllergenIds));
                        break;
                    default:
                        throw new ValidationException(messageService.get("diet-std.code.invalid"));
                }
            } catch (DataAccessResourceFailureException e) {
                throw new CustomNotFoundException(messageService.get("diet.recommend-food.not-found"));
            }

            //nothing to recommend
            if (recFoods == null || recFoods.isEmpty() || params.size() != recFoods.size()) {
                throw new CustomNotFoundException(messageService.get("diet.recommend-food.not-found"));
            }
        } else {
            defaultFlag = true;
            // USR, SD00000008, SD00000011 기준의 경우 기본 추천 음식이 없을 수 있음
            // 해당 기준에서 추천 음식이 없으면 빈 음식 슬롯 상태 그대로 반환
            if ((recFoods == null || recFoods.isEmpty())
                    && (USR_STD_CD.equals(standardCode) || "SD00000008".equals(standardCode)
                        || "SD00000011".equals(standardCode))) {
                return diet;
            }
        }


        //loop through foods and auto fill as long as two food types match. Update food code and recipe description
        List<DietTrayDetailEntity> updatedFds = new ArrayList<>();

        if (defaultFlag) {

            List<Integer> unorderSeqs = new ArrayList<>();
            //if default, first fill the recommended food with the correct type
            tray.getFoods().stream().forEach(fd -> {
                Optional<DietFoodDto> recFd = recFoods.stream()
                        .filter(e -> Objects.equals(e.getTypeCode(), fd.getTypeCode()))
                        .findFirst();

                //if find a match => add to update later and remove from recFds
                if (recFd.isPresent()) {
                    updatedFds.add(DietTrayDetailEntity.builder()
                            .dietId(dietId)
                            .fdSeq(fd.getSequence())
                            .fdCd(recFd.get().getCode())
                            .fdNm(recFd.get().getName())
                            .fdRcpDesc(recFd.get().getRecipeDescription())
                            .build());
                    recFoods.remove(recFd.get());
                } else { // otherwise store the seq to add later
                    unorderSeqs.add(fd.getSequence());
                }

            });

            for (int seq : unorderSeqs) {
                if (recFoods.isEmpty()) {
                    break;
                }
                DietFoodDto recFd = recFoods.get(0);
                updatedFds.add(DietTrayDetailEntity.builder()
                        .dietId(dietId)
                        .fdSeq(seq)
                        .fdCd(recFd.getCode())
                        .fdNm(recFd.getName())
                        .fdRcpDesc(recFd.getRecipeDescription())
                        .build());
                recFoods.remove(recFd);
            }


        } else {
            tray.getFoods().stream().forEach(fd -> {
                Optional<DietFoodDto> recFd = recFoods.stream()
                        .filter(e -> Objects.equals(e.getTypeCode(), fd.getTypeCode()))
                        .findFirst();

                //if find a match => add to update later and remove from recFds
                recFd.ifPresent(e -> {
                    updatedFds.add(DietTrayDetailEntity.builder()
                            .dietId(dietId)
                            .fdSeq(fd.getSequence())
                            .fdCd(e.getCode())
                            .fdNm(e.getName())
                            .fdRcpDesc(e.getRecipeDescription())
                            .build());
                    recFoods.remove(e);
                });
            });
        }
        dietDAO.updateTrayDtlMgmt(updatedFds);

        if (!updatedFds.isEmpty()) {
            //clear old materials
            dietDAO.deleteDietFdDtlMgmtByDietId(dietId);

            //for each food => add materials
            updatedFds.stream().forEach(updFd -> {
                DietFoodDto fd = dietDAO.findFoodByFdCd(updFd.getFdCd());
                if (fd.getMaterials() != null && !fd.getMaterials().isEmpty()) {
                    dietDAO.addNewDietFdDtlMgmt(fd.getMaterials().stream().map(m -> {
                        DietFoodDetailEntity e = new DietFoodDetailEntity();
                        e.setDietId(dietId);
                        e.setFdSeq(updFd.getFdSeq());
                        e.setMatCd(m.getCode());
                        e.setMatRcpWgt(m.getRecipeWeight());
                        e.setMatCalcWgt(m.getCalculationWeight());
                        return e;
                    }).toList());
                }
            });
        }

        // final replace allergen foods with alternatives if possible
        return replaceAllergenFoodInDiet(SaveExcludedAllergenToDietParam.builder()
                .dietId(dietId)
                .excludedAllergenIds(excludedAllergenIds)
                .build());
    }

    @Transactional
    @Override
    public DietDetailDto saveExcludedAllergenToDiet(SaveExcludedAllergenToDietParam param) {
        // does this diet belong to me?
        doesDietBelongToCurrentUser(param.getDietId());

        //save first, then replace allergen foods with alternatives if possible
        addExcludedAllergenToDiet(param.getDietId(), param.getExcludedAllergenIds());
        return replaceAllergenFoodInDiet(param);
    }

    @Transactional
    @Override
    public DietDetailDto removeAllergenFoodFromDiet(SaveExcludedAllergenToDietParam param) {
        // GOAL: with dietId and a list of allergenIds, we will find all the invalid foods to remove from diet (set null)
        // and delete materials belonging to those foods

        // validate allergen
        validateAllergenId(param.getExcludedAllergenIds());

        // find diet detail
        DietDetailDto diet = findDietDetailById(param.getDietId());

        // skip if no tray or no compartments or no allergens
        if (diet.getTray() == null || diet.getTray().getFoods() == null ||
                param.getExcludedAllergenIds() == null || param.getExcludedAllergenIds().isEmpty()) {
            return diet;
        }

        // create param to validate by reusing another function
        CheckAllergenFoodParam checkAllergenFoodParam = CheckAllergenFoodParam.builder()
                .excludedAllergenIds(param.getExcludedAllergenIds())
                .build();

        List<CheckAllergenFoodParam.FoodData> inputFoodList = new ArrayList<>();

        // loop food to add to param
        inputFoodList.addAll(diet.getTray().getFoods().stream()
                .map(food -> {
                    CheckAllergenFoodParam.FoodData inputFood = CheckAllergenFoodParam.FoodData.builder()
                            .code(food.getCode())
                            .build();

                    List<CheckAllergenFoodParam.MaterialData> inputMaterials = food.getMaterials().stream()
                            .map(material -> CheckAllergenFoodParam.MaterialData.builder()
                                    .code(material.getCode())
                                    .build()).toList();

                    inputFood.setMaterials(inputMaterials);

                    return inputFood;
                }).toList());

        checkAllergenFoodParam.setFoods(inputFoodList);

        // call service to check
        List<CheckAllergenFoodDto> invalidFoods = checkAllergenFood(checkAllergenFoodParam);


        if (invalidFoods != null && !invalidFoods.isEmpty()) {
            // convert to a list of code
            List<String> invalidFoodCode = invalidFoods.stream().map(food -> food.getCode()).toList();

            // create params
            List<DietTrayDetailEntity> updatedFoods = diet.getTray().getFoods().stream()
                    .filter(fd -> invalidFoodCode.contains(fd.getCode()))
                    .map(fd -> DietTrayDetailEntity.builder()
                            .dietId(diet.getId())
                            .fdSeq(fd.getSequence())
                            .build())
                    .collect(Collectors.toList());

            // remove food from diet
            dietDAO.removeFoodFromDiet(updatedFoods);

            // delete material with the food sequence
            dietDAO.deleteMaterialFromDietByFoodSeq(updatedFoods);
        }

        return findDietDetailById(diet.getId());
    }

    /**
     * 알러지 포함 음식을 동일 식품 타입(fdTpCd)의 대체 음식으로 1:1 교체합니다.
     * 대체 가능한 음식이 없을 경우 해당 슬롯을 빈 상태(null)로 저장합니다.
     */
    private DietDetailDto replaceAllergenFoodInDiet(SaveExcludedAllergenToDietParam param) {
        // validate allergen
        validateAllergenId(param.getExcludedAllergenIds());

        // find diet detail
        DietDetailDto diet = findDietDetailById(param.getDietId());

        // skip if no tray or no foods or no allergens to exclude
        if (diet.getTray() == null || diet.getTray().getFoods() == null ||
                param.getExcludedAllergenIds() == null || param.getExcludedAllergenIds().isEmpty()) {
            return diet;
        }

        // build allergen check param
        CheckAllergenFoodParam checkAllergenFoodParam = CheckAllergenFoodParam.builder()
                .excludedAllergenIds(param.getExcludedAllergenIds())
                .build();

        List<CheckAllergenFoodParam.FoodData> inputFoodList = diet.getTray().getFoods().stream()
                .map(food -> {
                    CheckAllergenFoodParam.FoodData inputFood = CheckAllergenFoodParam.FoodData.builder()
                            .code(food.getCode())
                            .build();
                    List<DietMaterialDto> mats = food.getMaterials();
                    List<CheckAllergenFoodParam.MaterialData> inputMaterials = (mats == null ? Stream.<DietMaterialDto>empty() : mats.stream())
                            .map(material -> CheckAllergenFoodParam.MaterialData.builder()
                                    .code(material.getCode())
                                    .build()).toList();
                    inputFood.setMaterials(inputMaterials);
                    return inputFood;
                }).collect(Collectors.toList());

        checkAllergenFoodParam.setFoods(inputFoodList);

        List<CheckAllergenFoodDto> invalidFoods = checkAllergenFood(checkAllergenFoodParam);

        if (invalidFoods == null || invalidFoods.isEmpty()) {
            return diet;
        }

        Set<String> invalidFoodCodes = invalidFoods.stream().map(CheckAllergenFoodDto::getCode).collect(Collectors.toSet());

        // maintain current food codes to avoid recommending duplicates
        List<String> currentFoodCodes = diet.getTray().getFoods().stream()
                .map(DietFoodDto::getCode)
                .filter(code -> code != null && !code.isEmpty())
                .collect(Collectors.toList());

        for (DietFoodDto food : diet.getTray().getFoods()) {
            if (!invalidFoodCodes.contains(food.getCode())) {
                continue;
            }

            DietTrayDetailEntity foodEntity = DietTrayDetailEntity.builder()
                    .dietId(diet.getId())
                    .fdSeq(food.getSequence())
                    .build();

            // cannot find replacement without type code — remove food (empty slot)
            if (food.getTypeCode() == null || food.getTypeCode().isEmpty()) {
                dietDAO.removeFoodFromDiet(List.of(foodEntity));
                dietDAO.deleteMaterialFromDietByFoodSeq(List.of(foodEntity));
                continue;
            }

            // try to find a replacement of the same food type, excluding allergens and already-used foods
            List<DietFoodDto> replacements = dietDAO.recommendFoodByTypeCode(
                    1, food.getTypeCode(), new ArrayList<>(currentFoodCodes), param.getExcludedAllergenIds()
            );

            if (replacements != null && !replacements.isEmpty()) {
                DietFoodDto replacement = replacements.get(0);

                // update food slot with replacement
                foodEntity.setFdCd(replacement.getCode());
                foodEntity.setFdNm(replacement.getName());
                foodEntity.setFdRcpDesc(replacement.getRecipeDescription());
                dietDAO.updateTrayDtlMgmt(List.of(foodEntity));

                // replace materials
                dietDAO.deleteMaterialFromDietByFoodSeq(List.of(foodEntity));
                DietFoodDto replacementDetail = dietDAO.findFoodByFdCd(replacement.getCode());
                if (replacementDetail.getMaterials() != null && !replacementDetail.getMaterials().isEmpty()) {
                    final int fdSeq = food.getSequence();
                    dietDAO.addNewDietFdDtlMgmt(replacementDetail.getMaterials().stream().map(m -> {
                        DietFoodDetailEntity e = new DietFoodDetailEntity();
                        e.setDietId(diet.getId());
                        e.setFdSeq(fdSeq);
                        e.setMatCd(m.getCode());
                        e.setMatRcpWgt(m.getRecipeWeight());
                        e.setMatCalcWgt(m.getCalculationWeight());
                        return e;
                    }).toList());
                }

                // update tracking list to avoid reusing this replacement
                currentFoodCodes.remove(food.getCode());
                currentFoodCodes.add(replacement.getCode());
            } else {
                // no replacement found — remove food (empty slot)
                dietDAO.removeFoodFromDiet(List.of(foodEntity));
                dietDAO.deleteMaterialFromDietByFoodSeq(List.of(foodEntity));
            }
        }

        return findDietDetailById(diet.getId());
    }

    @Override
    public List<DietReportMonthlyPriceDto> findReportMonthlyPrice() {
        return dietDAO.findReportMonthlyPrice(AppUtil.getUserIdFromToken());
    }

    @Override
    public List<DietReportNutrStandardCateDto> findReportNutrStandardCate() {
        return dietDAO.findReportNutrStandardCate(AppUtil.getUserIdFromToken());
    }

    @Override
    public List<DietStandardDto> findAllDietStandardTemplate(Integer dietId) {
        // find all template standards
        List<DietStandardDto> standards = dietDAO.findAllDietStandardTemplate(dietId, USR_STD_CD);

        // if the list does not contain user standard, add a default standard to it
        if (standards.stream().noneMatch(standard -> standard.getCode().equals(USR_STD_CD))) {
            Optional<DietStandardDto> optStandard = dietDAO.findDietStandardTemplateByCode(USR_STD_CD);
            if (optStandard.isPresent()) {
                DietStandardDto defaultStandard = optStandard.get();
                defaultStandard.setNutrients(defaultStandard.getNutrients()
                        .stream()
                        .filter(nutrient -> nutrient.getCode().equals("ENG"))
                        .toList());

                standards.add(defaultStandard);
            }
        }

        return standards;
    }

    @Override
    public List<DietTrayDto> findAllTemplateTray() {
        return dietDAO.findAllTemplateTray();
    }

    @Override
    public List<DietTrayDto> findAllUserTray(Integer dietId) {
        return dietDAO.findAllUserTrayTemplate(AppUtil.getUserIdFromToken(), dietId);
    }

    @Override
    public DietTrayDto findUserTrayById(int trayId) {
        if (!doesTrayBelongToCurrentUser(trayId)) {
            throw new CustomAuthorizationException(messageService.get("diet-tray.id.not-belong.user"));
        }

        DietTrayDto tray = dietDAO.findUserTrayTemplateById(trayId)
                .orElseThrow(() -> new CustomNotFoundException(messageService.get("diet-tray.id.not-found", String.valueOf(trayId))));

        return tray;
    }

    @Transactional
    @Override
    public DietTrayDto addNewUserTray(DietTrayParam param) {
        // User tray will be = "", otherwise it's from the templates
        String repTrayCd = param.getRepresentativeTrayCode();
        if (repTrayCd != null && !"".equals(repTrayCd)) {
            commonService.verifyIntgCode(AppUtil.CODE_REP_TRAY_CD, param.getRepresentativeTrayCode(),
                    "diet-tray.rep-tray-code.not-found");
        }
        validateFoodTypeCode(param.getFoods().stream().map(fd -> fd.getTypeCode()).toList());

        // get user id
        int usrId = AppUtil.getUserIdFromToken();
        // insert data into usr_tray_mgmt
        UserTrayEntity tray = modelMapper.map(param, UserTrayEntity.class);
        tray.setUsrId(usrId);
        if (tray.getTrayMandFlg() == null) {
            tray.setTrayMandFlg("N");
        }
        dietDAO.addNewUserTray(tray);

        // insert data into usr_tray_dtl_mgmt
        List<DietFoodParam> foods = param.getFoods();
        List<UserTrayDetailEntity> list = IntStream.range(0, foods.size()).mapToObj(i -> {
            DietFoodParam food = foods.get(i);
            UserTrayDetailEntity entity = modelMapper.map(food, UserTrayDetailEntity.class);
            entity.setTrayId(tray.getTrayId());
            entity.setFdSeq(i + 1);
            entity.setUnitCd(AppUtil.UNIT_ML);
            return entity;
        }).collect(Collectors.toList());
        dietDAO.addNewUserTrayDetail(list);
        return findUserTrayById(tray.getTrayId());
    }

    @Transactional
    @Override
    public DietTrayDto updateUserTrayById(int trayId, DietTrayParam param) {
        // find tray
        DietTrayDto oldTray = findUserTrayById(trayId);

        // verify representative tray code
        String repTrayCd = param.getRepresentativeTrayCode();
        if (repTrayCd != null && !"".equals(repTrayCd)) {
            commonService.verifyIntgCode(AppUtil.CODE_REP_TRAY_CD, repTrayCd, "diet-tray.rep-tray-code.not-found");
        }

        // verify food type code
        if (param.getFoods() != null && !param.getFoods().isEmpty()) {
            validateFoodTypeCode(param.getFoods().stream().map(fd -> fd.getTypeCode()).toList());
        }

        // verify tray name
        if (param.getName() != null && !"".equals(param.getName())) {
            Optional<DietTrayDto> optTray = dietDAO.findUserTrayByName(AppUtil.getUserIdFromToken(), param.getName());
            if (optTray.isPresent() && !Objects.equals(optTray.get().getId(), trayId)) {
                throw new ValidationException(messageService.get("diet-tray.name.existed", param.getName()));
            }
        }

        // check mandatory flag => if 'Y' then handle mandatory case (only change volume and order)
        if (oldTray.getMandatoryFlag() != null && "Y".equals(oldTray.getMandatoryFlag()) &&
                isDefaultTrayDataChanged(oldTray, param)) {
            //mandatory but some unallowed data was changed
            throw new ValidationException(messageService.get("diet-tray.invalid-modification"));
        }


        // update to usr_tray_mgmt
        UserTrayEntity tray = modelMapper.map(param, UserTrayEntity.class);
        tray.setTrayId(trayId);
        dietDAO.updateDietTrayTemplate(tray);

        // add to usr_tray_dtl_mgmt if food list is not empty
        if (param.getFoods() != null) {
            // clear old
            dietDAO.deleteFoodsFromTray(trayId);
            if (!param.getFoods().isEmpty()) {
                // add new
                List<DietFoodParam> foods = param.getFoods();
                List<UserTrayDetailEntity> list = IntStream.range(0, foods.size()).mapToObj(i -> {
                    DietFoodParam food = foods.get(i);
                    UserTrayDetailEntity entity = modelMapper.map(food, UserTrayDetailEntity.class);
                    entity.setTrayId(tray.getTrayId());
                    entity.setFdSeq(i + 1);
                    entity.setUnitCd(AppUtil.UNIT_ML);
                    return entity;
                }).collect(Collectors.toList());
                dietDAO.addNewUserTrayDetail(list);
            }
        }
        return findUserTrayById(trayId);
    }

    @Transactional
    @Override
    public void deleteUserTrayById(int trayId) {
        DietTrayDto tray = findUserTrayById(trayId);
        if (tray.getMandatoryFlag() != null && "Y".equals(tray.getMandatoryFlag())) {
            throw new ValidationException(messageService.get("diet-tray.mandatory"));
        }

        dietDAO.deleteFoodsFromTray(trayId);
        dietDAO.deleteTrayById(trayId);
    }

    @Override
    public List<CommonCodeDto> findAllRepresentativeTray() {
        Map<String, Object> param = new HashMap<>();
        param.put("intgCd", AppUtil.CODE_REP_TRAY_CD);
        return commonDAO.findCodeDetail(param);
    }

    @Override
    public DietFoodDto findFoodByFdCd(String fdCd) {
        return dietDAO.findFoodByFdCd(fdCd);
    }

    @Override
    public List<DietFoodDto> findAllFood(int limit, String keyword, String fdTpCd, List<Integer> excludedAllergenIds) {
        // verify fdTpCd if exists
        if (fdTpCd != null) {
            validateFoodTypeCode(List.of(fdTpCd));
        }

        // find allergen ID if exists
        validateAllergenId(excludedAllergenIds);

        return dietDAO.findAllFood(limit, keyword, fdTpCd, excludedAllergenIds);
    }

    @Override
    public PagingWrapperDto findAllFoodWithPaging(Integer page, Integer limit, String keyword, String fdTpCd, String matCd, List<Integer> excludedAllergenIds) {
        if (fdTpCd != null) {
            validateFoodTypeCode(List.of(fdTpCd));
        }
        if (matCd != null && !matCd.isBlank()) {
            validateMaterialCode(List.of(matCd));
        }
        validateAllergenId(excludedAllergenIds);

        Integer[] arr = AppUtil.convertPageAndLimit(page, limit);

        FindAllFoodParam param = FindAllFoodParam.builder()
                .offset(arr[0])
                .limit(arr[1])
                .keyword(keyword)
                .fdTpCd(fdTpCd)
                .matCd(matCd)
                .excludedAllergenIds(excludedAllergenIds)
                .build();
        List<DietFoodDto> foodList = dietDAO.findAllFoodWithPaging(param);

        int totalPageNo = 1;
        if (arr[1] != null && !foodList.isEmpty() && foodList.get(0).getTotalRecordNo() > arr[1]) {
            totalPageNo = (int) Math.ceil((double) foodList.get(0).getTotalRecordNo() / arr[1]);
        }
        int totalRecordNo = foodList.isEmpty() ? 0 : foodList.get(0).getTotalRecordNo();
        foodList.forEach(food -> food.setTotalRecordNo(null));

        return PagingWrapperDto.builder()
                .items(foodList)
                .totalPageNo(totalPageNo)
                .totalRecordNo(totalRecordNo)
                .build();
    }

    @Override
    public PagingWrapperDto findMyFoodsWithPaging(Integer page, Integer limit, String keyword, String fdTpCd, String matCd) {
        if (fdTpCd != null) {
            validateFoodTypeCode(List.of(fdTpCd));
        }
        if (matCd != null && !matCd.isBlank()) {
            validateMaterialCode(List.of(matCd));
        }

        int usrId = AppUtil.getUserIdFromToken();
        Integer[] arr = AppUtil.convertPageAndLimit(page, limit);

        FindMyFoodsParam param = FindMyFoodsParam.builder()
                .offset(arr[0])
                .limit(arr[1])
                .keyword(keyword)
                .fdTpCd(fdTpCd)
                .matCd(matCd)
                .usrId(usrId)
                .build();
        List<DietFoodDto> foodList = dietDAO.findMyFoodsWithPaging(param);

        int totalPageNo = 1;
        if (arr[1] != null && !foodList.isEmpty() && foodList.get(0).getTotalRecordNo() > arr[1]) {
            totalPageNo = (int) Math.ceil((double) foodList.get(0).getTotalRecordNo() / arr[1]);
        }
        int totalRecordNo = foodList.isEmpty() ? 0 : foodList.get(0).getTotalRecordNo();
        foodList.forEach(food -> food.setTotalRecordNo(null));

        return PagingWrapperDto.builder()
                .items(foodList)
                .totalPageNo(totalPageNo)
                .totalRecordNo(totalRecordNo)
                .build();
    }

    @Override
    public List<DietFoodDto> recommendFood(int limit, String fdCd, String fdTpCd, List<Integer> excludedAllergenIds, Integer dietId, String currentFoodCode, List<String> currentTrayFoods) {
        // verify fdCd if provided
        if (fdCd != null && !fdCd.isBlank()) {
            validateFoodCode(List.of(fdCd));
        }
        // verify fdTpCd if provided
        if (fdTpCd != null && !fdTpCd.isBlank()) {
            validateFoodTypeCode(List.of(fdTpCd));
        }
        // verify allergen IDs
        validateAllergenId(excludedAllergenIds);

        // 보충 루프에서 사용할 fdTpCd 및 시도 음식 추적
        String resolvedFdTpCd;
        Set<String> triedFdCds = new HashSet<>();
        List<DietFoodDto> candidates;

        if (fdCd != null && !fdCd.isBlank()) {
            // fdCd 기반 추천: fd_recommend 테이블 사용
            // fdTpCd가 없으면 해당 음식의 타입코드를 자동으로 조회
            resolvedFdTpCd = (fdTpCd != null && !fdTpCd.isBlank()) ? fdTpCd : dietDAO.findFdTpCdByFdCd(fdCd);
            triedFdCds.add(fdCd);
            List<DietFoodDto> result = dietDAO.recommendFood(limit, fdCd, resolvedFdTpCd, null, excludedAllergenIds);
            result.forEach(f -> triedFdCds.add(f.getCode()));
            // 추천 결과가 부족하면 같은 타입코드의 음식으로 보충
            if (result.size() < limit && resolvedFdTpCd != null) {
                int remaining = limit - result.size();
                List<DietFoodDto> fallback = dietDAO.recommendFoodByTypeCode(remaining, resolvedFdTpCd, new ArrayList<>(triedFdCds), excludedAllergenIds);
                fallback.forEach(f -> triedFdCds.add(f.getCode()));
                result = Stream.concat(result.stream(), fallback.stream()).collect(Collectors.toList());
            }
            candidates = result;
        } else {
            // fdCd 없이 fdTpCd만으로 추천
            if (fdTpCd == null || fdTpCd.isBlank()) {
                throw new ValidationException(messageService.get("diet-fd.tp-code.invalid", "null"));
            }
            resolvedFdTpCd = fdTpCd;
            candidates = dietDAO.recommendFoodByTypeCode(limit, fdTpCd, null, excludedAllergenIds);
            candidates.forEach(f -> triedFdCds.add(f.getCode()));
        }

        if (dietId != null) {
            if (!doesDietBelongToCurrentUser(dietId)) {
                throw new CustomAuthorizationException("Forbidden");
            }
            if (currentFoodCode != null && !currentFoodCode.isBlank()) {
                validateFoodCode(List.of(currentFoodCode));
            }
            if (currentTrayFoods != null && currentTrayFoods.size() > 100) {
                throw new ValidationException(messageService.get("diet-fd.tray-foods.too-many", String.valueOf(currentTrayFoods.size())));
            }
            // diet-level 데이터(기준/현재합계)를 1회만 조회해 모든 필터 호출에서 재사용
            NutrientBudgetContext budgetCtx = buildNutrientBudgetContext(dietId, currentFoodCode, currentTrayFoods);
            if (budgetCtx == null) {
                return candidates;
            }
            List<DietFoodDto> passed = filterByNutrientBudget(candidates, budgetCtx);
            // 영양 예산 필터 후 부족분 보충: 최대 3회 반복
            int maxSupplementRounds = 3;
            for (int round = 0; round < maxSupplementRounds && passed.size() < limit; round++) {
                int needed = limit - passed.size();
                List<DietFoodDto> moreCandidates;
                if (fdCd != null && !fdCd.isBlank()) {
                    // fdCd 있으면 fd_recommend 테이블 기반으로 우선 보충
                    moreCandidates = dietDAO.recommendFood(needed * 3, fdCd, resolvedFdTpCd, new ArrayList<>(triedFdCds), excludedAllergenIds);
                    if (moreCandidates.isEmpty() && resolvedFdTpCd != null) {
                        // fd_recommend 소진 시 fdTpCd 기반 fallback
                        moreCandidates = dietDAO.recommendFoodByTypeCode(needed * 3, resolvedFdTpCd, new ArrayList<>(triedFdCds), excludedAllergenIds);
                    }
                } else {
                    moreCandidates = resolvedFdTpCd != null
                            ? dietDAO.recommendFoodByTypeCode(needed * 3, resolvedFdTpCd, new ArrayList<>(triedFdCds), excludedAllergenIds)
                            : new ArrayList<>();
                }
                if (moreCandidates.isEmpty()) break;
                moreCandidates.forEach(f -> triedFdCds.add(f.getCode()));
                passed.addAll(filterByNutrientBudget(moreCandidates, budgetCtx));
                if (passed.size() >= limit) break;
            }
            return passed.size() > limit ? new ArrayList<>(passed.subList(0, limit)) : passed;
        }
        return candidates;
    }

    /** nutr_foml 파싱 결과를 담는 구조화된 제약 객체. 빌드 단계에서 1회 파싱 후 재사용. */
    private static class FormulaConstraint {
        enum Type { UPPER, LOWER, RANGE }
        /** 기준이 무엇 대비 비율/양인지: 총 열량 대비 %(CALORIE_PCT), 100kcal당 절대량(CALORIE_PER100), 레시피 100g당 절대량(WEIGHT_PER100) */
        enum Basis { CALORIE_PCT, CALORIE_PER100, WEIGHT_PER100 }
        final Type type;
        final Basis basis;
        final double pct1;    // CALORIE_PCT: 비율(0.0~1.0) / PER100 계열: 100단위당 절대량
        final double pct2;    // 범위 상한 비율 (RANGE 전용, CALORIE_PCT만 해당)
        final boolean strict; // true=미만(<), false=이하(<=)
        final double divisor; // CALORIE_PCT 전용: 9 kcal/g(SFA/FAT) or 4 kcal/g(그 외)

        FormulaConstraint(Type type, Basis basis, double pct1, double pct2, boolean strict, double divisor) {
            this.type = type; this.basis = basis; this.pct1 = pct1; this.pct2 = pct2;
            this.strict = strict; this.divisor = divisor;
        }
    }

    private static class NutrientBudgetContext {
        final Map<String, Double> weightFromMap;
        final Map<String, Double> weightToMap;
        final Set<String> compareNutrCds;
        final Map<String, Double> currentTotalMap;
        final double slotCapaVol;
        final boolean hasEmptySlots;
        final Map<String, FormulaConstraint> formulaConstraintMap;
        final double currentTotalWgt; // 현재 트레이에 담긴 음식들의 총 중량(g) 합계. WEIGHT_PER100 기준(예: 저당/저염) 계산에 사용.

        NutrientBudgetContext(Map<String, Double> weightFromMap, Map<String, Double> weightToMap,
                              Set<String> compareNutrCds, Map<String, Double> currentTotalMap,
                              double slotCapaVol, boolean hasEmptySlots,
                              Map<String, FormulaConstraint> formulaConstraintMap,
                              double currentTotalWgt) {
            this.weightFromMap = weightFromMap;
            this.weightToMap = weightToMap;
            this.compareNutrCds = compareNutrCds;
            this.currentTotalMap = currentTotalMap;
            this.slotCapaVol = slotCapaVol;
            this.hasEmptySlots = hasEmptySlots;
            this.formulaConstraintMap = formulaConstraintMap;
            this.currentTotalWgt = currentTotalWgt;
        }
    }

    /**
     * diet-level 데이터(영양 기준, 현재 식단 영양합계)를 한 번만 조회해 컨텍스트로 반환.
     * currentTrayFoods가 제공되면 FE 화면 기준 데이터를 사용하고, 없으면 DB에서 실시간 조회.
     * 제약 조건이 없으면 null 반환 → 필터 스킵.
     */
    private NutrientBudgetContext buildNutrientBudgetContext(int dietId, String currentFoodCode, List<String> currentTrayFoods) {
        // 1. 영양 기준 조회 (diet_std_dtl_mgmt): nutr_cd -> nutr_wgt_fm, nutr_wgt_to
        List<Map<String, Object>> standardDetails = dietDAO.findDietStandardDetail(dietId);
        if (standardDetails == null || standardDetails.isEmpty()) return null;
        Map<String, Double> weightFromMap = new HashMap<>();
        Map<String, Double> weightToMap = new HashMap<>();
        Map<String, FormulaConstraint> formulaConstraintMap = new HashMap<>();
        for (Map<String, Object> row : standardDetails) {
            String nutrCd = (String) row.get("nutrCd");
            Object wgtFm = row.get("nutrWgtFm");
            Object wgtTo = row.get("nutrWgtTo");
            Object foml = row.get("nutrFoml");
            if (nutrCd != null) {
                if (wgtFm != null) weightFromMap.put(nutrCd, ((Number) wgtFm).doubleValue());
                if (wgtTo != null) weightToMap.put(nutrCd, ((Number) wgtTo).doubleValue());
                if (foml != null) {
                    String fomlStr = foml.toString().trim();
                    if (!fomlStr.isBlank()) {
                        FormulaConstraint fc = parseFormulaConstraint(nutrCd, fomlStr);
                        if (fc != null) {
                            formulaConstraintMap.put(nutrCd, fc);
                        } else {
                            log.warn("[NutrientBudget] 인식되지 않는 nutr_foml 포맷 - dietId={}, nutrCd={}, foml='{}'",
                                    dietId, nutrCd, fomlStr);
                        }
                    }
                }
            }
        }
        Set<String> compareNutrCds = new HashSet<>(weightFromMap.keySet());
        compareNutrCds.addAll(weightToMap.keySet());
        compareNutrCds.addAll(formulaConstraintMap.keySet());
        // formula 기반 제약이 있으면 ENG는 항상 합산 대상에 포함 (동적 상한값 계산의 기준이 되므로)
        if (!formulaConstraintMap.isEmpty()) compareNutrCds.add("ENG");
        if (compareNutrCds.isEmpty()) return null;

        // 2. 트레이 음식 결정: FE 전달값(currentTrayFoods) 우선, 없으면 DB 실시간 조회
        //    currentFoodCode(대체 대상)는 목록에서 1개 제외
        double slotCapaVol = 0.0;
        List<Map<String, Object>> activeTrayFoods = new ArrayList<>();
        if (currentTrayFoods != null && !currentTrayFoods.isEmpty()) {
            // FE 화면 기준: "fdCd:capaVol" 형식 파싱
            List<String> parsedFdCds = new ArrayList<>();
            List<double[]> parsedCapaVols = new ArrayList<>();
            for (String entry : currentTrayFoods) {
                // split(":", 2)로 fdCd에 콜론이 포함된 경우도 안전하게 파싱
                String[] parts = entry.split(":", 2);
                if (parts.length != 2) continue;
                String entryFdCd = parts[0].trim();
                if (entryFdCd.isBlank()) continue;
                double capaVol;
                try {
                    capaVol = Double.parseDouble(parts[1].trim());
                } catch (NumberFormatException e) {
                    continue;
                }
                // capaVol은 양수여야 함 (0 또는 음수는 영양합산 조작 가능)
                if (capaVol <= 0) continue;
                parsedFdCds.add(entryFdCd);
                parsedCapaVols.add(new double[]{capaVol});
            }
            // 파싱된 fdCd 유효성 검증
            if (!parsedFdCds.isEmpty()) {
                validateFoodCode(parsedFdCds.stream().distinct().collect(Collectors.toList()));
            }
            boolean removedCurrentFood = false;
            for (int i = 0; i < parsedFdCds.size(); i++) {
                String entryFdCd = parsedFdCds.get(i);
                double capaVol = parsedCapaVols.get(i)[0];
                if (!removedCurrentFood && currentFoodCode != null && currentFoodCode.equals(entryFdCd)) {
                    slotCapaVol = capaVol;
                    removedCurrentFood = true;
                    continue;
                }
                Map<String, Object> trayFood = new HashMap<>();
                trayFood.put("fdCd", entryFdCd);
                trayFood.put("fdCapaVol", capaVol);
                activeTrayFoods.add(trayFood);
            }
        } else {
            // DB 실시간 조회 (diet_tray_dtl_mgmt)
            List<Map<String, Object>> trayFoods = dietDAO.findDietTrayFoods(dietId);
            boolean removedCurrentFood = false;
            if (trayFoods != null) {
                for (Map<String, Object> trayFood : trayFoods) {
                    Object fdCdObj = trayFood.get("fdCd");
                    String trayFdCd = fdCdObj != null ? fdCdObj.toString() : null;
                    if (!removedCurrentFood && currentFoodCode != null && currentFoodCode.equals(trayFdCd)) {
                        Object capaVolObj = trayFood.get("fdCapaVol");
                        slotCapaVol = capaVolObj != null ? ((Number) capaVolObj).doubleValue() : 0.0;
                        removedCurrentFood = true;
                        continue;
                    }
                    activeTrayFoods.add(trayFood);
                }
            }
        }

        // 3. 활성 음식 영양합산 (fd_capa_vol 배수 적용)
        Map<String, Double> currentTotalMap = new HashMap<>();
        double currentTotalWgt = 0.0;
        if (!activeTrayFoods.isEmpty()) {
            List<String> activeFdCds = activeTrayFoods.stream()
                    .map(f -> f.get("fdCd") != null ? f.get("fdCd").toString() : null)
                    .filter(c -> c != null && !c.isBlank())
                    .distinct()
                    .collect(Collectors.toList());
            List<Map<String, Object>> trayNutrList = dietDAO.findFoodNutrByFdCds(activeFdCds);
            Map<String, Map<String, Object>> nutrByTrayFdCd = new HashMap<>();
            if (trayNutrList != null) {
                for (Map<String, Object> row : trayNutrList) {
                    Object fdCdObj = row.get("fdCd");
                    if (fdCdObj != null) nutrByTrayFdCd.put(fdCdObj.toString(), row);
                }
            }
            for (Map<String, Object> trayFood : activeTrayFoods) {
                String trayFdCd = trayFood.get("fdCd") != null ? trayFood.get("fdCd").toString() : null;
                if (trayFdCd == null) continue;
                Object capaVolObj = trayFood.get("fdCapaVol");
                if (capaVolObj == null) continue;
                double capaVol = ((Number) capaVolObj).doubleValue();
                if (capaVol <= 0) continue;
                Map<String, Object> nutrRow = nutrByTrayFdCd.get(trayFdCd);
                if (nutrRow == null) continue;
                Object ttlCalcWgtObj = nutrRow.get("ttlCalcWgt");
                double ttlCalcWgt = ttlCalcWgtObj != null ? ((Number) ttlCalcWgtObj).doubleValue() : 0.0;
                double scalingRatio = ttlCalcWgt > 0 ? capaVol / ttlCalcWgt : 1.0;
                currentTotalWgt += capaVol;
                for (String nutrCd : compareNutrCds) {
                    Object val = nutrRow.get(nutrCd.toLowerCase(Locale.ROOT));
                    if (val != null) {
                        currentTotalMap.merge(nutrCd, ((Number) val).doubleValue() * scalingRatio, Double::sum);
                    }
                }
            }
        }

        // 4. 빈 슬롯 감지 (DB 기준)
        int emptySlotCount = dietDAO.findEmptySlotCount(dietId);
        boolean hasEmptySlots = emptySlotCount > 0;

        return new NutrientBudgetContext(weightFromMap, weightToMap, compareNutrCds, currentTotalMap, slotCapaVol, hasEmptySlots, formulaConstraintMap, currentTotalWgt);
    }

    /**
     * 사전 계산된 컨텍스트를 사용해 후보 목록을 영양 예산 기준으로 필터링.
     * 후보 영양값 조회만 수행하므로 루프 내 반복 호출에 적합.
     */
    private List<DietFoodDto> filterByNutrientBudget(List<DietFoodDto> candidates, NutrientBudgetContext ctx) {
        List<String> candidateFdCds = candidates.stream()
                .map(DietFoodDto::getCode)
                .filter(code -> code != null && !code.isBlank())
                .distinct()
                .collect(Collectors.toList());
        if (candidateFdCds.isEmpty()) return candidates;
        List<Map<String, Object>> candidateNutrList = dietDAO.findFoodNutrByFdCds(candidateFdCds);
        Map<String, Map<String, Object>> nutrByFdCd = new HashMap<>();
        if (candidateNutrList != null) {
            for (Map<String, Object> row : candidateNutrList) {
                Object fdCdObj = row.get("fdCd");
                if (fdCdObj != null) nutrByFdCd.put(fdCdObj.toString(), row);
            }
        }

        List<DietFoodDto> passed = new ArrayList<>();
        for (DietFoodDto candidate : candidates) {
            String candidateFdCd = candidate.getCode();
            Map<String, Object> nutrRow = nutrByFdCd.get(candidateFdCd);
            // 후보 스케일링: slotCapaVol(교체 대상 슬롯 용량) / 후보 자신의 ttlCalcWgt
            double ttlCalcWgt = 0.0;
            if (nutrRow != null) {
                Object ttlCalcWgtObj = nutrRow.get("ttlCalcWgt");
                ttlCalcWgt = ttlCalcWgtObj != null ? ((Number) ttlCalcWgtObj).doubleValue() : 0.0;
            }
            double candidateScalingRatio = 1.0;
            if (ctx.slotCapaVol > 0 && ttlCalcWgt > 0) {
                candidateScalingRatio = ctx.slotCapaVol / ttlCalcWgt;
            }
            // 공식 기반 제약을 위한 projected ENG/중량 계산
            double candidateEng = 0.0;
            if (nutrRow != null) {
                Object engVal = nutrRow.get("eng");
                if (engVal != null) candidateEng = ((Number) engVal).doubleValue() * candidateScalingRatio;
            }
            double projectedEng = ctx.currentTotalMap.getOrDefault("ENG", 0.0) + candidateEng;
            double candidateWgt = ttlCalcWgt * candidateScalingRatio;
            double projectedWgt = ctx.currentTotalWgt + candidateWgt;
            boolean ok = true;
            for (String nutrCd : ctx.compareNutrCds) {
                double currentTotal = ctx.currentTotalMap.getOrDefault(nutrCd, 0.0);
                double candidateVal = 0.0;
                if (nutrRow != null) {
                    Object val = nutrRow.get(nutrCd.toLowerCase(Locale.ROOT));
                    if (val != null) candidateVal = ((Number) val).doubleValue() * candidateScalingRatio;
                }
                double projectedTotal = currentTotal + candidateVal;
                FormulaConstraint fc = ctx.formulaConstraintMap.get(nutrCd);
                if (fc != null) {
                    // nutr_foml 기반 동적 제약 체크 (빌드 단계에서 파싱된 구조 사용)
                    if (!checkFormulaConstraint(fc, projectedTotal, projectedEng, projectedWgt, ctx.hasEmptySlots)) {
                        ok = false; break;
                    }
                } else {
                    Double weightTo = ctx.weightToMap.get(nutrCd);
                    if (weightTo != null && projectedTotal > weightTo) { ok = false; break; }
                    // 빈 슬롯이 있으면 하한값 체크 스킵 (아직 채워지지 않은 슬롯이 영양 기여 가능)
                    if (!ctx.hasEmptySlots) {
                        Double weightFrom = ctx.weightFromMap.get(nutrCd);
                        if (weightFrom != null && projectedTotal < weightFrom) { ok = false; break; }
                    }
                }
            }
            if (ok) passed.add(candidate);
        }
        return passed;
    }

    /**
     * nutr_foml 문자열을 파싱하여 영양소 제약을 검사한다.
     * FE의 getAdditionalFormula 로직과 동일한 기준 적용.
     * divisor: SFA/FAT → 9 kcal/g, 나머지 → 4 kcal/g
     */
    private static final Set<String> KCAL_PER_GRAM_9 = new HashSet<>(Arrays.asList("SFA", "FAT"));
    private static final java.util.regex.Pattern FORMULA_UPPER = java.util.regex.Pattern.compile("총 열량의 (\\d+)% (미만|이하)");
    private static final java.util.regex.Pattern FORMULA_RANGE = java.util.regex.Pattern.compile("총 열량의 (\\d+)~(\\d+)%");
    private static final java.util.regex.Pattern FORMULA_LOWER = java.util.regex.Pattern.compile("총 열량의 (\\d+)% 이상");
    // "100g당 5g 미만"(저당), "100g당 120mg 미만"(저염) 처럼 레시피 총중량 100g당 절대량으로 표현된 기준
    private static final java.util.regex.Pattern FORMULA_PER_100G =
            java.util.regex.Pattern.compile("100\\s*g\\s*당\\s*(\\d+(?:\\.\\d+)?)\\s*(?:g|mg)\\s*(미만|이하|이상)");
    // "100kcal 당 5g 이상"(고단백) 처럼 총열량 100kcal당 절대량으로 표현된 기준
    private static final java.util.regex.Pattern FORMULA_PER_100KCAL =
            java.util.regex.Pattern.compile("100\\s*kcal\\s*당\\s*(\\d+(?:\\.\\d+)?)\\s*(?:g|mg)\\s*(미만|이하|이상)");

    /** nutr_foml 문자열을 빌드 단계에서 1회 파싱하여 FormulaConstraint로 반환. */
    private static FormulaConstraint parseFormulaConstraint(String nutrCd, String formula) {
        double divisor = KCAL_PER_GRAM_9.contains(nutrCd) ? 9.0 : 4.0;
        java.util.regex.Matcher m;

        m = FORMULA_UPPER.matcher(formula);
        if (m.find()) {
            return new FormulaConstraint(FormulaConstraint.Type.UPPER, FormulaConstraint.Basis.CALORIE_PCT,
                    Double.parseDouble(m.group(1)) / 100.0, 0, "미만".equals(m.group(2)), divisor);
        }
        m = FORMULA_RANGE.matcher(formula);
        if (m.find()) {
            return new FormulaConstraint(FormulaConstraint.Type.RANGE, FormulaConstraint.Basis.CALORIE_PCT,
                    Double.parseDouble(m.group(1)) / 100.0, Double.parseDouble(m.group(2)) / 100.0, false, divisor);
        }
        m = FORMULA_LOWER.matcher(formula);
        if (m.find()) {
            return new FormulaConstraint(FormulaConstraint.Type.LOWER, FormulaConstraint.Basis.CALORIE_PCT,
                    Double.parseDouble(m.group(1)) / 100.0, 0, false, divisor);
        }
        m = FORMULA_PER_100G.matcher(formula);
        if (m.find()) {
            boolean isLower = "이상".equals(m.group(2));
            return new FormulaConstraint(isLower ? FormulaConstraint.Type.LOWER : FormulaConstraint.Type.UPPER,
                    FormulaConstraint.Basis.WEIGHT_PER100,
                    Double.parseDouble(m.group(1)), 0, "미만".equals(m.group(2)), 1.0);
        }
        m = FORMULA_PER_100KCAL.matcher(formula);
        if (m.find()) {
            boolean isLower = "이상".equals(m.group(2));
            return new FormulaConstraint(isLower ? FormulaConstraint.Type.LOWER : FormulaConstraint.Type.UPPER,
                    FormulaConstraint.Basis.CALORIE_PER100,
                    Double.parseDouble(m.group(1)), 0, "미만".equals(m.group(2)), 1.0);
        }
        return null; // 알 수 없는 공식
    }

    /** basis에 따라 기준선(경계값)을 계산. CALORIE_PCT는 열량*비율/divisor, PER100 계열은 100단위당 절대량 비례. */
    private static double computeFormulaBound(FormulaConstraint fc, double projectedEng, double projectedWgt, double pct) {
        switch (fc.basis) {
            case WEIGHT_PER100:
                return projectedWgt * pct / 100.0;
            case CALORIE_PER100:
                return projectedEng * pct / 100.0;
            default:
                return projectedEng * pct / fc.divisor;
        }
    }

    /** 파싱된 FormulaConstraint로 제약을 검사. 미만(<) vs 이하(<=) 구분 적용. */
    private boolean checkFormulaConstraint(FormulaConstraint fc, double projectedTotal,
                                           double projectedEng, double projectedWgt, boolean hasEmptySlots) {
        switch (fc.type) {
            case UPPER:
                double upperBound = computeFormulaBound(fc, projectedEng, projectedWgt, fc.pct1);
                return fc.strict ? projectedTotal < upperBound : projectedTotal <= upperBound;
            case LOWER:
                if (hasEmptySlots) return true;
                return projectedTotal >= computeFormulaBound(fc, projectedEng, projectedWgt, fc.pct1);
            case RANGE:
                double lb = projectedEng * fc.pct1 / fc.divisor;
                double ub = projectedEng * fc.pct2 / fc.divisor;
                return projectedTotal <= ub && (hasEmptySlots || projectedTotal >= lb);
            default:
                return true;
        }
    }

    @Override
    public DietFoodConversionDto findFoodConversionByFdCd(String fdCd) {
        // verify food code
        validateFoodCode(List.of(fdCd));
        return dietDAO.findFoodConversionByFdCd(fdCd);
    }

    @Override
    public PagingWrapperDto findAllMaterialWithPaging(Integer page, Integer limit, String keyword, List<Integer> excludedAllergenIds) {
        //convert page & limit to offset & limit
        Integer[] arr = AppUtil.convertPageAndLimit(page, limit); // [0] => offset ; [1] => limit

        validateAllergenId(excludedAllergenIds);

        FindAllMaterialParam param = FindAllMaterialParam.builder()
                .offset(arr[0])
                .limit(arr[1])
                .keyword(keyword)
                .excludedAllergenIds(excludedAllergenIds)
                .build();
        List<DietMaterialDto> matList = dietDAO.findAllMaterial(param);

        int totalPageNo = 1;
        if (arr[1] == null) {
            totalPageNo = 1;
        } else if (!matList.isEmpty() && matList.get(0).getTotalRecordNo() > arr[1]) {
            totalPageNo = (int) Math.ceil((double) matList.get(0).getTotalRecordNo() / arr[1]);
        }

        int totalRecordNo = 0;
        if (!matList.isEmpty()) {
            totalRecordNo = matList.get(0).getTotalRecordNo();
        }
        matList.stream().forEach(mat -> mat.setTotalRecordNo(null));
        return PagingWrapperDto.builder()
                .items(matList)
                .totalPageNo(totalPageNo)
                .totalRecordNo(totalRecordNo)
                .build();
    }

    @Override
    public List<DietMaterialDto> findAllMaterial(String codeList, Integer representativeId, List<Integer> excludedAllergenIds) {
        // verify codeList
        List<String> matCdList = null;
        if (codeList != null) {
            matCdList = Arrays.asList(codeList.split(","));
            validateMaterialCode(matCdList);
        }

        validateAllergenId(excludedAllergenIds);

        FindAllMaterialParam daoParams = FindAllMaterialParam.builder()
                .matCdList(matCdList)
                .representativeId(representativeId)
                .excludedAllergenIds(excludedAllergenIds)
                .build();
        return dietDAO.findAllMaterial(daoParams);
    }

    @Override
    public List<DietMaterialTypeDto> findMaterialType() {
        return dietDAO.findMaterialType();
    }

    @Override
    public List<DietMaterialCatDto> findMaterialCategory(String typeCode) {
        return dietDAO.findMaterialCategory(typeCode);
    }

    @Override
    public List<DietMaterialRepDto> findMaterialRepresentative(Integer categoryId) {
        return dietDAO.findMaterialRepresentative(categoryId);
    }

    @Transactional
    @Override
    public DietMaterialDto addNewMaterial(AddMaterialMaterialParam param) {
        //validate nutrient code
        validateNutrientCode(param.getNutrients().stream().map(nutr -> nutr.getCode()).toList());

        //add to material
        MaterialEntity newMat = MaterialEntity.builder()
                .matNm(param.getName())
                .unitCd(AppUtil.UNIT_GAM)
                .matRepId(param.getRepresentativeId())
                .build();
        dietDAO.addNewMaterial(newMat);

        //create relationship with nutrients (nutrAmt = nutrAmt/matWgt and round up to 10 decimal places)
        dietDAO.addNewTemplateMaterial(param.getNutrients().stream().map(nutr -> {
            return TemplateMaterialEntity.builder()
                    .tmplMatCd(newMat.getMatCd())
                    .tmplNutrCd(nutr.getCode())
                    .tmplMatWgt(new BigDecimal(String.valueOf(param.getWeight())))
                    .tmplMatUnitCd(AppUtil.UNIT_GAM)
                    .tmplNutrAmt(new BigDecimal(String.valueOf(nutr.getAmount())))
                    .build();
        }).collect(Collectors.toList()));

        //check result and return
        FindAllMaterialParam daoParams = FindAllMaterialParam.builder()
                .matCdList(List.of(newMat.getMatCd()))
                .build();
        List<DietMaterialDto> list = dietDAO.findAllMaterial(daoParams);
        if (list == null || list.isEmpty()) {
            throw new CustomNotFoundException(messageService.get("diet-mat.code.not-found", newMat.getMatCd()));
        }

        return list.get(0);
    }

    @Override
    public PagingWrapperDto findMyMaterials(Integer page, Integer limit, String keyword) {
        Integer[] arr = AppUtil.convertPageAndLimit(page, limit);
        int creUsrId = AppUtil.getUserIdFromToken();

        FindMyMaterialsParam param = FindMyMaterialsParam.builder()
                .offset(arr[0])
                .limit(arr[1])
                .keyword(keyword)
                .creUsrId(creUsrId)
                .build();
        List<MyMaterialDto> matList = dietDAO.findMyMaterials(param);

        int totalPageNo = 1;
        if (arr[1] != null && !matList.isEmpty() && matList.get(0).getTotalRecordNo() > arr[1]) {
            totalPageNo = (int) Math.ceil((double) matList.get(0).getTotalRecordNo() / arr[1]);
        }
        int totalRecordNo = matList.isEmpty() ? 0 : matList.get(0).getTotalRecordNo();
        matList.forEach(mat -> mat.setTotalRecordNo(null));

        return PagingWrapperDto.builder()
                .items(matList)
                .totalPageNo(totalPageNo)
                .totalRecordNo(totalRecordNo)
                .build();
    }

    @Transactional
    @Override
    public MyMaterialDto updateMyMaterialName(String matCd, UpdateMaterialNameParam param) {
        int creUsrId = AppUtil.getUserIdFromToken();

        MaterialEntity entity = MaterialEntity.builder()
                .matCd(matCd)
                .matNm(param.getName())
                .creUsrId(creUsrId)
                .build();
        dietDAO.updateMaterialName(entity);

        FindMyMaterialsParam searchParam = FindMyMaterialsParam.builder()
                .creUsrId(creUsrId)
                .matCd(matCd)
                .build();
        List<MyMaterialDto> list = dietDAO.findMyMaterials(searchParam);
        if (list.isEmpty()) {
            throw new CustomNotFoundException(messageService.get("diet-mat.code.not-found", matCd));
        }
        return list.get(0);
    }

    @Transactional
    @Override
    public void deleteMyMaterial(String matCd) {
        int creUsrId = AppUtil.getUserIdFromToken();

        MaterialEntity entity = MaterialEntity.builder()
                .matCd(matCd)
                .creUsrId(creUsrId)
                .build();

        if (dietDAO.checkMaterialInUse(entity)) {
            throw new ValidationException(messageService.get("diet-mat.in-use"));
        }

        dietDAO.deleteTemplateMaterial(entity);
        dietDAO.deleteMaterial(entity);
    }

    @Override
    public List<DietNutrientDto> findAllNutrient(String nutrCd) {
        return dietDAO.findAllNutrient(nutrCd).stream()
                .map(e -> {
                    e.setOrderSeq(AppUtil.NUTRIENT_ORDER_MAP.getOrDefault(e.getCode(), Integer.MAX_VALUE));
                    return e;
                })
                .sorted(Comparator.comparingInt(DietNutrientDto::getOrderSeq))
                .toList();
    }

    @Transactional
    @Override
    public void addDefaultUserTrayTemplate(int usrId) {
        dietDAO.addDefaultUserTray(usrId);
        dietDAO.addDefaultUserTrayDetail(usrId);
    }

    @Override
    public List<DietNutritionSummaryDto> findDietNutritionSummary(int dietId) {
        return dietDAO.findDietNutritionSummary(dietId);
    }

    @Override
    public byte[] exportDietToExcel(int dietId) {
        DietDetailDto diet = findDietDetailById(dietId);
        List<DietNutritionSummaryDto> summaries = dietDAO.findDietNutritionSummary(dietId);
        Map<Integer, List<DietNutritionSummaryDto>> summariesMap = new HashMap<>();
        summariesMap.put(dietId, summaries);
        return DietExcelExporter.export(List.of(diet), summariesMap);
    }

    @Override
    public byte[] exportDietsToExcel(List<Integer> dietIds) {
        List<DietDetailDto> diets = new ArrayList<>();
        Map<Integer, List<DietNutritionSummaryDto>> summariesMap = new HashMap<>();
        for (Integer dietId : dietIds) {
            DietDetailDto diet = findDietDetailById(dietId);
            diets.add(diet);
            summariesMap.put(dietId, dietDAO.findDietNutritionSummary(dietId));
        }
        return DietExcelExporter.export(diets, summariesMap);
    }


    @Transactional
    @Override
    public List<DietNutritionSummaryDto> addNutritionSummaryToDiet(int dietId,
                                                                   List<AddNutritionSummaryToDietParam> params) {
        // verify diet
        List<DietCommonInfoDto> diets = dietDAO
                .findAllDietMgmt(FindAllDietParam.builder().dietId(dietId).usrId(AppUtil.getUserIdFromToken()).build());
        if (diets == null || diets.isEmpty()) {
            throw new CustomNotFoundException(messageService.get("diet.id.not-found", dietId));
        }

        // validate nutrient code
        validateNutrientCode(params.stream().map(param -> param.getNutrientCode()).toList());

        // clear old summary
        dietDAO.deleteDietNutritionSummaryByDietId(dietId);

        // save summary
        dietDAO.addDietNutritionSummary(params.stream().map(param -> {
            DietNutritionSummaryEntity e = modelMapper.map(param, DietNutritionSummaryEntity.class);
            e.setDietId(dietId);
            return e;
        }).toList());

        return dietDAO.findDietNutritionSummary(dietId);
    }

    @Transactional
    @Override
    public void updateFoodNutritionData() {
        //check whether this person is admin
        int userId = AppUtil.getUserIdFromToken();
        List<RoleEntity> roles = roleDAO.findAllRoleByUserId(userId);
        if (roles.isEmpty() || roles.stream().noneMatch(role -> AppUtil.ROLE.ADM.toString().equals(role.getRoleCd()))) {
            throw new CustomAuthorizationException(messageService.get("auth.user.no-role"));
        }

        //find data which need to be updated or inserted
        List<DietFoodNutritionDto> list = dietDAO.findFoodNutritionDataForUpsert();
        if (list != null && !list.isEmpty()) {
            List<DietFoodNutritionDto> updatedList = list.stream().filter(fd -> fd.getFlag().equals("U")).toList();
            List<DietFoodNutritionDto> insertedList = list.stream().filter(fd -> fd.getFlag().equals("I")).toList();
            log.info("[updateFoodNutritionData] 대상 건수 - 업데이트: {}, 삽입: {}", updatedList.size(), insertedList.size());

            // PostgreSQL PreparedStatement 파라미터 제한(65,535개) 방지를 위한 배치 처리
            int batchSize = 1000;

            //update
            if (!updatedList.isEmpty()) {
                int totalBatches = (int) Math.ceil((double) updatedList.size() / batchSize);
                for (int i = 0; i < updatedList.size(); i += batchSize) {
                    int end = Math.min(i + batchSize, updatedList.size());
                    int batchNo = (i / batchSize) + 1;
                    log.info("[updateFoodNutritionData] UPDATE 배치 {}/{} 실행 ({} ~ {} / {}건)",
                            batchNo, totalBatches, i + 1, end, updatedList.size());
                    dietDAO.updateFoodNutritionData(updatedList.subList(i, end));
                }
                log.info("[updateFoodNutritionData] UPDATE 완료 - 총 {}건", updatedList.size());
            }

            //insert
            if (!insertedList.isEmpty()) {
                int totalBatches = (int) Math.ceil((double) insertedList.size() / batchSize);
                for (int i = 0; i < insertedList.size(); i += batchSize) {
                    int end = Math.min(i + batchSize, insertedList.size());
                    int batchNo = (i / batchSize) + 1;
                    log.info("[updateFoodNutritionData] INSERT 배치 {}/{} 실행 ({} ~ {} / {}건)",
                            batchNo, totalBatches, i + 1, end, insertedList.size());
                    dietDAO.insertFoodNutritionData(insertedList.subList(i, end));
                }
                log.info("[updateFoodNutritionData] INSERT 완료 - 총 {}건", insertedList.size());
            }
        } else {
            log.info("[updateFoodNutritionData] 변경 대상 데이터 없음");
        }
    }

    @Transactional
    @Override
    public void saveFoodRecipe(SaveFoodRecipeParam param) {
        //get userId from context
        int userId = AppUtil.getUserIdFromToken();

        //find default food
        DietFoodDto defaultFood = dietDAO.findFoodByFdCd(param.getFoodCode());

        Optional<UserFoodEntity> optionalUserFood = dietDAO.findUserFood(userId, param.getFoodCode());
        UserFoodEntity sqlParams = UserFoodEntity.builder()
                .usrId(userId)
                .fdCd(param.getFoodCode())
                .fdNm(param.getFoodName())
                .fdRcpDesc(param.getRecipeDescription())
                .build();

        if (optionalUserFood.isEmpty()) {
            // user have not changed this food, the food does not exist, we need to add a new food so the food name can't be null
            if (sqlParams.getFdNm() == null) {
                sqlParams.setFdNm(defaultFood.getName());
            }

            dietDAO.saveUserFood(sqlParams);
        } else {
            dietDAO.updateUserFood(sqlParams);
        }
    }

    @Override
    @Transactional
    public DietFoodDto createRecipe(SaveRecipeParam param) {
        int userId = AppUtil.getUserIdFromToken();

        validateRecipeParam(param);

        FoodEntity food = FoodEntity.builder()
                .fdNm(param.getName().trim())
                .fdTpCd(param.getTypeCode())
                .fdRcpDesc(param.getRecipeDescription())
                .ownUsrId(userId)
                .build();
        dietDAO.addUserRecipe(food);

        dietDAO.addRecipeMaterials(toRecipeMaterials(food.getFdCd(), param));
        dietDAO.upsertFoodNutritionByFdCd(food.getFdCd());

        // 소유 기록을 남겨야 My Recipe 목록과 식단 설계의 음식 검색(내 음식 그룹)에 노출된다
        dietDAO.saveUserFood(UserFoodEntity.builder()
                .usrId(userId)
                .fdCd(food.getFdCd())
                .fdNm(food.getFdNm())
                .fdRcpDesc(food.getFdRcpDesc())
                .build());

        return dietDAO.findFoodByFdCd(food.getFdCd());
    }

    @Override
    @Transactional
    public DietFoodDto updateRecipe(String fdCd, SaveRecipeParam param) {
        int userId = AppUtil.getUserIdFromToken();

        FoodEntity recipe = findOwnedRecipe(fdCd, userId);
        validateRecipeParam(param);

        recipe.setFdNm(param.getName().trim());
        recipe.setFdTpCd(param.getTypeCode());
        recipe.setFdRcpDesc(param.getRecipeDescription());
        dietDAO.updateUserRecipe(recipe);

        // 재료 구성은 통째로 교체한 뒤 집계 영양성분을 다시 계산한다
        dietDAO.deleteRecipeMaterials(fdCd);
        dietDAO.addRecipeMaterials(toRecipeMaterials(fdCd, param));
        dietDAO.upsertFoodNutritionByFdCd(fdCd);

        dietDAO.updateUserFood(UserFoodEntity.builder()
                .usrId(userId)
                .fdCd(fdCd)
                .fdNm(recipe.getFdNm())
                .fdRcpDesc(recipe.getFdRcpDesc())
                .build());

        return dietDAO.findFoodByFdCd(fdCd);
    }

    @Override
    @Transactional
    public void deleteRecipe(String fdCd) {
        int userId = AppUtil.getUserIdFromToken();

        findOwnedRecipe(fdCd, userId);

        // diet_tray_dtl_mgmt 의 FK 가 ON DELETE CASCADE 라, 사용 중인 레시피를 지우면
        // 저장된 식단에서 조용히 사라진다. 그래서 사용 중이면 삭제를 막는다.
        if (dietDAO.checkUserRecipeInUse(fdCd)) {
            throw new ValidationException(messageService.get("diet-rcp.in-use"));
        }

        // mst_fd_nutr 의 FK 에는 cascade 가 없어 먼저 지워야 한다.
        // tmpl_fd 와 usr_fd_mgmt 는 mst_fd 삭제 시 cascade 된다.
        dietDAO.deleteFoodNutrition(fdCd);
        dietDAO.deleteUserRecipe(fdCd, userId);
    }

    private FoodEntity findOwnedRecipe(String fdCd, int userId) {
        FoodEntity recipe = dietDAO.findUserRecipeByFdCd(fdCd)
                .orElseThrow(() -> new CustomNotFoundException(messageService.get("diet-rcp.not-found", fdCd)));

        if (!Integer.valueOf(userId).equals(recipe.getOwnUsrId())) {
            throw new CustomAuthorizationException(messageService.get("diet-rcp.forbidden"));
        }

        return recipe;
    }

    private void validateRecipeParam(SaveRecipeParam param) {
        validateFoodTypeCode(List.of(param.getTypeCode()));

        List<String> matCds = param.getMaterials().stream()
                .map(SaveRecipeMaterialParam::getCode)
                .toList();
        validateMaterialCode(matCds);

        List<String> duplicated = matCds.stream()
                .filter(code -> Collections.frequency(matCds, code) > 1)
                .distinct()
                .toList();
        if (!duplicated.isEmpty()) {
            throw new ValidationException(messageService.get("diet-rcp.mat-code.duplicated", duplicated.toString()));
        }
    }

    private List<TemplateFoodEntity> toRecipeMaterials(String fdCd, SaveRecipeParam param) {
        return param.getMaterials().stream()
                .map(mat -> TemplateFoodEntity.builder()
                        .tmplFdCd(fdCd)
                        .tmplMatCd(mat.getCode())
                        .tmplMatRcpWgt(BigDecimal.valueOf(mat.getRecipeWeight()))
                        .tmplMatCalcWgt(BigDecimal.valueOf(mat.getCalculationWeight() != null
                                ? mat.getCalculationWeight()
                                : mat.getRecipeWeight()))
                        .build())
                .collect(Collectors.toList());
    }


    @Override
    public List<DietAllergenDto> getAllAllergen() {
        return dietDAO.getAllAllergen();
    }

    /**
     * Validate foods with allergen to return all foods containing any of the allergens.
     * Each food must contain at least one material
     */
    @Override
    public List<CheckAllergenFoodDto> checkAllergenFood(CheckAllergenFoodParam param) {
        // if no allergens or no foods, nothing is invalid
        if (param.getExcludedAllergenIds() == null || param.getExcludedAllergenIds().isEmpty() ||
                param.getFoods() == null || param.getFoods().isEmpty()) {
            return Collections.emptyList();
        }

        // validate allergen
        validateAllergenId(param.getExcludedAllergenIds());

        // validate each food must contain at least one material.
        param.getFoods().forEach(food -> {
            // if food exists
            if (food.getCode() != null && !food.getCode().isEmpty()) {
                // but there's no materials inside
                if (food.getMaterials() == null || food.getMaterials().isEmpty()) {
                    throw new ValidationException(messageService.get("diet-mat.mat-list.not-empty"));
                }
            }

            // if the compartment contains no food, we allow it
        });

        // create sqlParams
        List<CheckAllergenFoodMaterialParam> materialList = new ArrayList<>();
        param.getFoods().forEach(food -> {
            // if food exists
            if (food.getCode() != null && !food.getCode().isEmpty()) {
                // get the materials inside and put them to the list
                food.getMaterials().forEach(material -> {
                    materialList.add(CheckAllergenFoodMaterialParam.builder()
                            .foodCode(food.getCode())
                            .materialCode(material.getCode())
                            .build());
                });
            }
        });

        // if the material list is empty, we don't have to validate anything
        if (materialList.isEmpty()) {
            return Collections.emptyList();
        }

        // otherwise we have to validate the list and return invalid results
        List<CheckAllergenFoodDto> invalidFoods = new ArrayList<>();
        invalidFoods.addAll(dietDAO.findAllergenMaterialCode(materialList, param.getExcludedAllergenIds()));

        return invalidFoods;
    }

    @Transactional
    @Override
    public void addExcludedAllergenToDiet(int dietId, List<Integer> excludedAllergenIds) {
        if (excludedAllergenIds != null) { // if not null, first delete all
            dietDAO.deleteDietAlrgMgmtByDietId(dietId);

            if (!excludedAllergenIds.isEmpty()) { // if not empty, we add new
                List<DietAllergenEntity> dietAllergens = excludedAllergenIds.stream()
                        .map(id -> DietAllergenEntity.builder()
                                .dietId(dietId)
                                .alrgId(id)
                                .build())
                        .collect(Collectors.toList());

                dietDAO.addNewDietAlrgMgmt(dietAllergens);
            }
        }
    }
}
