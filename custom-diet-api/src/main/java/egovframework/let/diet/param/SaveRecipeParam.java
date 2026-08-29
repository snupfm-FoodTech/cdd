package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

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
public class SaveRecipeParam {

	@NotBlank(message = "{diet-rcp.name.not-blank}")
	@Size(max = 50, message = "{diet-rcp.name.too-long}")
	String name;

	@NotBlank(message = "{diet-fd.tp-cd.not-blank}")
	String typeCode;

	@Size(max = 5000, message = "{diet-rcp.desc.too-long}")
	String recipeDescription;

	@Valid
	@NotEmpty(message = "{diet-mat.mat-list.not-empty}")
	@Size(max = 100, message = "{diet-rcp.materials.too-many}")
	List<SaveRecipeMaterialParam> materials;
}
