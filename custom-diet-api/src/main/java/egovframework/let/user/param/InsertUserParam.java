package egovframework.let.user.param;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsertUserParam {
		
	@NotBlank(message = "{dto.email.not-blank}")
	private String usrEml;
	
	@NotBlank(message = "{dto.password.not-blank}")
	private String usrPwd;
	
	private String usrNm;
	
	private String usrPhnNo;
}
