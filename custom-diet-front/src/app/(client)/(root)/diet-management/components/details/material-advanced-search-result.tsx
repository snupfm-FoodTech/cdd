import { ScrollArea } from '@/components/ui/scroll-area';
import { AddedMaterial } from '@/types/food.type';
import Image from 'next/image';
import MaterialSearchResultItem from './material-search-result-item';

import MaterialNotFoundImage from '@/assets/icons/material-not-found.svg';
import { Spinner } from '@/components/spinner';
interface MaterialAdvancedSearchResultProps {
  materials: AddedMaterial[];
  loading: boolean;
}

const MaterialAdvancedSearchResult = ({
  materials,
  loading
}: MaterialAdvancedSearchResultProps) => {
  if (loading) {
    return (
      <div className="h-72 rounded bg-secondary">
        <div className="flex h-full flex-col items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="h-72">
        <div className="flex h-full flex-col items-center justify-center">
          <Image
            src={MaterialNotFoundImage}
            className="w-12"
            alt="Material not found"
          />
          <div className="w-full text-center text-sm text-muted-foreground md:w-32">
            원하는 대표 식품을 선택해주세요.
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-72 rounded bg-secondary">
      {materials.map((material) => (
        <MaterialSearchResultItem key={material.code} material={material} />
      ))}
    </ScrollArea>
  );
};

export default MaterialAdvancedSearchResult;
