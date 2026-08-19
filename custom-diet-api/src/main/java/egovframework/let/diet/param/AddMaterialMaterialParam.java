package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddMaterialMaterialParam {

	@NotBlank(message = "{diet-mat.name.not-blank}")
	private String name;

	@NotNull(message = "{diet-mat.weight.not-null}")
	@DecimalMin(value = "0.01", message = "{diet-mat.weight.greater-than}")
	@DecimalMax(value = "9999.99", message = "{diet-mat.weight.less-than}")
	private Double weight;
	
	private Integer representativeId;

	@Valid
	@NotEmpty(message = "{diet-mat.nutrients.not-empty}")
	private List<AddMaterialNutrientParam> nutrients;
}
