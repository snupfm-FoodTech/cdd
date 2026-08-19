'use client';

import BackButton from '@/components/back-button';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import NotFoundData from '@/components/ui/not-found-data';
import { Separator } from '@/components/ui/separator';
import { BASE_PATH } from '@/constants';
import { CLIENT_NOTICE_URL } from '@/constants/routes';
import { useNoticeByID } from '@/hooks/notice.hook';
import { extractFileName, getAttachment } from '@/utils/file.util';
import Link from 'next/link';

interface NoticesDetailProps {
  params: { noticeId: string };
}

export default function CustomerSupportPage({
  params: { noticeId }
}: NoticesDetailProps) {
  const { data, isLoading } = useNoticeByID(noticeId);

  if (isLoading) {
    return (
      <div className="mt-10 flex h-52 items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!data)
    return (
      <div className="mt-10">
        <NotFoundData backUrl={CLIENT_NOTICE_URL} label="공지사항 목록" />
      </div>
    );

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-notice.png`}
        title={data.ntcTit}
        breadcrumbs={[
          { label: '공지사항 목록', url: CLIENT_NOTICE_URL },
          { label: data.ntcTit }
        ]}
      />
      <div className="section-padding section-padding-y flex justify-center">
        <div className="flex w-full flex-col gap-4 md:w-4/5">
          <BackButton
            url={CLIENT_NOTICE_URL}
            label="공지사항 목록"
            size="large"
          />
          <Card>
            <CardHeader>
              <p className="break-words text-left text-xl font-semibold">
                {data.ntcTit}
              </p>
            </CardHeader>
            <Separator className="my-2" />
            <CardContent>
              <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
                <div className="font-medium">등록일</div>
                <div>{data.creDt}</div>
                <div className="font-medium">첨부파일</div>
                <div>
                  {data.ntcAtchUrls?.length ? (
                    <Link
                      href={getAttachment(data.ntcAtchUrls[0])}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button variant="link" className="px-0">
                        {extractFileName(data.ntcAtchUrls[0])}
                      </Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <Separator className="my-2" />
              <div className="w-full break-words py-4">{data.ntcCtnt}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
