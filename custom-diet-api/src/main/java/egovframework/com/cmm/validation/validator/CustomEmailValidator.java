package egovframework.com.cmm.validation.validator;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.validation.annotation.CustomEmail;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomEmailValidator implements ConstraintValidator<CustomEmail, String> {
	private final EgovMessageSource messageService;
	private String message;
	
	@Override
	public void initialize(CustomEmail constraintAnnotation) {
		// TODO Auto-generated method stub
	}

	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value == null || "".equals(value)) {
			message = messageService.get("dto.field.null-or-not-blank", "Email");
			buildContext(message, context);
			return false;
		}
		if (("admin").equals(value)) {
			return true;
		}
		message = messageService.get("dto.email.invalid", value);
		buildContext(message, context);
		return Pattern.compile("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$").matcher(value).matches();
	}

	private void buildContext(String message, ConstraintValidatorContext context) {
		context.buildConstraintViolationWithTemplate(message).addConstraintViolation()
				.disableDefaultConstraintViolation();
	}
}
