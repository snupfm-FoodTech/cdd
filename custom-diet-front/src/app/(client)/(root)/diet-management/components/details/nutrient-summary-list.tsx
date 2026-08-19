import { Separator } from '@/components/ui/separator';
import { useNutrients } from '@/hooks/diet.hook';

export interface NutrientSummary {
  code: string;
  name: string;
  totalWeight: number;
  unit: string;
}

const NutrientSummaryItem = ({ item }: { item: NutrientSummary }) => {
  return (
    <div className="flex justify-between">
      <div className="text-left text-sm">{item.name}</div>
      <div className="text-right text-sm">
        {item.totalWeight.toFixed(2)} <span>{item.unit}</span>
      </div>
    </div>
  );
};

const NutrientSummaryList = ({ items }: { items: NutrientSummary[] }) => {
  const { data: masterData, isLoading } = useNutrients();

  if (isLoading || !masterData) return null;

  const orderMap: Record<string, number> = {};
  masterData?.forEach((m: any) => {
    orderMap[m.code] = m.orderSeq;
  });

  const sortedItems = [...items].sort((a, b) => {
    const orderA = orderMap[a.code] ?? 9999;
    const orderB = orderMap[b.code] ?? 9999;
    return orderA - orderB;
  });

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="text-left text-sm text-muted-foreground">영양성분</div>
        <div className="text-right text-sm text-muted-foreground">
          총 섭취량
        </div>
      </div>
      <Separator />
      {sortedItems.map((item) => (
        <NutrientSummaryItem key={item.code} item={item} />
      ))}
    </div>
  );
};

export default NutrientSummaryList;
