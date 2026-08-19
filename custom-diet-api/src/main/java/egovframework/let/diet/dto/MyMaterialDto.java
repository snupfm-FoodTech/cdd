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
public class MyMaterialDto {

	private String code;

	private String name;

	private String originalCode;

	private String unitCode;

	private String unitName;

	private Integer categoryId;

	private String categoryName;

	private String typeName;

	private String representativeName;

	private Double weight;

	private List<DietNutrientDto> nutrients;

	private Boolean inUse;

	private Integer totalRecordNo;
}
