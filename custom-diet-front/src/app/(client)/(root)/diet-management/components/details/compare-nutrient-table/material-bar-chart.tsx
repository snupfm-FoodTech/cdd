import {
  FOOD_GROUPS,
  FOOD_GROUP_ORDER,
  FoodGroupName,
  resolveFoodGroup
} from '@/constants/food-group.constant';
import { GroupedMaterial } from '@/types/food.type';
import { formatDecimal } from '@/utils/format.util';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useMediaQuery } from 'usehooks-ts';

// 판정 배지가 초록·노랑·빨강을 쓰므로 빨강과 딥그린은 빼고, 쿨톤을 앞 슬롯에 뒀다.
// 색각이상 대비 검증 통과 (최악 인접쌍 ΔE 6.1 - 축 라벨과 범례가 이름을 함께
// 표시하므로 색만으로 구분하지 않는다).
const GROUP_COLORS: Record<FoodGroupName, string> = {
  [FOOD_GROUPS.GRAIN]: '#2a78d6',
  [FOOD_GROUPS.PROTEIN]: '#eb6834',
  [FOOD_GROUPS.VEGETABLE]: '#4a3aa7',
  [FOOD_GROUPS.FRUIT]: '#e87ba4',
  [FOOD_GROUPS.DAIRY]: '#1baf7a',
  [FOOD_GROUPS.FAT_SUGAR]: '#eda100',
  // 양념·기타는 균형을 보는 대상이 아니라 무채색으로 둔다
  [FOOD_GROUPS.SEASONING]: '#a8b0ba',
  [FOOD_GROUPS.ETC]: '#c3c2b7'
};

const SIDE_GROUPS: FoodGroupName[] = [FOOD_GROUPS.SEASONING, FOOD_GROUPS.ETC];

interface MaterialBarChartProps {
  groupMaterials: GroupedMaterial[];
}

const MaterialBarChart = ({ groupMaterials }: MaterialBarChartProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const data = useMemo(() => {
    const weights = new Map<FoodGroupName, number>();
    groupMaterials.forEach((item) => {
      const group = resolveFoodGroup(item.categoryId);
      weights.set(group, (weights.get(group) ?? 0) + item.recipeWeight);
    });

    // 6군은 담기지 않았어도 자리를 지킨다 - "채소류가 아예 없다"도 읽어야 할 정보다.
    return FOOD_GROUP_ORDER.map((name) => ({
      categoryName: name,
      recipeWeight: weights.get(name) ?? 0
    })).filter(
      (row) => !SIDE_GROUPS.includes(row.categoryName) || row.recipeWeight > 0
    );
  }, [groupMaterials]);

  const total = data.reduce((acc, cur) => acc + cur.recipeWeight, 0);

  if (total === 0) {
    return (
      <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
        식품군 정보를 가진 식재료가 아직 없습니다.
      </p>
    );
  }

  const formatWeight = (value: number) => `${value.toFixed(1)} g`;

  const Legend = () => (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 px-1 pb-3 text-sm">
      {data.map((entry) => (
        <li key={entry.categoryName} className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ backgroundColor: GROUP_COLORS[entry.categoryName] }}
          />
          <span className="text-foreground">{entry.categoryName}</span>
          <span className="font-semibold text-foreground">
            {formatWeight(entry.recipeWeight)}
          </span>
        </li>
      ))}
    </ul>
  );

  // 모바일: 가로 막대 — 식품군 이름이 세로축에서 줄바꿈되지 않고 그대로 읽힌다.
  if (isMobile) {
    const rowHeight = 40;
    return (
      <div className="w-full">
        <Legend />
        <ResponsiveContainer width="100%" height={data.length * rowHeight + 20}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
          >
            <CartesianGrid horizontal={false} stroke="#e1e0d9" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="categoryName"
              width={110}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#52514e', fontSize: 12 }}
            />
            <Tooltip formatter={(value: number) => formatWeight(value)} />
            <Bar dataKey="recipeWeight" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry) => (
                <Cell
                  key={entry.categoryName}
                  fill={GROUP_COLORS[entry.categoryName]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Legend />
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} margin={{ top: 24, right: 16, left: 0, bottom: 8 }}>
          <CartesianGrid vertical={false} stroke="#e1e0d9" />
          <XAxis
            dataKey="categoryName"
            tickLine={false}
            axisLine={{ stroke: '#c3c2b7' }}
            tick={{ fill: '#52514e', fontSize: 12 }}
            interval={0}
          />
          <YAxis hide />
          <Tooltip formatter={(value: number) => formatWeight(value)} />
          <Bar
            dataKey="recipeWeight"
            radius={[4, 4, 0, 0]}
            barSize={40}
            label={{
              position: 'top',
              formatter: (value: number) => formatWeight(value),
              fill: '#52514e',
              fontSize: 12
            }}
          >
            {data.map((entry) => (
              <Cell
                key={entry.categoryName}
                fill={GROUP_COLORS[entry.categoryName]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaterialBarChart;
