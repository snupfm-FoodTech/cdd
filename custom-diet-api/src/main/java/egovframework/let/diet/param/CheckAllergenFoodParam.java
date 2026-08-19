package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CheckAllergenFoodParam {

	@NotEmpty(message = "{diet-alrg.alrg-list.not-empty}")
	List<Integer> excludedAllergenIds;
	
	@Valid
	@NotEmpty(message = "{diet-tray.food-list.not-empty}")
	List<FoodData> foods;
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	@FieldDefaults(level = AccessLevel.PRIVATE)
	public static class FoodData {
		
		@NotBlank(message = "{diet-fd.code.not-blank}")
		String code;
		
		@Valid
		@NotEmpty(message = "{diet-mat.mat-list.not-empty}")
		List<MaterialData> materials;
		
	}
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@Builder
	@FieldDefaults(level = AccessLevel.PRIVATE)
	public static class MaterialData {
		
		@NotBlank(message = "{diet-mat.code.not-blank}")
		String code;
		
	}
}