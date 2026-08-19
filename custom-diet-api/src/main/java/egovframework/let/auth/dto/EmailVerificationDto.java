package egovframework.let.auth.dto;

import javax.validation.constraints.NotBlank;

import egovframework.com.cmm.validation.annotation.NullOrNotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailVerificationDto {
	
	@NotBlank(message = "{auth.email.not-blank}")
	private String usrEml;
	
	@NullOrNotBlank(fieldName = "authNo")
	private String authNo;
}