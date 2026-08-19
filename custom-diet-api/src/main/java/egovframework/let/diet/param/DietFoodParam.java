package egovframework.let.diet.param;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DietFoodParam {
	
	@NotBlank(message = "{diet-fd.mand-flg.not-blank}")
	@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}")
	private String mandatoryFlag;
	
	@NotBlank(message = "{diet-fd.sep-flg.not-blank}")
	@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}")
	private String separatedFlag;
	
	@NotNull(message = "{diet-fd.capa-vol.not-null}")
	@PositiveOrZero(message = "{diet-fd.capa-vol.positive-or-zero}")
	private Integer capacityVolume;
	
	@NotBlank(message = "{diet-fd.tp-cd.not-blank}")
	private String typeCode;
}
