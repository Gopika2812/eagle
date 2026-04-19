import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star, Minus, Plus } from 'lucide-react';

const AllProducts = () => {
  const [qty, setQty] = useState({});

  const products = [
    {
      id: 1,
      name: "Commercial Solar Geyser",
      category: "Solar Geyser",
      price: 45000,
      originalPrice: 55000,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      inStock: true,
    },
    {
      id: 2,
      name: "Monocrystalline Solar Panel",
      category: "Solar Panel",
      price: 25000,
      originalPrice: 32000,
      rating: 4.9,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      inStock: true,
    },
    {
      id: 3,
      name: "Industrial Solar Plant",
      category: "Solar Plant",
      price: 2500000,
      originalPrice: 3000000,
      rating: 4.7,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1545209174-da989fe76798?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      inStock: true,
    },
    {
      id: 4,
      name: "Lithium Storage Battery",
      category: "Battery",
      price: 180000,
      originalPrice: 220000,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      inStock: true,
    },
    {
      id: 5,
      name: "Hybrid Energy Systems",
      category: "Energy Systems",
      price: 350000,
      originalPrice: 420000,
      rating: 4.8,
      reviews: 321,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      inStock: true,
    },
    {
      id: 6,
      name: "Zero Discharge Plant",
      category: "Water Treatment",
      price: 150000,
      originalPrice: 185000,
      rating: 4.5,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      inStock: false,
    }
  ];

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
    <section id="all-products" className="py-20 bg-gray-50 min-h-screen">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold text-primary mb-4">All Products</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our complete range of solar energy and environmental solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
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
      </div>
    </section>
  );
};

export default AllProducts;
