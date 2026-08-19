// ===================================
// FORM VALIDATION MODULE
// ===================================

class FormValidator {
    constructor() {
        this.validationRules = {
            // Database field constraints based on BE requirements
            foodTechId: {
                required: true,
                maxLength: 50,
                message: '푸드테크 분야를 선택해주세요.'
            },
            companyName: {
                required: true,
                maxLength: 100,
                message: '기업명을 입력해주세요.',
                invalidMessage: '기업명은 100자 이하로 입력해주세요.'
            },
            companyBizNo: {
                required: true,
                maxLength: 50,
                pattern: /^\d{3}-\d{2}-\d{5}$/,
                message: '사업자등록번호를 모두 입력해주세요.',
                formatMessage: '올바른 사업자등록번호 형식(000-00-00000)을 입력해주세요.'
            },
            companyAddressId: {
                required: true,
                maxLength: 200,
                message: '기업 주소를 선택해주세요.'
            },
            senderName: {
                required: true,
                maxLength: 100,
                message: '신청자명을 입력해주세요.',
                invalidMessage: '신청자명은 100자 이하로 입력해주세요.'
            },
            senderPhoneNo: {
                required: true,
                maxLength: 50,
                pattern: /^010-\d{4}-\d{4}$/,
                message: '휴대폰 번호를 모두 입력해주세요.',
                formatMessage: '올바른 휴대폰 번호 형식(010-0000-0000)을 입력해주세요.'
            },
            senderEmail: {
                required: true,
                maxLength: 255,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: '이메일을 입력해주세요.',
                formatMessage: '올바른 이메일 형식을 입력해주세요.',
                invalidMessage: '이메일은 255자 이하로 입력해주세요.'
            },
            solutionTypeIds: {
                required: true,
                minCount: 1,
                message: '최소 1개 이상의 솔루션 유형을 선택해주세요.'
            },
            solutionTargetIds: {
                required: true,
                minCount: 1,
                message: '최소 1개 이상의 솔루션 대상을 선택해주세요.'
            },
            solutionTitle: {
                required: true,
                maxLength: 50,
                message: '상담 신청 제목을 입력해주세요.',
                invalidMessage: '제목은 50자 이하로 입력해주세요.'
            },
            solutionDetail: {
                required: true,
                maxLength: 5000,
                minLength: 10,
                message: '솔루션 신청내용을 입력해주세요.',
                minLengthMessage: '최소 10자 이상 입력해주세요.',
                invalidMessage: '솔루션 신청내용은 5000자 이하로 입력해주세요.'
            }
        };
    }

