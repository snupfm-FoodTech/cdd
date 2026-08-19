import { CellContext, TableMeta } from '@tanstack/react-table';
import { ICalculationItem, ReceiptIncludedFlag } from '@/types/calculator.type';
import NumberInputInteger from '@/components/number-input-integer';
import { useMediaQuery } from 'usehooks-ts';

interface CalculatorTableMeta extends TableMeta<ICalculationItem> {
  update: (
    rowId: string,
    rowCode: string,
    sequence: number,
    value: number
  ) => void;
}

const CustomCellPrice = ({
  table,
  row
}: CellContext<ICalculationItem, unknown>) => {
  const initialValue = row.original.price || 0;
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleUpdateMeta = (value: number) => {
    row.original.price = value;

    return (table.options.meta as CalculatorTableMeta)?.update(
      row.original.code,
      row.original.typeCode,
      row.original.sequence,
      value
    );
  };

  return (
    <>
      {!row.original.typeCode && (
        <div className="flex items-center justify-center">
          <NumberInputInteger
            className="w-1/2 min-w-40 md:w-40"
            value={initialValue}
            onBlur={(value) => {
              if (!isMobile) return;
              handleUpdateMeta(value);
            }}
            onChange={(value) => {
              if (isMobile) return;
              handleUpdateMeta(value);
            }}
            maxLength={7}
          />
        </div>
      )}
    </>
  );
};

export default CustomCellPrice;
