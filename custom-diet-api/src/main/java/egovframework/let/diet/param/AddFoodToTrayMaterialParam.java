package egovframework.let.diet.param;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddFoodToTrayMaterialParam {

	@NotBlank(message = "{diet-mat.code.not-blank}")
	private String code;
	
	@NotNull(message = "{diet-mat.weight.not-null}")
	@PositiveOrZero(message = "{diet-mat.weight.positive-or-zero}")
	private Double recipeWeight;
	
	@NotNull(message = "{diet-mat.weight.not-null}")
	@PositiveOrZero(message = "{diet-mat.weight.positive-or-zero}")
	private Double calculationWeight;
}