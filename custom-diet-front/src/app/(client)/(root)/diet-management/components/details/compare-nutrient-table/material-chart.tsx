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
        </header>
        <MaterialPercentBlock nutrients={nutrients} />
      </section>

      <section className="rounded-lg border bg-white p-5">
        <header className="mb-4">
          <h3 className="text-lg font-semibold tracking-tight">식품군 정보</h3>
        </header>
        <MaterialBarChart groupMaterials={groupMaterials} />
      </section>
    </div>
  );
};

export default MaterialChart;
