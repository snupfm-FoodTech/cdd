'use client';

import * as React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SolutionType } from '@/api-client/open.api';
import { useMediaQuery } from 'usehooks-ts';
import { Badge } from '@/components/ui/badge';

type Props = {
  items?: SolutionType[];
  className?: string;
  value?: string;
  onValueChange?: (v: string) => void;
};

/**
 * BusinessSolutionTabs
 * - Shows tabs, with a responsive number of visible triggers.
 * - Uses useMediaQuery instead of manual resize listener.
 */
export function BusinessSolutionTabs({
  items = [],
  className,
  value,
  onValueChange
}: Props) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1023px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)');

  // ----- Controlled / Uncontrolled logic -----
  const initial = items[0] ? String(items[0].id) : '';
  const isControlled = value !== undefined;

  const [inner, setInner] = React.useState<string>(initial);

  // When item list changes, if the current value is invalid, reset to first
  React.useEffect(() => {
    const hasCurrent =
      (isControlled ? value : inner) &&
      items.some((x) => String(x.id) === (isControlled ? value : inner));
    if (!hasCurrent) {
      if (!isControlled) setInner(initial);
      // also notify parent if controlled & parent passed an invalid value
      if (isControlled && onValueChange) onValueChange(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const current = isControlled ? (value as string) : inner;

  const setCurrent = (v: string) => {
    if (!isControlled) setInner(v);
    onValueChange?.(v);
  };

  // Decide how many tabs to show before moving overflow into dropdown
  const visibleCount = isMobile ? 2 : isTablet ? 3 : isLargeDesktop ? 7 : 5;

  const defaultValue = String(items[0].id);

  const [active, setActive] = React.useState(defaultValue);

  React.useEffect(() => {
    if (!items.find((x) => String(x.id) === active)) {
      setActive(defaultValue);
    }
  }, [items, active, defaultValue]);

  if (!items.length) {
    return (
      <div className="">
        <div className="rounded-xl border bg-white p-4">
          <div className="mb-2 text-base font-semibold text-gray-400">
            관리자 페이지에서 새 솔루션을 추가하거나 나중에 다시 시도해주세요.
          </div>
        </div>
      </div>
    );
  }

  const visibleTabs = items.slice(0, visibleCount);
  const overflowTabs = items.slice(visibleCount);

  return (
    <div className={cn('', className)}>
      <div>
        <Tabs value={current} onValueChange={setCurrent} className="w-full">
          {/* Tab header */}
          <div>
            <div className="flex items-center gap-1 overflow-x-visible p-2">
              {/* Visible tabs */}
              <TabsList className="h-auto w-auto bg-transparent p-0">
                {visibleTabs.map((it) => (
                  <TabsTrigger
                    key={it.id}
                    value={String(it.id)}
                    className={cn(
                      'px-3 py-3 text-sm font-medium md:px-6 md:text-lg',
                      'data-[state=active]:bg-primary data-[state=active]:text-white',
                      'max-w-[11rem] truncate'
                    )}
                    title={it.title}
                  >
                    {it.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Overflow dropdown */}
              {overflowTabs.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-9 px-3 md:h-[52px] md:px-6"
                    >
                      …
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {overflowTabs.map((it) => (
                      <DropdownMenuItem
                        key={it.id}
                        onSelect={() => setCurrent(String(it.id))}
                        className="max-w-[16rem]"
                        title={it.title}
                      >
                        <span className="truncate">{it.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Tab content */}
          {items.map((it) => (
            <TabsContent key={it.id} value={String(it.id)} className="p-4">
              <div className="my-5 flex flex-col gap-4">
                <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-6">
                  <h3 className="text-lg font-semibold md:text-2xl">
                    {it.description}
                  </h3>
                  {it.tag && (
                    <Badge
                      className={cn(
                        'rounded-full',
                        'bg-gradient-to-r from-primary to-primary/80',
                        'px-3 py-1.5 text-xs font-semibold',
                        'md:px-5 md:py-2.5 md:text-lg md:font-bold',
                        'text-white shadow-md',
                        'transition-all hover:scale-105 hover:shadow-lg'
                      )}
                    >
                      {it.tag}
                    </Badge>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
