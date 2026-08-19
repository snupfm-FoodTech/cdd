package egovframework.let.solution.web;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.aop.authorization.Authorized;
import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.param.BasePagingParam;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.let.solution.param.AddSolutionContentParam;
import egovframework.let.solution.param.AddSolutionTypeParam;
import egovframework.let.solution.param.FindAllSolutionContentParam;
import egovframework.let.solution.param.UpdateSolutionContentParam;
import egovframework.let.solution.param.UpdateSolutionTypeParam;
import egovframework.let.solution.service.EgovSolutionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/solutions")
@RequiredArgsConstructor
@Validated
public class EgovSolutionController {
	private final EgovSolutionService solutionService;
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/types")
	public ResponseEntity<ResponseDto> findAllSolutionType(@Valid @ModelAttribute BasePagingParam param) {
		return ResponseUtil.get(solutionService.findAllSolutionType(param), HttpStatus.OK);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/types/{id}")
	public ResponseEntity<ResponseDto> findSolutionTypeById(@PathVariable("id") long id) {
		return ResponseUtil.get(solutionService.findSolutionTypeById(id), HttpStatus.OK);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/types")
	public ResponseEntity<ResponseDto> addNewSolutionType(@Valid @ModelAttribute AddSolutionTypeParam param) {
		return ResponseUtil.get(solutionService.addNewSolutionType(param), HttpStatus.CREATED);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/types/{id}")
	public ResponseEntity<ResponseDto> updateSolutionType(
			@PathVariable("id") long id,
			@Valid @ModelAttribute UpdateSolutionTypeParam param) {
		param.setId(id);
		return ResponseUtil.get(solutionService.updateSolutionType(param), HttpStatus.OK);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@DeleteMapping("/types/{id}")
	public ResponseEntity<ResponseDto> deleteSolutionTypeById(@PathVariable("id") long id) {
		solutionService.deleteSolutionTypeById(id);
		return ResponseUtil.get(null, HttpStatus.NO_CONTENT);
	}
	
	
	//---------------------------------------------------------------------------------------
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/contents")
	public ResponseEntity<ResponseDto> findAllSolutionContent(@Valid @ModelAttribute FindAllSolutionContentParam param) {
		return ResponseUtil.get(solutionService.findAllSolutionContent(param), HttpStatus.OK);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/contents/{id}")
	public ResponseEntity<ResponseDto> findSolutionContentById(@PathVariable("id") long id) {
		return ResponseUtil.get(solutionService.findSolutionContentById(id), HttpStatus.OK);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/contents")
	public ResponseEntity<ResponseDto> addNewSolutionContent(
			@Valid @ModelAttribute AddSolutionContentParam param) {
		return ResponseUtil.get(solutionService.addNewSolutionContent(param), HttpStatus.CREATED);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/contents/{id}")
	public ResponseEntity<ResponseDto> updateSolutionContent(
			@PathVariable("id") long id,
			@Valid @ModelAttribute UpdateSolutionContentParam param) {
		param.setId(id);
		return ResponseUtil.get(solutionService.updateSolutionContent(param), HttpStatus.OK);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/contents/{id}/update-description")
	public ResponseEntity<ResponseDto> updateSolutionContentDescription(
			@PathVariable("id") long id,
			@RequestBody(required = false) Object description) {
		return ResponseUtil.get(solutionService.updateSolutionContentDescription(id, description), HttpStatus.OK);
	}
	
	@Authorized
	@SecurityRequirement(name = "bearerAuth")
	@DeleteMapping("/contents/{id}")
	public ResponseEntity<ResponseDto> deleteSolutionContentById(@PathVariable("id") long id) {
		solutionService.deleteSolutionContentById(id);
		return ResponseUtil.get(null, HttpStatus.NO_CONTENT);
	}
}
