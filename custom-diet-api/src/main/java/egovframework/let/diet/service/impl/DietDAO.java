package egovframework.let.diet.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.aop.audit.Audited;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.diet.dto.CheckAllergenFoodDto;
import egovframework.let.diet.dto.CustomRecFoodDto;
import egovframework.let.diet.dto.DietAllergenDto;
import egovframework.let.diet.dto.DietCommonInfoDto;
import egovframework.let.diet.dto.DietDetailDto;
import egovframework.let.diet.dto.DietFoodConversionDto;
import egovframework.let.diet.dto.DietFoodDto;
import egovframework.let.diet.dto.DietFoodNutritionDto;
import egovframework.let.diet.dto.DietMaterialCatDto;
import egovframework.let.diet.dto.DietMaterialDto;
import egovframework.let.diet.dto.DietMaterialRepDto;
import egovframework.let.diet.dto.DietMaterialTypeDto;
import egovframework.let.diet.dto.DietNutrientDto;
import egovframework.let.diet.dto.DietNutritionSummaryDto;
import egovframework.let.diet.dto.DietReportMonthlyPriceDto;
import egovframework.let.diet.dto.DietReportNutrStandardCateDto;
import egovframework.let.diet.dto.DietStandardDto;
import egovframework.let.diet.dto.DietTrayDto;
import egovframework.let.diet.entity.DietAccessoryEntity;
import egovframework.let.diet.entity.DietAllergenEntity;
import egovframework.let.diet.entity.DietEntity;
import egovframework.let.diet.entity.DietFoodDetailEntity;
import egovframework.let.diet.entity.DietNutritionSummaryEntity;
import egovframework.let.diet.entity.DietReceiptEntity;
import egovframework.let.diet.entity.DietStandardDetailEntity;
import egovframework.let.diet.entity.DietTrayDetailEntity;
import egovframework.let.diet.entity.MaterialEntity;
import egovframework.let.diet.entity.TemplateMaterialEntity;
import egovframework.let.diet.entity.FoodEntity;
import egovframework.let.diet.entity.TemplateFoodEntity;
import egovframework.let.diet.entity.UserFoodEntity;
import egovframework.let.diet.entity.UserTrayDetailEntity;
import egovframework.let.diet.entity.UserTrayEntity;
import egovframework.let.diet.dto.MyMaterialDto;
import egovframework.let.diet.param.CheckAllergenFoodMaterialParam;
import egovframework.let.diet.param.FindAllDietParam;
import egovframework.let.diet.param.FindAllFoodParam;
import egovframework.let.diet.param.FindAllMaterialParam;
import egovframework.let.diet.param.FindMyFoodsParam;
import egovframework.let.diet.param.FindMyMaterialsParam;


@Repository
public class DietDAO extends EgovAbstractMapper {
	
	public Integer findUserIdByDietId(int dietId) {
		return selectOne("DietDAO.findUserIdByDietId", dietId);
	}
	
	public Integer findUserIdByTrayId(int trayId) {
		return selectOne("DietDAO.findUserIdByTrayId", trayId);
	}
	
	//diets
	public List<DietCommonInfoDto> findAllDietMgmt(FindAllDietParam param){
		return selectList("DietDAO.findAllDietMgmt", param);
	}
	
	public Optional<DietDetailDto> findDietDetailById(int dietId) {
		return Optional.ofNullable(selectOne("DietDAO.findDietDetailById", dietId));
	}
		
	public List<DietFoodDto> findDietTrayDtlMgmtById(int dietId) {
		return selectList("DietDAO.findDietTrayDtlMgmtById", dietId);
	}
	
	public List<DietReportMonthlyPriceDto> findReportMonthlyPrice(int usrId) {
		return selectList("DietDAO.findReportMonthlyPrice", usrId);
	}
	
	public List<DietReportNutrStandardCateDto> findReportNutrStandardCate(int usrId) {
		return selectList("DietDAO.findReportNutrStandardCate", usrId);
	}
	
	@Audited
	public void addNewDietMgmt(DietEntity entity) {
		insert("DietDAO.addNewDietMgmt", entity);
	}
	
	@Audited
	public void addNewDietStdDtlMgmt(List<DietStandardDetailEntity> nutrients) {
		insert("DietDAO.addNewDietStdDtlMgmt", nutrients);
	}
	
	@Audited
	public void addNewTrayDtlMgmt(List<DietTrayDetailEntity> foods) {
		insert("DietDAO.addNewTrayDtlMgmt", foods);
	}
	
