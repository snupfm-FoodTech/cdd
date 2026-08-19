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
import { useDeleteMyMaterial } from '@/hooks/diet.hook';
import { MyMaterial } from '@/types/food.type';

interface DeleteMaterialDialogProps {
  material: MyMaterial;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteMaterialDialog = ({
  material,
  open,
  onOpenChange
}: DeleteMaterialDialogProps) => {
  const { mutate: deleteMaterial, isPending } = useDeleteMyMaterial();

  const handleConfirm = () => {
    deleteMaterial(material.code, {
      onSuccess: () => onOpenChange(false)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>식품 삭제</DialogTitle>
          <DialogDescription>
            <span className="font-semibold">{material.name}</span>을(를){' '}
            삭제하시겠습니까?
            <br />
            삭제된 식품은 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            size="sm"
            loading={isPending}
            onClick={handleConfirm}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMaterialDialog;
