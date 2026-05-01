import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const Projects = () => {
  // Take one project from each category or just the first 4 featured
  const displayProjects = projectsData.slice(0, 4);

  return (
    <section id="projects" className="bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Our Portfolio</h4>
            <h2 className="text-4xl font-bold text-primary leading-tight">Featured Projects & Case Studies</h2>
          </div>
          <Link to="/projects" className="btn btn-primary">View All Projects</Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
            >
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // fallback
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">{p.location}</p>
                <h3 className="text-white text-xl font-bold mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity">{p.client}</p>
                <div className="h-[2px] w-0 group-hover:w-full bg-accent transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
