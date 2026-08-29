package egovframework.let.diet.param;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
public class SaveRecipeMaterialParam {

	@NotBlank(message = "{diet-mat.code.not-blank}")
	String code;

	@NotNull(message = "{diet-mat.weight.not-null}")
	@DecimalMin(value = "0.01", message = "{diet-mat.weight.greater-than}")
	@DecimalMax(value = "9999.99", message = "{diet-mat.weight.less-than}")
	Double recipeWeight;

	/** 폐기율이 반영된 산출 중량. 지정하지 않으면 레시피 중량과 동일하게 저장한다. */
	@DecimalMin(value = "0.0", message = "{diet-mat.weight.positive-or-zero}")
	@DecimalMax(value = "9999.99", message = "{diet-mat.weight.less-than}")
	Double calculationWeight;
}
