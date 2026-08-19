import { Input } from '@/components/ui/input';
import { useCheckErrorAccessoryName } from '@/hooks/diet.hook';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import { ICalculationItem } from '@/types/calculator.type';
import { CellContext, TableMeta } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';

interface CalculatorTableMeta extends TableMeta<ICalculationItem> {
  update: (
    rowId: string,
    rowCode: string,
    sequence: number,
    value: string
  ) => void;
}

const CustomCellName = ({
  table,
  row
}: CellContext<ICalculationItem, unknown>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const initialValue = row.original.name || '';
  const { isError } = useCheckErrorAccessoryName();

  const isMobile = useIsMobile();

  const [inputValue, setInputValue] = useState(() =>
    isMobile ? row.original.name || '' : undefined
  );

  const handleUpdateMeta = (value: string) => {
    return (table.options.meta as CalculatorTableMeta)?.update(
      row.original.code,
      row.original.typeCode,
      row.original.sequence,
      value
    );
  };

  useEffect(() => {
    if (isError && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isError]);

  useEffect(() => {
    if (isMobile) {
      setInputValue(row.original.name || '');
    }
  }, [row.original.name, isMobile]);

  const isAccessoryRow = !row.original.sequence && !row.original.typeCode;

  return (
    <>
      {isAccessoryRow ? (
        <div>
          {isMobile ? (
            <Input
              ref={inputRef}
              className={cn(isError ? 'border-2 border-destructive' : '')}
              placeholder="기타 부자재를 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={(eValue) => {
                handleUpdateMeta(eValue.target.value);
              }}
              maxLength={50}
            />
          ) : (
            <Input
              ref={inputRef}
              className={cn(isError ? 'border-2 border-destructive' : '')}
              placeholder="기타 부자재를 입력하세요"
              value={initialValue}
              onChange={(eValue) => handleUpdateMeta(eValue.target.value)}
              maxLength={50}
            />
          )}

          <p
            className={cn(
              isError ? 'text-destructive' : 'hidden',
              'mt-1 text-left'
            )}
          >
            이 필드는 필수입니다
          </p>
        </div>
      ) : (
        <p
          className={cn(
            'max-w-[60rem] text-left',
            row.original.code ? '' : 'text-base font-bold md:text-lg'
          )}
        >
          {initialValue}
        </p>
      )}
    </>
  );
};

export default CustomCellName;