	@Audited
	public void updateTrayDtlMgmt(List<DietTrayDetailEntity> foods) {
		update("DietDAO.updateTrayDtlMgmt", foods);
	}
	
	@Audited
	public void updateFoodDtlMgmt(List<DietFoodDetailEntity> materials) {
		update("DietDAO.updateFoodDtlMgmt", materials);
	}
	
	public void deleteDietFdDtlMgmtByDietId(int dietId) {
		delete("DietDAO.deleteDietFdDtlMgmtByDietId", dietId);
	}
	
	public void deleteMaterialFromDietByFoodSeq(List<DietTrayDetailEntity> entities) {
		delete("DietDAO.deleteMaterialFromDietByFoodSeq", entities);
	}
	
	@Audited
	public void clearFoodOnTrayDtlMgmtByDietId(int dietId) {
		update("DietDAO.clearFoodOnTrayDtlMgmtByDietId", dietId);
	}
	
	@Audited
	public void addNewDietFdDtlMgmt(List<DietFoodDetailEntity> materials) {
		insert("DietDAO.addNewDietFdDtlMgmt", materials);
	}
	
	@Audited
	public void updateDietMgmt(DietEntity entity) {
		update("DietDAO.updateDietMgmt", entity);
	}
	
	public void deleteDietStdDtlMgmtByDietId(int dietId) {
		delete("DietDAO.deleteDietStdDtlMgmtByDietId", dietId);
	}
	
	public void deleteDietTrayDtlMgmtByDietId(int dietId) {
		delete("DietDAO.deleteDietTrayDtlMgmtByDietId", dietId);
	}
	
	public void removeFoodFromDiet(List<DietTrayDetailEntity> entities) {
		update("DietDAO.removeFoodFromDiet", entities);
	}
	
	public void deleteDietMgmt(int dietId) {
		delete("DietDAO.deleteDietMgmt", dietId);
	}
	
	public Optional<DietReceiptEntity> findDietReceiptByDietId(int dietId) {
		return Optional.ofNullable(selectOne("DietDAO.findDietReceiptByDietId", dietId));
	}
	
	@Audited
	public void insertDietReceipt(DietReceiptEntity entity) {
		insert("DietDAO.insertDietReceipt", entity);
	}
	
	@Audited
	public void updateDietReceipt(DietReceiptEntity entity) {
		update("DietDAO.updateDietReceipt", entity);
	}
	
	public void deleteDietReceiptByDietId(int dietId) {
		delete("DietDAO.deleteDietReceiptByDietId", dietId);
	}
		
	//standards
	public List<DietStandardDto> findAllDietStandardTemplate(Integer dietId, String usrStdCd) {
		Map<String, Object> param = new HashMap<>();
		param.put("dietId", dietId);
		param.put("usrStdCd", usrStdCd);
		return selectList("DietDAO.findAllDietStandardTemplate", param);
	}
	
	public Optional<DietStandardDto> findDietStandardTemplateByCode(String code) {
		return Optional.ofNullable(selectOne("DietDAO.findDietStandardTemplateByCode", code));
	}
	
	
	//trays
	public List<DietTrayDto> findAllTemplateTray() {
		return selectList("DietDAO.findAllTemplateTray");
	}

	public List<DietTrayDto> findAllUserTrayTemplate(int usrId, Integer dietId) {
		Map<String, Object> param = new HashMap<>();
		param.put("usrId", usrId);
		param.put("dietId", dietId);
		return selectList("DietDAO.findAllUserTrayTemplate", param);
	}
	
	public Optional<DietTrayDto> findUserTrayTemplateById(int trayId) {
		return Optional.ofNullable(selectOne("DietDAO.findUserTrayTemplateById", trayId));
	}
	
	public Optional<DietTrayDto> findUserTrayByName(int usrId, String trayNm){
		Map<String, Object> param = new HashMap<>();
		param.put("usrId", usrId);
		param.put("trayNm", trayNm);
		return Optional.ofNullable(selectOne("DietDAO.findUserTrayByName", param));
	}
	
	@Audited
	public int addNewUserTray(UserTrayEntity tray) {
		return update("DietDAO.addNewUserTray", tray);
	}
	
	@Audited
	public void addNewUserTrayDetail(List<UserTrayDetailEntity> foods) {
		update("DietDAO.addNewUserTrayDetail", foods);
	}
	
	@Audited
	public void updateDietTrayTemplate(UserTrayEntity tray) {
		update("DietDAO.updateDietTrayTemplate", tray);
	}
	
