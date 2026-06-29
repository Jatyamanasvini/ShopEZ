import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const categoryMap = {
  jackets: 'Jackets',
  bottoms: 'Bottoms',
  tops: 'Tops',
  accessories: 'Accessories',
  footwear: 'Footwear',
};

export default function CategoryPage() {
  const { category } = useParams();
  const selectedCategory = categoryMap[category] || 'All';
  const categoryProducts = products.filter((product) => product.category === selectedCategory);

  return (
    <div className="shop-page">
      <Header />
      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
          <div>
            <h2 className="mb-2">{selectedCategory}</h2>
            <p className="text-muted mb-0">Only the {selectedCategory.toLowerCase()} pieces from the grunge-glam wardrobe.</p>
          </div>
          <Link to="/shop" className="btn btn-outline">View all products</Link>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {categoryProducts.map((product) => (
            <div key={product.id} className="col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
