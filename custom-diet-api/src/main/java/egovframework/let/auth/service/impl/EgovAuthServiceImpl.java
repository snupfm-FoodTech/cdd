package egovframework.let.auth.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.ValidationException;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.exception.CustomAuthenticationException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.util.AppUtil;
import egovframework.com.cmm.util.JwtUtil;
import egovframework.com.config.caching.CacheService;
import egovframework.let.auth.dto.ChangePasswordDto;
import egovframework.let.auth.dto.CreateAccountDto;
import egovframework.let.auth.dto.EmailVerificationDto;
import egovframework.let.auth.dto.LoginFormDto;
import egovframework.let.auth.dto.LoginResultDto;
import egovframework.let.auth.dto.RefreshTokenResultDto;
import egovframework.let.auth.service.EgovAuthService;
import egovframework.let.diet.service.EgovDietService;
import egovframework.let.mail.service.MailContentDto;
import egovframework.let.mail.service.MailService;
import egovframework.let.role.RoleDAO;
import egovframework.let.role.RoleEntity;
import egovframework.let.user.dto.UserDto;
import egovframework.let.user.entity.UserEntity;
import egovframework.let.user.entity.UserRoleEntity;
import egovframework.let.user.param.SelfUpdateUserParam;
import egovframework.let.user.service.impl.UserDAO;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovAuthServiceImpl implements EgovAuthService {
	private final UserDAO userDAO;
	private final RoleDAO roleDAO;
	private final MailService mailService;
	private final CacheService cacheService;
	private final EgovDietService dietService;
	private final EgovMessageSource messageService;
	private final ModelMapper modelMapper;
	private final BCryptPasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;
	
	@Transactional
	@Override
	public LoginResultDto login(LoginFormDto formDto) {
		// validate email & password
		UserEntity entity = userDAO.findUserByEmail(formDto.getEmail())
				.orElseThrow(() -> new CustomAuthenticationException(messageService.get("auth.email.not-correct")));
		if (!passwordEncoder.matches(formDto.getPassword(), entity.getUsrPwd())) {
			throw new CustomAuthenticationException(messageService.get("auth.password.not-correct"));
		}
		// update user last login date
		entity.setUsrLstLoginDt(LocalDateTime.now());
		userDAO.updateUserLstLoginDt(entity);
		UserDto dto = modelMapper.map(entity, UserDto.class);
		dto.setUsrLstLoginDt(LocalDateTime.now());
		return LoginResultDto.builder().user(dto).accessToken(jwtUtil.getAccessToken(entity))
				.refreshToken(jwtUtil.getRefreshToken(entity)).build();
	}
	
	@Transactional
	@Override
	public RefreshTokenResultDto refreshToken(String refreshToken) {
		int id = jwtUtil.verifyToken(refreshToken);
		UserEntity entity = userDAO.findUserById(id)
				.orElseThrow(() -> new CustomAuthenticationException(messageService.get("auth.user.not-exist")));
		// update user last login date
		entity.setUsrLstLoginDt(LocalDateTime.now());
		userDAO.updateUserLstLoginDt(entity);
		return RefreshTokenResultDto.builder().accessToken(jwtUtil.getAccessToken(entity)).build();
	}
	
	@Override
	public String verifyEmail(EmailVerificationDto dto) {
		// check whether email exists
		if (userDAO.findUserByEmail(dto.getUsrEml()).isPresent()) {
			throw new ValidationException(messageService.get("auth.email.exist", dto.getUsrEml()));
		}
		return messageService.get("auth.email.available", dto.getUsrEml());
	}
	
	@Override
	public String verifyAuthNo(EmailVerificationDto dto) {
		if (!cacheService.verifyEmailAuthNo(dto.getUsrEml(), dto.getAuthNo())) {
			throw new ValidationException(messageService.get("auth.email-and-auth-no.incorrect"));
		}
		// email & auth no are correct => delete email & auth no (last in 10 mins)
		cacheService.deleteEmlAuthNo(dto.getUsrEml());
		// store email in 2 hours
		cacheService.saveEmail(dto.getUsrEml());
		return messageService.get("auth.email-and-auth-no.correct");
	}
	
	@Transactional
	@Override
	public UserDto registerAccount(CreateAccountDto dto) {
		// check whether email exists
		if (userDAO.findUserByEmail(dto.getUsrEml()).isPresent()) {
			throw new ValidationException(messageService.get("user.email.exist", dto.getUsrEml()));
		}

		// check email (last 2 hours)
		if (!cacheService.verifyEmail(dto.getUsrEml())) {
			throw new ValidationException(messageService.get("auth.email-and-auth-no.incorrect"));
		}

		// validate password
		if (!AppUtil.isPasswordValid(dto.getUsrPwd())) {
			throw new ValidationException(messageService.get("auth.password.weak"));
		}

		// create user data
		UserEntity newUser = UserEntity.builder().usrEml(dto.getUsrEml())
				.usrPwd(passwordEncoder.encode(dto.getUsrPwd())).usrNm(dto.getUsrNm()).usrPhnNo(dto.getUsrPhnNo())
				.usrAcctSttCd(AppUtil.ACCT_STT.A.toString()).creDt(LocalDateTime.now()).updDt(LocalDateTime.now())
				.build();

		// save user
		userDAO.insertUser(newUser);

		// add role MEMBER to new user
		RoleEntity roleEntity = roleDAO.findRoleByCode(AppUtil.ROLE.MEM.toString());
		UserRoleEntity userRoleEntity = UserRoleEntity.builder().usrId(newUser.getUsrId())
				.roleId(roleEntity.getRoleId()).creUsrId(newUser.getUsrId()).creDt(LocalDateTime.now())
				.updUsrId(newUser.getUsrId()).updDt(LocalDateTime.now()).build();
		userDAO.addRolesToUser(List.of(userRoleEntity));

		// add user default tray templates
		dietService.addDefaultUserTrayTemplate(newUser.getUsrId());

		// clear email from cache (last 2 hours)
		cacheService.deleteEmail(dto.getUsrEml());
		return modelMapper.map(userDAO.findUserById(newUser.getUsrId()), UserDto.class);
	}
	
	@Override
	public String sendAuthNoForRegister(EmailVerificationDto dto) {
		// send mail & store code in cache
		String authNo = AppUtil.generateRandomAuthNo(8);
		Map<String, Object> templateModel = new HashMap<>();
		templateModel.put("authNo", authNo);

		mailService.sendEmailVerificationCode(MailContentDto.builder().toEmail(dto.getUsrEml()).title("인증번호")
				.templateName(AppUtil.MAIL_TMPL_AUTH_NO).templateModel(templateModel).build());

		cacheService.saveEmailAuthNo(dto.getUsrEml(), authNo);
		return messageService.get("auth.auth-no.sent", dto.getUsrEml());
	}
	
	@Override
	public String sendAuthNoForForgotPwd(EmailVerificationDto dto) {
		// verify email if exist
		if (userDAO.findUserByEmail(dto.getUsrEml()).isEmpty()) {
			throw new CustomNotFoundException(messageService.get("auth.email.not-exist", dto.getUsrEml()));
		}

		// send mail & store code in cache
		String authNo = AppUtil.generateRandomAuthNo(8);
		Map<String, Object> templateModel = new HashMap<>();
		templateModel.put("authNo", authNo);

		mailService.sendEmailVerificationCode(MailContentDto.builder().toEmail(dto.getUsrEml()).title("인증번호")
				.templateName(AppUtil.MAIL_TMPL_AUTH_NO).templateModel(templateModel).build());

		cacheService.saveEmailAuthNo(dto.getUsrEml(), authNo);
		return messageService.get("auth.auth-no.sent", dto.getUsrEml());
	}
	
	@Transactional
	@Override
	public String forgotPassword(ChangePasswordDto dto) {
		// check whether email exists
		UserEntity user = userDAO.findUserByEmail(dto.getUsrEml()).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("user.email.not-exist", dto.getUsrEml())));

		// check email
		if (!cacheService.verifyEmail(dto.getUsrEml())) {
			throw new ValidationException(messageService.get("auth.email-and-auth-no.incorrect"));
		}
		
		// validate password
		if (!AppUtil.isPasswordValid(dto.getUsrNewPwd())) {
			throw new ValidationException(messageService.get("auth.password.weak"));
		}

		// update password
		user.setUsrPwd(passwordEncoder.encode(dto.getUsrNewPwd()));
		user.setUpdUsrId(user.getUsrId());
		user.setUpdDt(LocalDateTime.now());
		userDAO.changePassword(user);
		
		// clear email from cache
		cacheService.deleteEmail(dto.getUsrEml());
		return messageService.get("auth.change-password.succeeded");
	}
	
	@Transactional
	@Override
	public UserDto selfUpdateUser(SelfUpdateUserParam param) {
		//get current user
		int userId = AppUtil.getUserIdFromToken();
		UserEntity user = userDAO.findUserById(userId)
				.orElseThrow(() -> new CustomNotFoundException(messageService.get("user.id.not-found")));
		
		if (param.getNewPassword() != null && !"".equals(param.getNewPassword())) {
			//compare current password
			if (param.getCurrentPassword() == null || "".equals(param.getCurrentPassword())) {
				throw new ValidationException(messageService.get("auth.password.not-blank"));
			}
			
			if (!passwordEncoder.matches(param.getCurrentPassword(), user.getUsrPwd())) {
				throw new ValidationException(messageService.get("auth.password.not-correct"));
			}
			
			// validate password
			if (!AppUtil.isPasswordValid(param.getNewPassword())) {
				throw new ValidationException(messageService.get("auth.password.weak"));
			}
			param.setNewPassword(passwordEncoder.encode(param.getNewPassword()));
		}
		UserEntity entity = modelMapper.map(param, UserEntity.class);
		entity.setUsrId(userId);
		if (userDAO.updateUser(entity) < 1) {
			throw new ValidationException(messageService.get("user.update.failed"));
		}
		return modelMapper.map(userDAO.findUserById(userId), UserDto.class);
	}
}
