'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useFoodTypes } from '@/hooks/diet.hook';

const ALL_VALUE = 'all';

interface RecipeTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const RecipeTypeSelect = ({ value, onChange }: RecipeTypeSelectProps) => {
  const { data: foodTypes } = useFoodTypes();

  return (
    <Select
      value={value || ALL_VALUE}
      onValueChange={(next) => onChange(next === ALL_VALUE ? '' : next)}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="분류 전체" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_VALUE}>분류 전체</SelectItem>
        {foodTypes?.map((type) => (
          <SelectItem key={type.code} value={type.code}>
            {type.content}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RecipeTypeSelect;
