package egovframework.let.consult_request.web;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.aop.authorization.Authorized;
import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.param.BasePagingParam;
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.let.consult_request.service.EgovConsultReqService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/consult-requests")
@RequiredArgsConstructor
@Validated
public class EgovConsultReqController {
	private final EgovConsultReqService consultReqService;
	
	@Authorized
	@GetMapping("/{id}")
    public ResponseEntity<ResponseDto> findConsultReqById(@PathVariable(name = "id") long id) {
        return ResponseUtil.get(consultReqService.findConsultReqById(id), HttpStatus.OK);
    }

	@Authorized
	@GetMapping
    public ResponseEntity<ResponseDto> findAllConsultReq(@Valid @ModelAttribute BasePagingParam param) {
        return ResponseUtil.get(consultReqService.findAllConsultReq(param), HttpStatus.OK);
    }
}