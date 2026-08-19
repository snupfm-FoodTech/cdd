package egovframework.let.diet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DietMaterialGeoDto {
	
	private Integer geoId;
	
	private String regNo;
	
	private String regNm;
	
	private String region;
}
