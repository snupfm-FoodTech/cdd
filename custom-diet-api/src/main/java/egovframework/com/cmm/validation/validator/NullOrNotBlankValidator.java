package egovframework.com.cmm.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.validation.annotation.NullOrNotBlank;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class NullOrNotBlankValidator implements ConstraintValidator<NullOrNotBlank, String> {
	private final EgovMessageSource messageService;
	private String fieldName;

	@Override
	public void initialize(NullOrNotBlank constraintAnnotation) {
		fieldName = constraintAnnotation.fieldName();
	}

	public boolean isValid(String value, ConstraintValidatorContext context) {
		String message = messageService.get("dto.field.null-or-not-blank", fieldName);
		buildContext(message, context);
		return value == null || value.trim().length() > 0;
	}

	private void buildContext(String message, ConstraintValidatorContext context) {
		context.buildConstraintViolationWithTemplate(message).addConstraintViolation()
				.disableDefaultConstraintViolation();
	}
}