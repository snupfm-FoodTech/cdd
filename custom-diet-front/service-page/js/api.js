// ===================================
// API HANDLER MODULE
// ===================================

class APIHandler {
  constructor() {
    const baseUrl = window.__ENV__?.CD_APP_BACKEND;
    this.baseURL = baseUrl;
    this.endpoints = {
      commons: '/commons',
      formSubmit: '/open/corporate-consulting-request'
    };
    this.cache = {};
  }

  // Generic API call method with error handling
  async makeAPICall(url, options = {}) {
    const defaultOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, finalOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
        status: response.status
      };
    } catch (error) {
      console.error('API call failed:', error);

      return {
        success: false,
        error: error.message,
        status: error.status || 500
      };
    }
  }

  // Load commons data (existing functionality)
  async loadCommonsData(intgCd) {
    try {
      // Check cache first
      if (this.cache[intgCd]) {
        return {
          success: true,
          data: this.cache[intgCd]
        };
      }

      const url = `${this.baseURL}${this.endpoints.commons}?intgCd=${intgCd}`;
      const result = await this.makeAPICall(url);

      if (result.success) {
        // Check for API-specific errors
        if (result.data.hasErrors) {
          throw new Error(`API Error: ${result.data.errors}`);
        }

        // Cache successful result
        this.cache[intgCd] = result.data;
        return result;
      }

      return result;
    } catch (error) {
      console.error(`Error loading commons data for ${intgCd}:`, error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Submit form data to backend
  async submitForm(formData) {
    try {
      // Validate form data structure before sending
      const validationResult = this.validateFormDataStructure(formData);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: 'Invalid form data structure',
          details: validationResult.errors
        };
      }

      const url = `${this.baseURL}${this.endpoints.formSubmit}`;
      const result = await this.makeAPICall(url, {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (result.success) {
        return {
          success: true,
          data: result.data,
          message: '상담 신청이 성공적으로 완료되었습니다!'
        };
      } else {
        // Handle different error scenarios
        let errorMessage = '상담 신청 중 오류가 발생했습니다.';

        if (result.status === 400) {
          errorMessage = '입력하신 정보를 다시 확인해주세요.';
        } else if (result.status === 500) {
          errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        } else if (result.status === 408) {
          errorMessage = '요청 시간이 초과되었습니다. 다시 시도해주세요.';
        }

        return {
          success: false,
          error: errorMessage,
          details: result.error,
          status: result.status
        };
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      return {
        success: false,
        error:
          '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해주세요.',
        details: error.message
      };
    }
  }

  // Validate form data structure before API call
  validateFormDataStructure(formData) {
    const requiredFields = [
      'foodTechId',
      'companyName',
      'companyBizNo',
      'companyAddressId',
      'senderName',
      'senderPhoneNo',
      'senderEmail',
      'solutionTypeIds',
      'solutionTargetIds',
      'solutionTitle',
      'solutionDetail'
    ];

    const errors = [];

    // Check required fields
    requiredFields.forEach((field) => {
      if (!(field in formData)) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    // Check array fields
    if (formData.solutionTypeIds && !Array.isArray(formData.solutionTypeIds)) {
      errors.push('solutionTypeIds must be an array');
    }

    if (
      formData.solutionTargetIds &&
      !Array.isArray(formData.solutionTargetIds)
    ) {
      errors.push('solutionTargetIds must be an array');
    }

    // Check data types
    const stringFields = [
      'foodTechId',
      'companyName',
      'companyBizNo',
      'companyAddressId',
      'senderName',
      'senderPhoneNo',
      'senderEmail',
      'solutionTitle',
      'solutionDetail'
    ];
    stringFields.forEach((field) => {
      if (formData[field] && typeof formData[field] !== 'string') {
        errors.push(`${field} must be a string`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Transform form data to match API requirements
  transformFormData(formData) {
    // Create a copy to avoid modifying original data
    const transformedData = { ...formData };

    // Ensure arrays are properly formatted
    if (typeof transformedData.solutionTypeIds === 'string') {
      transformedData.solutionTypeIds = [transformedData.solutionTypeIds];
    }

    if (typeof transformedData.solutionTargetIds === 'string') {
      transformedData.solutionTargetIds = [transformedData.solutionTargetIds];
    }

    // Trim string values
    Object.keys(transformedData).forEach((key) => {
      if (typeof transformedData[key] === 'string') {
        transformedData[key] = transformedData[key].trim();
      }
    });

    // Map field names to exact API requirements
    const apiData = {
      foodTechId: transformedData.foodTechId,
      companyName: transformedData.companyName,
      companyBizNo: transformedData.companyBizNo,
      companyAddressId: transformedData.companyAddressId,
      senderName: transformedData.senderName,
      senderPhoneNo: transformedData.senderPhoneNo,
      senderEmail: transformedData.senderEmail,
      solutionTypeIds: transformedData.solutionTypeIds || [],
      solutionTargetIds: transformedData.solutionTargetIds || [],
      solutionTitle: transformedData.solutionTitle,
      solutionDetail: transformedData.solutionDetail
    };

    return apiData;
  }

  // Load all commons data concurrently
  async loadAllCommonsData() {
    const apiCodes = {
      foodtech: 'CD00016', // 푸드테크 분야
      regions: 'CD00017', // 지역
      solutions: 'CD00018', // 솔루션 유형
      targets: 'CD00019' // 솔루션 대상
    };

    try {
      if (typeof showAPILoadingState === 'function') {
        showAPILoadingState();
      }

      const promises = Object.values(apiCodes).map((code) =>
        this.loadCommonsData(code)
      );
      const results = await Promise.all(promises);

      // Check if all calls were successful
      const failedCalls = results.filter((result) => !result.success);
      if (failedCalls.length > 0) {
        throw new Error(`Failed to load ${failedCalls.length} data sets`);
      }

      const dataMap = {
        foodtech: results[0].data,
        regions: results[1].data,
        solutions: results[2].data,
        targets: results[3].data
      };

      return {
        success: true,
        data: dataMap
      };
    } catch (error) {
      console.error('Error loading all commons data:', error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      if (typeof hideAPILoadingState === 'function') {
        hideAPILoadingState();
      }
    }
  }

  // Retry mechanism for failed API calls
  async retryAPICall(apiCall, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await apiCall();

        if (result.success) {
          return result;
        }

        // If it's the last attempt, return the failed result
        if (attempt === maxRetries) {
          return result;
        }

        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      } catch (error) {
        console.error(`API call attempt ${attempt} failed:`, error);

        // If it's the last attempt, throw the error
        if (attempt === maxRetries) {
          throw error;
        }

        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      }
    }
  }

  // Health check method
  async checkAPIHealth() {
    try {
      const result = await this.makeAPICall(`${this.baseURL}/health`);
      return result.success;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  // Clear cache
  clearCache() {
    this.cache = {};
  }

  // Get cache status
  getCacheInfo() {
    return {
      cachedItems: Object.keys(this.cache).length,
      cacheKeys: Object.keys(this.cache)
    };
  }
}

// Export for global access
window.APIHandler = APIHandler;
