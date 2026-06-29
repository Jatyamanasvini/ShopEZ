import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Shop() {
  const mixedProducts = [...products].sort(() => Math.random() - 0.5);

  return (
    <div className="shop-page">
      <Header />
      <div className="container py-5">
        <h2 className="mb-3">Shop</h2>
        <p className="text-muted mb-4">A scattered little treasure hunt of the full wardrobe.</p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {mixedProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
