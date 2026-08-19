package egovframework.let.user.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.ValidationException;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.mail.service.MailContentDto;
import egovframework.let.mail.service.MailService;
import egovframework.let.user.dto.UserDto;
import egovframework.let.user.dto.UserPagingDto;
import egovframework.let.user.entity.UserEntity;
import egovframework.let.user.param.InsertUserParam;
import egovframework.let.user.param.UpdateUserParam;
import egovframework.let.user.service.EgovUserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovUserServiceImpl extends EgovAbstractServiceImpl implements EgovUserService {

	private final ModelMapper modelMapper;

	private final EgovMessageSource messageService;

	private final BCryptPasswordEncoder passwordEncoder;

	private final MailService mailService;

	private final UserDAO userDAO;

	@Override
	public UserPagingDto findAllUsers(Integer page, Integer limit, String orderByField, Boolean isDesc, String usrNm,
			String usrEml) throws Exception {
		// validate
		if (orderByField != null) {
			if (AppUtil.doesFieldExist(orderByField, new UserEntity())) { // check whether the field exists
				orderByField = AppUtil.convertEntityFieldToColumn(orderByField);
			} else {
				throw new ValidationException(messageService.get("field.not-exist-in-entity", orderByField, "User"));
			}
		}
		Integer[] arr = AppUtil.convertPageAndLimit(page, limit);

		// execute query
		HashMap<String, Object> userSearchParams = new HashMap<String, Object>();
		userSearchParams.put("offset", arr[0]);
		userSearchParams.put("limit", arr[1]);
		userSearchParams.put("orderByField", orderByField);
		userSearchParams.put("isDesc", isDesc);
		userSearchParams.put("usrNm", usrNm);
		userSearchParams.put("usrEml", usrEml);
		List<UserEntity> users = userDAO.findAllUsers(userSearchParams);
		int totalPageNo = 1;
		if (arr[1] == null) {
			totalPageNo = 1;
		} else if (!users.isEmpty() && users.get(0).getTtlNo() > arr[1]) {
			totalPageNo = (int) Math.ceil((double) users.get(0).getTtlNo() / arr[1]);
		}

		List<UserDto> userDtos = users.stream().map(entity -> modelMapper.map(entity, UserDto.class)).toList();

		int totalRecordNo = 0;
		if (!users.isEmpty()) {
			totalRecordNo = users.get(0).getTtlNo();
		}

		return UserPagingDto.builder().users(userDtos).totalPageNo(totalPageNo).totalRecordNo(totalRecordNo).build();
	}

	@Override
	public UserDto findUserById(int id) {
		UserEntity entity = userDAO.findUserById(id).orElseThrow(
				() -> new ValidationException(messageService.get("user.id.not-found", String.valueOf(id))));
		return modelMapper.map(entity, UserDto.class);
	}

	@Transactional
	@Override
	public UserDto insertUser(InsertUserParam dto) {
		// check whether email exists
		if (userDAO.findUserByEmail(dto.getUsrEml()).isPresent()) {
			throw new ValidationException(messageService.get("user.email.exist", dto.getUsrEml()));
		}
		// adding logic
		dto.setUsrPwd(passwordEncoder.encode(dto.getUsrPwd()));
		UserEntity user = modelMapper.map(dto, UserEntity.class);
		user.setUsrAcctSttCd("A");
		if (userDAO.insertUser(user) < 1) {
			throw new ValidationException(messageService.get("user.insert.failed"));
		}
		return findUserById(user.getUsrId());
	}

	@Transactional
	@Override
	public UserDto updateUser(UpdateUserParam dto) {
		// check id
		UserEntity entity = userDAO.findUserById(dto.getId()).orElseThrow(
				() -> new ValidationException(messageService.get("user.id.not-found", String.valueOf(dto.getId()))));
		// validate email
		String newEmail = dto.getUsrEml();
		if (newEmail != null && !"".equals(newEmail) && !entity.getUsrEml().equals(newEmail)
				&& userDAO.findUserByEmail(newEmail).isPresent()) {
			throw new ValidationException(messageService.get("user.email.exist", dto.getUsrEml()));
		}

		String newPassword = dto.getUsrPwd();
		if (newPassword != null && !"".equals(newPassword)) {
			dto.setUsrPwd(passwordEncoder.encode(newPassword));
		}
		UserEntity user = modelMapper.map(dto, UserEntity.class);

		if (userDAO.updateUser(user) < 1) {
			throw new ValidationException(messageService.get("user.update.failed"));
		}
		return findUserById(dto.getId());
	}

	@Transactional
	@Override
	public void deleteUserById(int id) {
		if (userDAO.findUserById(id).isEmpty()) {
			throw new ValidationException(messageService.get("user.id.not-found", String.valueOf(id)));
		}

		if (userDAO.deleteUserById(id) < 1) {
			throw new ValidationException(messageService.get("user.delete.failed"));
		}
	}

	@Override
	public Integer checkUserPermission(int id, String resource, String action) {
		HashMap<String, Object> userSearchParams = new HashMap<String, Object>();
		userSearchParams.put("id", id);
		userSearchParams.put("resource", resource);
		userSearchParams.put("action", action);
		return userDAO.checkUserPermission(userSearchParams);
	}

	@Transactional
	@Override
	public String resetUserPassword(int id) {
		// get user
		UserEntity entity = userDAO.findUserById(id).orElseThrow(
				() -> new ValidationException(messageService.get("user.id.not-found", String.valueOf(id))));

		// generate new password => save
		String newPassword = AppUtil.generateRandomPassword(10);

		// save
		entity.setUsrPwd(passwordEncoder.encode(newPassword));
		userDAO.updateUser(entity);

		// send mail
		Map<String, Object> model = new HashMap<>();
		model.put("newPassword", newPassword);

		mailService.sendEmailVerificationCode(MailContentDto.builder().toEmail(entity.getUsrEml()).title("비밀번호 변경")
				.templateName(AppUtil.MAIL_TMPL_RESET_PWD).templateModel(model).build());

		return messageService.get("user.password.reset");
	}
}