	public void deleteFoodsFromTray(int trayId) {
		delete("DietDAO.deleteFoodsFromTray", trayId);
	}
	
	public void deleteTrayById(int trayId) {
		delete("DietDAO.deleteTrayById", trayId);
	}
	
	//foods
	public DietFoodDto findFoodByFdCd(String fdCd) {
		Map<String, Object> param = new HashMap<>();
		param.put("usrId", AppUtil.getUserIdFromToken());
		param.put("fdCd", fdCd);
		return selectOne("DietDAO.findFoodByFdCd", param);
	}
	
	public List<DietFoodDto> findAllFood(int limit, String keyword, String fdTpCd, List<Integer> excludedAllergenIds) {
		Map<String, Object> param = new HashMap<>();
		param.put("limit", limit);
		param.put("keyword", keyword);
		param.put("fdTpCd", fdTpCd);
		param.put("excludedAllergenIds", excludedAllergenIds);
		param.put("usrId", AppUtil.getUserIdFromToken());
		
		return selectList("DietDAO.findAllFood", param);
	}

	public List<DietFoodDto> findAllFoodWithPaging(FindAllFoodParam param) {
		Map<String, Object> sqlParams = new HashMap<>();
		sqlParams.put("offset", param.getOffset());
		sqlParams.put("limit", param.getLimit());
		sqlParams.put("keyword", param.getKeyword());
		sqlParams.put("fdTpCd", param.getFdTpCd());
		sqlParams.put("matCd", param.getMatCd());
		sqlParams.put("excludedAllergenIds", param.getExcludedAllergenIds());

		return selectList("DietDAO.findAllFoodWithPaging", sqlParams);
	}

	public List<DietFoodDto> findMyFoodsWithPaging(FindMyFoodsParam param) {
		Map<String, Object> sqlParams = new HashMap<>();
		sqlParams.put("offset", param.getOffset());
		sqlParams.put("limit", param.getLimit());
		sqlParams.put("keyword", param.getKeyword());
		sqlParams.put("fdTpCd", param.getFdTpCd());
		sqlParams.put("matCd", param.getMatCd());
		sqlParams.put("usrId", param.getUsrId());

		return selectList("DietDAO.findMyFoodsWithPaging", sqlParams);
	}

	public List<DietFoodDto> recommendFood(int limit, String fdCd, String fdTpCd, List<String> excludedFdCds, List<Integer> excludedAllergenIds) {
		Map<String, Object> param = new HashMap<>();
		param.put("limit", limit);
		param.put("fdCd", fdCd);
		param.put("fdTpCd", fdTpCd);
		param.put("excludedFdCds", excludedFdCds);
		param.put("excludedAllergenIds", excludedAllergenIds);
		return selectList("DietDAO.recommendFood", param);
	}

	public List<DietFoodDto> recommendFoodByTypeCode(int limit, String fdTpCd, List<String> excludedFdCds, List<Integer> excludedAllergenIds) {
		Map<String, Object> param = new HashMap<>();
		param.put("limit", limit);
		param.put("fdTpCd", fdTpCd);
		param.put("excludedFdCds", excludedFdCds);
		param.put("excludedAllergenIds", excludedAllergenIds);
		return selectList("DietDAO.recommendFoodByTypeCode", param);
	}

	public String findFdTpCdByFdCd(String fdCd) {
		Map<String, Object> param = new HashMap<>();
		param.put("fdCd", fdCd);
		return selectOne("DietDAO.findFdTpCdByFdCd", param);
	}

	public List<Map<String, Object>> findDietStandardDetail(int dietId) {
		Map<String, Object> param = new HashMap<>();
		param.put("dietId", dietId);
		return selectList("DietDAO.findDietStandardDetail", param);
	}

	public List<Map<String, Object>> findFoodNutrByFdCds(List<String> fdCds) {
		return selectList("DietDAO.findFoodNutrByFdCds", fdCds);
	}

	public List<Map<String, Object>> findDietTrayFoods(int dietId) {
		Map<String, Object> param = new HashMap<>();
		param.put("dietId", dietId);
		return selectList("DietDAO.findDietTrayFoods", param);
	}

	public int findEmptySlotCount(int dietId) {
		Map<String, Object> param = new HashMap<>();
		param.put("dietId", dietId);
		return selectOne("DietDAO.findEmptySlotCount", param);
	}

	public List<String> checkInvalidFdTpCd(List<String> codeList) {
		return selectList("DietDAO.checkInvalidFdTpCd", codeList);
	}
	
