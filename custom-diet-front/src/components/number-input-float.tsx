import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { Input, InputProps } from './ui/input';
import { useMediaQuery } from 'usehooks-ts';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  className?: string;
  min?: number;
  max?: number;
  props?: InputProps;
  autoFocus?: boolean;
  readonly?: boolean;
}

const NumberInputFloat = ({
  autoFocus,
  value,
  onChange,
  onBlur,
  onFocus,
  readonly,
  maxLength = 20, // Max number of characters allowed in the input
  className,
  min,
  max,
  ...props
}: NumberInputProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [internalValue, setInternalValue] = useState<string>(value.toString());

  // Sync internal input string when external value changes
  useEffect(() => {
    setInternalValue(value.toString());
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // ✅ Allow only valid float formats like: "123", "0.5", ".75"
    const validFloatRegex = /^(\d+)?(\.\d*)?$/;
    if (inputValue === '' || validFloatRegex.test(inputValue)) {
      // ✅ Limit to 2 digits after the decimal point
      const dotIndex = inputValue.indexOf('.');
      if (dotIndex !== -1) {
        const decimalPart = inputValue.substring(dotIndex + 1);
        if (decimalPart.length > 2) return; // ❌ Reject if more than 2 decimal digits
      }

      // ✅ Enforce total max length if defined
      if (inputValue.length <= maxLength) {
        setInternalValue(inputValue); // Update local state to show input

        const parsedValue = parseFloat(inputValue);
        if (!isNaN(parsedValue)) {
          onChange(parsedValue); // Notify parent with valid numeric value
        }
      }
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let parsedValue = parseFloat(inputValue);

    // If empty or invalid, fallback to 0
    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    // Clamp within min and max if defined
    if (min !== undefined && parsedValue < min) {
      parsedValue = min;
    }
    if (max !== undefined && parsedValue > max) {
      parsedValue = max;
    }

    setInternalValue(parsedValue.toString()); // Update displayed input
    onChange(parsedValue); // Pass sanitized value
    onBlur?.(); // Optional external blur handler
  };

  return (
    <Input
      type={isMobile ? 'number' : 'text'}
      readOnly={readonly}
      autoFocus={autoFocus}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={onFocus}
      onKeyDown={(e) => {
        // Prevent scientific notation and math symbols
        const INVALID_KEYS = ['e', 'E', '+', '-'];
        if (INVALID_KEYS.includes(e.key)) {
          e.preventDefault();
        }
      }}
      className={className}
      {...props}
    />
  );
};

export default NumberInputFloat;
