'use client';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Spinner } from '@/components/spinner';
import { useRecipeDetail } from '@/hooks/diet.hook';
import { RecipeSummary } from '@/types/food.type';

interface RecipeDetailDialogProps {
  recipe: RecipeSummary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecipeDetailDialog = ({
  recipe,
  open,
  onOpenChange
}: RecipeDetailDialogProps) => {
  const { data, isPending } = useRecipeDetail(recipe.code, recipe.name, {
    enabled: open
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-center gap-2">
            {recipe.name}
            {recipe.typeName && (
              <Badge variant="secondary">{recipe.typeName}</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {isPending ? (
          <div className="flex items-center justify-center py-8">
            <Spinner size="large" />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-2 text-sm font-semibold">재료</div>
              {data?.materials && data.materials.length > 0 ? (
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {data.materials.map((material) => (
                    <li key={material.code} className="flex justify-between gap-4">
                      <span className="truncate">{material.name}</span>
                      <span className="shrink-0 whitespace-nowrap">
                        {material.recipeWeight}
                        {material.unitName}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  등록된 재료가 없습니다.
                </p>
              )}
            </div>

            <div>
              <div className="mb-2 text-sm font-semibold">조리법</div>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {data?.recipeDescription ||
                  recipe.recipeDescription ||
                  '등록된 조리법이 없습니다.'}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailDialog;
