'use client';

import BackButton from '@/components/back-button';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import NotFoundData from '@/components/ui/not-found-data';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import { CMS_MEMBERSHIPS_URL } from '@/constants/routes';
import {
  useDeleteMembership,
  useMembership,
  useResetPassword
} from '@/hooks/membership.hook';
import { formatDate } from '@/utils/date.util';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MembershipDetailProps {
  params: { membershipId: string };
}

const MembershipDetail = ({ params }: MembershipDetailProps) => {
  const { membershipId } = params;
  const router = useRouter();
  const { data: membership, isLoading } = useMembership(membershipId);

  const [showAlert, setShowAlert] = useState<{
    type?: 'resetPassword' | 'delete';
    isOpen: boolean;
  }>({ isOpen: false });
  const handleAlertClose = () => setShowAlert({ isOpen: false });
  const deleteMutation = useDeleteMembership();
  const resetPasswordMutation = useResetPassword();

  const handleAlertConfirm = async () => {
    if (showAlert.type === 'resetPassword') {
      await resetPasswordMutation.mutateAsync(membershipId);
    } else if (showAlert.type === 'delete') {
      try {
        await deleteMutation.mutateAsync(membershipId);
        router.push(CMS_MEMBERSHIPS_URL);
      } catch (error) {
        console.log(error);
      }
    }
    handleAlertClose();
  };

  const renderAlertModal = () => {
    let title = '';
    let description = '';
    let confirmText: string | undefined;
    let loading = false;

    if (showAlert.type === 'resetPassword') {
      loading = resetPasswordMutation.isPending;
      title = '이 멤버십의 비밀번호를 재설정하시겠습니까?';
      description = '재설정된 임시 비밀번호가 해당 회원의 이메일로 전송됩니다.';
      confirmText = '재설정';
    } else if (showAlert.type === 'delete') {
      loading = deleteMutation.isPending;
      title = '이 멤버십을 삭제하시겠습니까?';
      description = '삭제 시 복구할 수 없습니다.';
    }

    return (
      <AlertModal
        title={title}
        description={description}
        isOpen={showAlert.isOpen}
        onClose={handleAlertClose}
        loading={loading}
        onConfirm={handleAlertConfirm}
        confirmText={confirmText}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!membership) {
    return (
      <NotFoundData
        backUrl={CMS_MEMBERSHIPS_URL}
        label={CMS_BACK_TO_LIST_TITLE}
        className="w-full px-8 pt-4"
      />
    );
  }

  return (
    <div className="px-8 pt-4">
      {renderAlertModal()}
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <BackButton
            url={CMS_MEMBERSHIPS_URL}
            label={CMS_BACK_TO_LIST_TITLE}
            size="large"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="secondary"
            className="gap-2"
            disabled={!membership}
            onClick={() =>
              setShowAlert({ type: 'resetPassword', isOpen: true })
            }
          >
            <Icons.sync size={16} />
            회원 비밀번호 초기화
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="gap-2"
            disabled={!membership}
            onClick={() => setShowAlert({ type: 'delete', isOpen: true })}
          >
            <Icons.trash2 size={16} />
            회원 정보 삭제
          </Button>
        </div>
      </div>

      <div className="space-y-8 px-10 pt-10">
        <h3 className="text-2xl font-medium">{membership.usrNm}</h3>
        <div className="grid grid-cols-[200px_auto] gap-2">
          <p className="text-muted-foreground">이메일</p>
          <p>{membership.usrEml}</p>

          <p className="text-muted-foreground">연락처</p>
          <p>{membership.usrPhnNo}</p>

          <p className="text-muted-foreground">최근 로그인 일자</p>
          <p>
            {membership.usrLstLoginDt
              ? formatDate(membership.usrLstLoginDt)
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetail;
