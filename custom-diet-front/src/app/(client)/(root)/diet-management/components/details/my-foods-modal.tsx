'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/spinner';
import { useMyMaterials } from '@/hooks/diet.hook';
import { MyMaterial } from '@/types/food.type';
import { useState } from 'react';
import CreateMaterialModal from './create-material/create-material-modal';
import DeleteMaterialDialog from '../../(sidebar)/my-foods/components/delete-material-dialog';
import EditMaterialDialog from '../../(sidebar)/my-foods/components/edit-material-dialog';
import MyFoodsTable from '../../(sidebar)/my-foods/components/my-foods-table';

const LIMIT = 10;

const MyFoodsModal = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [editTarget, setEditTarget] = useState<MyMaterial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MyMaterial | null>(null);

  const { data, isPending } = useMyMaterials(
    { page, limit: LIMIT, keyword },
    { enabled: open }
  );

  const items = data?.items ?? [];
  const totalPageNo = data?.totalPageNo ?? 1;

  const handleSearch = () => {
    setPage(1);
    setKeyword(searchInput);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setPage(1);
      setKeyword('');
      setSearchInput('');
      setEditTarget(null);
      setDeleteTarget(null);
    }
    setOpen(next);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            내 식품 목록
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>내 식품 목록</DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Input
                className="max-w-xs"
                placeholder="식품명 검색"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <Button variant="outline" size="sm" onClick={handleSearch}>
                검색
              </Button>
            </div>
            <CreateMaterialModal />
          </div>

          <div className="flex flex-col gap-4">
            {isPending ? (
              <div className="flex items-center justify-center py-8">
                <Spinner size="large" />
              </div>
            ) : (
              <>
                <MyFoodsTable
                  data={items}
                  onEdit={(material) => setEditTarget(material)}
                  onDelete={(material) => setDeleteTarget(material)}
                />

                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    이전
                  </Button>
                  <span className="text-sm">
                    {page} / {totalPageNo}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPageNo}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    다음
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {editTarget && (
        <EditMaterialDialog
          material={editTarget}
          open={!!editTarget}
          onOpenChange={(open) => {
            if (!open) setEditTarget(null);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteMaterialDialog
          material={deleteTarget}
          open={!!deleteTarget}
          onOpenChange={(open) => {
            if (!open) setDeleteTarget(null);
          }}
        />
      )}
    </>
  );
};

export default MyFoodsModal;
