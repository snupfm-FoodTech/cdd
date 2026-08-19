'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdateMyMaterialName } from '@/hooks/diet.hook';
import { MyMaterial } from '@/types/food.type';
import { useEffect, useState } from 'react';

interface EditMaterialDialogProps {
  material: MyMaterial;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditMaterialDialog = ({
  material,
  open,
  onOpenChange
}: EditMaterialDialogProps) => {
  const [name, setName] = useState(material.name);
  const { mutate: updateName, isPending } = useUpdateMyMaterialName();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setName(material.name);
  }, [material.code]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setName(material.name);
    onOpenChange(nextOpen);
  };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    updateName(
      { matCd: material.code, name: trimmed },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-full max-w-[90%] md:max-w-[32rem]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold md:text-lg">
            내 식품 수정
          </DialogTitle>
        </DialogHeader>

        <div className="h-[60vh] overflow-y-auto px-2 md:h-auto md:overflow-visible md:px-0">
          {/* 분류 3열 (딤드) */}
          <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                데이터구분명
              </label>
              <Input disabled value={material.typeName ?? '-'} className="bg-muted" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                식품대분류명
              </label>
              <Input
                disabled
                value={material.categoryName ?? '-'}
                className="bg-muted"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                대표식품명
              </label>
              <Input disabled value={material.representativeName ?? '-'} className="bg-muted" />
            </div>
          </div>

          {/* 식품명 (수정 가능) */}
          <div className="mt-2 space-y-1">
            <label className="text-sm font-medium">
              식품명 <span className="text-destructive">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
            />
          </div>

          {/* 총 제공량 (딤드) */}
          <div className="mt-2 space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              총 제공량
            </label>
            <div className="flex items-center">
              <Input
                disabled
                value={material.weight ?? '-'}
                className="w-32 bg-muted"
              />
              <span className="ml-2 text-sm text-muted-foreground">g</span>
            </div>
          </div>

          {/* 영양성분 (딤드) */}
          <div className="mt-2 space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              영양성분
            </label>
            <div className="rounded-md border bg-muted divide-y">
              {material.nutrients && material.nutrients.length > 0 ? (
                material.nutrients.map((n) => (
                  <div key={n.code} className="flex items-center justify-between px-3 py-2 text-sm text-muted-foreground">
                    <span>{n.name}</span>
                    <span>{n.amount} {n.unitName}</span>
                  </div>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-muted-foreground">영양성분 정보가 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 flex w-full gap-2 px-2 md:w-48 md:px-0">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-2xl"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            size="sm"
            loading={isPending}
            disabled={!name.trim()}
            className="flex-1 rounded-2xl"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditMaterialDialog;
