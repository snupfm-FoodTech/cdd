package egovframework.let.diet.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DietFoodNutritionDto {

	private String flag;

	private String fdCd;

	private String fdTpCd;

	private Double ttlRcpWgt;

	private Double ttlCalcWgt;

	private BigDecimal eng;

	private BigDecimal protein;

	private BigDecimal fat;

	private BigDecimal cho;
	
	private BigDecimal sugar;
	
	private BigDecimal fiber;
	
	private BigDecimal ca;
	
	private BigDecimal fe;
	
	private BigDecimal p;
	
	private BigDecimal k;
	
	private BigDecimal na;
	
	private BigDecimal vita;
	
	private BigDecimal reti;
	
	private BigDecimal caro;
	
	private BigDecimal thia;
	
	private BigDecimal ribo;
	
	private BigDecimal niacin;
	
	private BigDecimal vitc;
	
	private BigDecimal chole;
	
	private BigDecimal sfa;
	
	private BigDecimal trans;
	
	private BigDecimal mois;
	
	private BigDecimal ash;
	
	private BigDecimal vitd;
	
	private BigDecimal sugarCalcWgtRto;
	
	private BigDecimal naCalcWgtRto;
	
	private BigDecimal engCalcWgtRto;
	
	private BigDecimal proteinEngRto;
	
	private List<Integer> allergenIds;
}