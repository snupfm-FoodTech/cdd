package egovframework.let.diet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DietMaterialCatDto {

	private Integer id;
	
	private String code;
	
	private String name;
	
	private String typeCode;
}