	public List<String> checkInvalidFdCd(List<String> codeList) {
		return selectList("DietDAO.checkInvalidFdCd", codeList);
	}
	
	public List<DietFoodDto> findDefaultRecFood(String trayNm,String stdCd, int month) {
		Map<String, Object> param = new HashMap<>();
		param.put("trayNm", trayNm);
		param.put("stdCd", stdCd);
		param.put("month", month);
		param.put("usrId", AppUtil.getUserIdFromToken());
		return selectList("DietDAO.findDefaultRecFood", param);
	}
	
	public List<DietFoodDto> findCustomRecFood(String standardCode, List<CustomRecFoodDto> list, String ratio, List<Integer> excludedAllergenIds) {
		Map<String, Object> param = new HashMap<>();
		param.put("standardCode", standardCode);
		param.put("list", list);
		param.put("ratio", ratio);
		param.put("usrId", AppUtil.getUserIdFromToken());
		param.put("excludedAllergenIds", excludedAllergenIds);
		return selectList("DietDAO.findCustomRecFood", param);
	}
	
	public DietFoodConversionDto findFoodConversionByFdCd(String fdCd) {
		return selectOne("DietDAO.findFoodConversionByFdCd", fdCd);
	}

	
	public Optional<UserFoodEntity> findUserFood(int usrId, String fdCd){
		Map<String, Object> param = new HashMap<>();
		param.put("usrId", usrId);
		param.put("fdCd", fdCd);
		return Optional.ofNullable(selectOne("DietDAO.findUserFood", param));
	};
	
	@Audited
	public void saveUserFood(UserFoodEntity entity){
		insert("DietDAO.saveUserFood", entity);
	};
	
	@Audited
	public void updateUserFood(UserFoodEntity entity){
		update("DietDAO.updateUserFood", entity);
	};


	//user recipes (사용자가 재료까지 직접 구성해 만든 음식)
	public void addUserRecipe(FoodEntity entity) {
		insert("DietDAO.addUserRecipe", entity);
	}

	public Optional<FoodEntity> findUserRecipeByFdCd(String fdCd) {
		return Optional.ofNullable(selectOne("DietDAO.findUserRecipeByFdCd", fdCd));
	}

	public void updateUserRecipe(FoodEntity entity) {
		update("DietDAO.updateUserRecipe", entity);
	}

	public void deleteUserRecipe(String fdCd, int ownUsrId) {
		Map<String, Object> param = new HashMap<>();
		param.put("fdCd", fdCd);
		param.put("ownUsrId", ownUsrId);
		delete("DietDAO.deleteUserRecipe", param);
	}

	public boolean checkUserRecipeInUse(String fdCd) {
		return selectOne("DietDAO.checkUserRecipeInUse", fdCd);
	}

	public void addRecipeMaterials(List<TemplateFoodEntity> materials) {
		insert("DietDAO.addRecipeMaterials", materials);
	}

	public void deleteRecipeMaterials(String fdCd) {
		delete("DietDAO.deleteRecipeMaterials", fdCd);
	}

	public void deleteFoodNutrition(String fdCd) {
		delete("DietDAO.deleteFoodNutrition", fdCd);
	}

	public void deleteUserFood(int usrId, String fdCd) {
		Map<String, Object> param = new HashMap<>();
		param.put("usrId", usrId);
		param.put("fdCd", fdCd);
		delete("DietDAO.deleteUserFood", param);
	}

	public void upsertFoodNutritionByFdCd(String fdCd) {
		insert("DietDAO.upsertFoodNutritionByFdCd", fdCd);
	}

	//materials	
	public List<DietMaterialDto> findAllMaterial(FindAllMaterialParam param) {
		Map<String, Object> sqlParams = new HashMap<>();
		sqlParams.put("offset", param.getOffset());
		sqlParams.put("limit", param.getLimit());
		sqlParams.put("keyword", param.getKeyword());
		sqlParams.put("matCdList", param.getMatCdList());
		sqlParams.put("representativeId", param.getRepresentativeId());
		sqlParams.put("excludedAllergenIds", param.getExcludedAllergenIds());
		
		return selectList("DietDAO.findAllMaterial", sqlParams);
	}
	
	public List<DietMaterialTypeDto> findMaterialType() {
		return selectList("DietDAO.findMaterialType");
	}
	
	public List<DietMaterialCatDto> findMaterialCategory(String typeCode) {
		return selectList("DietDAO.findMaterialCategory", typeCode);
	}
	
