package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddFoodToTrayFoodParam {

	@NotNull(message = "{diet-fd.sequence.not-null}")
	@Positive(message = "{diet-fd.sequence.positive}")
	private Integer sequence;
	
	@NotBlank(message = "{diet-fd.code.not-blank}")
	private String code;
	
	private String name;
	
	private String recipeDescription;
	
	@Valid
	private List<AddFoodToTrayMaterialParam> materials;
}
