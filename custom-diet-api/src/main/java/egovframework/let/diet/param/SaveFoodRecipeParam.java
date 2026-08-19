package egovframework.let.diet.param;

import javax.validation.constraints.NotBlank;

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
public class SaveFoodRecipeParam {

	@NotBlank(message = "{diet-fd.code.not-blank}")
	String foodCode;
	
	String foodName;
	
	String recipeDescription;
}