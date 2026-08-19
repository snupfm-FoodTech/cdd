package egovframework.let.auth.web;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.let.auth.dto.ChangePasswordDto;
import egovframework.let.auth.dto.CreateAccountDto;
import egovframework.let.auth.dto.EmailVerificationDto;
import egovframework.let.auth.dto.LoginFormDto;
import egovframework.let.auth.dto.RefreshTokenDto;
import egovframework.let.auth.service.EgovAuthService;
import egovframework.let.user.param.SelfUpdateUserParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
public class EgovAuthController {
	private final EgovAuthService authService;

	@PostMapping("/login")
	public ResponseEntity<ResponseDto> login(@Valid @RequestBody LoginFormDto loginFormDto) {
		return ResponseUtil.get(authService.login(loginFormDto), HttpStatus.OK);
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<ResponseDto> refreshToken(@Valid @RequestBody RefreshTokenDto dto) {
		return ResponseUtil.get(authService.refreshToken(dto.getRefreshToken()), HttpStatus.OK);
	}

	@PostMapping("/verify-email")
	public ResponseEntity<ResponseDto> verifyEmail(@Valid @RequestBody EmailVerificationDto dto) {
		return ResponseUtil.get(authService.verifyEmail(dto), HttpStatus.OK);
	}

	@PostMapping("/verify-auth-no")
	public ResponseEntity<ResponseDto> verifyAuthNo(@Valid @RequestBody EmailVerificationDto dto) {
		return ResponseUtil.get(authService.verifyAuthNo(dto), HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<ResponseDto> registerAccount(@Valid @RequestBody CreateAccountDto dto) {
		return ResponseUtil.get(authService.registerAccount(dto), HttpStatus.CREATED);
	}

	@PostMapping("/register/send-auth-no")
	public ResponseEntity<ResponseDto> sendAuthNoForRegister(@Valid @RequestBody EmailVerificationDto dto) {
		return ResponseUtil.get(authService.sendAuthNoForRegister(dto), HttpStatus.OK);
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<ResponseDto> forgotPassword(@Valid @RequestBody ChangePasswordDto dto) {
		return ResponseUtil.get(authService.forgotPassword(dto), HttpStatus.OK);
	}

	@PostMapping("/forgot-password/send-auth-no")
	public ResponseEntity<ResponseDto> sendAuthNoForForgotPwd(@Valid @RequestBody EmailVerificationDto dto) {
		return ResponseUtil.get(authService.sendAuthNoForForgotPwd(dto), HttpStatus.OK);
	}
	
	@PostMapping("/self-update")
	public ResponseEntity<ResponseDto> selfUpdateUser(@Valid @RequestBody SelfUpdateUserParam param) {
		return ResponseUtil.get(authService.selfUpdateUser(param), HttpStatus.OK);
	}
}
