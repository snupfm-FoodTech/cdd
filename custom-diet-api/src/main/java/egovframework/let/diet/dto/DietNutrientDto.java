package egovframework.let.diet.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DietNutrientDto {
	
	private String code;
	
	private String name;
    
	private String mandatoryFlag;
    
	private Double weightFrom;
	
	private Double weightTo;
	
	private String unitCode;
	
	private String unitName;
	
	private BigDecimal amount;
	
	private String formula;
	
	private Integer orderSeq;
}