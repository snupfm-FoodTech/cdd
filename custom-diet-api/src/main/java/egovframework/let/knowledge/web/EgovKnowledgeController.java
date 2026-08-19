package egovframework.let.knowledge.web;

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
import egovframework.let.knowledge.param.AddKnowledgeParam;
import egovframework.let.knowledge.param.FindAllKnowledgeParam;
import egovframework.let.knowledge.param.UpdateKnowledgeParam;
import egovframework.let.knowledge.service.EgovKnowledgeService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/knowledges")
@RequiredArgsConstructor
@Validated 
class EgovKnowledgeController {

	private final EgovKnowledgeService knowledgeService;
	
	@GetMapping
	public ResponseEntity<ResponseDto> findAllKnowledge(@Valid @ModelAttribute FindAllKnowledgeParam params) {
		return ResponseUtil.get(knowledgeService.findAllKnowledge(params), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseDto> findKnowledgeById(@PathVariable("id") int id) {
		return ResponseUtil.get(knowledgeService.findKnowledgeById(id), HttpStatus.OK);
	}
	
	@GetMapping("/func-type")
	public ResponseEntity<ResponseDto> findAllKnowledgeFuncType() {
		return ResponseUtil.get(knowledgeService.findAllKnowledgeFuncType(), HttpStatus.OK);
	}
	
	@GetMapping("/diet-type")
	public ResponseEntity<ResponseDto> findAllKnowledgeDietType() {
		return ResponseUtil.get(knowledgeService.findAllKnowledgeDietType(), HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> addKnowledge(
			@Valid @ModelAttribute AddKnowledgeParam param) {
		return ResponseUtil.get(knowledgeService.addKnowledge(param), HttpStatus.CREATED);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> updateKnowledge(
			@PathVariable("id") int id,
			@Valid @ModelAttribute UpdateKnowledgeParam param) {
		return ResponseUtil.get(knowledgeService.updateKnowledge(id, param), HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDto> deleteKnowledgeById(@PathVariable("id") int id) {
		knowledgeService.deleteKnowledgeById(id);
		return ResponseUtil.get("Knowledge deleted", HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/view/{id}")
	public ResponseEntity<ResponseDto> increaseViewById(@PathVariable("id") int id) {
		knowledgeService.increaseViewById(id);
		return ResponseUtil.get("OK", HttpStatus.OK);
	}
}