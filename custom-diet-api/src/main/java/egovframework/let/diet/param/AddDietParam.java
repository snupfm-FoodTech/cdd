package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddDietParam {
	
	@NotBlank(message = "{diet.name.not-blank}")
	private String name;
	
	@NotBlank(message = "{diet.description.not-blank}")
	private String description;
	
	@NotBlank(message = "{diet-std.code.not-blank}")
	private String standardCode;
	
	@NotBlank(message = "{diet-std.name.not-blank}")
	private String standardName;
	
	@Valid
	@NotEmpty(message = "{diet-std.nutr-list.not-empty}")
	private List<DietNutrientParam> nutrients;

	List<Integer> excludedAllergenIds;

	@Valid
	@NotEmpty(message = "{diet-tray.list.not-empty}")
	private List<DietTrayDataParam> trays;

	@Min(value = 0, message = "{diet-tray.representative-index.min}")
	private Integer representativeTrayIndex = 0;  // 기본값 0 (첫 번째)
}
