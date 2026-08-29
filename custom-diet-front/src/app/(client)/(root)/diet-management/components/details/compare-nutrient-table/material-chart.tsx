import { NutrientCompare } from '@/types/diet.type';
import { GroupedMaterial } from '@/types/food.type';
import React from 'react';
import MaterialBarChart from './material-bar-chart';
import MaterialPercentBlock from './material-percent-block';

interface MaterialChartProps {
  nutrients: NutrientCompare[];
  groupMaterials: GroupedMaterial[];
}

const MaterialChart = ({ nutrients, groupMaterials }: MaterialChartProps) => {
  return (
    <div className="space-y-4">
      <section className="rounded-lg border bg-white p-5">
        <header className="mb-5">
          <h3 className="text-lg font-semibold tracking-tight">
            열량 · 영양소 구성
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            이 식단의 총 열량과, 열량을 어떤 영양소가 채우고 있는지 보여줍니다.
          </p>
        </header>
        <MaterialPercentBlock nutrients={nutrients} />
      </section>

      <section className="rounded-lg border bg-white p-5">
        <header className="mb-4">
          <h3 className="text-lg font-semibold tracking-tight">식품군 정보</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            식재료를 기초식품군으로 묶어 보여줍니다. %는 6가지 식품군 합계에서 그
            식품군이 차지하는 중량 비중입니다.
          </p>
        </header>
        <MaterialBarChart groupMaterials={groupMaterials} />
      </section>
    </div>
  );
};

export default MaterialChart;
