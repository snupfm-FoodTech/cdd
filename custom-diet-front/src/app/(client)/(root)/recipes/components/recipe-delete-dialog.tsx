'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useDeleteRecipe } from '@/hooks/diet.hook';
import { RecipeSummary } from '@/types/food.type';

interface RecipeDeleteDialogProps {
  recipe: RecipeSummary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecipeDeleteDialog = ({
  recipe,
  open,
  onOpenChange
}: RecipeDeleteDialogProps) => {
  const { mutate: deleteRecipe, isPending } = useDeleteRecipe();

  const handleConfirm = () => {
    deleteRecipe(recipe.code, {
      onSuccess: () => onOpenChange(false)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>레시피 삭제</DialogTitle>
          <DialogDescription>
            <span className="font-semibold">{recipe.name}</span>을(를)
            삭제하시겠습니까?
            <br />
            삭제된 레시피는 복구할 수 없습니다. 저장된 식단에서 사용 중인
            레시피는 삭제할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={handleConfirm}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDeleteDialog;
