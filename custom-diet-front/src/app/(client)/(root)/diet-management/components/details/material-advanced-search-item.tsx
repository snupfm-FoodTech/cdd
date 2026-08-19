import { Button } from '@/components/ui/button';

interface MaterialSelectItemProps {
  selected: boolean;
  value: number;
  label: string;
  onClick: () => void;
}

const MaterialAdvancedSearchItem = ({
  selected,
  label,
  onClick
}: MaterialSelectItemProps) => {
  return (
    <Button
      type="button"
      className="w-full"
      variant={selected ? 'default' : 'outline'}
      onClick={onClick}
      size="sm"
    >
      {label}
    </Button>
  );
};

export default MaterialAdvancedSearchItem;
