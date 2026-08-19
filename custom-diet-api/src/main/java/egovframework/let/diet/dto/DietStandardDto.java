package egovframework.let.diet.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DietStandardDto {

	private String code;
	
	private String name;
	
	private String typeCode;
	
	private String typeName;
	
	private List<DietNutrientDto> nutrients;
}