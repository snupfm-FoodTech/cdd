package egovframework.let.diet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DietFoodConversionDto {
	
	private String foodCode;
	
	private Integer preWeight;
	
	private Integer postVolume;
	
	private Double preWeightToPostVolumeRatio;
	
	private Double postVolumeToPreWeightRatio;
}