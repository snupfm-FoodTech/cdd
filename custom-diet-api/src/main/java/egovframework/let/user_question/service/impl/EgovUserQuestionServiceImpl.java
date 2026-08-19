package egovframework.let.user_question.service.impl;

import java.util.List;

import javax.validation.ValidationException;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.exception.CustomAuthorizationException;
import egovframework.com.cmm.exception.CustomException;
import egovframework.com.cmm.exception.CustomNotFoundException;
import egovframework.com.cmm.util.AppUtil;
import egovframework.let.file.service.FileService;
import egovframework.let.role.RoleDAO;
import egovframework.let.role.RoleEntity;
import egovframework.let.user_question.dto.UserQuestionDto;
import egovframework.let.user_question.dto.UserQuestionPagingDto;
import egovframework.let.user_question.entity.UserQuestionEntity;
import egovframework.let.user_question.param.AddUserQuestionParam;
import egovframework.let.user_question.param.AnswerUserQuestionParam;
import egovframework.let.user_question.param.SearchUserQuestionParam;
import egovframework.let.user_question.service.EgovUserQuestionService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EgovUserQuestionServiceImpl extends EgovAbstractServiceImpl implements EgovUserQuestionService {

	private final ModelMapper modelMapper;

	private final EgovMessageSource messageService;

	private final FileService fileService;

	private final RoleDAO roleDAO;

	private final UserQuestionDAO userQuestionDAO;
	
	@Override
	public UserQuestionPagingDto findAllUserQuestions(Integer page, Integer limit, String orderByField, Boolean isDesc,
			String queTit, Integer queUsrId) {
		// validate
		if (orderByField != null) {
			if (AppUtil.doesFieldExist(orderByField, new UserQuestionEntity())) { // check whether the field exists
				orderByField = AppUtil.convertEntityFieldToColumn(orderByField);
			} else {
				throw new ValidationException(
						messageService.get("field.not-exist-in-entity", orderByField, "User Question"));
			}
		}
		Integer[] arr = AppUtil.convertPageAndLimit(page, limit);

		// execute query
		SearchUserQuestionParam userQuestionParam = new SearchUserQuestionParam();
		userQuestionParam.setOffset(arr[0]);
		userQuestionParam.setLimit(arr[1]);
		userQuestionParam.setOrderByField(orderByField);
		userQuestionParam.setIsDesc(isDesc);
		userQuestionParam.setQueTit(queTit);
		userQuestionParam.setQueUsrId(queUsrId);
		
		List<UserQuestionEntity> userQuestions = userQuestionDAO.findAllUserQuestions(userQuestionParam);
		int totalPageNo = 1;
		if (arr[1] == null) {
			totalPageNo = 1;
		} else if (!userQuestions.isEmpty() && userQuestions.get(0).getTtlNo() > arr[1]) {
			totalPageNo = (int) Math.ceil((double) userQuestions.get(0).getTtlNo() / arr[1]);
		}

		int totalRecordNo = 0;
		if (!userQuestions.isEmpty()) {
			totalRecordNo = userQuestions.get(0).getTtlNo();
		}

		return UserQuestionPagingDto.builder().userQuestions(userQuestions.stream().map(entity -> {
			UserQuestionDto dto = modelMapper.map(entity, UserQuestionDto.class);
			dto.setQueAtchUrls(
					fileService.getAllFilesByEntity(AppUtil.ENTITY_USER_QUESTION, entity.getQueId().toString()));
			return dto;
		}).toList()).totalPageNo(totalPageNo).totalRecordNo(totalRecordNo).build();
	}

	@Override
	public UserQuestionDto findUserQuestionById(int id) {
		UserQuestionEntity entity = userQuestionDAO.findUserQuestionById(id)
				.orElseThrow(() -> new CustomNotFoundException(messageService.get("user-question.id.not-found", id)));
		UserQuestionDto dto = modelMapper.map(entity, UserQuestionDto.class);
		dto.setQueAtchUrls(fileService.getAllFilesByEntity(AppUtil.ENTITY_USER_QUESTION, String.valueOf(id)));
		return dto;
	}

	@Transactional
	@Override
	public UserQuestionDto addUserQuestion(AddUserQuestionParam param) {
		if (param.getQueId() == null) {
			// CASE 1: USER CREATE NEW QUESTION
			UserQuestionEntity newEntity = modelMapper.map(param, UserQuestionEntity.class);

			// add user questions
			newEntity.setQueAtchUrl("/" + AppUtil.ENTITY_USER_QUESTION + "/"); // id will be added in SQL
			newEntity.setQueUsrId(AppUtil.getUserIdFromToken());
			newEntity.setQueSttCd(AppUtil.USR_QUE_STT.O.toString());

			if (userQuestionDAO.addUserQuestion(newEntity) < 1) {
				throw new CustomException(messageService.get("user-question.insert.failed"));
			}

			try {
				// save attachment
				if (param.getFiles() != null && !param.getFiles().isEmpty()) {
					fileService.addFilesToEntity(AppUtil.ENTITY_USER_QUESTION, newEntity.getQueId().toString(),
							param.getFiles());
				}
			} catch (Exception e) {
				fileService.deleteEntityFiles(AppUtil.ENTITY_USER_QUESTION, newEntity.getQueId().toString());
				throw new CustomException(e.getMessage());
			}
			return findUserQuestionById(newEntity.getQueId());
		} else {
			// CASE 2: USER UPDATE THEIR QUESTION (STATUS MUST BE STILL OPEN)
			UserQuestionEntity oldQuestion = userQuestionDAO.findUserQuestionById(param.getQueId())
					.orElseThrow(() -> new CustomNotFoundException(
							messageService.get("user-question.id.not-found", param.getQueId())));

			if (!AppUtil.USR_QUE_STT.O.toString().equals(oldQuestion.getQueSttCd())) { // if status is not OPEN
				throw new ValidationException(messageService.get("user-question.que-stt-cd.open"));
			}

			// update title & content
			UserQuestionEntity sqlParams = modelMapper.map(param, UserQuestionEntity.class);
			sqlParams.setQueId(sqlParams.getQueId());
			userQuestionDAO.updateUserQuestion(sqlParams);

			// delete if necessary
			if (param.getDeletedFilePaths() != null && !param.getDeletedFilePaths().isEmpty()) {
				param.getDeletedFilePaths().forEach(fileService::deleteFileByPath);
			}

			try {
				// add if necessary
				if (param.getFiles() != null && !param.getFiles().isEmpty()) {
					fileService.addFilesToEntity(AppUtil.ENTITY_USER_QUESTION, param.getQueId().toString(),
							param.getFiles());
				}
			} catch (Exception e) {
				fileService.deleteEntityFiles(AppUtil.ENTITY_USER_QUESTION, param.getQueId().toString());
				throw new CustomException(e.getMessage());
			}
			return findUserQuestionById(param.getQueId());
		}
	}

	@Transactional
	@Override
	public UserQuestionDto answerUserQuestion(AnswerUserQuestionParam param) {
		// check question id
		UserQuestionEntity question = userQuestionDAO.findUserQuestionById(param.getQueId()).orElseThrow(
				() -> new CustomNotFoundException(messageService.get("user-question.id.not-found", param.getQueId())));

		// get userId from token (already @Authorized, userId not nullable)
		int userId = AppUtil.getUserIdFromToken();

		// only admin can answer
		List<RoleEntity> roles = roleDAO.findAllRoleByUserId(userId);
		if (roles.isEmpty() || roles.stream().noneMatch(role -> AppUtil.ROLE.ADM.toString().equals(role.getRoleCd()))) {
			throw new CustomAuthorizationException(messageService.get("auth.user.no-role"));
		}

		// answer the question
		UserQuestionEntity sqlParams = new UserQuestionEntity();
		sqlParams.setAnsUsrId(userId);
		sqlParams.setAnsCtnt(param.getAnsCtnt());
		sqlParams.setQueSttCd(AppUtil.USR_QUE_STT.C.toString());
		sqlParams.setQueId(question.getQueId());
		if (userQuestionDAO.updateUserQuestion(sqlParams) < 1) {
			throw new CustomException(messageService.get("user-question.update.failed"));
		}

		return findUserQuestionById(question.getQueId());
	}

	@Override
	public void deleteUserQuestionById(int id) {
		// find the question
		UserQuestionEntity question = userQuestionDAO.findUserQuestionById(id).orElseThrow(() -> {
			throw new CustomNotFoundException(messageService.get("user-question.id.not-found", id));
		});
		// get user ID
		Integer usrId = AppUtil.getUserIdFromToken();
		if (usrId == null) {
			throw new CustomAuthorizationException(messageService.get("auth.user.no-role"));
		}

		boolean isValid = false;
		if (!usrId.equals(question.getQueUsrId())) { // if not user self question => must be admin
			// find all roles
			List<RoleEntity> roles = roleDAO.findAllRoleByUserId(usrId);
			if (roles.isEmpty()) {
				throw new CustomAuthorizationException(messageService.get("auth.user.no-role"));
			}
			// check if there is ADM role code
			isValid = roles.stream().map(RoleEntity::getRoleCd).anyMatch(cd -> AppUtil.ROLE.ADM.toString().equals(cd));
		} else {
			isValid = true;
		}

		if (!isValid) {
			throw new CustomAuthorizationException(messageService.get("auth.user.no-role"));
		}

		if (userQuestionDAO.deleteUserQuestionById(id) < 1) {
			throw new CustomException(messageService.get("user-question.delete.failed"));
		}

		fileService.deleteEntityFiles(AppUtil.ENTITY_USER_QUESTION, String.valueOf(id));
	}

}