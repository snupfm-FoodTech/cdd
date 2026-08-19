package egovframework.let.auth.dto;

import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginFormDto {
	
	@NotBlank(message = "{auth.email.not-blank}")
    private String email;
    
	@NotBlank(message = "{auth.password.not-blank}")
    private String password;
	
}