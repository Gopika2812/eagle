import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, X } from 'lucide-react';
import { projectsData, projectCategories } from '../data/projectsData';

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const selectedCategory = searchParams.get('category');

  const handleFilterClick = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedCategory === slug) {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
    setIsMobileFilterOpen(false); // Close mobile drawer on selection
  };

  // Filter projects based on selected parameters
  const filteredProjects = projectsData.filter(p => {
    if (!selectedCategory) return true;
    return p.categorySlug === selectedCategory;
  });

  const SidebarContent = () => (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-primary">Filter Projects</h2>
        <button 
          onClick={() => setSearchParams(new URLSearchParams())}
          className="text-sm text-accent hover:underline"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2">
        {projectCategories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => handleFilterClick(cat.slug)}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors ${
              selectedCategory === cat.slug 
                ? 'bg-accent/10 text-accent border border-accent/20' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
            }`}
          >
            {cat.name}
          </button>
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
            {selectedCategory 
              ? projectCategories.find(c => c.slug === selectedCategory)?.name
              : "All Projects"
            }
          </h1>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-primary font-semibold w-full justify-center shadow-sm"
            >
              <Filter className="w-4 h-4" />
              Filter Types
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0 bg-white p-6 rounded-2xl shadow-sm sticky top-28">
            <SidebarContent />
          </div>

          {/* Project Grid */}
          <div className="flex-1 w-full">
            {/* Active Filters display */}
            {selectedCategory && (
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 flex items-center gap-2">
                  {projectCategories.find(c => c.slug === selectedCategory)?.name}
                  <button onClick={() => handleFilterClick(selectedCategory)}><X className="w-3 h-3 hover:text-accent" /></button>
                </span>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 text-sm">Showing {filteredProjects.length} projects</p>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
                  >
                    {/* Project Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // fallback
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-1">{project.location}</p>
                      <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{project.title}</h3>
                      <p className="text-sm font-semibold text-gray-500 mb-4">{project.client}</p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 flex-1">{project.description}</p>
                      
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-400">Capacity: <strong className="text-primary">{project.capacity}</strong></span>
                        <span className="text-accent text-sm font-semibold hover:underline cursor-pointer">Read More</span>
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
                <h3 className="text-xl font-bold text-primary mb-2">No projects found</h3>
                <p className="text-gray-500 mb-6">We don't have any projects in this category yet.</p>
                <button 
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-accent transition-colors"
                >
                  View All Projects
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
                  Filter Projects
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
                  Show Results ({filteredProjects.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
