package egovframework.let.open.web;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.param.BasePagingParam;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.let.open.param.AddConsultReqParam;
import egovframework.let.open.service.EgovOpenService;
import egovframework.let.solution.param.FindAllSolutionContentParam;
import egovframework.let.solution.service.EgovSolutionService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/open")
@RequiredArgsConstructor
@Validated
public class EgovOpenController {
	private final EgovOpenService openService;
	private final EgovSolutionService solutionService;
	
	@PostMapping("/corporate-consulting-request")
	public ResponseEntity<ResponseDto> addCorporateConsultingRequest(
			@Valid @RequestBody AddConsultReqParam param) {
		return ResponseUtil.get(openService.addConsultRequest(param), HttpStatus.CREATED);
	}
	
	@GetMapping("/solutions/types")
	public ResponseEntity<ResponseDto> findAllSolutionType(@Valid @ModelAttribute BasePagingParam param) {
		return ResponseUtil.get(solutionService.findAllSolutionType(param), HttpStatus.OK);
	}
	
	@GetMapping("/solutions/contents")
	public ResponseEntity<ResponseDto> findAllSolutionContent(@Valid @ModelAttribute FindAllSolutionContentParam param) {
		return ResponseUtil.get(solutionService.findAllSolutionContent(param), HttpStatus.OK);
	}
	
	@GetMapping("/solutions/contents/{id}")
	public ResponseEntity<ResponseDto> findSolutionContentById(@PathVariable("id") long id) {
		return ResponseUtil.get(solutionService.findSolutionContentById(id), HttpStatus.OK);
	}
}