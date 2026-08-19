'use client';

import {
  BookOpenIcon,
  Building2Icon,
  CookingPotIcon,
  LibraryBigIcon,
  MailQuestionIcon,
  UtensilsCrossedIcon,
  ArrowRightIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  CLIENT_FAQ_URL,
  CLIENT_NOTICE_URL,
  CORPORATE_ARCHIVES_URL,
  DIET_MANAGEMENT_CREATE_URL,
  DIET_MANAGEMENT_URL,
  KNOWLEDGE_ARCHIVES_URL
} from '@/constants/routes';
import { usePrevious } from '@/hooks/use-auth';

type Service = { title: string; icon: JSX.Element; link: string };

// Balanced sizes: smaller icon + tighter label
const ICON = 'h-6 w-6 md:h-7 md:w-7';
const STROKE = 1.7;

const services: Service[] = [
  {
    title: '식단 관리',
    icon: <UtensilsCrossedIcon className={ICON} strokeWidth={STROKE} />,
    link: DIET_MANAGEMENT_URL
  },
  {
    title: '지식 아카이브',
    icon: <LibraryBigIcon className={ICON} strokeWidth={STROKE} />,
    link: KNOWLEDGE_ARCHIVES_URL
  },
  {
    title: '기업 아카이브',
    icon: <Building2Icon className={ICON} strokeWidth={STROKE} />,
    link: CORPORATE_ARCHIVES_URL
  },
  {
    title: '식단 추가',
    icon: <CookingPotIcon className={ICON} strokeWidth={STROKE} />,
    link: DIET_MANAGEMENT_CREATE_URL
  },
  {
    title: '공지사항',
    icon: <BookOpenIcon className={ICON} strokeWidth={STROKE} />,
    link: CLIENT_NOTICE_URL
  },
  {
    title: '자주묻는질문',
    icon: <MailQuestionIcon className={ICON} strokeWidth={STROKE} />,
    link: CLIENT_FAQ_URL
  }
];

export default function SectionFrequentlyUsedServices() {
  const router = useRouter();
  const { setPrevAsPath } = usePrevious();

  // Keep previous URL if auth is required and user is unauthenticated
  const go = (url: string) => {
    const needsAuth =
      url === DIET_MANAGEMENT_URL || url === DIET_MANAGEMENT_CREATE_URL;
    if (needsAuth && !Cookies.get('accessToken')) setPrevAsPath(url);
    router.push(url);
  };

  return (
    <section className="w-full py-10">
      <h2 className="mb-4 text-2xl font-semibold text-primary">
        자주 찾는 서비스
      </h2>

      {/* Auto-fit grid keeps rows tight and consistent */}
      <ul className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
        {services.map((s) => (
          <li key={s.title}>
            <button
              onClick={() => go(s.link)}
              className="group relative flex h-32 w-full flex-col items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/[0.04] hover:ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:h-36"
              aria-label={s.title}
            >
              {/* Smaller badge to match icon scale */}
              <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15 md:h-11 md:w-11">
                <span className="text-primary">{s.icon}</span>
              </div>

              {/* Label sized to icon; tight leading for cleaner lock-up */}
              <span className="line-clamp-1 text-[13px] font-medium leading-tight text-slate-800 transition-colors group-hover:text-primary md:text-sm">
                {s.title}
              </span>

              {/* Subtle affordance */}
              <ArrowRightIcon
                className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-primary/70 opacity-0 transition-opacity group-hover:opacity-100"
                strokeWidth={STROKE}
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
