'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { MyMaterial } from '@/types/food.type';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export type MyFoodsTableMeta = {
  onEdit: (material: MyMaterial) => void;
  onDelete: (material: MyMaterial) => void;
};

export const myFoodsColumns: ColumnDef<MyMaterial>[] = [
  {
    accessorKey: 'name',
    header: '식품명'
  },
  {
    accessorKey: 'inUse',
    size: 90,
    header: () => <div className="text-center">상태</div>,
    cell: ({ row }) => {
      if (row.original.inUse) {
        return (
          <div className="flex justify-center">
            <Badge variant="secondary">사용 중</Badge>
          </div>
        );
      }
      return (
        <div className="flex justify-center">
          <Badge variant="outline">미사용 중</Badge>
        </div>
      );
    }
  },
  {
    id: 'actions',
    header: () => <div className="text-center">관리</div>,
    cell: ({ row, table }) => {
      const material = row.original;
      const meta = table.options.meta as MyFoodsTableMeta;

      return (
        <div className="ml-auto flex w-max items-center justify-end gap-2 whitespace-nowrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => meta.onEdit(material)}
          >
            <Pencil className="mr-1 h-3.5 w-3.5" />
            수정
          </Button>
          {material.inUse ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button variant="outline" size="sm" disabled>
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      삭제
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>식단에서 사용 중인 식품은 삭제할 수 없습니다.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => meta.onDelete(material)}
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              삭제
            </Button>
          )}
        </div>
      );
    }
  }
];
