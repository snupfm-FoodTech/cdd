import { Button } from '@/components/ui/button';
import { AddedMaterial } from '@/types/food.type';
import { useFormContext } from 'react-hook-form';

interface MaterialSearchResultItemProps {
  material: AddedMaterial;
}

const MaterialSearchResultItem = ({
  material
}: MaterialSearchResultItemProps) => {
  const { setValue, getValues } = useFormContext();

  if (!material) {
    return null;
  }

  const handleAddMaterial = () => {
    const materials = getValues('materials') || [];
    setValue('materials', [
      ...materials,
      {
        ...material,
        recipeWeight: 1,
        calculationWeight: 1
      }
    ]);
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b px-4 py-2 md:gap-4">
      <div className="w-1/2 md:w-auto">
        <p className="text-xs text-muted-foreground">{material.originalCode}</p>
        <h4 className="text-xs font-semibold md:text-sm">{material.name}</h4>
      </div>
      <Button
        disabled={material.isAdded}
        size="sm"
        className="h-8 w-fit md:w-24"
        type="button"
        onClick={handleAddMaterial}
      >
        {material.isAdded ? '추가됨' : '추가하기'}
      </Button>
    </div>
  );
};

export default MaterialSearchResultItem;
