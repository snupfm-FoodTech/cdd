export const arrayToString = (arr: string[]): string => {
  return arr.join(',');
};

export const convertToFormData = (input: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(input).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value) && value.every((item) => item instanceof File)) {
      value.forEach((file, index) => {
        formData.append(`${key}[${index}]`, file);
      });
      return;
    }

    formData.append(key, value);
  });

  return formData;
};
