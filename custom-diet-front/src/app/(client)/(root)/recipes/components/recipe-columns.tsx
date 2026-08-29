'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RecipeSummary } from '@/types/food.type';
import { ColumnDef } from '@tanstack/react-table';

export type RecipeTableMeta = {
  onViewDetail: (recipe: RecipeSummary) => void;
  onEdit?: (recipe: RecipeSummary) => void;
  onDelete?: (recipe: RecipeSummary) => void;
};

export const recipeColumns: ColumnDef<RecipeSummary>[] = [
  {
    accessorKey: 'name',
    header: '레시피명'
  },
  {
    accessorKey: 'typeName',
    size: 120,
    header: () => <div className="text-center">분류</div>,
    cell: ({ row }) =>
      row.original.typeName ? (
        <div className="flex justify-center">
          <Badge variant="secondary">{row.original.typeName}</Badge>
        </div>
      ) : (
        <div className="text-center text-gray-400">-</div>
      )
  },
  {
    accessorKey: 'recipeDescription',
    header: '조리법',
    cell: ({ row }) => (
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {row.original.recipeDescription || '등록된 조리법이 없습니다.'}
      </p>
    )
  },
  {
    id: 'actions',
    size: 96,
    header: () => <div className="text-center">관리</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as RecipeTableMeta;
      // 사용자가 직접 만든 레시피만 수정·삭제할 수 있다.
      // (마스터 음식의 이름/조리법만 덮어쓴 기록은 재료 구성이 공용이라 손대면 안 된다)
      const isOwn = row.original.ownFlag === 'Y';

      return (
        <div className="flex justify-end gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => meta.onViewDetail(row.original)}
          >
            상세보기
          </Button>
          {isOwn && meta.onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => meta.onEdit?.(row.original)}
            >
              수정
            </Button>
          )}
          {isOwn && meta.onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => meta.onDelete?.(row.original)}
            >
              삭제
            </Button>
          )}
        </div>
      );
    }
  }
];
