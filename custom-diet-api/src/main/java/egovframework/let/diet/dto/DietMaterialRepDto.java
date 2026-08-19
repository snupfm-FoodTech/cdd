package egovframework.let.diet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DietMaterialRepDto {
	
	private Integer id;
	
	private String name;
	
	private Integer categoryId;
}