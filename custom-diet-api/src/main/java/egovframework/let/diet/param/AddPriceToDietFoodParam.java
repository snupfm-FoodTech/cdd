package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPriceToDietFoodParam {
	
	@NotNull(message = "{diet-fd.sequence.not-null}")
	@Positive(message = "{diet-fd.sequence.positive}")
	private Integer sequence;
	
	@Valid
//	@NotEmpty(message = "{diet-mat.mat-list.not-empty}")
	private List<AddPriceToDietMaterialParam> materials;
}
