package egovframework.let.diet.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FindAllDietParam {

	private int usrId;
	
	private String dietNm;
	
	private Integer trayId;
	
	private Integer dietId;
}
