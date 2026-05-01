import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, Filter, X, ChevronDown, ChevronRight, ShoppingBag, Heart, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [qty, setQty] = useState({});

  // Expanded states for the sidebar accordion
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');
  const selectedItem = searchParams.get('item');

  // Open the accordion for the currently selected category automatically
  useEffect(() => {
    if (selectedCategory) {
      setExpandedCategories(prev => ({ ...prev, [selectedCategory]: true }));
    }
    if (selectedSubcategory) {
      setExpandedSubcategories(prev => ({ ...prev, [selectedSubcategory]: true }));
    }
  }, [selectedCategory, selectedSubcategory]);

  const toggleCategory = (slug) => {
    setExpandedCategories(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const toggleSubcategory = (slug) => {
    setExpandedSubcategories(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const handleFilterClick = (type, slug) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (type === 'category') {
      if (selectedCategory === slug) {
        newParams.delete('category');
      } else {
        newParams.set('category', slug);
      }
      newParams.delete('subcategory');
      newParams.delete('item');
    } else if (type === 'subcategory') {
      if (selectedSubcategory === slug) {
        newParams.delete('subcategory');
      } else {
        newParams.set('subcategory', slug);
      }
      newParams.delete('item');
    } else if (type === 'item') {
      if (selectedItem === slug) {
        newParams.delete('item');
      } else {
        newParams.set('item', slug);
      }
    }
    
    setSearchParams(newParams);
    setIsMobileFilterOpen(false); // Close mobile drawer on selection
  };

  // Filter products based on selected parameters
  const filteredProducts = products.filter(p => {
    // If no category is selected, show all
    if (!selectedCategory) return true;
    
    // We match by category name or slug. Our products data uses name, categories use slug and name
    const categoryMatch = categories.find(c => c.slug === selectedCategory);
    if (!categoryMatch) return true; // Safety fallback
    
    if (p.category !== categoryMatch.name) return false;

    if (selectedSubcategory) {
      const subcatMatch = categoryMatch.subcategories?.find(sc => sc.slug === selectedSubcategory);
      if (subcatMatch && p.subcategory !== subcatMatch.name) return false;
    }

    if (selectedItem) {
      const subcatMatch = categoryMatch.subcategories?.find(sc => sc.slug === selectedSubcategory || sc.items?.some(i => i.slug === selectedItem));
      const itemMatch = subcatMatch?.items?.find(i => i.slug === selectedItem);
      if (itemMatch && p.item !== itemMatch.name) return false;
    }

    return true;
  });

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
            className={`w-3 h-3 md:w-4 md:h-4 ${
              i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Filters</h2>
        <button 
          onClick={() => setSearchParams(new URLSearchParams())}
          className="text-sm text-accent hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {categories.map(cat => (
          <div key={cat.slug} className="border-b border-gray-100 pb-3">
            <div 
              className="flex items-center justify-between cursor-pointer group"
            >
              <div 
                className={`text-sm font-bold flex-1 py-1 ${selectedCategory === cat.slug ? 'text-accent' : 'text-primary group-hover:text-accent'}`}
                onClick={() => handleFilterClick('category', cat.slug)}
              >
                {cat.name}
              </div>
              {cat.subcategories?.length > 0 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(cat.slug);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform text-gray-400 ${expandedCategories[cat.slug] ? 'rotate-180 text-accent' : ''}`} />
                </button>
              )}
            </div>

            {expandedCategories[cat.slug] && cat.subcategories?.length > 0 && (
              <div className="ml-3 mt-2 pl-3 border-l-2 border-gray-100 space-y-2">
                {cat.subcategories.map(subcat => (
                  <div key={subcat.slug}>
                    <div 
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div 
                        className={`text-sm py-1 flex-1 ${selectedSubcategory === subcat.slug && selectedCategory === cat.slug ? 'text-accent font-semibold' : 'text-gray-600 group-hover:text-accent'}`}
                        onClick={() => {
                          // Make sure category is selected if subcategory is selected
                          if (selectedCategory !== cat.slug) {
                            const newParams = new URLSearchParams(searchParams);
                            newParams.set('category', cat.slug);
                            newParams.set('subcategory', subcat.slug);
                            newParams.delete('item');
                            setSearchParams(newParams);
                          } else {
                            handleFilterClick('subcategory', subcat.slug);
                          }
                        }}
                      >
                        {subcat.name}
                      </div>
                      {subcat.items?.length > 0 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubcategory(subcat.slug);
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronDown className={`w-3 h-3 transition-transform text-gray-400 ${expandedSubcategories[subcat.slug] ? 'rotate-180 text-accent' : ''}`} />
                        </button>
                      )}
                    </div>

                    {expandedSubcategories[subcat.slug] && subcat.items?.length > 0 && (
                      <div className="ml-3 mt-1 pl-3 border-l-2 border-gray-100 space-y-1">
                        {subcat.items.map(item => (
                          <div 
                            key={item.slug}
                            className={`text-xs py-1 cursor-pointer hover:text-accent flex items-center gap-2 ${selectedItem === item.slug && selectedSubcategory === subcat.slug ? 'text-accent font-semibold' : 'text-gray-500'}`}
                            onClick={() => {
                               const newParams = new URLSearchParams(searchParams);
                               newParams.set('category', cat.slug);
                               newParams.set('subcategory', subcat.slug);
                               newParams.set('item', item.slug);
                               setSearchParams(newParams);
                            }}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedItem === item.slug ? 'bg-accent' : 'bg-gray-300'}`}></span>
                            {item.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumbs & Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group text-sm md:text-base">
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {selectedItem 
              ? categories.flatMap(c => c.subcategories).flatMap(sc => sc?.items || []).find(i => i.slug === selectedItem)?.name
              : selectedSubcategory
                ? categories.flatMap(c => c.subcategories).find(sc => sc?.slug === selectedSubcategory)?.name
                : selectedCategory
                  ? categories.find(c => c.slug === selectedCategory)?.name
                  : "All Products"
            }
          </h1>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-primary font-semibold w-full justify-center shadow-sm"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0 bg-white p-6 rounded-2xl shadow-sm sticky top-28">
            <SidebarContent />
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {/* Active Filters display */}
            {(selectedCategory || selectedSubcategory || selectedItem) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 flex items-center gap-2">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                    <button onClick={() => handleFilterClick('category', selectedCategory)}><X className="w-3 h-3 hover:text-accent" /></button>
                  </span>
                )}
                {selectedSubcategory && (
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 flex items-center gap-2">
                    {categories.flatMap(c => c.subcategories).find(sc => sc?.slug === selectedSubcategory)?.name}
                    <button onClick={() => handleFilterClick('subcategory', selectedSubcategory)}><X className="w-3 h-3 hover:text-accent" /></button>
                  </span>
                )}
                {selectedItem && (
                  <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 flex items-center gap-2">
                    {categories.flatMap(c => c.subcategories).flatMap(sc => sc?.items || []).find(i => i.slug === selectedItem)?.name}
                    <button onClick={() => handleFilterClick('item', selectedItem)}><X className="w-3 h-3 hover:text-accent" /></button>
                  </span>
                )}
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 text-sm">Showing {filteredProducts.length} results</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
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
                          {product.category} {product.subcategory ? `> ${product.subcategory}` : ''}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-primary mb-2 line-clamp-2 min-h-[40px] group-hover:text-accent transition-colors">{product.name}</h3>
                      
                      <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-1">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>



                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          disabled={!product.inStock}
                          className="flex-1 bg-primary text-white text-sm font-bold py-2.5 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add
                        </button>
                        <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-accent hover:border-accent transition-colors text-gray-400">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">We couldn't find any products matching your selected filters.</p>
                <button 
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-accent transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden backdrop-blur-sm"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-[70] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-primary text-white">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <SidebarContent />
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-accent text-white font-bold py-3 rounded-xl shadow-lg shadow-accent/20"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
