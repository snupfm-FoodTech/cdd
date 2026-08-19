'use client';

import { PlusIcon } from 'lucide-react';

import { useEditorModal } from '@/components/editor/editor-hooks/use-modal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger
} from '@/components/ui/select';

export function BlockInsertPlugin({ children }: { children: React.ReactNode }) {
  const [modal] = useEditorModal();

  return (
    <>
      {modal}
      <Select value={''}>
        <SelectTrigger className="!h-8 w-fit">
          <PlusIcon className="size-4" />
          <span className="mx-2">삽입</span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
