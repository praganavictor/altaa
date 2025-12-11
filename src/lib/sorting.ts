import { Product } from '@/src/types/product';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | '';

export const sortProducts = (
  products: Product[],
  sortBy: SortOption
): Product[] => {
  if (!sortBy) {
    return products;
  }

  const sortedProducts = [...products];

  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);

    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);

    case 'name-asc':
      return sortedProducts.sort((a, b) =>
        a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
      );

    case 'name-desc':
      return sortedProducts.sort((a, b) =>
        b.title.localeCompare(a.title, 'en', { sensitivity: 'base' })
      );

    default:
      return sortedProducts;
  }
};
