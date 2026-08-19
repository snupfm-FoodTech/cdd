package egovframework.let.user.param;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserParam {
	
	private Integer id;

	//@CustomEmail
	private String usrEml;
	
	//@NullOrNotBlank(fieldName = "usrPwd")
	private String usrPwd;
	
	private String usrNm;
	
	private String usrPhnNo;
}
