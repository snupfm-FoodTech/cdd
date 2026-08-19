import { cn } from '@/lib/utils';
import { ISeperateTray, ITrayItem, ITrays } from '@/types/diet.type';
import { Material } from '@/types/food.type';
import React, { useEffect, useState } from 'react';
import { extractGeoData } from '../../helpers';
import DietDetailSpecialNutritionButton from './diet-detail-special-nutrition-button';
import Image from 'next/image';
import { BASE_PATH } from '@/constants';
import TruncateText from '@/components/ui/truncate-text';

const getFontSizeClass = (className: string) => {
  if (className.includes('separate')) {
    return 'text-xs';
  }
  const colSpanMatch = className.match(/col-span-(\d+)/);
  if (colSpanMatch && parseInt(colSpanMatch[1], 10) <= 3) {
    return 'text-xs';
  }
  return 'text-sm';
};

const TrayItem: React.FC<{
  className?: string;
  trayItem?: ITrayItem;
  icon: boolean;
}> = ({ trayItem, className = '', icon = false }) => {
  const fontSizeClass: string = getFontSizeClass(className);
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    if (trayItem) {
      setMaterials(extractGeoData(trayItem));
    }
  }, [trayItem]);

  if (!trayItem) return null;

  if (!icon) {
    return (
      <div className={cn(className, fontSizeClass, 'bg-gray-200')}>
        <div className="flex items-center gap-2">
          <div className="w-8">
            <Image
              src={`${BASE_PATH}/img/${trayItem.typeCode}.png`}
              alt={`image-tray-${trayItem.typeCode}`}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-8"
            />
          </div>
          <div className="flex flex-col">
            {trayItem?.code ? (
              <>
                <div>
                  <TruncateText
                    className="mb-1 tracking-tight"
                    text={`${trayItem.typeName}`}
                  />
                </div>

                <div>
                  <TruncateText
                    className="mb-1 font-bold tracking-tight"
                    text={`${trayItem.name}`}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <TruncateText
                    className="mb-1 tracking-tight"
                    text={`${trayItem.typeName}`}
                  />
                </div>

                <div>
                  <TruncateText
                    className="mb-1 font-bold tracking-tight text-destructive"
                    text="빈 음식"
                  />
                </div>
              </>
            )}
            {materials.length > 0 && (
              <div className="mt-2">
                <DietDetailSpecialNutritionButton
                  className={className}
                  foodTray={trayItem}
                  materials={materials}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <div className={cn(className, 'bg-blue-500')} />;
};

const TrayTemplate: React.FC<{
  listItems: ITrayItem[];
  classes: string[];
  icon?: boolean;
}> = ({ listItems, icon, classes }) => {
  return (
    <div className={cn('grid w-full grid-cols-12', icon ? 'gap-1' : 'gap-2')}>
      {listItems.map((item, index) => (
        <TrayItem
          key={index}
          trayItem={item}
          className={classes[index]}
          icon={icon || false}
        />
      ))}
    </div>
  );
};
const templatesIcon: { [key: number]: string[] } = {
  1: [
    'border border-blue-500 bg-white rounded h-16 flex items-center justify-center p-1 text-xs col-span-12'
  ],
  2: [
    'border border-blue-500 bg-white rounded h-16 flex items-center justify-center p-1 text-xs col-span-8',
    'border border-blue-500 bg-white rounded h-16 flex items-center justify-center p-1 text-xs col-span-4'
  ],
  3: [
    'border border-blue-500 bg-white rounded h-18 flex items-center justify-center p-2 text-xs col-span-5 row-span-2',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-7 row-span-1',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-7 row-span-1'
  ],
  4: [
    'border border-blue-500 bg-white rounded h-23 flex items-center justify-center p-1 text-xs col-span-6 row-span-5',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3 row-span-2',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3 row-span-2',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-6 row-span-3'
  ],
  5: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3 row-span-2',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3 row-span-2',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-6 row-span-2',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-8 row-span-3',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-4 row-span-3'
  ],
  6: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-7',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-5'
  ],
  7: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-4'
  ],
  8: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-1 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-6',
    'border border-blue-500 bg-white rounded h-12 flex items-center justify-center p-1 text-xs col-span-6'
  ],
  9: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-4'
  ],
  10: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-6',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-6',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3'
  ],
  11: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-6',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3'
  ],
  12: [
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3',
    'border border-blue-500 bg-white rounded h-8 flex items-center justify-center p-2 text-xs col-span-3'
  ]
};

