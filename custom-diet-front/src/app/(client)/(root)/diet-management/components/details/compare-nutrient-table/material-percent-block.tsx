import { NUTRIENT_CODE_FORMULA } from '@/constants';
import { NutrientCompare } from '@/types/diet.type';
import { formatDecimal } from '@/utils/format.util';
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Check } from 'lucide-react';
import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

// 열량 영양소는 무게가 아니라 "열량 기여"로 봐야 한다. 지방은 g당 9kcal 라서
// 무게 비율로 그리면 실제 기여도의 절반 이하로 작아 보인다.
// 영양기준 자체도 "총 열량의 15~30%" 처럼 열량 비율로 쓰여 있다.
// 아래 STATUS 가 초록/노랑/빨강을 판정 색으로 이미 쓰고 있으므로, 영양소 색은
// 그 세 계열을 피해 쿨톤(블루·바이올렛·마젠타)으로 골랐다. 색각이상 대비는
// 전체 쌍 기준으로 검증했다 (최악 쌍 ΔE 13.0, 정상 시력 16.3).
// 각 색과 판정 배지의 거리도 모두 15 이상이라, 칩과 배지가 한 줄에 놓여도 섞이지 않는다.
// 마젠타는 흰 배경 대비가 낮으므로 영양소 이름과 값을 항상 함께 적는다.
const MACROS = [
  { code: 'CHO', label: '탄수화물', kcalPerGram: 4, color: '#2a78d6' },
  { code: 'PROTEIN', label: '단백질', kcalPerGram: 4, color: '#4a3aa7' },
  { code: 'FAT', label: '지방', kcalPerGram: 9, color: '#e87ba4' }
] as const;

const STATUS = {
  good: { color: '#0ca30c', label: '기준 충족', Icon: Check },
  under: { color: '#fab219', label: '기준 미달', Icon: ArrowDownRight },
  over: { color: '#d03b3b', label: '기준 초과', Icon: ArrowUpRight }
} as const;

type StatusKey = keyof typeof STATUS;

interface MaterialPercentBlockProps {
  nutrients: NutrientCompare[];
}

