'use client';

import { IUserData } from '@/api-client/auth.api';
import { CMS_CHANGE_PASSWORD_URL } from '@/constants/routes';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDownIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

interface UserNavProps {
  user: IUserData;
  onLogout: () => void;
}

export const UserNav = ({ user, onLogout }: UserNavProps) => {
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center rounded-md bg-gray-100 px-4 py-2 text-gray-800 transition duration-200 ease-in-out hover:bg-gray-200">
          <span className="mr-2">{user.usrNm}</span>
          <ChevronDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="mt-1 w-48 origin-top scale-95 transform rounded-md border border-gray-200 bg-white py-1 opacity-0 shadow-lg transition duration-200 ease-in-out data-[state=open]:scale-100 data-[state=open]:opacity-100"
        sideOffset={5}
        align="end"
      >
        <DropdownMenu.Item
          className="flex cursor-pointer items-center gap-2 px-4 py-2 transition duration-200 ease-in-out hover:bg-gray-100"
          onClick={() => router.push(CMS_CHANGE_PASSWORD_URL)}
        >
          <PersonIcon className="h-4 w-4" />
          <span>계정 정보</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
        <DropdownMenu.Item
          className="flex cursor-pointer items-center gap-2 px-4 py-2 transition duration-200 ease-in-out hover:bg-gray-100"
          onClick={onLogout}
        >
          <ExitIcon className="h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
