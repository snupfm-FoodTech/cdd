package egovframework.com.cmm.validation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.validation.annotation.NullOrPositiveNo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class NullOrPositiveNoValidator implements ConstraintValidator<NullOrPositiveNo, Number> {
	private final EgovMessageSource messageService;
	private String message;

	@Override
	public void initialize(NullOrPositiveNo constraintAnnotation) {
		message = messageService.get("dto.number.null-or-positive", constraintAnnotation.fieldName());
	}

	@Override
	public boolean isValid(Number value, ConstraintValidatorContext context) {
		context.buildConstraintViolationWithTemplate(message).addConstraintViolation()
				.disableDefaultConstraintViolation();
		if (value == null) {
			return true;
		}
		
		return value.intValue() > 0;
	}
}