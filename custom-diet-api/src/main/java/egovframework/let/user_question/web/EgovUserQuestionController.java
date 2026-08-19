package egovframework.let.user_question.web;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.aop.authorization.Authorized;
import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import egovframework.let.user_question.param.AddUserQuestionParam;
import egovframework.let.user_question.param.AnswerUserQuestionParam;
import egovframework.let.user_question.service.EgovUserQuestionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/user-questions")
@RequiredArgsConstructor
@Validated
@SecurityRequirement(name = "bearerAuth")
class EgovUserQuestionController {

	private final EgovUserQuestionService userQuestionService;

	@Authorized
	@GetMapping
	public ResponseEntity<ResponseDto> findAllUserQuestions(
			@RequestParam(name = "page", required = false) @NullOrPositiveNo(fieldName = "page") Integer page,
			@RequestParam(name = "limit", required = false) @NullOrPositiveNo(fieldName = "limit") Integer limit,
			@RequestParam(name = "orderByField", required = false) String orderByField,
			@RequestParam(name = "isDesc", defaultValue = "false") Boolean isDesc,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "queUsrId", required = false) Integer queUsrId
			) {
		return ResponseUtil.get(userQuestionService.findAllUserQuestions(page, limit, orderByField, isDesc, title, queUsrId), HttpStatus.OK);
	}
	
	@Authorized
	@GetMapping("/{id}")
	public ResponseEntity<ResponseDto> findUserQuestionById(@PathVariable("id") int id) {
		return ResponseUtil.get(userQuestionService.findUserQuestionById(id), HttpStatus.OK);
	}

	@Authorized
	@PostMapping(path = "/create-question" ,consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> addUserQuestion(
			@Valid @ModelAttribute AddUserQuestionParam param) {
		return ResponseUtil.get(userQuestionService.addUserQuestion(param), HttpStatus.CREATED);
	}
	
	@Authorized
	@PutMapping(path = "/answer-question", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> answerUserQuestion(@Valid @ModelAttribute AnswerUserQuestionParam param) {
		return ResponseUtil.get(userQuestionService.answerUserQuestion(param), HttpStatus.OK);
	}
	
	@Authorized
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDto> deleteUserQuestionById(@PathVariable("id") int id) {
		userQuestionService.deleteUserQuestionById(id);
		return ResponseUtil.get("User's question deleted", HttpStatus.NO_CONTENT);
	}
}