	public List<DietMaterialRepDto> findMaterialRepresentative(Integer categoryId) {
		return selectList("DietDAO.findMaterialRepresentative", categoryId);
	}
	
	public List<String> checkInvalidMatCd(List<String> codeList) {
		return selectList("DietDAO.checkInvalidMatCd", codeList);
	}
	
	@Audited
	public void addNewMaterial(MaterialEntity mat) {
		insert("DietDAO.addNewMaterial", mat);
	}
	
	@Audited
	public void addNewTemplateMaterial(List<TemplateMaterialEntity> entities) {
		insert("DietDAO.addNewTemplateMaterial", entities);
	}

	public List<MyMaterialDto> findMyMaterials(FindMyMaterialsParam param) {
		return selectList("DietDAO.findMyMaterials", param);
	}

	@Audited
	public void updateMaterialName(MaterialEntity entity) {
		update("DietDAO.updateMaterialName", entity);
	}

	public boolean checkMaterialInUse(MaterialEntity entity) {
		Boolean result = selectOne("DietDAO.checkMaterialInUse", entity);
		return result != null && result;
	}

	public void deleteTemplateMaterial(MaterialEntity entity) {
		delete("DietDAO.deleteTemplateMaterial", entity);
	}

	public void deleteMaterial(MaterialEntity entity) {
		delete("DietDAO.deleteMaterial", entity);
	}
		
	//nutrients
	public List<DietNutrientDto> findAllNutrient(String nutrCd) {
		return selectList("DietDAO.findAllNutrient", nutrCd);
	}
	
	// default tray templates
	public void addDefaultUserTray(int usrId) {
		insert("DietDAO.addDefaultUserTray", usrId);
	}
	
	public void addDefaultUserTrayDetail(int usrId) {
		insert("DietDAO.addDefaultUserTrayDetail", usrId);
	}
	
	public List<String> checkInvalidNutrCd(List<String> codeList) {
		return selectList("DietDAO.checkInvalidNutrCd", codeList);
	}
	
	public List<Integer> checkInvalidAllergenId(List<Integer> ids) {
		return selectList("DietDAO.checkInvalidAllergenId", ids);
	}
	
	//accessories
	@Audited
	public void addDietAccessory(List<DietAccessoryEntity> accessories) {
		insert("DietDAO.addDietAccessory", accessories);
	}
	
	public void deleteDietAccessoryByDietId(int dietId) {
		delete("DietDAO.deleteDietAccessoryByDietId", dietId);
	}
	
	//nutrition summary
	public List<DietNutritionSummaryDto> findDietNutritionSummary(int dietId) {
		return selectList("DietDAO.findDietNutritionSummary", dietId);
	}
	
	@Audited
	public void addDietNutritionSummary(List<DietNutritionSummaryEntity> entities) {
		insert("DietDAO.addDietNutritionSummary", entities);
	}
	
	public void deleteDietNutritionSummaryByDietId(int dietId) {
		delete("DietDAO.deleteDietNutritionSummaryByDietId", dietId);
	}
	
	public List<DietFoodNutritionDto> findFoodNutritionDataForUpsert() {
		return selectList("DietDAO.findFoodNutritionDataForUpsert");
	}
	
	public void updateFoodNutritionData(List<DietFoodNutritionDto> list) {
		update("DietDAO.updateFoodNutritionData", list);
	}
	
	public void insertFoodNutritionData(List<DietFoodNutritionDto> list) {
		update("DietDAO.insertFoodNutritionData", list);
	}
	
	// allergens
	public List<DietAllergenDto> getAllAllergen() {
		return selectList("DietDAO.getAllAllergen");
	}
	
	public List<DietAllergenDto> getAllAllergenByDiet(int dietId) {
		return selectList("DietDAO.getAllAllergenByDiet", dietId);
	}
	
	@Audited
	public void addNewDietAlrgMgmt(List<DietAllergenEntity> entities) {
		insert("DietDAO.addNewDietAlrgMgmt", entities);
	}
	
	public void deleteDietAlrgMgmtByDietId(int dietId) {
		delete("DietDAO.deleteDietAlrgMgmtByDietId", dietId);
	}
	
	public List<CheckAllergenFoodDto> findAllergenMaterialCode(List<CheckAllergenFoodMaterialParam> materialList, List<Integer> excludedAllergenIds) {
		Map<String, Object> sqlParams = new HashMap<>();
		sqlParams.put("materialList", materialList);
		sqlParams.put("excludedAllergenIds", excludedAllergenIds);
		
		return selectList("DietDAO.findAllergenMaterialCode", sqlParams);
	}
}
