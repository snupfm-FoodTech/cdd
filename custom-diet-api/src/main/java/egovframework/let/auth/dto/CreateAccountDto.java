package egovframework.let.auth.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccountDto {
	
	@NotBlank(message = "{auth.email.not-blank}")
	private String usrEml;
	
	@NotBlank(message = "{auth.password.not-blank}")
	private String usrPwd;
	
	private String usrNm;
	
	@Pattern(regexp = "^$|\\d+", message = "{auth.user-phone.empty-or-number}")
	private String usrPhnNo;
}