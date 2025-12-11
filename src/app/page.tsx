import { fetchProducts, fetchCategories } from '@/src/lib/api';
import { sortProducts } from '@/src/lib/sorting';
import { ProductGrid } from '@/src/components/ProductGrid';
import { CategoryFilter } from '@/src/components/CategoryFilter';
import { SortControls } from '@/src/components/SortControls';

interface HomePageProps {
  searchParams: Promise<{
    category?: string;
    sort?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | '';
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const category = params.category;
  const sort = params.sort || '';

  const [products, categories] = await Promise.all([
    fetchProducts(category),
    fetchCategories(),
  ]);

  const sortedProducts = sortProducts(products, sort);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fake Store</h1>
          <p className="text-gray-600">
            Discover our collection of quality products
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <CategoryFilter categories={categories} />
          <SortControls currentSort={sort} />
        </div>

        <ProductGrid products={sortedProducts} />
      </div>
    </div>
  );
}
