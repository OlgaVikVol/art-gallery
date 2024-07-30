"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import Card from "./Card";
import { Artwork } from "@/types";

type CollectionProps = {
  data: Artwork[],
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number;
  totalPages?: number;
  urlParamName?: string;
}

const Collection = (props: CollectionProps) => {
  const { data, emptyStateSubtext, emptyTitle, page, totalPages = 0, urlParamName } = props;
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(newPage));
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((artwork) => (
              <li key={artwork.id} className="flex justify-center">
                <Card artwork={artwork} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
