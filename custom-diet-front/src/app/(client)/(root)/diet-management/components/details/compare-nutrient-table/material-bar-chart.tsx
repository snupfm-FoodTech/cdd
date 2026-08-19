import { GroupedMaterial } from '@/types/food.type';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useMediaQuery } from 'usehooks-ts';

interface MaterialBarChartProps {
  groupMaterials: GroupedMaterial[];
}

const COLORS = [
  '#34d399',
  '#f87171',
  '#3b82f6',
  '#facc15',
  '#a78bfa',
  '#60a5fa'
];

const MaterialBarChart = ({ groupMaterials }: MaterialBarChartProps) => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');
  const formatWeight = (value: number) => `${value.toFixed(2)} g`;

  const CustomLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-wrap gap-4 px-4 py-2 text-sm">
        {payload.map((entry: any, index: number) => (
          <li key={`legend-${index}`} className="flex items-center space-x-2">
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                backgroundColor: entry.color
              }}
            />
            <span>
              {entry.payload.categoryName} (
              {entry.payload.recipeWeight.toFixed(2)} g)
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Custom Label below X Axis
  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#666"
        textAnchor="middle"
        fontSize={14}
        fontWeight={500}
      >
        {formatWeight(value)}
      </text>
    );
  };

  // Custom Label for Chart Tick
  const CustomTick = (props: any) => {
    const { x, y, payload } = props;
    const text = payload.value;
    const words = text.split(' '); // Split label by spaces

    // Break text into multiple lines if too long
    const maxCharsPerLine = 7;
    const lines = [];
    let currentLine = '';

    words.forEach((word: string) => {
      if ((currentLine + word).length > maxCharsPerLine) {
        lines.push(currentLine);
        currentLine = word; // Start a new line with this word
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    });
    lines.push(currentLine); // Push the last line

    return (
      <g transform={`translate(${x},${y})`}>
        {lines.map((line, index) => (
          <text
            key={index}
            x={0}
            y={index * 13} // Adjust the line height
            dy={10}
            textAnchor="middle"
            fill="#0059b2"
            fontSize={10}
            fontWeight={600}
          >
            {line}
          </text>
        ))}
      </g>
    );
  };

  if (isMobileOrTablet) {
    return (
      <>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={groupMaterials}
              dataKey="recipeWeight"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ value }) => `${value.toFixed(2)} g`}
            >
              {groupMaterials.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatWeight(value)} />
          </PieChart>
        </ResponsiveContainer>
        {/* Custom legend below with fixed height */}
        <div className="h-auto w-full">
          <CustomLegend
            payload={groupMaterials.map((entry, index) => ({
              color: COLORS[index % COLORS.length],
              payload: entry
            }))}
          />
        </div>
      </>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={groupMaterials}
          margin={{ top: 20, right: 30, left: 20, bottom: 35 }}
        >
          <XAxis
            dataKey="categoryName"
            tick={<CustomTick />} //Label
            interval={0}
          />
          <Tooltip formatter={(value: number) => formatWeight(value)} />
          <Bar
            dataKey="recipeWeight"
            fill="#0059b2"
            name={'레시피 무게'}
            label={CustomLabel}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaterialBarChart;
