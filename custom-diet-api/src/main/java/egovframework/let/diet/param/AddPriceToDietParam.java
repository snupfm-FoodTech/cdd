package egovframework.let.diet.param;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPriceToDietParam {

	@NotNull(message = "{diet-rct.serv-qty.not-null}")
	@Range(min = 0, max = 9999, message = "{diet-rct.serv-qty.between}")
	private Integer servingQuantity;

	@NotNull(message = "{diet-rct.adj-pct.not-null}")
	@Range(min = 0, max = 999, message = "{diet-rct.adj-pct.between}")
	private Integer adjustmentPercent;
	
	@NotNull(message = "{diet-rct.unit-price.not-null}")
	@Range(min = 0, message = "{diet-rct.unit-price.gte}")
	private Double unitPrice;
	
	@NotNull(message = "{diet-rct.final-price.not-null}")
	@Range(min = 0, message = "{diet-rct.final-price.gte}")
	private Double finalPrice;

	@Valid
	List<AddPriceToDietAccessoryParam> accessories;

	@Valid
	List<AddPriceToDietFoodParam> foods;
}
