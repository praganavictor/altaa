import { fetchProductById, fetchProducts } from '@/src/lib/api';
import { ProductImage } from '@/src/components/ProductImage';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const products = await fetchProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | Fake Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const StarRating = ({ rate, count }: { rate: number; count: number }) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400 text-2xl">
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
        {hasHalfStar && <span>★</span>}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
      <span className="text-lg font-medium text-gray-700">{rate}</span>
      <span className="text-gray-500">({count} reviews)</span>
    </div>
  );
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
        >
          ← Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative aspect-square bg-white rounded-lg border border-gray-200 p-8">
              <ProductImage src={product.image} alt={product.title} priority />
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full capitalize">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="mb-6">
                <StarRating
                  rate={product.rating.rate}
                  count={product.rating.count}
                />
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
