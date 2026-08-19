import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Spinner } from '@/components/spinner';
import {
  useDetailMaterials,
  useGetMaterialCategories,
  useGetMaterialRepresentatives,
  useGetMaterialTypes
} from '@/hooks/diet.hook';
import { AddedMaterial, Material } from '@/types/food.type';
import { useFormContext } from 'react-hook-form';
import MaterialAdvancedSearchItem from './material-advanced-search-item';
import MaterialAdvancedSearchResult from './material-advanced-search-result';
import { SelectMaterialType } from '@/components/ui/select-material-type';
import { SelectMaterialCategory } from '@/components/ui/select-material-category';

interface MaterialAdvancedSearchProps {
  onGoBack: () => void;
  allergens: number[];
}

const MaterialAdvancedSearch = ({
  onGoBack,
  allergens
}: MaterialAdvancedSearchProps) => {
  const [selectedRepresentative, setSelectedRepresentative] = useState(0);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [selectedMaterialCategoryId, setSelectedMaterialCategoryId] =
    useState(0);
  const [searchResult, setSearchResult] = useState<AddedMaterial[]>([]);

  const { data: materialTypes = [] } = useGetMaterialTypes();
  const { data: materialCategories = [] } =
    useGetMaterialCategories(selectedMaterialType);
  const {
    data: materialRepresentatives = [],
    isPending: representativeLoading
  } = useGetMaterialRepresentatives(selectedMaterialCategoryId);

  const { data: materials = [], isPending: materialLoading } =
    useDetailMaterials(
      {
        representativeId: selectedRepresentative,
        excludedAllergenIds: allergens
      },
      {
        enabled: !!selectedRepresentative
      }
    );

  const { watch } = useFormContext();

  const addedMaterials = watch('materials') as Material[];

  const addedMaterialCodes = useMemo(() => {
    if (!addedMaterials) return [];

    return addedMaterials.map((material) => material.code) || [];
  }, [addedMaterials]);

  useEffect(() => {
    if (materials?.length > 0) {
      const filteredMaterials = materials.map((material) => ({
        ...material,
        isAdded: addedMaterialCodes.includes(material.code)
      }));

      setSearchResult(filteredMaterials);
    }
  }, [materials, addedMaterialCodes]);

  useEffect(() => {
    if (!materialTypes) return;

    if (materialTypes.length > 0) {
      const DEFAULT_TYPE_CODE = 'R';
      setSelectedMaterialType(DEFAULT_TYPE_CODE);
    }
  }, [materialTypes]);

  useEffect(() => {
    if (!materialCategories) return;

    if (materialCategories.length > 0) {
      const FIRST_CATEGORY_INDEX = 0;
      setSelectedMaterialCategoryId(
        materialCategories[FIRST_CATEGORY_INDEX].id
      );
    }
  }, [materialCategories, selectedMaterialType]);

  useEffect(() => {
    if (!materialRepresentatives) return;

    if (materialRepresentatives.length > 0) {
      const FIRST_REPRESENTATIVE_INDEX = 0;
      setSelectedRepresentative(
        materialRepresentatives[FIRST_REPRESENTATIVE_INDEX].id
      );
    }
  }, [materialRepresentatives]);

  const handleMaterialTypeChange = (code: string) => {
    setSelectedMaterialType(code);
  };

  const handleMaterialCategoryChange = (id: string) => {
    setSelectedMaterialCategoryId(parseInt(id));
  };

  if (!materialTypes || !materialCategories || !materialRepresentatives)
    return null;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center" onClick={onGoBack}>
          <ChevronLeft className="cursor-pointer" />
          이전
        </DialogTitle>
      </DialogHeader>
      <div className="h-[70vh] overflow-y-auto p-2 md:h-auto md:overflow-visible md:p-0">
        <div className="flex flex-col gap-4 md:flex-row">
          <SelectMaterialType
            value={selectedMaterialType}
            onChange={handleMaterialTypeChange}
            templates={materialTypes}
          />
          <SelectMaterialCategory
            value={selectedMaterialCategoryId.toString()}
            onChange={handleMaterialCategoryChange}
            templates={materialCategories}
          />
          {/* <Select
            value={selectedMaterialCategoryId.toString()}
            onValueChange={handleMaterialCategoryChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {materialCategories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <p className="my-2 text-sm font-semibold md:my-4">대표식품명</p>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <div className="col-span-1">
            <ScrollArea className="h-52 rounded bg-secondary md:h-72">
              {representativeLoading ? (
                <div className="flex h-52 items-center justify-center md:h-72">
                  <Spinner />
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {materialRepresentatives.map((representative) => (
                    <MaterialAdvancedSearchItem
                      key={representative.id}
                      value={representative.id}
                      label={representative.name}
                      selected={representative.id === selectedRepresentative}
                      onClick={() =>
                        setSelectedRepresentative(representative.id)
                      }
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          <div className="col-span-1 md:col-span-2">
            <MaterialAdvancedSearchResult
              materials={searchResult}
              loading={materialLoading || representativeLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialAdvancedSearch;
