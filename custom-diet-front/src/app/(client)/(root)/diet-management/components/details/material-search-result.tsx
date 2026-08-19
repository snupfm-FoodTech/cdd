import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddedMaterial } from '@/types/food.type';
import MaterialSearchResultItem from './material-search-result-item';

interface MaterialSearchResultProps {
  materials: AddedMaterial[];
  showMore?: boolean;
  loading?: boolean;
  showMoreLoading?: boolean;
  onShowMore?: () => void;
}

const MaterialSearchResult = ({
  materials,
  showMore = false,
  loading = false,
  showMoreLoading = false,
  onShowMore
}: MaterialSearchResultProps) => {
  // First loading
  if (loading && !showMoreLoading) {
    return (
      <div className="h-72">
        <div className="flex h-full items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="h-72">
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground">특정한 식품 검색 없이</p>
          <p className="text-sm text-muted-foreground">
            카테고리별로 식품을 찾을 수 있어요:)
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-64 rounded bg-secondary md:h-72">
      {materials.map((material) => (
        <MaterialSearchResultItem key={material.code} material={material} />
      ))}
      {showMore && (
        <div className="flex items-center justify-center p-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShowMore}
            className="w-40 rounded-lg text-primary hover:text-primary"
            loading={showMoreLoading}
          >
            더 보기
          </Button>
        </div>
      )}
    </ScrollArea>
  );
};

export default MaterialSearchResult;
