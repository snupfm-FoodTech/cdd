package egovframework.let.auth.dto;

import egovframework.let.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResultDto {
	
	private UserDto user;
	
	private String accessToken;
	
	private String refreshToken;
}
