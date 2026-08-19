import { ISeperateTray, ITrayItem, ITrays } from '@/types/diet.type';
import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
  onSelect?: (trayItem?: ITrayItem) => void;
  selected?: boolean;
}> = ({ trayItem, className = '', onSelect, selected = false }) => {
  const fontSizeClass: string = getFontSizeClass(className);

  return (
    <motion.div
      layout
      initial={selected ? { opacity: 0, y: -50 } : {}}
      animate={
        selected
          ? {
              opacity: 1,
              y: [0, -20, 0, -10, 0],
              transition: {
                type: 'spring',
                stiffness: 50,
                damping: 15,
                duration: 1.5
              }
            }
          : { opacity: 1, y: 0 }
      }
      exit={
        selected
          ? {
              opacity: 0,
              scale: 0.8,
              transition: {
                type: 'spring',
                stiffness: 50,
                damping: 15,
                duration: 1.5
              }
            }
          : {}
      }
      transition={{ duration: 0.5 }}
      className={cn(
        className,
        fontSizeClass,
        'cursor-pointer transition duration-300',
        {
          'bg-blue-500 text-white': selected,
          'bg-red-100': !selected && !trayItem?.code,
          'hover:bg-red-200': !selected && !trayItem?.code,
          'hover:bg-gray-100': !selected && trayItem?.code
        }
      )}
      onClick={() => onSelect && onSelect(trayItem)}
    >
      <div className="flex flex-col items-center justify-center">
        {trayItem?.code ? (
          <div
            className={cn(
              'wrap-anywhere mb-1 break-words text-center font-semibold tracking-tight',
              {
                'text-white': selected
              }
            )}
          >
            {trayItem?.name}
          </div>
        ) : (
          <div
            className={cn('mb-1 truncate font-semibold tracking-tight', {
              'text-white': selected
            })}
          >
            빈 음식
          </div>
        )}
        <div
          className={cn('flex max-w-32 items-center justify-center', {
            'text-white': selected,
            'text-muted-foreground': !selected
          })}
        >
          {trayItem?.typeName && (
            <div className="truncate">{trayItem?.typeName}</div>
          )}
          {trayItem?.unitName && (
            <div
              className={cn('ml-1 truncate text-wrap border-l-2 pl-2', {
                'text-white': selected,
                'text-muted-foreground': !selected
              })}
            >
              {trayItem?.capacityVolume}
              {trayItem?.unitName}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TrayTemplate: React.FC<{
  listItems: ITrayItem[];
  classes: string[];
  selectedTrayItem?: ITrayItem;
  onSelect?: (item?: ITrayItem) => void;
}> = ({ listItems, onSelect, classes, selectedTrayItem }) => {
  return (
    <motion.div className="grid w-full grid-cols-12 gap-2 rounded-lg border-2 border-gray-500 p-2">
      <AnimatePresence>
        {listItems.map((item, index) => (
          <TrayItem
            key={index}
            trayItem={item}
            className={classes[index]}
            onSelect={onSelect}
            selected={
              selectedTrayItem && item.sequence === selectedTrayItem.sequence
            }
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
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
  selectedTrayItem,
  onSelect
}: ITrays): React.ReactNode => {
  const classes = templates[total] || [
    'border-2 border-gray-500 rounded-lg h-48 w-full p-2 grid grid-cols-12 gap-2'
  ];
  return (
    <TrayTemplate
      listItems={listItems}
      classes={classes}
      selectedTrayItem={selectedTrayItem}
      onSelect={onSelect}
    />
  );
};

const TemplateSeperateTray: React.FC<{
  listItems: ITrayItem[];
  selectedTrayItem?: ITrayItem;
  onSelect?: (trayItem?: ITrayItem) => void;
}> = ({ listItems, selectedTrayItem, onSelect }) => {
  return (
    <div className="flex items-center">
      <p className="mr-2 flex h-full items-center text-3xl">+</p>
      <motion.div className="flex w-full flex-col gap-2">
        <AnimatePresence>
          {listItems.map((item) => (
            <TrayItem
              key={item.sequence}
              trayItem={item}
              selected={
                selectedTrayItem && item.sequence === selectedTrayItem.sequence
              }
              className="separate col-span-12 flex h-24 w-36 items-center justify-center rounded-3xl border border-gray-500 bg-white p-2 text-xs"
              onSelect={onSelect}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const DietSeperateTray: React.FC<ISeperateTray> = ({
  listSeperate,
  selectedTrayItem,
  onSelect
}: ISeperateTray): React.ReactNode => {
  switch (listSeperate.length) {
    case 1:
    case 2:
      return (
        <TemplateSeperateTray
          listItems={listSeperate}
          selectedTrayItem={selectedTrayItem}
          onSelect={onSelect}
        />
      );
    default:
      return <></>;
  }
};

export { DietTemplateTray, DietSeperateTray };
