import { ISeperateTray, ITrays } from '@/types/diet.type';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TemplateTray0: React.FC = (): React.ReactNode => {
  return (
    <div className="grid h-48 w-full grid-cols-12 gap-2 rounded-lg border-2 border-gray-500 p-2" />
  );
};

interface IClassList {
  mainClasses: string[];
  subClasses: string[];
}

const CLASSES_LIST: { [key: number]: IClassList } = {
  1: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl h-48 flex items-center justify-center p-2 col-span-12 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  2: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl h-48 flex items-center justify-center p-2 col-span-9 relative',
      'border border-gray-500 bg-white rounded-3xl h-48 flex items-center justify-center p-2 col-span-3 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  3: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl h-52 flex items-center justify-center p-2 col-span-5 row-span-2 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-7 row-span-1 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-7 row-span-1 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  4: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 row-span-5 h-60 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 row-span-2 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 row-span-2 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 row-span-3 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  5: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 row-span-2 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 row-span-2 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 row-span-2 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-8 row-span-3 h-36 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 row-span-3 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  6: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-7 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-5 h-36 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  7: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-36 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  8: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 h-24 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  9: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-4 h-24 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2'
    ]
  },
  10: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-1'
    ]
  },
  11: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-6 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-1',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-1'
    ]
  },
  12: {
    mainClasses: [
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative',
      'border border-gray-500 bg-white rounded-3xl flex items-center justify-center p-2 col-span-3 h-24 relative'
    ],
    subClasses: [
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-2',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-1',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-1',
      'absolute w-7 h-7 border-2 border-black bg-white top-[-5px] left-[-5px] rounded-full pl-1'
    ]
  }
};

const TemplateTrayLayout: React.FC<TrayInfo> = ({
  listItems,
  total
}: TrayInfo): React.ReactNode => {
  return (
    <motion.div className="grid w-full grid-cols-12 gap-2 rounded-lg border-2 border-gray-500 p-2">
      <AnimatePresence>
        {listItems.map((item, idx) => (
          <motion.div
            key={item.sequence}
            className={CLASSES_LIST[total].mainClasses[idx]}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 25,
                duration: 0.2
              }
            }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <span>{item.typeName}</span>
            <span className={CLASSES_LIST[total].subClasses[idx]}>
              {idx + 1}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const TemplateSeperateTray: React.FC<ISeperateTray> = ({
  listSeperate,
  isMobile = false
}: ISeperateTray): React.ReactNode => {
  if (isMobile) {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        <p className="mr-2 flex h-full items-center text-3xl">+</p>
        <motion.div className="flex w-full items-center justify-center gap-2">
          <AnimatePresence>
            {listSeperate.map((item, idx) => (
              <motion.div
                key={item.sequence}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="col-span-12 flex h-28 w-28 items-center justify-center rounded-3xl border border-gray-500 bg-white p-2"
              >
                {item.typeName}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <p className="mr-2 flex h-full items-center text-3xl">+</p>
      <motion.div className="flex w-full flex-col gap-2">
        <AnimatePresence>
          {listSeperate.map((item, idx) => (
            <motion.div
              key={item.sequence}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="col-span-12 flex h-28 w-28 items-center justify-center rounded-3xl border border-gray-500 bg-white p-2"
            >
              {item.typeName}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

type TrayInfo = Pick<ITrays, 'listItems' | 'total'>;

export const TemplateTray: React.FC<ITrays> = ({
  total,
  listItems
}: ITrays): React.ReactNode => {
  if (!total) {
    return <TemplateTray0 />;
  } else {
    return <TemplateTrayLayout listItems={listItems} total={total} />;
  }
};

export const SeperateTray: React.FC<ISeperateTray> = ({
  listSeperate,
  isMobile = false
}: ISeperateTray): React.ReactNode => {
  if (listSeperate.length)
    return (
      <TemplateSeperateTray listSeperate={listSeperate} isMobile={isMobile} />
    );
  return <></>;
};
