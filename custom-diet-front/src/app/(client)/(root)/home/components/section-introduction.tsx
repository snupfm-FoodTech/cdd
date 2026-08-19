import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from 'lucide-react';
import {
  CLIENT_FAQ_URL,
  CLIENT_NOTICE_URL,
  CORPORATE_ARCHIVES_URL,
  DIET_MANAGEMENT_CREATE_URL,
  DIET_MANAGEMENT_URL,
  KNOWLEDGE_ARCHIVES_URL,
  LOGIN_USER_URL,
  REGISTER_URL
} from '@/constants/routes';

enum CardType {
  Personnel = 'Personnel',
  Business = 'Business'
}

interface Item {
  text: string;
  url: string;
}

interface CardProps {
  title: string;
  items: Item[];
  type: CardType;
  onClick: (type: CardType) => void;
}

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const transition = { duration: 0.4, ease: 'easeInOut' };

const CardPersonnel = ({ title, items, type, onClick }: CardProps) => {
  return (
    <motion.div
      className="flex items-center justify-between"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      transition={transition}
    >
      <div className="hole-card-4 mr-5 h-60 w-10/12 rounded-xl bg-blue-100 p-10">
        <h2 className="mb-8 text-2xl font-bold text-primary">{title}</h2>
        <div className="flex space-x-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex h-20 w-40 cursor-pointer items-center justify-center rounded-xl bg-white p-4 shadow-md"
            >
              <a
                href={item.url}
                className="block text-center text-teal-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        onClick={() =>
          onClick(
            type === CardType.Personnel ? CardType.Business : CardType.Personnel
          )
        }
        className="relative z-10 h-60 w-2/12 cursor-pointer rounded-xl bg-orange-100"
      >
        <div className="relative bottom-0 right-0 flex h-60 w-full items-center justify-center">
          <div className="text-2xl font-bold text-orange-600">사업</div>
          <div
            className="absolute z-10 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100"
            style={{
              left: '-45px'
            }}
          >
            <ArrowLeftCircleIcon className="h-8 w-8 font-bold text-orange-600" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CardBusiness = ({ title, items, type, onClick }: CardProps) => {
  return (
    <motion.div
      className="flex items-center justify-between"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
      transition={transition}
    >
      <div
        onClick={() =>
          onClick(
            type === CardType.Personnel ? CardType.Business : CardType.Personnel
          )
        }
        className="relative z-10 h-60 w-2/12 cursor-pointer rounded-xl bg-blue-100"
      >
        <div className="relative bottom-0 right-0 flex h-60 w-full items-center justify-center">
          <div className="text-2xl font-bold text-primary">손님</div>
          <div
            className="absolute z-10 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100"
            style={{
              right: '-45px'
            }}
          >
            <ArrowRightCircleIcon className="h-8 w-8 font-bold text-green-600" />
          </div>
        </div>
      </div>
      <div className="hole-card-5 mr-5 h-60 w-10/12 rounded-xl bg-orange-100 p-10">
        <h2 className="mb-8 text-2xl font-bold text-orange-600">{title}</h2>
        <div className="flex space-x-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex h-20 w-40 cursor-pointer items-center justify-center rounded-xl bg-white p-4 shadow-md"
            >
              <a
                href={item.url}
                className="block text-center text-orange-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.text}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SectionIntroduction = () => {
  const personalItems: Item[] = [
    { text: '로그인', url: LOGIN_USER_URL },
    { text: '등록하다', url: REGISTER_URL },
    { text: '회사 세부정보 보기', url: CORPORATE_ARCHIVES_URL },
    { text: '자세한 지식 보기', url: KNOWLEDGE_ARCHIVES_URL },
    { text: '자세한 공지사항 보기', url: CLIENT_NOTICE_URL },
    { text: 'FAQ 보기', url: CLIENT_FAQ_URL }
  ];

  const businessItems: Item[] = [
    { text: '다이어트 관리', url: DIET_MANAGEMENT_URL },
    { text: '쉽게 다이어트 만들기', url: DIET_MANAGEMENT_CREATE_URL },
    { text: '회사 세부정보 보기', url: CORPORATE_ARCHIVES_URL },
    { text: '자세한 지식 보기', url: KNOWLEDGE_ARCHIVES_URL },
    { text: '자세한 공지사항 보기', url: CLIENT_NOTICE_URL },
    { text: 'FAQ 보기', url: CLIENT_FAQ_URL }
  ];

  const [cardType, setCardType] = useState<CardType>(CardType.Personnel);

  const handleClicked = (type: CardType) => {
    setCardType(type);
  };

  return (
    <div className="mr-2 p-8">
      <AnimatePresence mode="wait">
        {cardType === CardType.Personnel ? (
          <CardPersonnel
            key="personnel"
            title="손님"
            items={personalItems}
            type={CardType.Personnel}
            onClick={handleClicked}
          />
        ) : (
          <CardBusiness
            key="business"
            title="사업"
            items={businessItems}
            type={CardType.Business}
            onClick={handleClicked}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionIntroduction;
