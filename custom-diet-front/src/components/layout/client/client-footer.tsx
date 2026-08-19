/* eslint-disable @next/next/no-img-element */
'use client';
import { BASE_PATH } from '@/constants';

const Sep = () => (
  <span className="mx-2 text-gray-300" aria-hidden>
    |
  </span>
);

const ClientFooter = () => {
  return (
    <footer className="section-padding border-t bg-white py-section text-base text-gray-800">
      <div className="mx-auto flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3 text-sm leading-relaxed text-gray-600 md:text-base">
          <p>
            <span className="font-medium text-gray-700">
              서울대학교 정밀푸드솔루션
            </span>
            <Sep />
            서울시 관악구 관악로1 서울대학교 200동 8102호
            <Sep />
            02-880-4662
          </p>
          <p>
            <span className="font-medium text-gray-700">
              월드푸드테크협의회
            </span>
            <Sep />
            서울시 강남구 테헤란로 7길 22, 1107호
            <Sep />
            02-2088-1982
          </p>
          <p>
            <span className="font-medium text-gray-700">
              한국식품산업클러스터진흥원
            </span>
            <Sep />
            전북 익산시 왕궁면 국가식품로 100
            <Sep />
            063-720-0500
          </p>

          <p className="pt-2 text-xs text-gray-500 md:text-sm">
            Copyright ⓒ서울대학교 정밀푸드솔루션,
            월드푸드테크협의회, FOODPOLIS. All rights reserved.
          </p>

          {/* Logo */}
          <div className="flex flex-wrap items-center gap-6 pt-3">
            <img
              src={`${BASE_PATH}/img/food-solution.png`}
              alt="서울대학교 로고"
              className="w-36 md:w-48"
              style={{ height: 'auto' }}
            />
            <img
              src={`${BASE_PATH}/img/food-tech.png`}
              alt="World FoodTech Council"
              className="w-36 md:w-48"
              style={{ height: 'auto' }}
            />
            <img
              src={`${BASE_PATH}/img/foodpolis.png`}
              alt="FOODPOLIS"
              className="w-36 md:w-48"
              style={{ height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClientFooter;