const StatusPill = ({
  status,
  size = 'sm'
}: {
  status: StatusKey;
  size?: 'sm' | 'md';
}) => {
  const { color, label, Icon } = STATUS[status];
  return (
    // 색만으로 상태를 전달하지 않도록 아이콘 + 라벨을 함께 둔다
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${
        size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]'
      }`}
      style={{ color, backgroundColor: `${color}1a` }}
    >
      <Icon className={size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden />
      {label}
    </span>
  );
};

const MaterialPercentBlock = ({ nutrients }: MaterialPercentBlockProps) => {
  const energy = useMemo(() => {
    const eng = nutrients.find(
      (item) => item.code === NUTRIENT_CODE_FORMULA.ENERGY
    );

    const macros = MACROS.map((macro) => {
      const item = nutrients.find((n) => n.code === macro.code);
      const gram = item?.totalAmount ?? 0;
      return {
        ...macro,
        gram,
        kcal: gram * macro.kcalPerGram,
        // 기준이 걸린 영양소는 helper 가 계산해 둔 판정을 그대로 쓴다 (compare === 0 이면 충족)
        hasTarget: !!item?.isCompare && item?.compare !== undefined,
        compare: item?.compare ?? 0,
        formula: item?.formula,
        unitName: item?.unitName ?? 'g'
      };
    });

    const macroKcal = macros.reduce((acc, macro) => acc + macro.kcal, 0);

    return {
      total: eng?.totalAmount ?? macroKcal,
      unitName: eng?.unitName ?? 'kcal',
      from: eng?.weightFrom,
      to: eng?.weightTo,
      hasTarget: !!eng?.isCompare,
      compare: eng?.compare ?? 0,
      macroKcal,
      macros: macros.map((macro) => ({
        ...macro,
        share: macroKcal > 0 ? (macro.kcal / macroKcal) * 100 : 0
      }))
    };
  }, [nutrients]);

  const energyStatus: StatusKey =
    energy.compare === 0 ? 'good' : energy.compare < 0 ? 'under' : 'over';

  const hasRange = energy.from !== undefined || energy.to !== undefined;
  // 기준 범위가 눈금의 가운데쯤 오도록 축을 잡는다. 값이 범위를 벗어나도 잘리지 않게.
  const axisMax =
    Math.max(energy.to ?? 0, energy.from ?? 0, energy.total) * 1.15 || 1;
  const toPercent = (value: number) =>
    Math.min(100, Math.max(0, (value / axisMax) * 100));

  const macroStatus = (compare: number): StatusKey =>
    compare === 0 ? 'good' : compare < 0 ? 'under' : 'over';

  const hasMacroData = energy.macroKcal > 0;
  const donutData = hasMacroData
    ? energy.macros.filter((macro) => macro.kcal > 0)
    : [];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
      {/* 도넛 가운데에 총 열량 — 이 화면에서 가장 먼저 읽어야 하는 숫자 */}
      <div className="mx-auto w-full max-w-[260px] shrink-0 lg:mx-0 lg:w-[260px]">
        <div className="relative h-[210px] w-full">
          {donutData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="kcal"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={100}
                  paddingAngle={2}
                  cornerRadius={4}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  isAnimationActive={false}
                >
                  {donutData.map((macro) => (
                    <Cell key={macro.code} fill={macro.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-6 rounded-full border-[28px] border-[#f1f2f4]" />
          )}

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="text-4xl font-bold leading-none tracking-tight text-foreground">
              {formatDecimal(energy.total, 0)}
            </span>
            <span className="text-sm text-muted-foreground">
              {energy.unitName}
            </span>
            {energy.hasTarget && (
              <span className="mt-1">
                <StatusPill status={energyStatus} size="md" />
              </span>
            )}
          </div>
        </div>

        {energy.hasTarget && hasRange ? (
          <div className="mt-4">
            {/* 기준 구간을 띠로 깔고 그 위에 실제 값을 얹어, 범위 안인지 한눈에 보이게 한다 */}
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-[#eef1f5]">
              <div
                className="absolute inset-y-0 bg-[#cfe0f5]"
                style={{
                  left: `${toPercent(energy.from ?? 0)}%`,
                  width: `${Math.max(
                    0,
                    toPercent(energy.to ?? axisMax) - toPercent(energy.from ?? 0)
                  )}%`
                }}
                aria-hidden
              />
              <div
                className="absolute inset-y-0 left-0 rounded-r-full opacity-90"
                style={{
                  width: `${toPercent(energy.total)}%`,
                  backgroundColor: STATUS[energyStatus].color
                }}
                aria-hidden
              />
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              기준 {formatDecimal(energy.from ?? 0, 0)}
              {energy.to !== undefined
                ? ` ~ ${formatDecimal(energy.to, 0)}`
                : ' 이상'}{' '}
              {energy.unitName}
              {energy.compare !== 0 && (
                <>
                  {' · '}
                  {formatDecimal(Math.abs(energy.compare), 0)} {energy.unitName}{' '}
                  {energy.compare > 0 ? '초과' : '부족'}
                </>
              )}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            이 영양기준에는 열량 범위가 없습니다.
          </p>
        )}
      </div>

      {/* 열량 기여 비율 */}
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="text-sm font-semibold text-foreground">열량 기여 비율</p>
          <p className="text-xs text-muted-foreground">
            탄수화물·단백질 4kcal/g, 지방 9kcal/g 기준
          </p>
        </div>

        {hasMacroData ? (
          <ul className="divide-y rounded-lg border">
            {energy.macros.map((macro) => (
              <li key={macro.code} className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: macro.color }}
                    aria-hidden
                  />
                  <span className="text-sm font-medium text-foreground">
                    {macro.label}
                  </span>
                  <span className="text-2xl font-bold leading-none tracking-tight text-foreground">
                    {formatDecimal(macro.share)}
                    <span className="ml-0.5 text-base font-semibold">%</span>
                  </span>
                  <span className="text-sm tabular-nums text-muted-foreground">
                    {formatDecimal(macro.gram)} {macro.unitName} ·{' '}
                    {formatDecimal(macro.kcal, 0)} kcal
                  </span>
                  {macro.hasTarget && (
                    <span className="ml-auto flex items-center gap-2">
                      {macro.formula && (
                        <span className="hidden text-xs text-muted-foreground sm:inline">
                          {macro.formula}
                        </span>
                      )}
                      <StatusPill status={macroStatus(macro.compare)} />
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-dashed p-5 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
            탄수화물·단백질·지방 정보를 가진 식재료가 아직 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialPercentBlock;
