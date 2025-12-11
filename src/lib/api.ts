import { Product } from '@/src/types/product';

const BASE_URL = 'https://fakestoreapi.com';

const getFetchOptions = (): RequestInit => {
  const isDev = process.env.NODE_ENV === 'development';
  return {
    cache: isDev ? 'no-store' : 'force-cache',
    next: isDev ? { revalidate: 0 } : undefined,
  };
};

export const fetchProducts = async (category?: string): Promise<Product[]> => {
  const url = category
    ? `${BASE_URL}/products/category/${category}`
    : `${BASE_URL}/products`;

  const response = await fetch(url, getFetchOptions());

  if (!response.ok) {
    throw new Error(
      `Unable to load products. The server responded with status ${response.status}. Please try again later.`
    );
  }

  return await response.json();
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  const response = await fetch(
    `${BASE_URL}/products/${id}`,
    getFetchOptions()
  );

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(
      `Unable to load product details. The server responded with status ${response.status}. Please try again later.`
    );
  }

  return await response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(
    `${BASE_URL}/products/categories`,
    getFetchOptions()
  );

  if (!response.ok) {
    throw new Error(
      `Unable to load categories. The server responded with status ${response.status}. Please try again later.`
    );
  }

  return await response.json();
};
