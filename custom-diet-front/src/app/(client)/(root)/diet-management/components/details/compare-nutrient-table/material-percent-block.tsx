import { NutrientCompare } from '@/types/diet.type';
import { useMemo } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const CODES = ['CHO', 'PROTEIN', 'FAT'];

interface MaterialPercentBlockProps {
  nutrients: NutrientCompare[];
}

const MaterialPercentBlock = ({ nutrients }: MaterialPercentBlockProps) => {
  // A generic function to calculate the percentage for any code
  const calculatePercentage = (
    code: string,
    filteredData: NutrientCompare[]
  ): number => {
    const item = filteredData.find((item) => item.code === code);
    const totalAmount = filteredData.reduce(
      (acc, curr) => acc + (curr.totalAmount || 0),
      0
    ); // Total of all filtered items
    if (item && item.totalAmount) {
      const percentage = (item.totalAmount / totalAmount) * 100;
      return parseFloat(percentage.toFixed(2)); // Rounds to 2 decimal places
    }
    return 0;
  };

  const isMobile = useMediaQuery('(max-width: 640px)');

  // Using useMemo to memoize the filtered data
  const filteredData = useMemo(() => {
    return nutrients.filter((item) => CODES.includes(item.code));
  }, [nutrients]);

  // Calculate percentage for 'CHO'
  const choPercentage = useMemo(
    () => calculatePercentage(CODES[0], filteredData),
    [filteredData]
  );
  // Calculate percentage for 'PROTEIN'
  const proteinPercentage = useMemo(
    () => calculatePercentage(CODES[1], filteredData),
    [filteredData]
  );
  // Calculate percentage for 'FAT'
  const fatPercentage = useMemo(
    () => calculatePercentage(CODES[2], filteredData),
    [filteredData]
  );

  return (
    <div className="mb-4 flex w-full flex-col gap-3 md:flex-row">
      <div className="flex flex-col gap-2" style={{ flexGrow: choPercentage }}>
        <div className="items-left flex rounded-lg border-2 border-green-500 bg-green-100 p-4">
          <span className="text-2xl font-bold">{choPercentage} %</span>
        </div>
        <span className="text-lg font-semibold text-green-600">탄수화물</span>
      </div>
      <div
        className="flex flex-col gap-2"
        style={{ flexGrow: proteinPercentage }}
      >
        <div className="items-left flex rounded-lg border-2 border-red-500 bg-red-100 p-4">
          <span className="text-2xl font-bold">{proteinPercentage} %</span>
        </div>
        <span className="text-lg font-semibold text-red-600">단백질</span>
      </div>
      <div className="flex flex-col gap-2" style={{ flexGrow: fatPercentage }}>
        <div className="items-left flex rounded-lg border-2 border-blue-500 bg-blue-100 p-4">
          <span className="text-2xl font-bold">{fatPercentage} %</span>
        </div>
        <span className="text-lg font-semibold text-primary">지방</span>
      </div>
    </div>
  );
};

export default MaterialPercentBlock;
