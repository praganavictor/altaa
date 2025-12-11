'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | '';

interface SortControlsProps {
  currentSort: SortOption;
}

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
] as const;

export const SortControls = ({ currentSort }: SortControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sortValue === '') {
      params.delete('sort');
    } else {
      params.set('sort', sortValue);
    }

    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
  };

  return (
    <div>
      <label
        htmlFor="sort-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Sort By
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
