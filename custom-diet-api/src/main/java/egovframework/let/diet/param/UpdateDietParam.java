package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDietParam {

	private String name;
	
	private String description;
	
	private String standardCode;
	
	private String standardName;
	
	private List<DietNutrientParam> nutrients;
	
	List<Integer> excludedAllergenIds;
	
	@Valid
	@NotNull(message = "{diet-tray.not-null}")
	private DietTrayDataParam tray;
}