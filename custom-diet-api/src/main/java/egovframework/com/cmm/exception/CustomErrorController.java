package egovframework.com.cmm.exception;

import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.DateTimeUtil;

@Controller
@RequestMapping("/error")
public class CustomErrorController implements ErrorController {

    /**
     * Disables default spring error resource with list of attributes
     */
    @RequestMapping
    public ResponseEntity<ResponseDto> error(HttpServletRequest request) {
        HttpStatus status = getStatus(request);
		return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(List.of(status.name()))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status);
    }

    /**
     * Disables whitelist label page
     */
    @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<Map<String, Object>> errorHtml(HttpServletRequest request) {
        HttpStatus status = getStatus(request);
        return new ResponseEntity<>(status);
    }

    protected HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        try {
            return HttpStatus.valueOf(statusCode);
        }
        catch (Exception ex) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}