package egovframework.let.auth.service;

import egovframework.let.auth.dto.ChangePasswordDto;
import egovframework.let.auth.dto.CreateAccountDto;
import egovframework.let.auth.dto.EmailVerificationDto;
import egovframework.let.auth.dto.LoginFormDto;
import egovframework.let.auth.dto.LoginResultDto;
import egovframework.let.auth.dto.RefreshTokenResultDto;
import egovframework.let.user.dto.UserDto;
import egovframework.let.user.param.SelfUpdateUserParam;

public interface EgovAuthService {
	LoginResultDto login(LoginFormDto formDto);
	RefreshTokenResultDto refreshToken(String refreshToken);
	String verifyEmail(EmailVerificationDto dto);
	String verifyAuthNo(EmailVerificationDto dto);
	UserDto registerAccount(CreateAccountDto dto);
	String sendAuthNoForRegister(EmailVerificationDto dto);
	String sendAuthNoForForgotPwd(EmailVerificationDto dto);
	String forgotPassword(ChangePasswordDto dto);
	UserDto selfUpdateUser(SelfUpdateUserParam param);
}
