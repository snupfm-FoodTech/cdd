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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import { useCopyDiet } from '@/hooks/diet.hook';
import { checkTokenExisted } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/** diet_mgmt.diet_nm 이 varchar(50) 이라 입력도 같은 길이로 막는다 */
const DIET_NAME_MAX_LENGTH = 50;

interface DietCopyDialogProps {
  dietId?: number;
  dietName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCopied?: () => void;
}

/**
 * 원본은 그대로 두고 복사본을 만든 뒤 그 화면으로 넘긴다.
 * 이미 기준에 맞춰 둔 식단에서 변형을 뜰 때 쓴다.
 */
const DietCopyDialog = ({
  dietId,
  dietName,
  open,
  onOpenChange,
  onCopied
}: DietCopyDialogProps) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const { mutateAsync, isPending } = useCopyDiet();

  // 열 때마다 기본 이름을 다시 채운다
  useEffect(() => {
    if (!open) return;
    const suggested = dietName ? `${dietName} (사본)` : '';
    setName(suggested.slice(0, DIET_NAME_MAX_LENGTH));
  }, [open, dietName]);

  const handleCopy = async () => {
    if (!dietId || isPending) return;
    if (!checkTokenExisted(router)) return;

    try {
      const copied = await mutateAsync({
        dietId,
        // 비워서 보내면 서버가 알아서 "(사본)" 을 붙인다
        name: name.trim() || undefined
      });
      onOpenChange(false);
      onCopied?.();
      router.push(`${DIET_MANAGEMENT_URL}/${copied.id}`);
    } catch {
      // 실패 안내는 useCopyDiet 이 토스트로 처리한다. 다이얼로그는 열어 둔다.
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>식단 복사</DialogTitle>
          <DialogDescription>
            음식과 재료, 영양기준까지 그대로 복사됩니다. 원본은 바뀌지 않습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="copy-diet-name">새 식단명</Label>
          <Input
            id="copy-diet-name"
            value={name}
            autoFocus
            maxLength={DIET_NAME_MAX_LENGTH}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleCopy();
              }
            }}
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button type="button" onClick={handleCopy} disabled={isPending}>
            {isPending ? '복사 중…' : '복사하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DietCopyDialog;
