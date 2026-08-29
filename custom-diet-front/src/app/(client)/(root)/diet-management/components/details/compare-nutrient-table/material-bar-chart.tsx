import {
  FOOD_GROUPS,
  FOOD_GROUP_ORDER,
  FoodGroupName,
  resolveFoodGroup
} from '@/constants/food-group.constant';
import { GroupedMaterial } from '@/types/food.type';
import { formatDecimal } from '@/utils/format.util';
import { useMemo } from 'react';

// 식품군은 순서가 없는 항목을 "양"으로 비교하는 자리다. 항목마다 다른 색을 주면
// 막대 길이가 이미 말해주는 정보를 색이 한 번 더 말하면서, 색이 무언가를 뜻한다는
// 오해만 남는다. 한 가지 색으로 두고 정해진 순서로 세우는 편이 훨씬 빨리 읽힌다.
const BAR_COLOR = '#2a78d6';

// 양념·기타는 균형을 보는 대상이 아니라서 6군 뒤에 회색으로 따로 세운다.
const SIDE_GROUPS: FoodGroupName[] = [FOOD_GROUPS.SEASONING, FOOD_GROUPS.ETC];
const SIDE_BAR_COLOR = '#a8b0ba';

interface FoodGroupRow {
  name: FoodGroupName;
  weight: number;
  isSide: boolean;
}

interface MaterialBarChartProps {
  groupMaterials: GroupedMaterial[];
}

const MaterialBarChart = ({ groupMaterials }: MaterialBarChartProps) => {
  const { rows, mainTotal, sideTotal } = useMemo(() => {
    const weights = new Map<FoodGroupName, number>();

    groupMaterials.forEach((item) => {
      const group = resolveFoodGroup(item.categoryId);
      weights.set(group, (weights.get(group) ?? 0) + item.recipeWeight);
    });

    // 담기지 않은 식품군도 자리를 지킨다 - "채소류가 아예 없다"는 것도 읽어야 할 정보다.
    const allRows: FoodGroupRow[] = FOOD_GROUP_ORDER.map((name) => ({
      name,
      weight: weights.get(name) ?? 0,
      isSide: SIDE_GROUPS.includes(name)
    }));

    return {
      rows: allRows.filter((row) => !row.isSide || row.weight > 0),
      mainTotal: allRows
        .filter((row) => !row.isSide)
        .reduce((acc, row) => acc + row.weight, 0),
      sideTotal: allRows
        .filter((row) => row.isSide)
        .reduce((acc, row) => acc + row.weight, 0)
    };
  }, [groupMaterials]);

  if (mainTotal === 0 && sideTotal === 0) {
    return (
      <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
        식품군 정보를 가진 식재료가 아직 없습니다.
      </p>
    );
  }

  const missing = rows.filter((row) => !row.isSide && row.weight === 0);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-sm text-muted-foreground">6가지 식품군 합계</span>
        <span className="text-xl font-bold tabular-nums tracking-tight text-foreground">
          {formatDecimal(mainTotal)} g
        </span>
        {sideTotal > 0 && (
          <span className="text-sm text-muted-foreground">
            · 양념·기타 {formatDecimal(sideTotal)} g 별도
          </span>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {rows.map((row) => {
          // 비중은 6군 합계를 100으로 본다. 양념까지 분모에 넣으면
          // 식단을 바꾸지 않아도 간장 몇 g 에 채소 비중이 흔들린다.
          const share = mainTotal > 0 ? (row.weight / mainTotal) * 100 : 0;
          const isEmpty = row.weight === 0;

          return (
            <li
              key={row.name}
              className={`flex flex-col gap-2 rounded-lg border p-3.5 transition-colors ${
                isEmpty
                  ? 'border-dashed bg-transparent'
                  : 'bg-[#fbfbfa] hover:border-[#c7d9ef]'
              }`}
            >
              <p
                className={`text-sm font-medium leading-snug ${
                  isEmpty ? 'text-muted-foreground' : 'text-foreground'
                }`}
                style={{ wordBreak: 'keep-all' }}
              >
                {row.name}
              </p>

              <p className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-bold leading-none tabular-nums tracking-tight ${
                    isEmpty ? 'text-muted-foreground/60' : 'text-foreground'
                  }`}
                >
                  {formatDecimal(row.weight)}
                </span>
                <span className="text-sm text-muted-foreground">g</span>
              </p>

              {/* 막대 길이와 옆의 % 는 같은 값이다 - 둘 다 6군 합계 대비 비중 */}
              <div className="mt-auto flex items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eef1f5]">
                  {!isEmpty && (
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${Math.max(1.5, row.isSide ? 100 : share)}%`,
                        backgroundColor: row.isSide ? SIDE_BAR_COLOR : BAR_COLOR
                      }}
                    />
                  )}
                </span>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                  {row.isSide ? '별도' : `${formatDecimal(share)}%`}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {missing.length > 0 && (
        <p className="mt-3 text-xs text-muted-foreground">
          {missing.map((row) => row.name).join(', ')}가 이 식단에 없습니다.
        </p>
      )}
    </div>
  );
};

export default MaterialBarChart;
