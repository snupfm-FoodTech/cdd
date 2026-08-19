import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { Input, InputProps } from './ui/input';
import { useMediaQuery } from 'usehooks-ts';

interface NumberInputIntegerProps {
  value: number;
  onChange: (value: number) => void;
  onFocus?: () => void;
  onBlur?: (value: number) => void;
  maxLength?: number;
  className?: string;
  min?: number;
  max?: number;
  props?: InputProps;
  autoFocus?: boolean;
  readonly?: boolean;
}

const NumberInputInteger = ({
  autoFocus,
  value,
  onChange,
  onBlur,
  onFocus,
  readonly,
  maxLength = 4,
  className,
  min = 0,
  max = Math.pow(10, maxLength) - 1,
  ...props
}: NumberInputIntegerProps) => {
  const [internalValue, setInternalValue] = useState<string>(value.toString());
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    setInternalValue(value.toString());
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (inputValue.startsWith('-')) {
      inputValue = inputValue.slice(1);
    }

    if (inputValue.length <= maxLength) {
      const parsedValue = parseInt(inputValue, 10);
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
    let parsedValue = parseInt(inputValue, 10);

    if (inputValue === '' || isNaN(parsedValue)) {
      parsedValue = 0;
    }

    if (min !== undefined && parsedValue < min) {
      parsedValue = min;
    } else if (max !== undefined && parsedValue > max) {
      parsedValue = max;
    }

    setInternalValue(parsedValue.toString());
    onChange(parsedValue); // sync value

    if (onBlur) {
      (onBlur as (value: number) => void)(parsedValue);
    }
  };

  return (
    <Input
      type="number"
      readOnly={readonly}
      autoFocus={autoFocus}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={onFocus}
      onKeyDown={(e) => {
        // Prevent the user from entering a negative sign
        const INVALID_KEYS = ['+', '-', 'e', 'E', '.', ','];
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

export default NumberInputInteger;
