package egovframework.let.auth.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {
	
	@Email
	@NotBlank(message = "auth.email.not-blank")
	private String usrEml;
	
	@NotBlank(message = "{auth.password.not-blank}")
	private String usrNewPwd;
}
