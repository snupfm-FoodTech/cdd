// ===================================
// FORM HANDLER MODULE
// ===================================

class FormHandler {
    constructor() {
        this.validator = new FormValidator();
        this.apiHandler = new APIHandler();
        this.isSubmitting = false;
        this.fieldMapping = {
            foodTechId: 'foodtech-field',
            companyName: 'company-name',
            companyBizNo: 'business-1',
            companyAddressId: 'company-address',
            senderName: 'applicant-name',
            senderPhoneNo: 'phone-1',
            senderEmail: 'email',
            solutionTitle: 'solution-title',
            solutionDetail: 'solution-details'
        };
    }

    // Handle form submission for each page
    async handlePageSubmission(pageNumber) {

        // Validate current page
        const validationResult = this.validator.validatePage(pageNumber);

        if (!validationResult.isValid) {
            this.validator.displayErrors(validationResult.errors);
            return false;
        }

        // Clear any existing errors
        this.validator.clearAllErrors();

        // Special handling for final submission (page 3)
        if (pageNumber === 3) {
            return await this.handleFinalSubmission();
        }

        return true;
    }

    // Handle final form submission
    async handleFinalSubmission() {
        try {
            // Prevent double submission
            if (this.isSubmitting) {
                return false;
            }

            this.isSubmitting = true;

            // Show loading state
            this.showSubmissionLoadingState();

            // Validate entire form
            const validationResult = this.validator.validateForm();

            if (!validationResult.isValid) {
                this.validator.displayErrors(validationResult.errors);
                this.hideSubmissionLoadingState();
                this.isSubmitting = false;
                return false;
            }


            // Transform data for API
            const apiData = this.apiHandler.transformFormData(validationResult.formData);

            // Submit to API
            const submitResult = await this.apiHandler.submitForm(apiData);

            if (submitResult.success) {

                // Clear saved form data
                this.clearSavedFormData();

                // Show success message
                if (typeof showSuccessToast === 'function') {
                    showSuccessToast(submitResult.message || '상담 신청이 완료되었습니다!');
                }

                // Hide loading state
                this.hideSubmissionLoadingState();
                this.isSubmitting = false;

                return true;
            } else {
                console.error('Form submission failed:', submitResult);

                // Show error message
                if (typeof showErrorToast === 'function') {
                    showErrorToast(submitResult.error || '상담 신청 중 오류가 발생했습니다.');
                }

                // If there are specific field errors, display them
                if (submitResult.fieldErrors) {
                    this.validator.displayErrors(submitResult.fieldErrors);
                }

                this.hideSubmissionLoadingState();
                this.isSubmitting = false;
                return false;
            }
        } catch (error) {
            console.error('Unexpected error during form submission:', error);

            if (typeof showErrorToast === 'function') {
                showErrorToast('예기치 않은 오류가 발생했습니다. 다시 시도해주세요.');
            }

            this.hideSubmissionLoadingState();
            this.isSubmitting = false;
            return false;
        }
    }

    // Show loading state during submission
    showSubmissionLoadingState() {
        // Disable submit button
        const submitButtons = document.querySelectorAll('.btn-primary');
        submitButtons.forEach(btn => {
            btn.disabled = true;
            btn.innerHTML = '<div class="spinner" style="width: 20px; height: 20px; margin: 0 auto;"></div>';
        });

        // Show loading overlay
        if (typeof showAPILoadingState === 'function') {
            showAPILoadingState();
        }
    }

    // Hide loading state
    hideSubmissionLoadingState() {
        // Re-enable submit button
        const submitButtons = document.querySelectorAll('.btn-primary');
        submitButtons.forEach(btn => {
            btn.disabled = false;
            btn.innerHTML = '상담 신청';
        });

        // Hide loading overlay
        if (typeof hideAPILoadingState === 'function') {
            hideAPILoadingState();
        }
    }

