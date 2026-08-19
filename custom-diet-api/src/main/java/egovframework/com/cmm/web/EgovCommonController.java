package egovframework.com.cmm.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.service.EgovCommonService;
import egovframework.com.cmm.util.ResponseUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/commons")
@RequiredArgsConstructor
@Validated
public class EgovCommonController {
	
	private final EgovCommonService commonService;
	
	@GetMapping
	public ResponseEntity<ResponseDto> findAllDataByIntgCd(
			@RequestParam(name = "intgCd") String intgCd
		) {
		return ResponseUtil.get(commonService.findAllDataByIntgCd(intgCd), HttpStatus.OK);
	}
	
}
