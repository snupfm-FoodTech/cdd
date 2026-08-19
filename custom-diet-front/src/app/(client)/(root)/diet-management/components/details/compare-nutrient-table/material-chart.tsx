import React from 'react';
import MaterialPercentBlock from './material-percent-block';
import { NutrientCompare } from '@/types/diet.type';
import { GroupedMaterial } from '@/types/food.type';
import MaterialBarChart from './material-bar-chart';

interface MaterialChartProps {
  nutrients: NutrientCompare[];
  groupMaterials: GroupedMaterial[];
}

const MaterialChart = ({ nutrients, groupMaterials }: MaterialChartProps) => {
  return (
    <>
      <h3 className="mb-4 text-xl font-semibold tracking-tight">
        열량 영양소 구성
      </h3>

      {/* Percentage Block */}

      <MaterialPercentBlock nutrients={nutrients} />

      <p className="my-4">
        <span className="mr-2 text-xl font-semibold tracking-tight">
          식품군 정보
        </span>
        <span className="text-sm text-secondary-foreground">단위:g</span>
      </p>

      {/* Bar Chart */}
      <MaterialBarChart groupMaterials={groupMaterials} />
    </>
  );
};

export default MaterialChart;
