package egovframework.let.diet.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DietCommonInfoDto {
	
	private Integer id;
	
	private String name;
	
	private String description;
	
	private String favouriteFlag;
	
	private String trayId;
	
	private String trayName;
	
	private String standardCode;
	
	private String standardName;
	
	private String updatedAt;
}