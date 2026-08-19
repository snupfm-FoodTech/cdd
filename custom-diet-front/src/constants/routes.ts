import { Icons } from '@/components/icons';

export interface ClientNavItem {
  title: string;
  href: string;
  isService?: boolean;
}

export interface CMSNavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}

// CMS Routes
export const CMS_MEMBERSHIPS_URL = '/cms/memberships';
export const CMS_LOGIN_URL = '/cms/login';

export const CMS_KNOWLEDGE_URL = '/cms/knowledge-archives';
export const CMS_KNOWLEDGE_CREATE_URL = '/cms/knowledge-archives/create';

export const CMS_FAQ_URL = '/cms/faq';
export const CMS_FAQ_CREATE_URL = '/cms/faq/create';
export const CMS_QA_URL = '/cms/qa-manage';

export const CMS_CONSULTATION_URL = '/cms/consultation-history';
export const CMS_CONSULTATION_CREATE_URL = '/cms/consultation-history/create';

export const CMS_BUSINESS_SOLUTION_URL = '/cms/business-solution';
export const CMS_BUSINESS_SOLUTION_UPDATE_URL = (id: number | string) =>
  `/cms/business-solution/${id}/update`;
export const CMS_BUSINESS_SOLUTION_CREATE_URL = '/cms/business-solution/create';
export const CMS_BUSINESS_SOLUTION_CONTENT_CREATE_URL = (id: number | string) =>
  `/cms/business-solution/${id}/contents/create`;
export const CMS_BUSINESS_SOLUTION_CONTENT_UPDATE_URL = (
  id: number | string,
  contentId: number | string
) => `/cms/business-solution/${id}/contents/${contentId}`;

export const CMS_COMPANY_URL = '/cms/company';
export const CMS_COMPANY_CREATE_URL = '/cms/company/create';

export const CMS_NOTICES_URL = '/cms/notices';
export const CMS_NOTICES_CREATE_URL = '/cms/notices/create';

export const CMS_CHANGE_PASSWORD_URL = '/cms/change-password';

// Client Routes
export const HOME_URL = '/home';
export const APROTECH_URL = 'https://aprotech.kr';
export const LOGIN_USER_URL = '/login';
export const REGISTER_URL = '/register';
export const POLICY_URL = '/policy';
export const CHANGE_PASSWORD_URL = '/change-password';

export const KNOWLEDGE_ARCHIVES_URL = '/customer-support/knowledge-archives';
export const CORPORATE_ARCHIVES_URL = '/customer-support/corporate-archives';

export const CUSTOMER_SUPPORT_URL = '/customer-support';
export const CLIENT_NOTICE_URL = '/customer-support/notice';
export const CLIENT_FAQ_URL = '/customer-support/faq';
export const USER_QA_URL = '/customer-support/qa';
export const USER_QA_ASK_URL = '/customer-support/qa/ask';

export const DIET_MANAGEMENT_URL = '/diet-management';
export const DIET_MANAGEMENT_URL_ALT = '/diet-management-alt';
export const DIET_MANAGEMENT_CREATE_URL = '/diet-management/create';
export const DIET_MANAGEMENT_UPDATE_URL = '/diet-management/update';
export const DIET_MANAGEMENT_DIET_DETAILS = '/diet-management/diet-details';
export const DIET_MANAGEMENT_MY_FOODS = '/diet-management/my-foods';

export const CLIENT_INFO = '/client-info';
export const CLIENT_INFO_UPDATE = '/client-info/update';
export const CLIENT_INFO_CHANGE_PASSWORD = '/client-info/change-password';

export const BUSINESS_SOLUTION_URL = '/business-solution';
export const CONSULTATION_REQUEST_URL =
  '/business-solution/consultation-request';
export const BUSINESS_SOLUTION_CONTENT_URL = (
  id: number | string,
  contentId: number | string
) => `/business-solution/${id}/detail/${contentId}`;

export const SERVICE_INTRODUCTION_URL = '/service-introduction';

export const CUSTOMER_SUPPORT_ROUTES: ClientNavItem[] = [
  {
    title: '공지사항',
    href: CLIENT_NOTICE_URL
  },
  {
    title: 'FAQ',
    href: CLIENT_FAQ_URL
  },
  {
    title: 'Q&A',
    href: USER_QA_URL
  }
] as const;

export const CUSTOMER_SUPPORT_SUB_ROUTES: ClientNavItem[] = [
  {
    title: '지식 아카이브',
    href: KNOWLEDGE_ARCHIVES_URL
  },
  {
    title: '기업 아카이브',
    href: CORPORATE_ARCHIVES_URL
  }
] as const;

// Routes
export const CLIENT_ROUTES: ClientNavItem[] = [
  {
    title: '홈',
    href: HOME_URL
  },
  {
    title: '서비스 소개',
    href: SERVICE_INTRODUCTION_URL
  },
  {
    title: '식단 관리',
    href: DIET_MANAGEMENT_URL
  },
  {
    title: '비즈 솔루션',
    href: BUSINESS_SOLUTION_URL
  },
  {
    title: '고객지원',
    href: CUSTOMER_SUPPORT_URL
  }
] as const;

export const CMS_ROUTES: CMSNavItem[] = [
  {
    title: '전체 회원 관리',
    href: CMS_MEMBERSHIPS_URL,
    icon: 'user'
  },
  {
    title: '문헌 DB 관리',
    href: CMS_KNOWLEDGE_URL,
    icon: 'knowledge'
  },
  {
    title: '회사 경영',
    href: CMS_COMPANY_URL,
    icon: 'building2'
  },
  {
    title: 'FAQ 관리',
    href: CMS_FAQ_URL,
    icon: 'question'
  },
  {
    title: '공지사항 관리',
    href: CMS_NOTICES_URL,
    icon: 'announcement'
  },
  {
    title: '질의 응답 관리',
    href: CMS_QA_URL,
    icon: 'qa'
  },
  {
    title: '상담신청내역',
    href: CMS_CONSULTATION_URL,
    icon: 'document'
  },
  {
    title: '비즈솔루션 관리',
    href: CMS_BUSINESS_SOLUTION_URL,
    icon: 'businessSolution'
  }
] as const;
