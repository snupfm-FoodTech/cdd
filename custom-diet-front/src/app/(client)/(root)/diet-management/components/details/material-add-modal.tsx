'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FC, useEffect, useState } from 'react';
import MaterialAdvancedSearch from './material-advanced-search';
import MaterialBasicSearch from './material-basic-search';

type SearchType = 'basic' | 'advanced';

interface MaterialAddModalProps {
  allergens: number[];
}

const MaterialAddModal: FC<MaterialAddModalProps> = ({ allergens }) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<SearchType>('basic');

  useEffect(() => {
    setModalType('basic');
  }, [open]);

  const handleGoBack = () => {
    setModalType('basic');
  };

  const goToAdvancedSearch = () => {
    setModalType('advanced');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" className="w-28">
          식품 추가하기
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[40rem]">
        {modalType === 'basic' ? (
          <MaterialBasicSearch
            allergens={allergens}
            onGotoAdvancedSearch={goToAdvancedSearch}
          />
        ) : (
          <MaterialAdvancedSearch
            allergens={allergens}
            onGoBack={handleGoBack}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MaterialAddModal;
