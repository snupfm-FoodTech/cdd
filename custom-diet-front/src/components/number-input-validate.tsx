import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { Input, InputProps } from './ui/input';
import { useMediaQuery } from 'usehooks-ts';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  maxLength?: number;
  className?: string;
  min?: number;
  max?: number;
  props?: InputProps;
}

const NumberInputValidate = ({
  value,
  onChange,
  maxLength = 4,
  className,
  min = 0,
  max = Math.pow(10, maxLength) - 1,
  ...props
}: NumberInputProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [internalValue, setInternalValue] = useState<string>(value.toString());

  useEffect(() => {
    setInternalValue(value.toString());
  }, [value]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    let parsedValue = parseInt(inputValue, 10);

    if (inputValue === '' || isNaN(parsedValue)) {
      parsedValue = min; // Default to min if empty or NaN
    }

    if (parsedValue < min) {
      parsedValue = min;
    } else if (parsedValue > max) {
      parsedValue = max;
    }

    setInternalValue(parsedValue.toString());
    onChange(parsedValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue) && inputValue.length <= maxLength) {
      // Check for numeric input only
      setInternalValue(inputValue);
    }
  };

  return (
    <Input
      type={isMobile ? 'number' : 'text'}
      value={internalValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        // Allow backspace, delete, arrow keys, etc.
        const ALLOWED_KEYS = [
          'Backspace',
          'Delete',
          'ArrowLeft',
          'ArrowRight',
          'Tab'
        ];
        // Prevent invalid characters and allow allowed keys
        const INVALID_KEYS = ['+', '-', 'e', 'E', '.'];
        if (
          INVALID_KEYS.includes(e.key) ||
          (!ALLOWED_KEYS.includes(e.key) &&
            e.key.length === 1 &&
            !/^\d$/.test(e.key))
        ) {
          e.preventDefault();
        }
      }}
      className={className}
      {...props}
    />
  );
};

export default NumberInputValidate;
