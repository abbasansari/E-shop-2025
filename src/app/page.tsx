import ProductPage from '@/components/product/ProductPage';
import { mockProduct } from '@/data/productData';


export default function Home() {
  return (
    <main className="py-8">
      <ProductPage product={mockProduct} />
    </main>
  );
}