import { Knowledge } from '@/types/knowledge.type';
import { CellContext } from '@tanstack/react-table';
import KnowledgeLinkIcon from './knowledge-link-icon';

const KnowledgeActionCell = ({ row }: CellContext<Knowledge, unknown>) => {
  const { kwlgId, kwlgLinkUrl } = row.original;

  return kwlgLinkUrl ? (
    <KnowledgeLinkIcon kwlgId={kwlgId} kwlgLinkUrl={kwlgLinkUrl} />
  ) : null;
};

export default KnowledgeActionCell;
