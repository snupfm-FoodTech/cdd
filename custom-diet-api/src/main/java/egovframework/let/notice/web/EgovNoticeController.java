package egovframework.let.notice.web;

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
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.aop.authorization.Authorized;
import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.let.notice.param.AddNoticeParam;
import egovframework.let.notice.param.FindAllNoticeParam;
import egovframework.let.notice.param.UpdateNoticeParam;
import egovframework.let.notice.service.EgovNoticeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
@Validated
public class EgovNoticeController {
	
	private final EgovNoticeService noticeService;
	
	@GetMapping
	public ResponseEntity<ResponseDto> findAllNotice(@Valid @ModelAttribute FindAllNoticeParam params) {
		return ResponseUtil.get(noticeService.findAllNotice(params), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseDto> findNoticeById(@PathVariable("id") int id) {
		return ResponseUtil.get(noticeService.findNoticeById(id), HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> addNotice(
			@Valid @ModelAttribute AddNoticeParam param) {
		return ResponseUtil.get(noticeService.addNotice(param), HttpStatus.CREATED);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> updateNotice(
			@PathVariable("id") int id,
			@Valid @ModelAttribute UpdateNoticeParam param) {
		return ResponseUtil.get(noticeService.updateNotice(id, param), HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDto> deleteNoticeById(@PathVariable("id") int id) {
		noticeService.deleteNoticeById(id);
		return ResponseUtil.get("Notice deleted", HttpStatus.NO_CONTENT);
	}
}