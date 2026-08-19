import { ScrollArea } from '@/components/ui/scroll-area';
import { MaterialNutrient } from '@/types/food.type';
import { useFormContext } from 'react-hook-form';
import AddedNutrientItem from './added-nutrient-item';
import NutrientSearchBar from './nutrient-search-bar';

const AddedNutrientList = () => {
  const { setValue, watch } = useFormContext();
  const addedNutrients = watch('nutrients') as MaterialNutrient[];

  const handleNutrientChange = (updatedNutrient: MaterialNutrient) => {
    setValue(
      'nutrients',
      addedNutrients.map((nutrient) =>
        nutrient.code === updatedNutrient.code ? updatedNutrient : nutrient
      )
    );
  };

  const handleNutrientRemove = (nutrientCode: string) => {
    setValue(
      'nutrients',
      addedNutrients.filter((nutrient) => nutrient.code !== nutrientCode)
    );
  };

  const handleNutrientSelect = (nutrient: MaterialNutrient) => {
    setValue('nutrients', [...addedNutrients, nutrient]);
  };

  return (
    <div className="mt-2 space-y-2 rounded border p-4">
      <div className="flex justify-center">
        <NutrientSearchBar
          onSelectNutrient={handleNutrientSelect}
          nutrientsExclude={addedNutrients}
        />
      </div>
      <ScrollArea>
        <div className="max-h-48 space-y-2 pb-3">
          {addedNutrients.map((nutrient) => {
            return (
              <AddedNutrientItem
                key={nutrient.code}
                nutrient={nutrient}
                onChange={handleNutrientChange}
                onRemove={handleNutrientRemove}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AddedNutrientList;
