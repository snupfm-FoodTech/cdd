'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/spinner';
import { useMyRecipes, useRecipes } from '@/hooks/diet.hook';
import { RecipeSummary } from '@/types/food.type';
import { useState } from 'react';
import RecipeDeleteDialog from './recipe-delete-dialog';
import RecipeDetailDialog from './recipe-detail-dialog';
import RecipeFormDialog from './recipe-form-dialog';
import RecipeMaterialFilter, { SelectedMaterial } from './recipe-material-filter';
import RecipeTable from './recipe-table';
import RecipeTypeSelect from './recipe-type-select';

const LIMIT = 10;

interface RecipeListSectionProps {
  scope: 'all' | 'mine';
}

const RecipeListSection = ({ scope }: RecipeListSectionProps) => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [typeCode, setTypeCode] = useState('');
  const [material, setMaterial] = useState<SelectedMaterial | null>(null);
  const [detailTarget, setDetailTarget] = useState<RecipeSummary | null>(null);
  const [editTarget, setEditTarget] = useState<RecipeSummary | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RecipeSummary | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const queryParams = {
    page,
    limit: LIMIT,
    keyword,
    typeCode,
    materialCode: material?.code ?? ''
  };

  const allRecipes = useRecipes(queryParams, { enabled: scope === 'all' });
  const myRecipes = useMyRecipes(queryParams, { enabled: scope === 'mine' });

  const { data, isPending } = scope === 'all' ? allRecipes : myRecipes;

  const items = data?.items ?? [];
  const totalPageNo = data?.totalPageNo ?? 1;

  const handleSearch = () => {
    setPage(1);
    setKeyword(searchInput);
  };

  const handleTypeChange = (value: string) => {
    setPage(1);
    setTypeCode(value);
  };

  const handleMaterialChange = (value: SelectedMaterial | null) => {
    setPage(1);
    setMaterial(value);
  };

  const hasActiveFilter = !!keyword || !!typeCode || !!material;

  const handleResetFilters = () => {
    setPage(1);
    setKeyword('');
    setSearchInput('');
    setTypeCode('');
    setMaterial(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="max-w-xs"
          placeholder="레시피명 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <Button variant="outline" size="sm" onClick={handleSearch}>
          검색
        </Button>

        <div className="mx-1 h-5 w-px bg-border" />

        <RecipeTypeSelect value={typeCode} onChange={handleTypeChange} />
        <RecipeMaterialFilter value={material} onChange={handleMaterialChange} />

        {hasActiveFilter && (
          <Button variant="ghost" size="sm" onClick={handleResetFilters}>
            필터 초기화
          </Button>
        )}

        <Button
          size="sm"
          className="ml-auto"
          onClick={() => {
            setEditTarget(null);
            setIsFormOpen(true);
          }}
        >
          새 레시피 만들기
        </Button>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="large" />
        </div>
      ) : (
        <>
          <RecipeTable
            data={items}
            emptyMessage={
              hasActiveFilter
                ? '조건에 맞는 레시피가 없습니다.'
                : scope === 'mine'
                  ? '아직 만든 레시피가 없습니다. 「새 레시피 만들기」로 재료를 직접 구성해 등록해 보세요.'
                  : '등록된 레시피가 없습니다.'
            }
            onViewDetail={(recipe) => setDetailTarget(recipe)}
            onEdit={(recipe) => {
              setEditTarget(recipe);
              setIsFormOpen(true);
            }}
            onDelete={(recipe) => setDeleteTarget(recipe)}
          />

          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              이전
            </Button>
            <span className="text-sm">
              {page} / {totalPageNo}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPageNo}
              onClick={() => setPage((p) => p + 1)}
            >
              다음
            </Button>
          </div>
        </>
      )}

      {detailTarget && (
        <RecipeDetailDialog
          recipe={detailTarget}
          open={!!detailTarget}
          onOpenChange={(open) => {
            if (!open) setDetailTarget(null);
          }}
        />
      )}

      <RecipeFormDialog
        open={isFormOpen}
        recipe={editTarget}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditTarget(null);
        }}
      />

      {deleteTarget && (
        <RecipeDeleteDialog
          recipe={deleteTarget}
          open={!!deleteTarget}
          onOpenChange={(open) => {
            if (!open) setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
};

export default RecipeListSection;
