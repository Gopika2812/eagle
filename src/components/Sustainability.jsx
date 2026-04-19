import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Sustainability = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0.3, 0.6], [0, -50]);

  const initiatives = [
    {
      label: "Green Energy Generated",
      value: "4.5 GWh",
      desc: "Reducing reliance on fossil fuels through solar deployment."
    },
    {
      label: "Carbon Offset",
      value: "1,200 Tons",
      desc: "Annual CO2 reduction across all installed projects."
    },
    {
      label: "Water Conserved",
      value: "250K Liters",
      desc: "Efficient treatment and recycling in industrial setups."
    }
  ];

  return (
    <section id="sustainability" className="relative bg-primary overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: y1 }}>
            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Our Commitment</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Leading the Way to a De-carbonized Future
            </h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              At Eagle Envitech, sustainability isn't just a goal—it's the core of everything we do. Inspired by industry leaders, we strive to minimize environmental footprints through transition to renewable energy and smart resource management.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {initiatives.map((item, i) => (
                <div key={i} className="border-l-2 border-accent/30 pl-6 py-2">
                  <h3 className="text-3xl font-bold text-white mb-2">{item.value}</h3>
                  <p className="text-accent text-sm font-semibold uppercase mb-2">{item.label}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Environmental Impact" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
                  <h4 className="text-white font-bold text-xl mb-2">Towards ESG Excellence</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    We align our business strategies with Environmental, Social, and Governance (ESG) principles to ensure long-term value for our planet and stakeholders.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