const templates: { [key: number]: string[] } = {
  1: [
    'border border-gray-500 bg-white rounded-3xl h-48 flex items-center justify-center p-2 text-xs col-span-12'
  ],
  2: [
    'border border-gray-500 bg-white rounded-3xl h-48 flex items-center justify-center p-2 text-xs col-span-9',
    'border border-gray-500 bg-white rounded-3xl h-48 flex items-center justify-center p-2 text-xs col-span-3'
  ],
  3: [
    'border border-gray-500 bg-white rounded-3xl h-48 flex items-center justify-center p-2 text-xs col-span-5 row-span-2',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-7 row-span-1',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-7 row-span-1'
  ],
  4: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 row-span-5 h-60',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 row-span-2',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 row-span-2',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 row-span-3'
  ],
  5: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 row-span-2 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 row-span-2',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 row-span-2',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-8 row-span-3 h-32',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 row-span-3'
  ],
  6: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-7 h-36',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-5 h-36'
  ],
  7: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-36',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-36',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-36'
  ],
  8: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 h-24'
  ],
  9: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-4 h-24'
  ],
  10: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24'
  ],
  11: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-6 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24'
  ],
  12: [
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24',
    'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 text-xs col-span-3 h-24'
  ]
};

const DietTemplateTray: React.FC<ITrays> = ({
  total,
  listItems,
  icon
}: ITrays): React.ReactNode => {
  let classes = templates[total] || [
    'border-2 border-gray-500 rounded-lg h-48 w-full p-2 grid grid-cols-12 gap-2'
  ];
  if (icon) {
    classes = templatesIcon[total] || [
      'border-2 border-blue-500 rounded-lg h-16 w-full p-1 grid grid-cols-12'
    ];
  }
  return <TrayTemplate listItems={listItems} classes={classes} icon={icon} />;
};

const TemplateSeperateTray: React.FC<{
  listItems: ITrayItem[];
  icon?: boolean;
}> = ({ listItems, icon }) => {
  if (!icon) {
    return (
      <div className="flex items-center">
        <p className="mr-2 flex h-full items-center text-3xl">+</p>
        <div className="flex w-full flex-col gap-2">
          {listItems.map((item) => (
            <TrayItem
              key={item.sequence}
              trayItem={item}
              icon={icon || false}
              className="separate col-span-12 flex w-40 items-center justify-center rounded-3xl border border-gray-500 bg-white p-2 text-xs"
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <p className="mr-1 flex h-full items-center text-lg font-bold">+</p>
      <div className="flex w-full flex-col gap-1">
        {listItems.map((item) => (
          <TrayItem
            key={item.sequence}
            trayItem={item}
            icon={icon || false}
            className="separate col-span-12 flex h-8 w-8 items-center justify-center rounded border border-blue-500 bg-white p-1 text-xs"
          />
        ))}
      </div>
    </div>
  );
};

const DietSeperateTray: React.FC<ISeperateTray> = ({
  listSeperate,
  icon
}: ISeperateTray): React.ReactNode => {
  switch (listSeperate.length) {
    case 1:
    case 2:
      return <TemplateSeperateTray listItems={listSeperate} icon={icon} />;
    default:
      return <></>;
  }
};

export { DietSeperateTray, DietTemplateTray };
