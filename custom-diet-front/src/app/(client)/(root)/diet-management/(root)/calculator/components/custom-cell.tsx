import { CellContext, TableMeta } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { ICalculationItem, ReceiptIncludedFlag } from '@/types/calculator.type';

interface CalculatorTableMeta extends TableMeta<ICalculationItem> {
  update: (
    rowId: string,
    rowCode: string,
    sequence: number,
    value: boolean
  ) => void;
}

const CustomCell = ({ table, row }: CellContext<ICalculationItem, unknown>) => {
  const initialValue =
    row.original.receiptIncludeFlag === ReceiptIncludedFlag.Yes;

  const handleUpdateMeta = (value: boolean) => {
    (table.options.meta as CalculatorTableMeta)?.update(
      row.original.code,
      row.original.typeCode,
      row.original.sequence,
      value
    );
  };

  return <Checkbox checked={initialValue} onCheckedChange={handleUpdateMeta} />;
};

export default CustomCell;
