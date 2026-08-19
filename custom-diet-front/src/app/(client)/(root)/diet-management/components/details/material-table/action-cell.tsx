import { useIsMobile } from '@/hooks/use-is-mobile';
import { Material } from '@/types/food.type';
import { CellContext, TableMeta } from '@tanstack/react-table';
import { CircleX } from 'lucide-react';

interface MaterialTableMeta extends TableMeta<Material> {
  remove: (rowId: string) => void;
}

const ActionCell = ({ row, table }: CellContext<Material, unknown>) => {
  const isMobile = useIsMobile();

  const handleRemove = () => {
    (table.options.meta as MaterialTableMeta)?.remove(row.original.code);
  };

  if (isMobile) {
    return (
      <div className="absolute right-2 top-2 z-10">
        <CircleX
          className="h-4 w-4 cursor-pointer text-destructive"
          onClick={handleRemove}
        />
      </div>
    );
  }

  return (
    <CircleX
      className="h-4 w-4 cursor-pointer text-destructive"
      onClick={handleRemove}
    />
  );
};

export default ActionCell;
