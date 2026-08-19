package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DietTrayParam {
	
	@NotBlank(message = "{diet-tray.name.not-blank}")
	private String name;
	
	@NotNull(message = "{diet-tray.rep-tray-code.not-null}")
	private String representativeTrayCode;

	private String mandatoryFlag;

	@Valid
	@NotEmpty(message = "{diet-tray.food-list.not-empty}")
	private List<DietFoodParam> foods; 
}