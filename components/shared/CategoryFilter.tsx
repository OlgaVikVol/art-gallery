'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Artwork } from '@/types';

type CategoryFilterProps = {
  artworks: Artwork[];
  onSelectCategory: (category: string) => void;
};

const CategoryFilter = ({ artworks, onSelectCategory }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const categoryList = artworks?.map((artwork: Artwork) => artwork.department_title) || [];
    const uniqueCategories: string[] = Array.from(new Set(categoryList));
    setCategories(uniqueCategories);
  }, [artworks]);

  const handleSelectCategory = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <Select onValueChange={(value: string) => handleSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
        {categories.map((category) => (
          <SelectItem value={category} key={category} className="select-item p-regular-14">
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
