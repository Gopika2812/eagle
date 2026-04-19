import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Droplets, Settings, Zap, ArrowRight, Lightbulb } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Solar Power Plants",
      desc: "Comprehensive off-grid and grid-tie solar installations for residential and commercial use.",
      color: "bg-orange-50",
      iconColor: "text-orange-500"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Water Treatment",
      desc: "Advanced water treatment systems designed for purity and environmental compliance.",
      color: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Maintenance & AMC",
      desc: "Annual maintenance contracts and repair services ensuring peak performance of systems.",
      color: "bg-slate-50",
      iconColor: "text-slate-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Off-Grid Solutions",
      desc: "Reliable energy storage and inverter solutions for areas with limited power grid access.",
      color: "bg-slate-100",
      iconColor: "text-primary"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Solar Lighting",
      desc: "Energy-efficient solar street lights and lanterns for public and private spaces.",
      color: "bg-yellow-50",
      iconColor: "text-yellow-600"
    },
    {
      title: "Consultancy",
      icon: <ArrowRight className="w-8 h-8" />,
      desc: "Expert technical guidance on environmental strategy and energy transition.",
      color: "bg-red-50",
      iconColor: "text-accent"
    }
  ];

  return (
    <section id="services" className="bg-bg-light">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-bold uppercase tracking-widest text-sm mb-4"
          >
            Our Expertise
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary"
          >
            Sustainable Solutions for Every Need
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative border border-transparent hover:border-accent/10"
            >
              <div className={`mb-6 p-4 rounded-xl inline-block ${s.color} ${s.iconColor} group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                {s.title}
              </h3>
              <p className="text-text-muted mb-6 leading-relaxed">
                {s.desc}
              </p>
              <a href="#" className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