    // Validate individual field
    validateField(fieldName, value, rule) {
        const errors = [];

        // Required validation
        if (rule.required && (!value || (Array.isArray(value) && value.length === 0) || value.toString().trim() === '')) {
            errors.push(rule.message);
            return errors;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.toString().trim() === '') {
            return errors;
        }

        // String length validation
        if (rule.maxLength && value.toString().length > rule.maxLength) {
            errors.push(rule.invalidMessage || `${fieldName}은(는) ${rule.maxLength}자 이하로 입력해주세요.`);
        }

        if (rule.minLength && value.toString().length < rule.minLength) {
            errors.push(rule.minLengthMessage || `${fieldName}은(는) ${rule.minLength}자 이상 입력해주세요.`);
        }

        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value.toString())) {
            errors.push(rule.formatMessage || rule.message);
        }

        // Array count validation
        if (rule.minCount && Array.isArray(value) && value.length < rule.minCount) {
            errors.push(rule.message);
        }

        return errors;
    }

    // Get form data from DOM
    getFormData() {
        const formData = {
            foodTechId: document.getElementById('foodtech-field')?.value || '',
            companyName: document.getElementById('company-name')?.value?.trim() || '',
            companyBizNo: this.getBusinessNumber(),
            companyAddressId: this.getCompanyAddressId(),
            senderName: document.getElementById('applicant-name')?.value?.trim() || '',
            senderPhoneNo: this.getPhoneNumber(),
            senderEmail: document.getElementById('email')?.value?.trim() || '',
            solutionTypeIds: this.getSelectedSolutionTypes(),
            solutionTargetIds: this.getSelectedSolutionTargets(),
            solutionTitle: document.getElementById('solution-title')?.value?.trim() || '',
            solutionDetail: document.getElementById('solution-details')?.value?.trim() || ''
        };

        return formData;
    }

    // Helper methods to get specific form data
    getBusinessNumber() {
        const business1 = document.getElementById('business-1')?.value || '';
        const business2 = document.getElementById('business-2')?.value || '';
        const business3 = document.getElementById('business-3')?.value || '';

        if (business1 && business2 && business3) {
            return `${business1}-${business2}-${business3}`;
        }
        return '';
    }

    getPhoneNumber() {
        const phone1 = document.getElementById('phone-1')?.value || '';
        const phone2 = document.getElementById('phone-2')?.value || '';
        const phone3 = document.getElementById('phone-3')?.value || '';

        if (phone1 && phone2 && phone3) {
            return `${phone1}-${phone2}-${phone3}`;
        }
        return '';
    }

    getCompanyAddressId() {
        const addressSelect = document.getElementById('company-address');
        if (!addressSelect || !addressSelect.value) return '';

        // Get the code from data attribute or use the value
        const selectedOption = addressSelect.options[addressSelect.selectedIndex];
        return selectedOption?.getAttribute('data-code') || addressSelect.value;
    }

    getSelectedSolutionTypes() {
        const selectedElements = document.querySelectorAll('#solution-types .feature-item.selected');
        return Array.from(selectedElements).map(el => el.getAttribute('data-type')).filter(Boolean);
    }

    getSelectedSolutionTargets() {
        const selectedElements = document.querySelectorAll('#solution-targets .feature-item.selected');
        return Array.from(selectedElements).map(el => el.getAttribute('data-target')).filter(Boolean);
    }

    // Validate entire form
    validateForm() {
        const formData = this.getFormData();
        const allErrors = {};
        let isValid = true;

        // Validate each field
        Object.keys(this.validationRules).forEach(fieldName => {
            const rule = this.validationRules[fieldName];
            const value = formData[fieldName];
            const errors = this.validateField(fieldName, value, rule);

            if (errors.length > 0) {
                allErrors[fieldName] = errors;
                isValid = false;
            }
        });

        // Additional business logic validations
        const additionalErrors = this.validateBusinessLogic(formData);
        if (Object.keys(additionalErrors).length > 0) {
            Object.assign(allErrors, additionalErrors);
            isValid = false;
        }

        return {
            isValid,
            errors: allErrors,
            formData
        };
    }

    // Additional business logic validations
    validateBusinessLogic(formData) {
        const errors = {};

        // Validate business number checksum (Korean business number validation)
        // if (formData.companyBizNo && this.validationRules.companyBizNo.pattern.test(formData.companyBizNo)) {
        //     if (!this.validateBusinessNumberChecksum(formData.companyBizNo)) {
        //         errors.companyBizNo = ['유효하지 않은 사업자등록번호입니다.'];
        //     }
        // }

        // Validate phone number prefix
        if (formData.senderPhoneNo) {
            const validPrefixes = ['010', '011', '016', '017', '018', '019'];
            const prefix = formData.senderPhoneNo.split('-')[0];
            if (!validPrefixes.includes(prefix)) {
                errors.senderPhoneNo = ['유효하지 않은 휴대폰 번호 앞자리입니다.'];
            }
        }

        // Validate email domain
        if (formData.senderEmail && this.validationRules.senderEmail.pattern.test(formData.senderEmail)) {
            const domain = formData.senderEmail.split('@')[1];
            if (domain && domain.length < 3) {
                errors.senderEmail = ['유효하지 않은 이메일 도메인입니다.'];
            }
        }

        return errors;
    }

    // Korean business number checksum validation
    validateBusinessNumberChecksum(businessNumber) {
        const cleanNumber = businessNumber.replace(/-/g, '');
        if (cleanNumber.length !== 10) return false;

        const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];
        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleanNumber[i]) * weights[i];
        }

        const remainder = sum % 10;
        const checkDigit = remainder === 0 ? 0 : 10 - remainder;

        return checkDigit === parseInt(cleanNumber[9]);
    }

    // Display validation errors in UI
    displayErrors(errors) {
        // Clear all previous errors
        this.clearAllErrors();

        let firstErrorField = null;

        // Display errors for each field
        Object.keys(errors).forEach(fieldName => {
            const errorMessages = errors[fieldName];
            if (errorMessages && errorMessages.length > 0) {
                const errorMessage = errorMessages[0]; // Show first error

                // Map field names to UI field IDs
                const fieldMapping = {
                    foodTechId: 'foodtech-field',
                    companyName: 'company-name',
                    companyBizNo: 'business-1',
                    companyAddressId: 'company-address',
                    senderName: 'applicant-name',
                    senderPhoneNo: 'phone-1',
                    senderEmail: 'email',
                    solutionTypeIds: 'solution-types',
                    solutionTargetIds: 'solution-targets',
                    solutionTitle: 'solution-title',
                    solutionDetail: 'solution-details'
                };

                const uiFieldId = fieldMapping[fieldName];
                if (uiFieldId) {
                    this.showFieldError(uiFieldId, errorMessage);
                    if (!firstErrorField) {
                        firstErrorField = uiFieldId;
                    }
                }
            }
        });

        // Scroll to first error
        if (firstErrorField) {
            this.scrollToError(firstErrorField);
            if (typeof showErrorToast === 'function') {
                showErrorToast('입력하신 정보를 다시 확인해주세요.');
            }
        }

        return firstErrorField;
    }

    // Show error for specific field
    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId + '-error');

        if (field) {
            field.classList.add('error');
        }
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    // Clear all errors
    clearAllErrors() {
        // Clear form field errors
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });

        // Remove error classes
        const fieldElements = document.querySelectorAll('.form-control.error');
        fieldElements.forEach(el => {
            el.classList.remove('error');
        });
    }

    // Scroll to error field
    scrollToError(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            // Special handling for feature grids
            if (fieldId === 'solution-types' || fieldId === 'solution-targets') {
                const section = field.closest('.section');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                field.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    field.focus();
                }, 500);
            }
        }
    }

    // Validate specific page
    validatePage(pageNumber) {
        const formData = this.getFormData();
        let fieldsToValidate = [];

        switch (pageNumber) {
            case 1:
                fieldsToValidate = ['foodTechId', 'companyName', 'companyBizNo', 'companyAddressId', 'senderName', 'senderPhoneNo', 'senderEmail'];
                break;
            case 2:
                fieldsToValidate = ['solutionTypeIds', 'solutionTargetIds', 'solutionTitle', 'solutionDetail'];
                break;
            case 3:
                // Page 3 has agreement validation handled separately
                return this.validateAgreements();
            default:
                return { isValid: true, errors: {}, formData };
        }

        const errors = {};
        let isValid = true;

        fieldsToValidate.forEach(fieldName => {
            const rule = this.validationRules[fieldName];
            const value = formData[fieldName];
            const fieldErrors = this.validateField(fieldName, value, rule);

            if (fieldErrors.length > 0) {
                errors[fieldName] = fieldErrors;
                isValid = false;
            }
        });

        // Add business logic validation for page 1
        if (pageNumber === 1) {
            const businessLogicErrors = this.validateBusinessLogic(formData);
            Object.assign(errors, businessLogicErrors);
            if (Object.keys(businessLogicErrors).length > 0) {
                isValid = false;
            }
        }

        return { isValid, errors, formData };
    }

    // Validate agreements (Page 3)
    validateAgreements() {
        const agree1 = document.getElementById('agree1')?.checked || false;
        const agree2 = document.getElementById('agree2')?.checked || false;

        if (!agree1 || !agree2) {
            const errors = { agreement: ['필수 약관에 모두 동의해주세요.'] };
            this.showFieldError('agreement', errors.agreement[0]);

            const agreementSection = document.querySelector('#page3 .section');
            if (agreementSection) {
                agreementSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            if (typeof showErrorToast === 'function') {
                showErrorToast('필수 약관에 동의해주세요.');
            }

            return { isValid: false, errors, formData: {} };
        }

        return { isValid: true, errors: {}, formData: {} };
    }
}

// Export for global access
window.FormValidator = FormValidator;