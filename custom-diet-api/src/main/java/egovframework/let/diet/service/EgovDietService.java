package egovframework.let.diet.service;

import java.util.List;

import egovframework.com.cmm.dto.CommonCodeDto;
import egovframework.com.cmm.dto.PagingWrapperDto;
import egovframework.let.diet.dto.CheckAllergenFoodDto;
import egovframework.let.diet.dto.DietAllergenDto;
import egovframework.let.diet.dto.DietCommonInfoDto;
import egovframework.let.diet.dto.DietDetailDto;
import egovframework.let.diet.dto.DietFoodConversionDto;
import egovframework.let.diet.dto.DietFoodDto;
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
import egovframework.let.diet.param.AddDietParam;
import egovframework.let.diet.param.AddFoodToTrayParam;
import egovframework.let.diet.dto.MyMaterialDto;
import egovframework.let.diet.param.AddMaterialMaterialParam;
import egovframework.let.diet.param.AddNutritionSummaryToDietParam;
import egovframework.let.diet.param.AddPriceToDietParam;
import egovframework.let.diet.param.CheckAllergenFoodParam;
import egovframework.let.diet.param.DietTrayParam;
import egovframework.let.diet.param.SaveExcludedAllergenToDietParam;
import egovframework.let.diet.param.SaveFoodRecipeParam;
import egovframework.let.diet.param.SaveRecipeParam;
import egovframework.let.diet.param.UpdateDietParam;
import egovframework.let.diet.param.UpdateMaterialNameParam;


public interface EgovDietService {
	//diets
	List<DietCommonInfoDto> findAllDiet();
	DietDetailDto findDietDetailById(int dietId);
	DietDetailDto addNewDiet(AddDietParam param);
	DietDetailDto updateDietById(int dietId, UpdateDietParam param);
	void modifyDietFavFlag(int dietId, String favFlag);
	void deleteDietById(int dietId);
	DietDetailDto addFoodToTray(int dietId, AddFoodToTrayParam param);
	DietDetailDto addPriceToDiet(int dietId, AddPriceToDietParam param);
	DietDetailDto recommendFoodByDietId(int dietId, int month);
	DietDetailDto saveExcludedAllergenToDiet(SaveExcludedAllergenToDietParam param);
	DietDetailDto removeAllergenFoodFromDiet(SaveExcludedAllergenToDietParam param);
	List<DietReportMonthlyPriceDto> findReportMonthlyPrice();
	List<DietReportNutrStandardCateDto> findReportNutrStandardCate();
	
	//standards
	List<DietStandardDto> findAllDietStandardTemplate(Integer dietId);

	//trays
	List<DietTrayDto> findAllTemplateTray();
	List<DietTrayDto> findAllUserTray(Integer dietId);
	DietTrayDto findUserTrayById(int trayId);
	DietTrayDto addNewUserTray(DietTrayParam param);
	DietTrayDto updateUserTrayById(int trayId, DietTrayParam param);
	void deleteUserTrayById(int trayId);
	List<CommonCodeDto> findAllRepresentativeTray(); 
	
	//foods
	DietFoodDto findFoodByFdCd(String fdCd);
	List<DietFoodDto> findAllFood(int limit, String keyword, String fdTpCd, List<Integer> excludedAllergenIds);
	PagingWrapperDto findAllFoodWithPaging(Integer page, Integer limit, String keyword, String fdTpCd, String matCd, List<Integer> excludedAllergenIds);
	PagingWrapperDto findMyFoodsWithPaging(Integer page, Integer limit, String keyword, String fdTpCd, String matCd);
	List<DietFoodDto> recommendFood(int limit, String fdCd, String fdTpCd, List<Integer> excludedAllergenIds, Integer dietId, String currentFoodCode, List<String> currentTrayFoods);
	DietFoodConversionDto findFoodConversionByFdCd(String fdCd);
	void saveFoodRecipe(SaveFoodRecipeParam param);
	DietFoodDto createRecipe(SaveRecipeParam param);
	DietFoodDto updateRecipe(String fdCd, SaveRecipeParam param);
	void deleteRecipe(String fdCd);
	
	//materials
	PagingWrapperDto findAllMaterialWithPaging(Integer page, Integer limit, String keyword, List<Integer> excludedAllergenIds);
	List<DietMaterialDto> findAllMaterial(String codeList, Integer representativeId, List<Integer> excludedAllergenIds);
	List<DietMaterialTypeDto> findMaterialType();
	List<DietMaterialCatDto> findMaterialCategory(String typeCode);
	List<DietMaterialRepDto> findMaterialRepresentative(Integer categoryId);
	DietMaterialDto addNewMaterial(AddMaterialMaterialParam param);

	//my materials
	PagingWrapperDto findMyMaterials(Integer page, Integer limit, String keyword);
	MyMaterialDto updateMyMaterialName(String matCd, UpdateMaterialNameParam param);
	void deleteMyMaterial(String matCd);
	
	//nutrients
	List<DietNutrientDto> findAllNutrient(String nutrCd);
	
	//default template
	void addDefaultUserTrayTemplate(int usrId);
	
	//nutrition summary
	List<DietNutritionSummaryDto> findDietNutritionSummary(int dietId);	

	byte[] exportDietToExcel(int dietId);
	
	byte[] exportDietsToExcel(List<Integer> dietIds);

	List<DietNutritionSummaryDto> addNutritionSummaryToDiet(int dietId, List<AddNutritionSummaryToDietParam> params);
	
	void updateFoodNutritionData();
	
	//allergens
	List<DietAllergenDto> getAllAllergen();
	List<CheckAllergenFoodDto> checkAllergenFood(CheckAllergenFoodParam param);
	void addExcludedAllergenToDiet(int dietId, List<Integer> excludedAllergenIds);
}
