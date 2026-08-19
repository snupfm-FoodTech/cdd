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
public class DietDetailDto {
	
	private Integer id;
	
	private Integer userId;

	private String name;
	
	private String description;
	
	private String favouriteFlag;
	
	private Double unitPrice;
	
    private Integer servingQuantity;
    
    private Integer adjustmentPercent;
    
    private Double finalPrice;
	
	private DietStandardDto standard;
	
    private List<DietAccessoryDto> accessories;
    
    private List<DietAllergenDto> allergens;
    
    private List<DietAllergenDto> excludedAllergens;
		
	private DietTrayDto tray;
}