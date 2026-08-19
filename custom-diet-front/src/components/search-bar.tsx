import { useState, useEffect } from 'react';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string; // Accept value as a prop to control the input externally
  disable?: boolean;
}

const SearchBar = ({
  onSearch,
  placeholder,
  value = '',
  disable = false
}: SearchBarProps) => {
  const [query, setQuery] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Synchronize the internal query state with the passed value prop
  useEffect(() => {
    setQuery(value);
  }, [value]);

  return (
    <div className="flex items-center gap-4">
      <Input
        className="w-full md:w-[20rem]"
        placeholder={placeholder || '검색'}
        aria-label="검색"
        value={query}
        onChange={handleInputChange}
        disabled={disable}
      />
      <Button className="w-10" size="icon" onClick={() => onSearch(query)}>
        <Icons.search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
