package egovframework.let.diet.param;

import javax.validation.constraints.NotBlank;

import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddNutritionSummaryToDietParam {

	@NotBlank(message = "{diet-nutr.code.not-blank}")
	private String nutrientCode;

	@NullOrPositiveNo(fieldName = "finalAmount")
	private Double nutrientFinalAmount;
}
