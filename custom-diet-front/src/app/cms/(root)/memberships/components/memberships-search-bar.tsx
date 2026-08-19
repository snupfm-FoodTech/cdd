'use client';

import { SearchBarCard } from '@/components/search-bar-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MembershipSearchParams } from '@/types/membership.type';
import { SearchIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MembershipSearchBarProps {
  onSearch: (params: MembershipSearchParams) => void;
  initialSearchParams?: MembershipSearchParams;
}

type MembershipSearchType = 'name' | 'email';

const MembershipSearchBar = ({
  onSearch,
  initialSearchParams
}: MembershipSearchBarProps) => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState<MembershipSearchType>('name');

  // Set initial values for query and searchBy based on initialSearchParams
  useEffect(() => {
    if (initialSearchParams) {
      if (initialSearchParams.name) {
        setQuery(initialSearchParams.name);
        setSearchBy('name');
      } else if (initialSearchParams.email) {
        setQuery(initialSearchParams.email);
        setSearchBy('email');
      }
    }
  }, [initialSearchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const searchParams: MembershipSearchParams = {};

    if (searchBy === 'name') {
      searchParams.name = query;
    } else if (searchBy === 'email') {
      searchParams.email = query;
    }

    onSearch(searchParams);
  };

  const handleSelectChange = (value: MembershipSearchType) => {
    setSearchBy(value);
  };

  return (
    <SearchBarCard>
      <div className="flex flex-1 gap-2">
        <Select onValueChange={handleSelectChange} value={searchBy}>
          <SelectTrigger className="w-[8rem]">
            <SelectValue placeholder="회원명" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="name">회원명</SelectItem>
              <SelectItem value="email">이메일</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          className="w-full md:max-w-sm"
          placeholder="검색"
          value={query}
          onChange={handleInputChange}
        />
        <Button className="w-10" size="icon" onClick={handleSearchClick}>
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </SearchBarCard>
  );
};

export default MembershipSearchBar;
