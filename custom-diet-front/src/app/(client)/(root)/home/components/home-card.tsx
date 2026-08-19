import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ColumnDef, Row } from '@tanstack/react-table';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HomeTable } from './home-table';

interface HomeCardProps<TData, TValue> {
  title: string;
  href: string;
  columnId?: 'ntcId' | 'coId';
  variant?: 'default' | 'primary';
  table: {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    loading: boolean;
  };
}

const HomeCard = <TData, TValue>({
  title,
  href,
  table,
  columnId,
  variant = 'default'
}: HomeCardProps<TData, TValue>) => {
  const router = useRouter();

  const handleRowClick = (row: Row<any>) => {
    if (!columnId) return;

    router.push(`${href}/${row.original[columnId]}`);
  };

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <h4 className="text-xl font-semibold tracking-tight">{title}</h4>
        <Link href={href}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg font-medium text-muted-foreground"
          >
            더보기
            <Icons.add
              width={16}
              height={16}
              className="text-muted-foreground"
            ></Icons.add>
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-2">
        <HomeTable
          columns={table.columns}
          data={table.data}
          variant={variant}
          loading={table.loading}
          onRowClick={columnId ? handleRowClick : undefined}
        ></HomeTable>
      </CardContent>
    </Card>
  );
};

export default HomeCard;
