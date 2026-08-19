package egovframework.let.diet.param;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPriceToDietMaterialParam {

	@NotBlank(message = "{diet-mat.code.not-blank}")
	private String code;
	
	@PositiveOrZero(message = "{diet-mat.price.positive-or-zero}")
	private Integer price;
	
	@NotNull(message = "{diet-mat.weight.not-null}")
	@PositiveOrZero(message = "{diet-mat.weight.positive-or-zero}")
	private Integer recipeWeight;
	
	@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}")
	private String receiptIncludeFlag;
}
