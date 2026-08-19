package egovframework.com.cmm.util;

import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;

import egovframework.com.cmm.exception.CustomException;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ErrorUtil {
	public static List<String> getErrorMessage(ValidationException exception) {
        return List.of(exception.getMessage());
    }
    public static List<String> getErrorMessage(MethodArgumentNotValidException exception) {
        return exception.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
    }

    public static List<String> getErrorMessage(ConstraintViolationException exception) {
        return exception.getConstraintViolations().stream().map(ConstraintViolation::getMessage).toList();
    }
    
    public static List<String> getErrorMessage(InvalidFormatException exception) {
    	return List.of(exception.getOriginalMessage());
    }

    public static List<String> getErrorMessage(CustomException exception) {
        return List.of(exception.getMessage());
    }
    
    public static List<String> getErrorMessage(Exception exception) {
        return List.of(String.format("%s occurred with message: %s", exception.getClass(), exception.getMessage()));
    }
}