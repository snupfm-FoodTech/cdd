import { cn } from '@/lib/utils';

interface LineClampTextProps {
  text: string;
  line?: number;
  className?: string;
}

const TruncateText = ({ text, line = 1, className }: LineClampTextProps) => {
  return (
    <div
      className={cn(
        'overflow-hidden break-all',
        `line-clamp-${line}`,
        className
      )}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: line,
        WebkitBoxOrient: 'vertical'
      }}
    >
      {text}
    </div>
  );
};

export default TruncateText;
