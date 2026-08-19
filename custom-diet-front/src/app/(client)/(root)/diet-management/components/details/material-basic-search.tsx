import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDetailMaterialsWithPagination } from '@/hooks/diet.hook';
import { AddedMaterial, Material } from '@/types/food.type';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MaterialSearchBar from './material-search-bar';
import MaterialSearchResult from './material-search-result';

interface MaterialBasicSearch {
  onGotoAdvancedSearch: () => void;
  allergens: number[];
}

const MaterialBasicSearch = ({
  onGotoAdvancedSearch,
  allergens
}: MaterialBasicSearch) => {
  const DEFAULT_PAGINATION = {
    limit: 20,
    page: 1
  };

  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState<{
    limit: number;
    page: number;
  }>({
    ...DEFAULT_PAGINATION
  });
  const [searchResult, setSearchResult] = useState<AddedMaterial[]>([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const [showMoreLoading, setShowMoreLoading] = useState(false);

  const { data: materialsWithPagination, isPending } =
    useDetailMaterialsWithPagination({
      keyword: searchText,
      limit: pagination.limit,
      page: pagination.page,
      excludedAllergenIds: allergens
    });

  const { watch } = useFormContext();

  const hasShowMore = useMemo(() => {
    if (!materialsWithPagination) return false;

    return materialsWithPagination.totalPageNo > pagination.page;
  }, [materialsWithPagination, pagination]);

  const addedMaterials = watch('materials') as Material[];

  const addedMaterialCodes = useMemo(() => {
    if (!addedMaterials) return [];

    return addedMaterials.map((material) => material.code) || [];
  }, [addedMaterials]);

  useEffect(() => {
    setSearchResult((prev) => {
      return prev.map((material) => {
        return {
          ...material,
          isAdded: addedMaterialCodes.includes(material.code)
        };
      });
    });
  }, [addedMaterialCodes]);

  useEffect(() => {
    if (!materialsWithPagination?.items) return;

    const filteredMaterials: AddedMaterial[] =
      materialsWithPagination.items.map((material) => {
        return {
          ...material,
          isAdded: addedMaterialCodes.includes(material.code)
        };
      }) || [];

    if (isShowMore) {
      setSearchResult((prev) => [...prev, ...filteredMaterials]);
      setIsShowMore(false);
      setShowMoreLoading(false);
      return;
    }

    setSearchResult(filteredMaterials);
  }, [materialsWithPagination]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleShowMore = () => {
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1
    }));

    setIsShowMore(true);
    setShowMoreLoading(true);
  };

  const handleSearch = (value: string) => {
    if (searchText === value) return;

    setSearchText(value);
    setPagination({
      ...DEFAULT_PAGINATION
    });
    setSearchResult([]);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>식품 추가하기</DialogTitle>
      </DialogHeader>
      <div>
        <div className="flex justify-center rounded border bg-secondary p-4">
          <MaterialSearchBar onSearch={handleSearch} />
        </div>
        <MaterialSearchResult
          materials={searchResult}
          showMore={hasShowMore}
          onShowMore={handleShowMore}
          loading={isPending}
          showMoreLoading={showMoreLoading}
        />
        <div className="mt-4 text-center text-sm font-semibold">
          <span className="mr-2 text-muted-foreground">
            찾으시는 식품이 없나요?
          </span>
          <span
            className="cursor-pointer underline underline-offset-4"
            onClick={onGotoAdvancedSearch}
          >
            다른 식품 찾아보기
          </span>
        </div>
      </div>
    </>
  );
};

export default MaterialBasicSearch;
