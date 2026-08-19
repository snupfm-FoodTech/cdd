'use client';

import { FC } from 'react';
import { Home, List, User, Utensils, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import {
  CLIENT_INFO,
  DIET_MANAGEMENT_CREATE_URL,
  DIET_MANAGEMENT_URL,
  HOME_URL
} from '@/constants/routes';

interface BottomNavProps {
  onListClick?: () => void;
}

const BottomNavigationBar: FC<BottomNavProps> = ({ onListClick }) => {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/50 text-white">
      <div className="relative mx-auto flex h-16 items-center justify-around bg-black/50 text-xs shadow-md">
        {/* Home */}
        <button
          onClick={() => router.push(HOME_URL)}
          className="flex flex-col items-center justify-center text-sm"
        >
          <Home
            className={cn(
              'mb-1 h-5 w-5',
              path.includes(HOME_URL) ? 'text-accent' : 'text-white'
            )}
          />
          <span
            className={cn(
              path.includes(HOME_URL) ? 'text-accent' : 'text-white'
            )}
          >
            홈
          </span>
        </button>

        {/* Food */}
        <button
          onClick={() => router.push(DIET_MANAGEMENT_URL)}
          className="flex flex-col items-center justify-center text-sm"
        >
          <Utensils
            className={cn(
              'mb-1 h-5 w-5',
              new RegExp(`^${DIET_MANAGEMENT_URL}/\\d+$`).test(path)
                ? 'text-accent'
                : 'text-white'
            )}
          />
          <span
            className={cn(
              new RegExp(`^${DIET_MANAGEMENT_URL}/\\d+$`).test(path)
                ? 'text-accent'
                : 'text-white'
            )}
          >
            다이어트
          </span>
        </button>

        {/* Floating + Button */}
        <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 transform">
          <button
            onClick={() => {
              onListClick && onListClick();
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg"
          >
            <List />
          </button>
        </div>

        {/* Create */}
        <button
          onClick={() => router.push(DIET_MANAGEMENT_CREATE_URL)}
          className="flex flex-col items-center justify-center text-sm"
        >
          <Plus
            className={cn(
              'mb-1 h-5 w-5',
              path.includes(DIET_MANAGEMENT_CREATE_URL)
                ? 'text-accent'
                : 'text-white'
            )}
          />
          <span
            className={cn(
              path.includes(DIET_MANAGEMENT_CREATE_URL)
                ? 'text-accent'
                : 'text-white'
            )}
          >
            추가
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => router.push(CLIENT_INFO)}
          className="flex flex-col items-center justify-center text-sm"
        >
          <User
            className={cn(
              'mb-1 h-5 w-5',
              path.includes(CLIENT_INFO) ? 'text-accent' : 'text-white'
            )}
          />
          <span
            className={cn(
              path.includes(CLIENT_INFO) ? 'text-accent' : 'text-white'
            )}
          >
            프로필
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