    // Clear saved form data
    clearSavedFormData() {
        try {
            localStorage.removeItem('consultationFormData');
        } catch (error) {
            console.error('Error clearing saved form data:', error);
        }
    }

    // Get current form data for debugging
    getCurrentFormData() {
        return this.validator.getFormData();
    }

    // Validate specific field in real-time
    validateFieldRealTime(fieldName, value) {
        const rule = this.validator.validationRules[fieldName];
        if (!rule) return true;

        const errors = this.validator.validateField(fieldName, value, rule);

        if (errors.length > 0) {
            const uiFieldId = this.fieldMapping[fieldName];
            if (uiFieldId) {
                this.validator.showFieldError(uiFieldId, errors[0]);
            }
            return false;
        } else {
            const uiFieldId = this.fieldMapping[fieldName];
            if (uiFieldId) {
                const field = document.getElementById(uiFieldId);
                const errorDiv = document.getElementById(uiFieldId + '-error');

                if (field) field.classList.remove('error');
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                    errorDiv.textContent = '';
                }
            }
            return true;
        }
    }

    // Setup real-time validation listeners
    setupRealTimeValidation() {
        // Company name validation
        const companyNameField = document.getElementById('company-name');
        if (companyNameField) {
            companyNameField.addEventListener('blur', (e) => {
                this.validateFieldRealTime('companyName', e.target.value);
            });
        }

        // Business number validation
        const businessFields = ['business-1', 'business-2', 'business-3'];
        businessFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    const businessNumber = this.validator.getBusinessNumber();
                    if (businessNumber) {
                        this.validateFieldRealTime('companyBizNo', businessNumber);
                    }
                });
            }
        });

        // ✅ NEW: Foodtech field validation (select)
        const foodtechField = document.getElementById('foodtech-field');
        if (foodtechField) {
            foodtechField.addEventListener('change', (e) => {
                this.validateFieldRealTime('foodTechId', e.target.value);
                this.saveFormData(); // Auto-save on change
            });
        }

        // ✅ NEW: Company address field validation (select)
        const companyAddressField = document.getElementById('company-address');
        if (companyAddressField) {
            companyAddressField.addEventListener('change', (e) => {
                // Get the code from data attribute or use the value
                const selectedOption = e.target.options[e.target.selectedIndex];
                const addressValue = selectedOption?.getAttribute('data-code') || e.target.value;
                this.validateFieldRealTime('companyAddressId', addressValue);
                this.saveFormData(); // Auto-save on change
            });
        }

        // Sender name validation
        const senderNameField = document.getElementById('applicant-name');
        if (senderNameField) {
            senderNameField.addEventListener('blur', (e) => {
                this.validateFieldRealTime('senderName', e.target.value);
            });
        }

        // Phone number validation
        const phoneFields = ['phone-1', 'phone-2', 'phone-3'];
        phoneFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    const phoneNumber = this.validator.getPhoneNumber();
                    if (phoneNumber) {
                        this.validateFieldRealTime('senderPhoneNo', phoneNumber);
                    }
                });
            }
        });

        // Email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', (e) => {
                this.validateFieldRealTime('senderEmail', e.target.value);
            });
        }

        // Solution title validation
        const solutionTitleField = document.getElementById('solution-title');
        if (solutionTitleField) {
            solutionTitleField.addEventListener('blur', (e) => {
                this.validateFieldRealTime('solutionTitle', e.target.value);
            });
        }

        // Solution details validation
        const solutionDetailsField = document.getElementById('solution-details');
        if (solutionDetailsField) {
            solutionDetailsField.addEventListener('blur', (e) => {
                this.validateFieldRealTime('solutionDetail', e.target.value);
            });
        }
    }

    // Handle form auto-save
    setupAutoSave() {
        const formElements = document.querySelectorAll('input, select, textarea');
        formElements.forEach(element => {
            element.addEventListener('input', () => {
                this.saveFormData();
            });
            element.addEventListener('change', () => {
                this.saveFormData();
            });
        });
    }

    // Save form data to localStorage
    saveFormData() {
        try {
            const formData = this.validator.getFormData();
            localStorage.setItem('consultationFormData', JSON.stringify(formData));
        } catch (error) {
            console.error('Error saving form data:', error);
        }
    }

    // Load saved form data
    loadSavedFormData() {
        try {
            const savedData = localStorage.getItem('consultationFormData');
            if (!savedData) return;

            const formData = JSON.parse(savedData);

            // Populate form fields
            if (formData.foodTechId) {
                const foodtechField = document.getElementById('foodtech-field');
                if (foodtechField) foodtechField.value = formData.foodTechId;
            }

            if (formData.companyName) {
                const companyNameField = document.getElementById('company-name');
                if (companyNameField) companyNameField.value = formData.companyName;
            }

            // Business number
            if (formData.companyBizNo) {
                const parts = formData.companyBizNo.split('-');
                if (parts.length === 3) {
                    const business1 = document.getElementById('business-1');
                    const business2 = document.getElementById('business-2');
                    const business3 = document.getElementById('business-3');

                    if (business1) business1.value = parts[0];
                    if (business2) business2.value = parts[1];
                    if (business3) business3.value = parts[2];
                }
            }

            if (formData.companyAddressId) {
                const addressField = document.getElementById('company-address');
                if (addressField) {
                    // Try to find option by data-code first, then by value
                    const options = Array.from(addressField.options);
                    const matchingOption = options.find(opt =>
                        opt.getAttribute('data-code') === formData.companyAddressId ||
                        opt.value === formData.companyAddressId
                    );
                    if (matchingOption) {
                        addressField.value = matchingOption.value;
                    }
                }
            }

            if (formData.senderName) {
                const senderNameField = document.getElementById('applicant-name');
                if (senderNameField) senderNameField.value = formData.senderName;
            }

            // Phone number
            if (formData.senderPhoneNo) {
                const parts = formData.senderPhoneNo.split('-');
                if (parts.length === 3) {
                    const phone1 = document.getElementById('phone-1');
                    const phone2 = document.getElementById('phone-2');
                    const phone3 = document.getElementById('phone-3');

                    if (phone1) phone1.value = parts[0];
                    if (phone2) phone2.value = parts[1];
                    if (phone3) phone3.value = parts[2];
                }
            }

            if (formData.senderEmail) {
                const emailField = document.getElementById('email');
                if (emailField) emailField.value = formData.senderEmail;
            }

            if (formData.solutionTitle) {
                const titleField = document.getElementById('solution-title');
                if (titleField) titleField.value = formData.solutionTitle;
            }

            if (formData.solutionDetail) {
                const detailsField = document.getElementById('solution-details');
                if (detailsField) detailsField.value = formData.solutionDetail;
            }

            // Restore selected solution types and targets
            if (formData.solutionTypeIds && Array.isArray(formData.solutionTypeIds)) {
                formData.solutionTypeIds.forEach(typeId => {
                    const element = document.querySelector(`#solution-types [data-type="${typeId}"]`);
                    if (element) element.classList.add('selected');
                });
            }

            if (formData.solutionTargetIds && Array.isArray(formData.solutionTargetIds)) {
                formData.solutionTargetIds.forEach(targetId => {
                    const element = document.querySelector(`#solution-targets [data-target="${targetId}"]`);
                    if (element) element.classList.add('selected');
                });
            }

        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }

    // Initialize form handler
    initialize() {

        // Setup real-time validation
        this.setupRealTimeValidation();

        // Setup auto-save
        this.setupAutoSave();

        // Load saved data
        this.loadSavedFormData();

    }

    // Get form validation summary for debugging
    getValidationSummary() {
        const validationResult = this.validator.validateForm();
        return {
            isValid: validationResult.isValid,
            errorCount: Object.keys(validationResult.errors).length,
            errors: validationResult.errors,
            formData: validationResult.formData
        };
    }
}

// Export for global access
window.FormHandler = FormHandler;