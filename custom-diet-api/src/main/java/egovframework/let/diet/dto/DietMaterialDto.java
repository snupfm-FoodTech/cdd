package egovframework.let.diet.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DietMaterialDto {
	
	private String code;
	
	private String name;
	
	private String originalCode;
	
	private String unitCode;
	
	private String unitName;
	    
	private Double recipeWeight;
    
	private Double calculationWeight;
	
	private Integer price;
	
	private String receiptIncludeFlag;
	
	private List<DietMaterialGeoDto> geos;
	
	private String eyeReferenceName;
	
	private String eyeReferenceUnitName;
	
	private Integer eyeReferenceWeight;
	
	private Integer categoryId;
	
	private String categoryName;
		
	private List<DietNutrientDto> nutrients;
	
	private Integer totalRecordNo;
	
	private List<DietAllergenDto> allergens;
}