import React from 'react';
import { Tray } from '@/types/tray.type';
import DietShowTrayDetails from './diet-show-tray-details';
import { ITrayItem } from '@/types/diet.type';
import { cn } from '@/lib/utils';
import { CirclePlusIcon } from 'lucide-react';
import {
  BASE_PATH,
  ENUM_TRAY_TEMPLATES,
  IMAGE_TRAY_TEMPLATES,
  TYPE_FOODS
} from '@/constants';

interface DietDetailTrayIconProps {
  listTrayItems: ITrayItem[];
  listSeparateItems: ITrayItem[];
  tray: Tray;
}

const DietDetailTrayIcon = ({
  listTrayItems,
  listSeparateItems,
  tray
}: DietDetailTrayIconProps) => {
  let renderListTrayItems = null;
  let renderListSeparateItems = null;

  if (listTrayItems.length > 0) {
    if (
      [
        ENUM_TRAY_TEMPLATES.A,
        ENUM_TRAY_TEMPLATES.B,
        ENUM_TRAY_TEMPLATES.C,
        ENUM_TRAY_TEMPLATES.D
      ].includes(tray.representativeTrayCode as ENUM_TRAY_TEMPLATES)
    ) {
      const trayCode =
        tray.representativeTrayCode as keyof typeof IMAGE_TRAY_TEMPLATES;
      const imageFileName = IMAGE_TRAY_TEMPLATES[trayCode];

      renderListTrayItems = (
        <picture>
          <img
            src={`${BASE_PATH}/img/${imageFileName}.png`}
            alt="tray"
            className={cn(
              'my-1 w-auto',
              listTrayItems.length <= 2 && 'max-h-24',
              listTrayItems.length <= 8 &&
                listTrayItems.length > 2 &&
                'max-h-32',
              listTrayItems.length > 8 && 'max-h-40'
            )}
          />
        </picture>
      );
    } else {
      renderListTrayItems = (
        <picture>
          <img
            src={`${BASE_PATH}/img/tray-${listTrayItems.length}.png`}
            alt="tray"
            className={cn(
              'my-1 w-auto',
              listTrayItems.length <= 2 && 'max-h-24',
              listTrayItems.length <= 8 &&
                listTrayItems.length > 2 &&
                'max-h-32',
              listTrayItems.length > 8 && 'max-h-40'
            )}
          />
        </picture>
      );
    }
  }

  if (listSeparateItems.length > 0) {
    renderListSeparateItems = (
      <>
        <CirclePlusIcon className="h-10 w-10 font-bold text-primary" />
        <div className="flex flex-col gap-2">
          {listSeparateItems.map((item, index) => (
            <span key={index} className="text-sm text-gray-700">
              {item.typeCode === TYPE_FOODS.RICE ? (
                <picture>
                  <img
                    src={`${BASE_PATH}/img/rice.png`}
                    alt="rice"
                    className={cn(
                      listSeparateItems.length > 1 && 'max-h-12',
                      listSeparateItems.length === 1 && 'max-h-16'
                    )}
                  />
                </picture>
              ) : (
                <picture>
                  <img
                    src={`${BASE_PATH}/img/soup.png`}
                    alt="soup"
                    className={cn(
                      listSeparateItems.length > 1 && 'max-h-12',
                      listSeparateItems.length === 1 && 'max-h-16'
                    )}
                  />
                </picture>
              )}
            </span>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {renderListTrayItems}
      {renderListSeparateItems}
    </div>
  );
};

interface DietDetailTrayProps {
  tray: Tray;
  listTrayItems: ITrayItem[];
  listSeparateItems: ITrayItem[];
}

const DietDetailTray = ({
  tray,
  listTrayItems,
  listSeparateItems
}: DietDetailTrayProps) => {
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md md:w-1/2">
      <h3 className="mb-2 border-b px-3 pb-2 font-semibold text-gray-800">
        식단 구성
      </h3>
      <div className="flex w-full items-center justify-center">
        <div className="mb-4 flex w-1/2 flex-col items-center">
          <DietDetailTrayIcon
            tray={tray}
            listTrayItems={listTrayItems}
            listSeparateItems={listSeparateItems}
          />
          <span className="mt-3 text-lg font-semibold text-black">
            {tray.name}
          </span>
        </div>
      </div>
      <div className="px-3">
        <DietShowTrayDetails tray={tray} />
      </div>
    </div>
  );
};

export default DietDetailTray;
