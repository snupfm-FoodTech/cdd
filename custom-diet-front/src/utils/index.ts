import { getFileUrl } from '@/api-client/api-url';
import { LOCAL_STORAGE } from '@/constants';
import { CMS_LOGIN_URL, HOME_URL, LOGIN_USER_URL } from '@/constants/routes';
import Cookies from 'js-cookie';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function fakeFileFromName(fileName: string): File {
  const blob = new Blob([], { type: 'image/png' });
  return new File([blob], fileName, { type: 'image/png' });
}

export const base64Url = (src: string) => {
  if (!src) return '';
  if (isBase64(src)) return src;
  return getFileUrl(src);
};

export function isBase64(str: string): boolean {
  if (!str || typeof str !== 'string') return false;

  if (/^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(str)) return true;

  const cleaned = str.trim().replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(cleaned)) return false;

  try {
    const pad = cleaned.length % 4;
    const padded = pad ? cleaned + '='.repeat(4 - pad) : cleaned;
    atob(padded);
    return true;
  } catch {
    return false;
  }
}

export const clearAllInterval = () => {
  const interval_id = window.setInterval(
    function () {},
    Number.MAX_SAFE_INTEGER
  );
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
};

export const createListYears = (startYear: number, endYear: number) => {
  const listYears = [];

  for (let year = endYear; year >= startYear; year--) {
    listYears.push({
      id: year,
      value: year.toString()
    });
  }

  return listYears;
};

export const formatNumber = (value: number) => {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const ensureProtocol = (url: string) => {
  if (!url) return ''; // handle empty or undefined URLs gracefully
  if (!/^https?:\/\//i.test(url)) {
    return `//${url}`;
  }
  return url;
};

export const clearAllCookies = (
  router: AppRouterInstance,
  isAdmin: boolean
) => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('userData');

  if (!isAdmin) {
    router.push(LOGIN_USER_URL);
  } else {
    router.push(CMS_LOGIN_URL);
  }
};

export const checkTokenExisted = (router: AppRouterInstance) => {
  const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : '';
  if (!Cookies.get('accessToken') || !userData) {
    router.push(LOGIN_USER_URL);
    router.refresh();
    return false;
  } else {
    return true;
  }
};

export const checkTokenNotExisted = (router: AppRouterInstance) => {
  const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : '';
  const accessToken = Cookies.get('accessToken');
  if (accessToken && userData) {
    const lastPathname =
      localStorage.getItem(LOCAL_STORAGE.LAST_PAGE) || HOME_URL;
    const domain = window.location.origin;
    window.location.href = `${domain}${lastPathname}`;
    return false;
  } else {
    return true;
  }
};

export const scrollToTop = () => {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 300);
};
