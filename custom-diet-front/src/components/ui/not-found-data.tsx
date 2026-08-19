import { cn } from '@/lib/utils';
import BackButton from '../back-button';

interface NotFoundDataProps {
  backUrl: string;
  label: string;
  labelSize?: 'medium' | 'large';
  className?: string;
}

const NotFoundData = ({
  backUrl,
  label,
  className,
  labelSize = 'large'
}: NotFoundDataProps) => {
  return (
    <div
      className={cn(
        'section-padding mx-auto w-full space-y-4 py-10',
        className
      )}
    >
      <BackButton url={backUrl} label={label} size={labelSize} />
      <div>데이터를 찾을 수 없습니다</div>
    </div>
  );
};

export default NotFoundData;
