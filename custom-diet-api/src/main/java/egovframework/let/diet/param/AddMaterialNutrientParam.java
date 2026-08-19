package egovframework.let.diet.param;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddMaterialNutrientParam {
	
	@NotBlank(message = "{diet-nutr.code.not-blank}")
	private String code;

	@NotNull(message = "{diet-nutr.amount.not-null}")
	@DecimalMin(value = "0.001", message = "{diet-nutr.amount.greater-than}")
	@DecimalMax(value = "9999.999", message = "{diet-nutr.amount.less-than}")
	private Double amount;
}