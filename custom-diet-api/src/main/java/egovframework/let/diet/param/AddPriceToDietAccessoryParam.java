package egovframework.let.diet.param;

import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPriceToDietAccessoryParam {
	
	private String name;
	
	private Integer price;
	
	@Pattern(regexp = "Y|N", message = "{dto.flag.invalid}")
	private String receiptIncludeFlag;
}
