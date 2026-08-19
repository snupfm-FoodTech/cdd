package egovframework.let.diet.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FindAllUserTrayParam {
	
	private int usrId;
	
	private String trayNm;
}
