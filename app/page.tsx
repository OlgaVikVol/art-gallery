'use client';

import { useEffect, useState } from 'react';
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllArtworks } from "@/lib/actions/artwork.actions";
import { SearchParamProps, Artwork } from "@/types";

export default function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;
  const searchText = (searchParams?.query as string) || '';
  const initialCategory = (searchParams?.category as string) || '';

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchText);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const fetchArtworks = async () => {
      const data = await getAllArtworks(page, limit, searchQuery, category);
      setArtworks(data?.data || []);
      setTotalPages(Math.ceil(data?.pagination?.total / limit));
    };

    fetchArtworks();
  }, [page, limit, searchQuery, category]);

  useEffect(() => {
    filterArtworks();
  }, [artworks, searchQuery, category]);

  const filterArtworks = () => {
    let filtered = artworks;

    if (category && category !== 'All') {
      filtered = filtered.filter((artwork: Artwork) => artwork.department_title === category);
    }

    if (searchQuery) {
      filtered = filtered.filter((artwork: Artwork) =>
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArtworks(filtered);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <section id="artworks" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">
          Thousands of Artworks
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search onSearch={handleSearch} />
          <CategoryFilter artworks={artworks} onSelectCategory={handleCategorySelect} />
        </div>
       
        <Collection 
          data={filteredArtworks}
          emptyTitle="No Artworks Found"
          emptyStateSubtext="Come back later"
          limit={limit}
          page={page}
          totalPages={totalPages}
          urlParamName="page"
        /> 
      </section>
    </main>
  );
}
