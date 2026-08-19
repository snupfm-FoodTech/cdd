'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export interface FloatingActionItem {
  icon: React.ReactNode;
  label: string;
  url: string;
}

interface FloatingActionMenuProps {
  actions: FloatingActionItem[];
}

const FloatingActionMenu = ({ actions }: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen &&
        actions.map((action, index) => (
          <Link
            key={index}
            href={action.url}
            className="flex items-center gap-2"
          >
            <span className="rounded bg-white px-3 py-1 text-sm shadow">
              {action.label}
            </span>
            <Button
              size="icon"
              className={cn(
                'rounded-full text-white shadow transition',
                'bg-blue-500 hover:bg-blue-600'
              )}
            >
              {action.icon}
            </Button>
          </Link>
        ))}

      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Main FAB"
      >
        <Plus className={`transition-transform ${isOpen ? 'rotate-45' : ''}`} />
      </Button>
    </div>
  );
};

export default FloatingActionMenu;
