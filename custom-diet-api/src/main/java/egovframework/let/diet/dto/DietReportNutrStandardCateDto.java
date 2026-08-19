package egovframework.let.diet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DietReportNutrStandardCateDto {
	
	private String standardName;
	
	private Integer totalDiet;
}
