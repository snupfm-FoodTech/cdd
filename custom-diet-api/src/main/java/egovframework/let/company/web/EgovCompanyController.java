package egovframework.let.company.web;

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
import egovframework.let.company.param.AddCompanyParam;
import egovframework.let.company.param.FindAllCompanyParam;
import egovframework.let.company.param.UpdateCompanyParam;
import egovframework.let.company.service.EgovCompanyService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
@Validated
public class EgovCompanyController {

	private final EgovCompanyService companyService;

	@GetMapping("/type")
	public ResponseEntity<ResponseDto> findAllCompanyType() {
		return ResponseUtil.get(companyService.findAllCompanyType(), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<ResponseDto> findAllCompany(@Valid @ModelAttribute FindAllCompanyParam params) {
		return ResponseUtil.get(companyService.findAllCompany(params), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ResponseDto> findCompanyById(@PathVariable("id") int id) {
		return ResponseUtil.get(companyService.findCompanyById(id), HttpStatus.OK);
	}
	
	@GetMapping("/size")
	public ResponseEntity<ResponseDto> findAllCompanySize() {	
		return ResponseUtil.get(companyService.findAllCompanySize(), HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> addCompany(
			@Valid @ModelAttribute AddCompanyParam param) {
		return ResponseUtil.get(companyService.addCompany(param), HttpStatus.CREATED);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<ResponseDto> updateCompany(
			@PathVariable("id") int coId,
			@Valid @ModelAttribute UpdateCompanyParam param) {
		return ResponseUtil.get(companyService.updateCompany(coId, param), HttpStatus.OK);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@Authorized
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDto> deleteCompany(@PathVariable("id") int coId) {
		companyService.deleteCompany(coId);
		return ResponseUtil.get("Deleted", HttpStatus.NO_CONTENT);
	} 
	
	@PostMapping("/view/{id}")
	public ResponseEntity<ResponseDto> increaseViewById(@PathVariable("id") int id) {
		companyService.increaseViewById(id);
		return ResponseUtil.get("OK", HttpStatus.OK);
	}
}