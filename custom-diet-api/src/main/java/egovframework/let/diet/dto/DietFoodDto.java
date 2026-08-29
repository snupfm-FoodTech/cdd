package egovframework.let.diet.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class DietFoodDto {
	
	private Integer dietId;
	
	private Integer sequence;
    
	private String mandatoryFlag;
	
	private String separatedFlag;
	
	private Integer capacityVolume;
		
	private String typeCode;
	
	private String typeName;
	
	private String unitCode;
	
	private String unitName;
	
	private String code;
	
	private String name;
	
	private String recipeDescription;
	
	/** 사용자가 직접 만든 레시피이면 "Y" (수정/삭제 가능) */
	private String ownFlag;
	
	private List<DietAllergenDto> allergens;
	
	private List<DietMaterialDto> materials;

	private Integer totalRecordNo;

}
