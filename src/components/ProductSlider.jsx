import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductSlider = () => {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
  };

  // Get some featured products (first 8 for example)
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-accent"></div>
              <span className="text-accent font-semibold tracking-widest text-xs uppercase">Our Catalog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Products</h2>
          </div>
          
          {/* Controls */}
          <div className="hidden md:flex gap-2">
            <button 
              onClick={slideLeft}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-colors text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={slideRight}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-colors text-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
          <div 
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory custom-scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="min-w-[280px] md:min-w-[320px] max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group snap-start shrink-0"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // fallback
                    }}
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-sm bg-red-500 px-3 py-1 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-2">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-wider bg-accent/10 px-2 py-1 rounded-md">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2 line-clamp-2 min-h-[40px] group-hover:text-accent transition-colors">{product.name}</h3>
                  
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>

                  {/* Action Button */}
                  <Link
                    to="/all-products"
                    className="mt-auto w-full bg-primary/5 text-primary text-sm font-bold py-2.5 rounded-lg hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    View Products
                  </Link>
                </div>
              </motion.div>
            ))}
            
            {/* View All Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="min-w-[280px] md:min-w-[320px] max-w-[320px] bg-primary rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center group snap-start shrink-0 p-8 text-center"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex justify-center items-center mb-4 group-hover:bg-accent transition-colors">
                  <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Explore All</h3>
                <p className="text-gray-300 text-sm mb-6">Discover our complete range of sustainable solutions.</p>
                <Link
                  to="/all-products"
                  className="bg-white text-primary text-sm font-bold py-2.5 px-6 rounded-lg hover:bg-accent hover:text-white transition-colors"
                >
                  View Catalog
                </Link>
            </motion.div>

          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default ProductSlider;
