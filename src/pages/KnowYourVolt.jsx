import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Calculator, ShoppingBag, ArrowRight, Info, AlertCircle, TrendingDown, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const KnowYourVolt = () => {
  const [units, setUnits] = useState(300);
  const [voltage, setVoltage] = useState(230);
  const [bill, setBill] = useState(0);
  const [savings, setSavings] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    calculateBill();
  }, [units, voltage]);

  const calculateBill = () => {
    let estimatedBill = 0;
    const u = parseFloat(units) || 0;
    const v = parseFloat(voltage) || 0;

    // Logic for Residential (approx slab rates)
    if (v < 300) {
      if (u <= 100) estimatedBill = 0;
      else if (u <= 200) estimatedBill = (u - 100) * 2.25;
      else if (u <= 500) estimatedBill = (100 * 2.25) + (u - 200) * 4.50;
      else estimatedBill = (100 * 2.25) + (300 * 4.50) + (u - 500) * 6.60;
    } else {
      // Logic for Commercial (Industrial)
      estimatedBill = u * 8.50;
    }

    setBill(estimatedBill);
    setSavings(estimatedBill * 0.85); // Approx 85% savings with solar

    // Smart Recommendations Logic
    let recs = [];
    if (u < 150) {
      recs = products.filter(p => p.slug === 'solar-geyser' || p.slug === 'solar-panel');
    } else if (u >= 150 && u < 450) {
      recs = products.filter(p => p.slug === 'hybrid-energy-systems' || p.slug === 'battery-systems');
    } else {
      recs = products.filter(p => p.slug === 'solar-plant' || p.slug === 'energy-systems');
    }
    setRecommendations(recs);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-bold text-sm mb-6 uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Energy Intelligence
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Know Your Volt</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Calculate your energy costs and discover how much you can save by switching to solar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Calculator Input Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-5"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary text-white rounded-xl">
                  <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-primary">Energy Calculator</h2>
              </div>

              <div className="space-y-8">
                {/* Units Input */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-lg font-bold text-primary">Monthly Units (kWh)</label>
                    <span className="px-4 py-1 bg-primary/5 text-primary font-bold rounded-lg">{units} Units</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2000"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">
                    <span>Low Usage</span>
                    <span>High Usage (Industrial)</span>
                  </div>
                </div>

                {/* Voltage Input */}
                <div>
                  <label className="text-lg font-bold text-primary block mb-4">Current Voltage (V)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setVoltage(230)}
                      className={`py-4 px-6 rounded-2xl border-2 transition-all font-bold ${
                        voltage === 230 
                        ? 'border-accent bg-accent/5 text-accent shadow-md' 
                        : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      230V (Domestic)
                    </button>
                    <button
                      onClick={() => setVoltage(440)}
                      className={`py-4 px-6 rounded-2xl border-2 transition-all font-bold ${
                        voltage === 440 
                        ? 'border-accent bg-accent/5 text-accent shadow-md' 
                        : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      440V (Commercial)
                    </button>
                  </div>
                </div>

                {/* Info Note */}
                <div className="p-4 bg-primary/5 rounded-xl flex gap-3 items-start">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-primary/80 font-medium">
                    Calculations are based on estimated utility slab rates. Industrial consumption (440V) is calculated at flat commercial rates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-7"
          >
            <div className="grid md:grid-cols-2 gap-6 h-full">
              {/* Estimated Bill Card */}
              <div className="bg-primary p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                <div>
                  <p className="text-white/60 font-medium mb-2 uppercase tracking-widest text-xs">Estimated Monthly Bill</p>
                  <h3 className="text-5xl font-bold mb-4">₹{bill.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm italic">
                  <AlertCircle className="w-4 h-4" />
                  Estimated based on {units} units.
                </div>
              </div>

              {/* Potential Savings Card */}
              <div className="bg-accent p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <p className="text-white/60 font-medium mb-2 uppercase tracking-widest text-xs">Potential Savings</p>
                    <TrendingDown className="w-6 h-6 animate-bounce" />
                  </div>
                  <h3 className="text-5xl font-bold mb-4">₹{savings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg text-sm font-bold">
                  <Zap className="w-4 h-4" />
                  Up to 85% Savings Monthly
                </div>
              </div>

              {/* Carbon Footprint Card */}
              <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl flex items-center gap-8">
                <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                  <Leaf className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-1">Environmental Impact</h4>
                  <p className="text-gray-500 text-sm mb-2">By switching to solar, you could reduce carbon emissions by approx.</p>
                  <span className="text-2xl font-bold text-green-600">{(units * 0.85 / 1000).toFixed(2)} Tons CO₂ / Year</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-24"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary">Smart Suggestions</h2>
              <p className="text-gray-500 mt-2">Based on your consumption of {units} units, we recommend these solutions:</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((product, i) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                    {product.category}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-primary mb-4">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1">{product.description}</p>
                  <Link 
                    to={`/products/${product.slug}`} 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-accent transition-colors"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 p-12 bg-primary rounded-[3rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-4xl font-bold text-white mb-6 relative z-10">Still Unsure About Your Energy Transition?</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg relative z-10">
            Our experts are ready to provide you with a free site assessment and a custom energy roadmap tailored to your needs.
          </p>
          <button className="bg-accent text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-accent-light transition-all shadow-xl relative z-10">
            Request Free Assessment
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowYourVolt;
