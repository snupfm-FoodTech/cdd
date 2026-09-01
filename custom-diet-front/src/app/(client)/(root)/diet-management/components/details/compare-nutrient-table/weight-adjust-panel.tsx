'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ITrayItem } from '@/types/diet.type';
import { Undo2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { distributeDietWeight } from '../../../helpers';

interface WeightAdjustPanelProps {
  foods: ITrayItem[];
  onChange: (foods: ITrayItem[]) => void;
}

const sumWeight = (foods: ITrayItem[]) =>
  foods.reduce(
    (sum, food) =>
      sum +
      (food.materials ?? []).reduce(
        (inner, material) => inner + (material.recipeWeight ?? 0),
        0
      ),
    0
  );

const WeightAdjustPanel = ({ foods, onChange }: WeightAdjustPanelProps) => {
  const currentWeight = useMemo(() => sumWeight(foods), [foods]);

  const [target, setTarget] = useState<string>('');
  const [history, setHistory] = useState<ITrayItem[][]>([]);

  // 입력칸은 항상 현재 총 중량에서 시작한다 (직접 고치는 중이 아니라면)
  const isEditing = useRef(false);
  useEffect(() => {
    if (!isEditing.current) {
      setTarget(currentWeight ? String(Math.round(currentWeight)) : '');
    }
  }, [currentWeight]);

  // 음식 구성이 바뀌면 되돌릴 기준이 사라진다
  const composition = foods.map((food) => `${food.sequence}:${food.code}`).join('|');
  const lastComposition = useRef(composition);
  useEffect(() => {
    if (lastComposition.current !== composition) {
      lastComposition.current = composition;
      setHistory([]);
    }
  }, [composition]);

  const hasMaterials = currentWeight > 0;
  const targetNumber = Number(target);
  const canApply =
    hasMaterials && Number.isFinite(targetNumber) && targetNumber > 0;

  const apply = () => {
    if (!canApply) return;
    setHistory((prev) => [...prev, foods].slice(-10));
    onChange(distributeDietWeight(foods, targetNumber));
    isEditing.current = false;
  };

  const undo = () => {
    const previous = history[history.length - 1];
    if (!previous) return;
    setHistory((prev) => prev.slice(0, -1));
    isEditing.current = false;
    onChange(previous);
  };

  return (
    <div className="col-span-1 flex flex-col">
      <h3 className="mb-2 text-xl font-semibold tracking-tight">중량 정보</h3>

      {/* 왼쪽 영양소정보 표와 같은 높이로 늘어나게 한다 */}
      <div className="flex flex-1 flex-col rounded-md border bg-white p-4">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <div>
            <p className="text-sm text-muted-foreground">현재 총 중량</p>
            <p className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums tracking-tight">
                {currentWeight.toFixed(currentWeight % 1 === 0 ? 0 : 2)}
              </span>
              <span className="text-sm text-muted-foreground">g</span>
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-2">
            <label className="flex flex-col gap-1 text-sm text-muted-foreground">
              맞출 중량
              <Input
                className="h-9 w-28 tabular-nums"
                inputMode="numeric"
                value={target}
                disabled={!hasMaterials}
                onFocus={() => {
                  isEditing.current = true;
                }}
                onChange={(e) =>
                  setTarget(e.target.value.replace(/[^0-9.]/g, ''))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') apply();
                }}
              />
            </label>

            <Button
              type="button"
              size="sm"
              className="h-9"
              disabled={!canApply}
              onClick={apply}
            >
              맞추기
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9"
              disabled={history.length === 0}
              onClick={undo}
            >
              <Undo2 className="mr-1 h-3.5 w-3.5" aria-hidden />
              되돌리기
            </Button>
          </div>
        </div>

        {/* 조절이 막힌 이유만 알려 준다. 동작 설명은 사용법에 있다. */}
        {!hasMaterials && (
          <p className="mt-auto pt-3 text-xs text-muted-foreground">
            재료가 담긴 음식이 있어야 조절할 수 있습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default WeightAdjustPanel;
