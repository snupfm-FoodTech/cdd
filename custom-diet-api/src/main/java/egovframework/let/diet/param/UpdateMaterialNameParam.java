package egovframework.let.diet.param;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMaterialNameParam {

	@NotBlank(message = "{diet-mat.name.not-blank}")
	private String name;
}
