import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { getApiBaseUrl } from './api-url';

let accessToken = Cookies.get('accessToken');

export const setAccessToken = (_accessToken: string) => {
  accessToken = _accessToken;
  Cookies.set('accessToken', _accessToken, { expires: 10 }); // 30m
};

export const http = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

http.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';

http.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      !error.response?.config?.url?.includes('auth/refresh-token') &&
      !error.response?.config?.url?.includes('login')
    ) {
      return refreshToken(error);
    }

    return Promise.reject(error.response?.data);
  }
);

let fetchingToken = false;
let subscribers: ((token: string) => any)[] = [];

const onAccessTokenFetched = (token: string) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const addSubscriber = (callback: (token: string) => any) => {
  subscribers.push(callback);
};

const refreshToken = (oError: AxiosError) => {
  try {
    const { response } = oError;

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((token: string) => {
        response!.config.headers['Authorization'] = `Bearer ${token}`;
        resolve(http(response!.config));
      });
    });

    if (!fetchingToken) {
      fetchingToken = true;
      const refreshToken = Cookies.get('refreshToken');

      http.post('auth/refresh-token', { refreshToken }).then((res: any) => {
        setAccessToken(res.accessToken);
        onAccessTokenFetched(res.accessToken);
      });
    }
    return retryOriginalRequest;
  } catch (error) {
    if (!Router.asPath.includes('/login')) {
      Router.push('/login');
    }
    return Promise.reject(oError);
  } finally {
    fetchingToken = false;
  }
};
