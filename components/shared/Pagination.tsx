'use client';
import { Button } from "../ui/button";

type PaginationProps = {
  urlParamName?: string;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex gap-2">
			<Button
				size='lg'
				variant='outline'
				className="w-28"
				onClick={handlePreviousPage}
				disabled={page <= 1}
			>
			Previous
			</Button>
			<Button
				size='lg'
				variant='outline'
				className="w-28"
				onClick={handleNextPage}
				disabled={page >= totalPages}
			>
			Next
			</Button>
		</div>
  );
};

export default Pagination;
