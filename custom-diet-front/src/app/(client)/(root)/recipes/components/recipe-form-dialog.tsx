'use client';

import FloatInput from '@/components/float-input';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useCreateRecipe,
  useFoodTypes,
  useRecipeDetail,
  useUpdateRecipe
} from '@/hooks/diet.hook';
import { toast } from '@/hooks/use-toast';
import { RecipeSummary } from '@/types/food.type';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import RecipeMaterialPicker, { PickedMaterial } from './recipe-material-picker';

const MIN_RECIPE_WEIGHT = 0.01;

interface RecipeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 지정하면 수정 모드 */
  recipe?: RecipeSummary | null;
}

const RecipeFormDialog = ({
  open,
  onOpenChange,
  recipe
}: RecipeFormDialogProps) => {
  const isEdit = !!recipe;

  const [name, setName] = useState('');
  const [typeCode, setTypeCode] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [materials, setMaterials] = useState<PickedMaterial[]>([]);

  const { data: foodTypes } = useFoodTypes();
  const { data: detail, isPending: isDetailPending } = useRecipeDetail(
    recipe?.code ?? '',
    recipe?.name ?? '',
    { enabled: open && isEdit }
  );

  const { mutate: createRecipe, isPending: isCreating } = useCreateRecipe();
  const { mutate: updateRecipe, isPending: isUpdating } = useUpdateRecipe();
  const isSaving = isCreating || isUpdating;

  // 다이얼로그를 열 때마다 초기화한다 (생성 모드는 빈 폼)
  useEffect(() => {
    if (!open) return;

    setName(recipe?.name ?? '');
    setTypeCode(recipe?.typeCode ?? '');
    setRecipeDescription(recipe?.recipeDescription ?? '');
    setMaterials([]);
  }, [open, recipe]);

  // 수정 모드에서는 서버에서 받은 재료 구성으로 채운다
  useEffect(() => {
    if (!open || !isEdit || !detail) return;

    setRecipeDescription(detail.recipeDescription ?? '');
    setMaterials(
      (detail.materials ?? []).map((material) => ({
        code: material.code,
        name: material.name,
        unitName: material.unitName,
        recipeWeight: material.recipeWeight
      }))
    );
  }, [open, isEdit, detail]);

  const handleAddMaterial = (material: PickedMaterial) => {
    setMaterials((prev) =>
      prev.some((item) => item.code === material.code)
        ? prev
        : [...prev, material]
    );
  };

  const handleWeightChange = (code: string, value: number) => {
    setMaterials((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, recipeWeight: value } : item
      )
    );
  };

  const handleRemoveMaterial = (code: string) => {
    setMaterials((prev) => prev.filter((item) => item.code !== code));
  };

  const totalWeight = materials.reduce(
    (sum, item) => sum + (item.recipeWeight || 0),
    0
  );

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({ title: '레시피명을 입력해 주세요.', variant: 'destructive' });
      return;
    }
    if (!typeCode) {
      toast({ title: '분류를 선택해 주세요.', variant: 'destructive' });
      return;
    }
    if (materials.length === 0) {
      toast({
        title: '재료를 1개 이상 추가해 주세요.',
        variant: 'destructive'
      });
      return;
    }

    const payload = {
      name: name.trim(),
      typeCode,
      recipeDescription,
      materials: materials.map((item) => ({
        code: item.code,
        recipeWeight: Math.max(MIN_RECIPE_WEIGHT, item.recipeWeight)
      }))
    };

    const onSuccess = () => onOpenChange(false);

    if (isEdit && recipe) {
      updateRecipe({ foodCode: recipe.code, payload }, { onSuccess });
    } else {
      createRecipe(payload, { onSuccess });
    }
  };

  const isLoadingDetail = isEdit && isDetailPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? '레시피 수정' : '새 레시피 만들기'}
          </DialogTitle>
        </DialogHeader>

        {isLoadingDetail ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="large" />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="recipe-name">레시피명</Label>
                <Input
                  id="recipe-name"
                  maxLength={50}
                  placeholder="예) 소고기 미역국"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="recipe-type">분류</Label>
                <Select value={typeCode} onValueChange={setTypeCode}>
                  <SelectTrigger id="recipe-type">
                    <SelectValue placeholder="분류 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {foodTypes?.map((type) => (
                      <SelectItem key={type.code} value={type.code}>
                        {type.content}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>
                  재료
                  {materials.length > 0 && (
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {materials.length}개 · 총 {totalWeight.toFixed(2)}g
                    </span>
                  )}
                </Label>
                <RecipeMaterialPicker
                  selectedCodes={materials.map((item) => item.code)}
                  onSelect={handleAddMaterial}
                />
              </div>

              <div className="rounded-md border">
                {materials.length === 0 ? (
                  <p className="p-6 text-center text-sm text-muted-foreground">
                    재료를 추가하면 영양성분이 자동으로 계산됩니다.
                  </p>
                ) : (
                  materials.map((material) => (
                    <div
                      key={material.code}
                      className="flex items-center gap-3 border-b px-4 py-2 last:border-b-0"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm">
                        {material.name}
                      </span>
                      <FloatInput
                        maxLength={4}
                        min={MIN_RECIPE_WEIGHT}
                        value={material.recipeWeight}
                        onChange={(value) =>
                          handleWeightChange(material.code, value)
                        }
                        className="h-8 w-24 text-center"
                      />
                      <span className="w-6 text-xs text-muted-foreground">
                        {material.unitName ?? 'g'}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        aria-label={material.name + ' 재료 삭제'}
                        onClick={() => handleRemoveMaterial(material.code)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="recipe-description">조리법</Label>
              <Textarea
                id="recipe-description"
                rows={5}
                maxLength={5000}
                placeholder="조리 순서를 입력해 주세요."
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isSaving}
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={isSaving || isLoadingDetail}
            onClick={handleSubmit}
          >
            {isEdit ? '수정' : '저장'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeFormDialog;
