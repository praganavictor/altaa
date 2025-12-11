'use client';

import { Product } from '@/src/types/product';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState';
import { useRouter } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  const router = useRouter();

  if (products.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        message="We couldn't find any products matching your criteria. Try adjusting your filters or browse all products."
        action={{
          label: 'View All Products',
          onClick: () => router.push('/'),
        }}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
