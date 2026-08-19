import { CDInput } from '@/components/cd-input';
import { Icons } from '@/components/icons';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

interface MaterialSearchBarProps {
  onSearch: (searchText: string) => void;
}

const MaterialSearchBar = ({ onSearch }: MaterialSearchBarProps) => {
  const [value, setValue] = useState('');

  const debouncedSearch = debounce((searchText: string) => {
    onSearch(searchText);
  }, 300);

  useEffect(() => {
    debouncedSearch(value);
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, value]);

  return (
    <div className="w-full md:w-72">
      <CDInput
        placeholder="추가할 식품명을 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        endIcon={Icons.search}
      />
    </div>
  );
};

export default MaterialSearchBar;
