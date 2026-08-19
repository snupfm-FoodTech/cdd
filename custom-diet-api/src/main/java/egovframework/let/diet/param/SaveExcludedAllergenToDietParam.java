package egovframework.let.diet.param;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import io.swagger.v3.oas.annotations.media.Schema;
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
public class SaveExcludedAllergenToDietParam {
	
	@Schema(hidden = true)
	Integer dietId;
	
//	@NotEmpty(message = "{diet-alrg.alrg-list.not-empty}")
	List<Integer> excludedAllergenIds;
}