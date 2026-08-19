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
public class DietTrayDto {
		
	private Integer id;
	
	private String code;
	
	private Integer userId;
	
	private String name;
	
	private String representativeTrayCode;
	
	private String representativeTrayName;
	
	private String representativeTrayDescription; 
	
	private String mandatoryFlag;
	
	private List<DietFoodDto> foods;
}