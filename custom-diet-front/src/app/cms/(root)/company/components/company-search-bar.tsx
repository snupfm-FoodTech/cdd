'use client';

import { Icons } from '@/components/icons';
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
import { CMS_COMPANY_CREATE_URL } from '@/constants/routes';

import { CMSCompanySearchParams } from '@/types/corporate.type';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface CompanySearchBarProps {
  onSearch: (params: CMSCompanySearchParams) => void;
  initialSearchParams?: CMSCompanySearchParams;
}

type CompaniesSearchType = 'coNm' | 'coTpNm';

const CompanySearchBar = ({
  onSearch,
  initialSearchParams = {}
}: CompanySearchBarProps) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<CompaniesSearchType>('coNm');

  useEffect(() => {
    // Set initial values from initialSearchParams if available
    if (initialSearchParams.coNm) {
      setQuery(initialSearchParams.coNm);
      setType('coNm');
    } else if (initialSearchParams.coTpNm) {
      setQuery(initialSearchParams.coTpNm);
      setType('coTpNm');
    }
  }, [initialSearchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const searchParams: CMSCompanySearchParams = {};
    searchParams[type] = query;
    onSearch(searchParams);
  };

  const handleSelectChange = (value: CompaniesSearchType) => {
    setType(value);
  };

  return (
    <SearchBarCard>
      <div className="flex justify-between">
        <div className="flex justify-start gap-2">
          <Select onValueChange={handleSelectChange} value={type}>
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder="회원명" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="coNm">기업명</SelectItem>
                <SelectItem value="coTpNm">기업 유형</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            className="w-[20rem]"
            placeholder="검색"
            value={query}
            onChange={handleInputChange}
          />
          <Button onClick={handleSearchClick} className="w-10" size="icon">
            <Icons.search className="h-4 w-4" />
          </Button>
        </div>
        <Link href={CMS_COMPANY_CREATE_URL}>
          <Button>
            <Icons.add className="mr-1 h-5 w-5" />
            기업 등록
          </Button>
        </Link>
      </div>
    </SearchBarCard>
  );
};

export default CompanySearchBar;
