import { FC } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Allergen } from '@/types/diet.type';

interface Props {
  data: Allergen[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  onClose: () => void;
}

const AllergenDialogContent: FC<Props> = ({
  data,
  selectedIds,
  onChange,
  onClose
}) => {
  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((x) => x !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <ScrollArea className="mt-6 h-64 pr-2">
        <div className="space-y-2">
          {data.map((item) => (
            <label key={item.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onCheckedChange={() => toggle(item.id)}
              />
              <span className="text-sm">{item.name}</span>
            </label>
          ))}
        </div>
      </ScrollArea>
      <div className="flex w-full items-center justify-center">
        <Button
          type="button"
          onClick={onClose}
          className="w-fit min-w-20"
          variant="outline"
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default AllergenDialogContent;
