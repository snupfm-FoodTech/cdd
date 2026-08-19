// KnowledgeLinkIcon.tsx
'use client';

import { Icons } from '@/components/icons';
import { useIncreaseKnowledgeViewCount } from '@/hooks/knowledge.hook';
import React from 'react';

interface KnowledgeLinkIconProps {
  kwlgId: string;
  kwlgLinkUrl: string;
}

const KnowledgeLinkIcon = ({ kwlgId, kwlgLinkUrl }: KnowledgeLinkIconProps) => {
  const mutation = useIncreaseKnowledgeViewCount();

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const RIGHT_CLICK_BUTTON = 2;
    if (event.button === RIGHT_CLICK_BUTTON) return;

    if (kwlgId) {
      mutation.mutate(kwlgId);
    }
  };

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={kwlgLinkUrl}
      onClick={handleLinkClick}
      onAuxClick={handleLinkClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Icons.document strokeWidth={1} className="mx-auto" />
    </a>
  );
};

export default KnowledgeLinkIcon;
