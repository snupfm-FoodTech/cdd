package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietTrayDataParam {
	
	// id is now optional - null means create new tray-template
	private Integer id;
	
	@NotBlank(message = "{diet-tray.name.not-blank}")
	private String name;
	
	@NotNull(message = "{diet-tray.rep-tray-code.not-null}")
	private String representativeTrayCode;
	
	@NotBlank(message = "{diet-tray.mand-flg.not-blank}")
	@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}")
	private String mandatoryFlag;
	
	@Valid
	@NotEmpty(message = "{diet-tray.food-list.not-empty}")
	private List<DietFoodParam> foods; 
}