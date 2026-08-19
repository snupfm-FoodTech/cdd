'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDetailFAQ } from '@/hooks/faq.hook';
import { useParams, useRouter } from 'next/navigation';
import { CLIENT_FAQ_URL } from '@/constants/routes';
import { Spinner } from '@/components/spinner';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import BackButton from '@/components/back-button';
import { BASE_PATH } from '@/constants';

export default function FAQDetailPage() {
  const router = useRouter();
  const paramsUrl = useParams();
  const faqId = paramsUrl.id;

  const { data: dataFAQ, isLoading } = useDetailFAQ(faqId.toString());

  if (isLoading) {
    return (
      <div className="mt-10 flex h-52 items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-faq.png`}
        title={dataFAQ?.faqQueCtnt ?? ''}
        breadcrumbs={[
          { label: '자주 묻는 질문 목록', url: CLIENT_FAQ_URL },
          { label: dataFAQ?.faqQueCtnt ?? '' }
        ]}
      />
      <div className="section-padding section-padding-y flex justify-center">
        <div className="flex w-full flex-col gap-4 md:w-4/5">
          <BackButton
            url={CLIENT_FAQ_URL}
            label="자주 묻는 질문 목록"
            size="large"
          />
          <Card className="w-full">
            <CardHeader>
              <p className="text-left text-xl font-semibold">
                {dataFAQ?.faqQueCtnt}
              </p>
            </CardHeader>
            <Separator className="my-2" />
            <CardContent>
              <div className="w-full py-4">
                <p className="break-words">{dataFAQ?.faqAnsCtnt}</p>
                <p className="my-2"> ※(문의사항)033-736-3583</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
