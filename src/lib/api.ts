import { Product } from '@/src/types/product';

const BASE_URL = 'https://fakestoreapi.com';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // A harmless User-Agent may help avoid some generic blocks
    'User-Agent': 'Altaa/1.0 (+https://example.com)',
  },
};
export const fetchProducts = async (category?: string): Promise<Product[]> => {
  try {
    const url = category
      ? `${BASE_URL}/products/category/${category}`
      : `${BASE_URL}/products`;

    const response = await fetch(url, options);

    console.log('Fetch request sent. Awaiting response...', response);

    if (!response.ok) {
      console.error(`Unable to load products. Status: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, options);

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
    const response = await fetch(`${BASE_URL}/products/categories`, options);

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
