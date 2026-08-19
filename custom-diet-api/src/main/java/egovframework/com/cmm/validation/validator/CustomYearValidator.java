package egovframework.com.cmm.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.validation.annotation.CustomYear;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomYearValidator implements ConstraintValidator<CustomYear, String> {
	private final EgovMessageSource messageService;
	private String fieldName;

	@Override
	public void initialize(CustomYear constraintAnnotation) {
		fieldName = constraintAnnotation.fieldName();
	}

	public boolean isValid(String value, ConstraintValidatorContext context) {
		if (value != null && !"".equals(value) && !value.toString().matches("^\\d{4}$")) {
			buildContext(messageService.get("dto.year.invalid", fieldName), context);
			return false;
		}
		return true;
	}

	private void buildContext(String message, ConstraintValidatorContext context) {
		context.buildConstraintViolationWithTemplate(message).addConstraintViolation()
				.disableDefaultConstraintViolation();
	}

}