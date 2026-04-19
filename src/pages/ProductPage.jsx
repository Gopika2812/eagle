import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';

const ProductPage = () => {
  const { categorySlug } = useParams();
  const [qty, setQty] = useState({});

  // Filter products based on the slug or show all if categorySlug is 'all'
  const filteredProducts = categorySlug === 'all-products' || !categorySlug
    ? products 
    : products.filter(p => p.slug === categorySlug);

  // Get current category name for the title
  const categoryName = categorySlug === 'all-products' || !categorySlug
    ? 'All Products'
    : (filteredProducts.length > 0 ? filteredProducts[0].category : 'Products');

  const handleQtyChange = (id, value) => {
    if (value < 1) return;
    setQty({ ...qty, [id]: value });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container">
        {/* Breadcrumbs / Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/" className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold text-primary mb-4">{categoryName}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {categorySlug === 'all-products' 
              ? "Explore our complete range of solar energy and environmental solutions"
              : `Premium ${categoryName} solutions for a sustainable and efficient future.`
            }
          </p>
        </motion.div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-primary mt-2 mb-3">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-accent">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs text-accent font-bold">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity Control */}
                  <div className="mb-4">
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                      <button
                        onClick={() =>
                          handleQtyChange(
                            product.id,
                            (qty[product.id] || 1) - 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {qty[product.id] || 1}
                      </span>
                      <button
                        onClick={() =>
                          handleQtyChange(
                            product.id,
                            (qty[product.id] || 1) + 1
                          )
                        }
                        className="p-2 hover:bg-gray-100 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      disabled={!product.inStock}
                      className="flex-1 bg-accent text-white font-bold py-3 rounded-lg hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </button>
                    <button
                      disabled={!product.inStock}
                      className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Buy Now
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <Heart className="w-5 h-5 text-accent" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-primary mb-4">No products found in this category.</h3>
            <Link to="/" className="btn btn-primary">Return to Homepage</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
