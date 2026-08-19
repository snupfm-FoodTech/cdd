package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddFoodToTrayParam {
	
	@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}")
	String changeStandardFlag;
	
	List<Integer> excludedAllergenIds;
	
	@Valid
	@NotEmpty(message = "{diet-tray.food-list.not-empty}")
	List<AddFoodToTrayFoodParam> foods;
}
