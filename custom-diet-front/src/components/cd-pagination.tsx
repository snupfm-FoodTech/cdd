import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { Icons } from './icons';
import { Button } from './ui/button';
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem
} from './ui/pagination';
import { useMediaQuery } from 'usehooks-ts';
import { scrollToTop } from '@/utils';

export interface PaginationProps {
  totalPages: number;
  totalPagesToDisplay?: number;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CDPagination: React.FC<PaginationProps> = ({
  totalPages,
  totalPagesToDisplay = 5,
  pageIndex,
  setPageIndex
}: PaginationProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const currentPage = pageIndex + 1;
  const showLeftEllipsis = currentPage - 1 > totalPagesToDisplay / 2;
  const showRightEllipsis =
    totalPages - currentPage + 1 > totalPagesToDisplay / 2;

  const getPageNumbers = () => {
    if (totalPages <= totalPagesToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(totalPagesToDisplay / 2);
    // To ensure that the current page is always in the middle
    let start = currentPage - half; //6-5=1
    let end = currentPage + half; //6+5=11
    // If the current page is near the start
    if (start < 1) {
      start = 1;
      end = totalPagesToDisplay;
    }
    // If the current page is near the end
    if (end > totalPages) {
      start = totalPages - totalPagesToDisplay + 1;
      end = totalPages;
    }
    // If showLeftEllipsis is true, add an ellipsis before the start page
    if (showLeftEllipsis) {
      start++;
    }
    // If showRightEllipsis is true, add an ellipsis after the end page
    if (showRightEllipsis) {
      end--;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const renderPaginationItems = () => {
    const pageNumbers = getPageNumbers();
    return pageNumbers.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationButton
          isActive={pageNumber === currentPage}
          onClick={() => {
            setPageIndex(pageNumber - 1);
            scrollToTop();
          }}
        >
          {pageNumber}
        </PaginationButton>
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent className="justify-center">
        <PaginationItem className="flex items-center gap-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(0);
              scrollToTop();
            }}
            disabled={currentPage === 1}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(pageIndex - 1);
              scrollToTop();
            }}
            disabled={currentPage === 1}
          >
            <Icons.chevronLeft className="h-4 w-4" />
          </Button>
        </PaginationItem>

        {isMobile ? (
          <PaginationItem>
            <span className="px-2 text-sm font-semibold">
              {currentPage} / {totalPages}
            </span>
          </PaginationItem>
        ) : (
          <>
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {renderPaginationItems()}
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        <PaginationItem className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(pageIndex + 1);
              scrollToTop();
            }}
            disabled={currentPage === totalPages}
          >
            <Icons.chevronRight className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPageIndex(totalPages - 1);
              scrollToTop();
            }}
            disabled={currentPage === totalPages}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CDPagination;
