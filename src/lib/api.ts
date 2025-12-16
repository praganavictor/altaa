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
  try {
    const url = category
      ? `${BASE_URL}/products/category/${category}`
      : `${BASE_URL}/products`;

    console.log('Fetching products from URL:', url);

    const response = await fetch(url, getFetchOptions());

    console.log('Fetch request sent. Awaiting response...', response);

    if (!response.ok) {
      console.error(`Unable to load products. Status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log('Products fetched successfully.', data);

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/${id}`,
      getFetchOptions()
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch product ${id}. Status: ${response.status}`
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/products/categories`,
      getFetchOptions()
    );

    if (!response.ok) {
      console.error(`Failed to fetch categories. Status: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
