package egovframework.let.diet.web;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.aop.authorization.Authorized;
import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.com.cmm.validation.annotation.NullOrNotBlank;
import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import egovframework.let.diet.dto.DietFoodDto;
import egovframework.let.diet.param.AddDietParam;
import egovframework.let.diet.param.AddFoodToTrayParam;
import egovframework.let.diet.param.AddMaterialMaterialParam;
import egovframework.let.diet.param.AddNutritionSummaryToDietParam;
import egovframework.let.diet.param.AddPriceToDietParam;
import egovframework.let.diet.param.CheckAllergenFoodParam;
import egovframework.let.diet.param.DietTrayParam;
import egovframework.let.diet.param.SaveExcludedAllergenToDietParam;
import egovframework.let.diet.param.SaveFoodRecipeParam;
import egovframework.let.diet.param.UpdateDietParam;
import egovframework.let.diet.param.UpdateMaterialNameParam;
import egovframework.let.diet.service.EgovDietService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/diets")
@RequiredArgsConstructor
@Validated
@SecurityRequirement(name = "bearerAuth")
public class EgovDietController {
	private final EgovDietService dietService;

	@Authorized
	@GetMapping
	public ResponseEntity<ResponseDto> findAllDiet() {
		return ResponseUtil.get(dietService.findAllDiet(), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/{dietId}")
	public ResponseEntity<ResponseDto> findDietDetailById(@PathVariable("dietId") int dietId) {
		return ResponseUtil.get(dietService.findDietDetailById(dietId), HttpStatus.OK);
	}

	@Authorized
	@PostMapping
	public ResponseEntity<ResponseDto> addNewDiet(@Valid @RequestBody AddDietParam param) {
		return ResponseUtil.get(dietService.addNewDiet(param), HttpStatus.CREATED);
	}

	@Authorized
	@PutMapping("/{dietId}")
	public ResponseEntity<ResponseDto> updateDietById(@PathVariable("dietId") int dietId,
			@Valid @RequestBody UpdateDietParam param) {
		return ResponseUtil.get(dietService.updateDietById(dietId, param), HttpStatus.OK);
	}

	@Authorized
	@PutMapping("/{dietId}/favourite-flag/{favFlag}")
	public ResponseEntity<ResponseDto> modifyDietFavFlag(@PathVariable("dietId") int dietId,
			@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}") @PathVariable("favFlag") String favFlag) {
		
		dietService.modifyDietFavFlag(dietId, favFlag);
		return ResponseUtil.get("OK", HttpStatus.OK);
	}

	@Authorized
	@PostMapping("/{dietId}/add-food-to-tray")
	public ResponseEntity<ResponseDto> addFoodToTray(@PathVariable("dietId") int dietId,
			@Valid @RequestBody AddFoodToTrayParam param) {
		return ResponseUtil.get(dietService.addFoodToTray(dietId, param), HttpStatus.CREATED);
	}

	@Authorized
	@PostMapping("/{dietId}/add-price")
	public ResponseEntity<ResponseDto> addPriceToDiet(@PathVariable("dietId") int dietId,
			@Valid @RequestBody AddPriceToDietParam param) {
		return ResponseUtil.get(dietService.addPriceToDiet(dietId, param), HttpStatus.CREATED);
	}
	
	@Authorized
	@PostMapping("/{dietId}/recommend-food")
	public ResponseEntity<ResponseDto> recommendFoodByDietId(
			@PathVariable("dietId") int dietId,
			@RequestParam(name = "month", required = false) Integer month
			) {
		if (month == null) {
			month = LocalDateTime.now().getMonthValue();
		}
		return ResponseUtil.get(dietService.recommendFoodByDietId(dietId, month), HttpStatus.OK);
	}
	
	@Authorized
	@PostMapping("/{dietId}/save-excluded-allergen")
	public ResponseEntity<ResponseDto> saveExcludedAllergenToDiet(
			@PathVariable("dietId") int dietId,
			@Valid @RequestBody SaveExcludedAllergenToDietParam param
			) {
		param.setDietId(dietId);
		
		return ResponseUtil.get(dietService.saveExcludedAllergenToDiet(param), HttpStatus.OK);
	}

	@Authorized
	@DeleteMapping("/{dietId}")
	public ResponseEntity<ResponseDto> deleteDietById(@PathVariable("dietId") int dietId) {
		dietService.deleteDietById(dietId);
		return ResponseUtil.get("DELETED", HttpStatus.NO_CONTENT);
	}

	@Authorized
	@GetMapping("/standard-template")
	public ResponseEntity<ResponseDto> findAllDietStandardTemplate(
			@RequestParam(name = "dietId", required = false) Integer dietId) {
		return ResponseUtil.get(dietService.findAllDietStandardTemplate(dietId), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/tray-template/{trayId}")
	public ResponseEntity<ResponseDto> findUserTrayById(@PathVariable("trayId") int trayId) {
		return ResponseUtil.get(dietService.findUserTrayById(trayId), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/template-trays")
	public ResponseEntity<ResponseDto> findAllTemplateTray() {
		return ResponseUtil.get(dietService.findAllTemplateTray(), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/tray-template")
	public ResponseEntity<ResponseDto> findAllUserTray(
			@NullOrPositiveNo(fieldName = "dietId") @RequestParam(required = false, name = "dietId") Integer dietId) {
		return ResponseUtil.get(dietService.findAllUserTray(dietId), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/representative-tray-template")
	public ResponseEntity<ResponseDto> findAllRepresentativeTray() {
		return ResponseUtil.get(dietService.findAllRepresentativeTray(), HttpStatus.OK);
	}

	@Authorized
	@PostMapping("/tray-template")
	public ResponseEntity<ResponseDto> addNewUserTray(@Valid @RequestBody DietTrayParam param) {
		return ResponseUtil.get(dietService.addNewUserTray(param), HttpStatus.CREATED);
	}

	@Authorized
	@PutMapping("/tray-template/{trayId}")
	public ResponseEntity<ResponseDto> updateUserTrayById(@PathVariable("trayId") int trayId,
			@Valid @RequestBody DietTrayParam param) {
		return ResponseUtil.get(dietService.updateUserTrayById(trayId, param), HttpStatus.OK);
	}

	@Authorized
	@DeleteMapping("/tray-template/{trayId}")
	public ResponseEntity<ResponseDto> deleteUserTrayById(@PathVariable("trayId") int trayId) {
		dietService.deleteUserTrayById(trayId);
		return ResponseUtil.get("OK", HttpStatus.NO_CONTENT);
	}

	@Authorized
	@GetMapping("/foods/{fdCd}")
	public ResponseEntity<ResponseDto> findFoodByFdCd(
			@PathVariable(name = "fdCd") String fdCd,
			@RequestParam(name = "foodName", required = false) String fdNm
		) {
		DietFoodDto food = dietService.findFoodByFdCd(fdCd);
		if (fdNm != null && !fdNm.isBlank()) {
			food.setName(fdNm);
		}
		
		return ResponseUtil.get(food, HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/foods")
	public ResponseEntity<ResponseDto> findAllFood(
			@Positive(message = "{limit.positive}") @RequestParam(required = true, name = "limit", defaultValue = "20") int limit,
			@NullOrNotBlank(fieldName = "keyword") @RequestParam(required = false, name = "keyword") String keyword,
			@NullOrNotBlank(fieldName = "fdTpCd") @RequestParam(required = false, name = "fdTpCd") String fdTpCd,
			@RequestParam(required = false, name = "excludedAllergenIds") List<Integer> excludedAllergenIds
			) {
		return ResponseUtil.get(dietService.findAllFood(limit, keyword, fdTpCd, excludedAllergenIds), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/foods/recommend")
	public ResponseEntity<ResponseDto> recommendFood(
			@Positive(message = "{limit.positive}") @RequestParam(required = true, name = "limit", defaultValue = "6") int limit,
			@NullOrNotBlank(fieldName = "foodCode") @RequestParam(required = false, name = "foodCode") String fdCd,
			@NullOrNotBlank(fieldName = "fdTpCd") @RequestParam(required = false, name = "fdTpCd") String fdTpCd,
			@RequestParam(required = false, name = "excludedAllergenIds") List<Integer> excludedAllergenIds,
			@NullOrPositiveNo(fieldName = "dietId") @RequestParam(required = false, name = "dietId") Integer dietId,
			@NullOrNotBlank(fieldName = "currentFoodCode") @RequestParam(required = false, name = "currentFoodCode") String currentFoodCode,
			@RequestParam(required = false, name = "currentTrayFoods") List<String> currentTrayFoods) {
		return ResponseUtil.get(dietService.recommendFood(limit, fdCd, fdTpCd, excludedAllergenIds, dietId, currentFoodCode, currentTrayFoods), HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/foods/{fdCd}/conversion")
	public ResponseEntity<ResponseDto> findFoodConversionByFdCd(@PathVariable("fdCd") String fdCd) {
		return ResponseUtil.get(dietService.findFoodConversionByFdCd(fdCd), HttpStatus.OK);
	}
	
	@Authorized
	@PostMapping("/foods/save-recipe")
	public ResponseEntity<ResponseDto> saveFoodRecipe(@Valid @RequestBody SaveFoodRecipeParam param) {
		dietService.saveFoodRecipe(param);
		return ResponseUtil.get("OK", HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/materials/paging")
	public ResponseEntity<ResponseDto> findAllMaterialPaging(
			@Positive(message = "{page.positive}") @NotNull(message = "{page.positive}")
			@RequestParam(required = true, name = "page") Integer page,
			@Positive(message = "{limit.positive}") @NotNull(message = "{limit.positive}")
			@RequestParam(required = true, name = "limit") Integer limit,
			@RequestParam(required = false, name = "keyword") String keyword,
			@RequestParam(required = false, name = "excludedAllergenIds") List<Integer> excludedAllergenIds) {
		return ResponseUtil.get(dietService.findAllMaterialWithPaging(page, limit, keyword, excludedAllergenIds), HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/materials")
	public ResponseEntity<ResponseDto> findAllMaterial(
			@NullOrNotBlank(fieldName = "codeList") @RequestParam(required = false, name = "codeList") String codeList,
			@NullOrPositiveNo(fieldName = "representativeId") @RequestParam(required = false, name = "representativeId") Integer representativeId,
			@RequestParam(required = false, name = "excludedAllergenIds") List<Integer> excludedAllergenIds
			) {
		return ResponseUtil.get(dietService.findAllMaterial(codeList, representativeId, excludedAllergenIds), HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/materials/type")
	public ResponseEntity<ResponseDto> findMaterialType() {
		return ResponseUtil.get(dietService.findMaterialType(), HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/materials/category")
	public ResponseEntity<ResponseDto> findMaterialCategory(
			@NullOrNotBlank(fieldName = "typeCode") @RequestParam(required = false, name = "typeCode") String typeCode
			) {
		return ResponseUtil.get(dietService.findMaterialCategory(typeCode), HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/materials/representative")
	public ResponseEntity<ResponseDto> findMaterialRepresentative(
			@NullOrPositiveNo(fieldName = "categoryId") @RequestParam(required = false, name = "categoryId") Integer categoryId
			) {
		return ResponseUtil.get(dietService.findMaterialRepresentative(categoryId), HttpStatus.OK);
	}
	
	@Authorized
	@PostMapping("/materials")
	public ResponseEntity<ResponseDto> addNewMaterial(@Valid @RequestBody AddMaterialMaterialParam param) {
		return ResponseUtil.get(dietService.addNewMaterial(param), HttpStatus.CREATED);
	}
	
	@Authorized
	@GetMapping("/nutrients")
	public ResponseEntity<ResponseDto> findAllNutrient(@RequestParam(required = false, name = "nutrCd") String nutrCd) {
		return ResponseUtil.get(dietService.findAllNutrient(nutrCd), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/{dietId}/nutrition-summary")
	public ResponseEntity<ResponseDto> findDietNutritionSummary(@PathVariable("dietId") int dietId) {
		return ResponseUtil.get(dietService.findDietNutritionSummary(dietId), HttpStatus.CREATED);
	}

	@Authorized
	@PostMapping("/{dietId}/nutrition-summary")
	public ResponseEntity<ResponseDto> addNutritionSummaryToDiet(@PathVariable("dietId") int dietId,
			@Valid @RequestBody List<AddNutritionSummaryToDietParam> params) {
		return ResponseUtil.get(dietService.addNutritionSummaryToDiet(dietId, params), HttpStatus.CREATED);
	}
	
	@Authorized
	@GetMapping("/reports/monthly-price")
	public ResponseEntity<ResponseDto> findReportMonthlyPrice() {
		return ResponseUtil.get(dietService.findReportMonthlyPrice(), HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/reports/nutrition-standard-category")
	public ResponseEntity<ResponseDto> findReportNutrStandardCate() {
		return ResponseUtil.get(dietService.findReportNutrStandardCate(), HttpStatus.OK);
	}
	
	@Authorized
	@PostMapping("/update-food-nutrition-data")
	public ResponseEntity<ResponseDto> updateFoodNutritionData() {
		dietService.updateFoodNutritionData();
		return ResponseUtil.get("OK", HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/allergens")
	public ResponseEntity<ResponseDto> getAllAllergen() {
		return ResponseUtil.get(dietService.getAllAllergen(), HttpStatus.OK);
	}
	
	@Authorized
	@PostMapping("/allergens/check-food")
	public ResponseEntity<ResponseDto> checkAllergenFood(
				@Valid @RequestBody CheckAllergenFoodParam param
			) {
		return ResponseUtil.get(dietService.checkAllergenFood(param), HttpStatus.OK);
	}

	@Authorized
	@GetMapping("/my-materials")
	public ResponseEntity<ResponseDto> findMyMaterials(
			@Positive(message = "{page.positive}") @NotNull(message = "{page.positive}")
			@RequestParam(required = true, name = "page") Integer page,
			@Positive(message = "{limit.positive}") @NotNull(message = "{limit.positive}")
			@RequestParam(required = true, name = "limit") Integer limit,
			@RequestParam(required = false, name = "keyword") String keyword) {
		return ResponseUtil.get(dietService.findMyMaterials(page, limit, keyword), HttpStatus.OK);
	}

	@Authorized
	@PutMapping("/my-materials/{matCd}")
	public ResponseEntity<ResponseDto> updateMyMaterialName(
			@PathVariable("matCd") String matCd,
			@Valid @RequestBody UpdateMaterialNameParam param) {
		return ResponseUtil.get(dietService.updateMyMaterialName(matCd, param), HttpStatus.OK);
	}

	@Authorized
	@DeleteMapping("/my-materials/{matCd}")
	public ResponseEntity<ResponseDto> deleteMyMaterial(@PathVariable("matCd") String matCd) {
		dietService.deleteMyMaterial(matCd);
		return ResponseUtil.get("DELETED", HttpStatus.NO_CONTENT);
	}
}
