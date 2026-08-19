package egovframework.com.cmm.exception;

import org.mybatis.spring.MyBatisSystemException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.util.ResponseUtil;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	private void logError(Exception e) {
        log.error("{} occurred with message: {}", e.getClass(), e.getMessage());
        if (e.getCause() != null) {
            log.error(e.getCause().toString());
        }
        if (e.getLocalizedMessage() != null) {
        	log.error(e.getLocalizedMessage());
        }
        if (e.getStackTrace() != null) {
            log.error(Arrays.toString(e.getStackTrace()));
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseDto> handleException(Exception exception) {
    	log.error("handleException triggered!");
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ResponseDto> handleValidationException(ValidationException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ResponseDto> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException exception) {   
    	logError(exception);
        return ResponseUtil.error(exception, HttpStatus.BAD_REQUEST);
    }
    
    /**
     * Exception may throw from FIELD constraints such as (size, not-blank, our customized-constraints...)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDto> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {   
    	logError(exception);
        return ResponseUtil.error(exception, HttpStatus.BAD_REQUEST);
    }

    /**
     * Exception may throw when trying to map the request body into the DTO
     * example:
     *      - Mapping an invalid Date format into the "Date" field
     */
    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<ResponseDto> handleInvalidFormatException(InvalidFormatException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.BAD_REQUEST);
    }

    /**
     * ConstraintViolationException implements ValidationException. It catches the exception before
     * ValidationException.
     * Exception may throw from PARAMETER constraints
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ResponseDto> handleConstraintViolationException(ConstraintViolationException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomAuthorizationException.class)
    public ResponseEntity<ResponseDto> handleCustomAuthorizationException(CustomAuthorizationException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(CustomAuthenticationException.class)
    public ResponseEntity<ResponseDto> handleCustomAuthenticationException(CustomAuthenticationException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.UNAUTHORIZED);
    }
 
    @ExceptionHandler(MyBatisSystemException.class)
    public ResponseEntity<ResponseDto> handleMyBatisSystemException(MyBatisSystemException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(CustomNotFoundException.class)
    public ResponseEntity<ResponseDto> handleCustomNotFoundException(CustomNotFoundException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(BadSqlGrammarException.class)
    public ResponseEntity<ResponseDto> handleBadSqlGrammarException(BadSqlGrammarException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ResponseDto> handleBindException(BindException exception) {
        logError(exception);
        return ResponseUtil.error(exception, HttpStatus.BAD_REQUEST);
    }
}