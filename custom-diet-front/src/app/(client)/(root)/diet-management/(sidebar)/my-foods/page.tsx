'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/spinner';
import { useMyMaterials } from '@/hooks/diet.hook';
import { MyMaterial } from '@/types/food.type';
import { useState } from 'react';
import CreateMaterialModal from '../../components/details/create-material/create-material-modal';
import DeleteMaterialDialog from './components/delete-material-dialog';
import EditMaterialDialog from './components/edit-material-dialog';
import MyFoodsTable from './components/my-foods-table';

const LIMIT = 10;

const MyFoodsPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const [editTarget, setEditTarget] = useState<MyMaterial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MyMaterial | null>(null);

  const { data, isPending } = useMyMaterials({ page, limit: LIMIT, keyword });

  const items = data?.items ?? [];
  const totalPageNo = data?.totalPageNo ?? 1;

  const handleSearch = () => {
    setPage(1);
    setKeyword(searchInput);
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">내 식품 목록</h2>
        <CreateMaterialModal />
      </div>

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

      {isPending ? (
        <div className="flex flex-1 items-center justify-center">
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
    </div>
  );
};

export default MyFoodsPage;
