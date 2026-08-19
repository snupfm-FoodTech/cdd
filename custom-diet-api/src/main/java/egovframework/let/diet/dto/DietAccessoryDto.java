package egovframework.let.diet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DietAccessoryDto {
	
	private Integer sequence;
    
	private String name;
	
    private Integer price;
    
    private String receiptIncludeFlag;
}