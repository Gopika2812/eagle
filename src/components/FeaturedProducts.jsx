import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Commercial Solar Geyser",
      category: "Solar Geyser",
      price: 45000,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Monocrystalline Solar Panel",
      category: "Solar Panel",
      price: 25000,
      rating: 4.9,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Industrial Solar Plant",
      category: "Solar Plant",
      price: 2500000,
      rating: 4.7,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1545209174-da989fe76798?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Lithium Storage Battery",
      category: "Battery",
      price: 180000,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Hybrid Energy Systems",
      category: "Energy Systems",
      price: 350000,
      rating: 4.8,
      reviews: 321,
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Zero Discharge Plant",
      category: "Water Treatment",
      price: 150000,
      rating: 4.5,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <section id="products" className="py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <motion.h4 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-accent font-bold uppercase tracking-widest text-sm mb-4"
            >
              Our Store
            </motion.h4>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-primary leading-tight"
            >
              Featured Energy Solutions
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block"
          >
            <Link
              to="all-products"
              spy={true}
              smooth={true}
              offset={-80}
              className="inline-block btn btn-outline border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg cursor-pointer transition-all duration-300"
            >
              View All Products
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-gray-100 shadow-sm border border-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center gap-3">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors shadow-lg">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors shadow-lg">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors shadow-lg">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="text-center px-2">
                <span className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2 block">{product.category}</span>
                <h3 className="text-xl font-bold text-primary mb-2 transition-colors group-hover:text-accent">{product.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-gray-300'}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>
                <p className="text-accent font-bold text-lg">₹{product.price.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:hidden text-center">
          <Link
            to="all-products"
            spy={true}
            smooth={true}
            offset={-80}
            className="inline-block w-full btn btn-primary py-4 px-8 rounded-lg cursor-pointer transition-all duration-300 text-center"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
