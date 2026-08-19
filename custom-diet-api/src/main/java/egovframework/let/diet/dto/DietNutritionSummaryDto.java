package egovframework.let.diet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DietNutritionSummaryDto {
	
	private String nutrientCode;

	private Double nutrientFinalAmount;
}
