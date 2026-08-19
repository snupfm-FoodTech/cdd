package egovframework.let.diet.param;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietNutrientParam {
	
	@NotBlank(message = "{diet-nutr.code.not-blank}")
	private String code;

	@NotBlank(message = "{diet-nutr.mand-flg.not-blank}")
	@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}")
	private String mandatoryFlag;
	
	@PositiveOrZero(message = "{diet-nutr.weight-fm.not-blank}")
	private Double weightFrom;
	
	@PositiveOrZero(message = "{diet-nutr.weight-to.not-blank}")
	private Double weightTo;
	
	@Size(max = 50, message = "{diet-nutr.formula.max-size}")
	private String formula;
}
