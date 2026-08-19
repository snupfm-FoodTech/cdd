package egovframework.let.faq.web;

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
import egovframework.com.cmm.util.ResponseUtil;
import egovframework.let.faq.param.AddFaqParam;
import egovframework.let.faq.param.FindAllFaqParam;
import egovframework.let.faq.param.UpdateFaqParam;
import egovframework.let.faq.service.EgovFaqService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/faqs")
@RequiredArgsConstructor
@Validated
public class EgovFaqController {
	
    private final EgovFaqService faqService;

	@GetMapping
    public ResponseEntity<ResponseDto> findAllFaq(@Valid @ModelAttribute FindAllFaqParam params) {
        return ResponseUtil.get(faqService.findAllFaq(params), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ResponseDto> findFaqById(@PathVariable("id") int id) {
        return ResponseUtil.get(faqService.findFaqById(id), HttpStatus.OK);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Authorized
    @PostMapping
    public ResponseEntity<ResponseDto> addFaq(
            @Valid @RequestBody AddFaqParam param) {
        return ResponseUtil.get(faqService.addFaq(param), HttpStatus.CREATED);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Authorized
    @PutMapping(path = "/{id}")
    public ResponseEntity<ResponseDto> updateFaqById(
            @PathVariable("id") int faqId,
            @Valid @RequestBody UpdateFaqParam param) {
        return ResponseUtil.get(faqService.updateFaqById(faqId, param), HttpStatus.OK);
    }

    @SecurityRequirement(name = "bearerAuth")
    @Authorized
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<ResponseDto> deleteFaqById(@PathVariable("id") int id) {
        faqService.deleteFaqById(id);
        return ResponseUtil.get("Deleted", HttpStatus.NO_CONTENT);
    }
}