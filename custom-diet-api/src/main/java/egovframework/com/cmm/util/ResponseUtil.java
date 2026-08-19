package egovframework.com.cmm.util;

import java.util.List;

import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import egovframework.com.cmm.dto.ResponseDto;
import egovframework.com.cmm.exception.CustomException;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ResponseUtil {
    public static ResponseEntity<ResponseDto> get(Object dto, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(dto)
                        .hasErrors(false)
                        .errors(null)
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }

    public static ResponseEntity<ResponseDto> error(ValidationException exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(ErrorUtil.getErrorMessage(exception))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }
    
    public static ResponseEntity<ResponseDto> error(MethodArgumentNotValidException exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(ErrorUtil.getErrorMessage(exception))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }

    public static ResponseEntity<ResponseDto> error(InvalidFormatException exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(ErrorUtil.getErrorMessage(exception))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }

    public static ResponseEntity<ResponseDto> error(ConstraintViolationException exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(ErrorUtil.getErrorMessage(exception))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }

    public static ResponseEntity<ResponseDto> error(CustomException exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(ErrorUtil.getErrorMessage(exception))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }

    public static ResponseEntity<ResponseDto> error(Exception exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(ErrorUtil.getErrorMessage(exception))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }
    
    public static ResponseEntity<ResponseDto> error(BadSqlGrammarException exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(List.of("Bad SQL"))
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }        
    
    public static ResponseEntity<ResponseDto> error(BindException exception, HttpStatus status) {
        return new ResponseEntity<>(
                ResponseDto
                        .builder()
                        .content(null)
                        .hasErrors(true)
                        .errors(exception.getAllErrors().stream().map(error -> error.getDefaultMessage()).distinct().toList())
                        .timeStamp(DateTimeUtil.now())
                        .statusCode(status.value())
                        .build(),
                status
        );
    }
}
