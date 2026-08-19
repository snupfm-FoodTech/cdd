import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { Input, InputProps } from './ui/input';
import { useMediaQuery } from 'usehooks-ts';

interface FloatInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  maxLength?: number;
  className?: string;
  min?: number;
  max?: number;
  precision?: number;
  props?: InputProps;
}

const FloatInput = ({
  value,
  onChange,
  onBlur,
  maxLength = 3,
  className,
  min,
  max,
  precision = 2,
  ...props
}: FloatInputProps) => {
  const [internalValue, setInternalValue] = useState<string>(
    value ? value.toString() : ''
  );
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    setInternalValue(value ? value.toString() : '');
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Remove invalid characters (letters and commas)
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Ensure only one decimal point is allowed
    const parts = inputValue.split('.');
    if (parts.length > 2) {
      inputValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Enforce the precision limit
    if (parts.length === 2 && parts[1].length > precision) {
      parts[1] = parts[1].substring(0, precision);
      inputValue = parts.join('.');
    }

    // Enforce the maxLength for the integer part
    if (parts[0].length <= maxLength) {
      const parsedValue = parseFloat(inputValue);
      if (inputValue === '') {
        setInternalValue('');
        onChange(0); // Or handle empty value as you see fit
      } else if (!isNaN(parsedValue)) {
        setInternalValue(inputValue);
        onChange(parsedValue);
      }
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    let parsedValue = parseFloat(inputValue);

    if (inputValue === '' || isNaN(parsedValue)) {
      parsedValue = 0; // or handle as you see fit
    }

    if (min !== undefined && parsedValue < min) {
      parsedValue = min;
    } else if (max !== undefined && parsedValue > max) {
      parsedValue = max;
    }

    // Round the value to the specified precision
    parsedValue = parseFloat(parsedValue.toFixed(precision));

    setInternalValue(parsedValue.toString());
    onChange(parsedValue);
    onBlur?.();
  };

  return (
    <Input
      type={isMobile ? 'number' : 'text'}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        // Prevent the user from entering invalid characters
        const INVALID_KEYS = ['+', 'e', 'E'];
        if (INVALID_KEYS.includes(e.key)) {
          e.preventDefault();
        }
      }}
      className={className}
      min={min}
      max={max}
      {...props}
    />
  );
};

export default FloatInput;
