import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="bg-bg-light relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Connect With Us</h4>
            <h2 className="text-4xl font-bold text-primary mb-8 leading-tight">Ready to Start Your Green Journey?</h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-accent">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">Call Us</h4>
                  <p className="text-text-muted text-lg font-medium">+91 9677071507</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-accent">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">Email Us</h4>
                  <p className="text-text-muted text-lg font-medium">info@eagleenvitech.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg">Visit Us</h4>
                  <p className="text-text-muted leading-relaxed">
                    51/15, Trivandrum Rd, Kattnayakan, <br />
                    Palayamkottai, Tirunelveli, <br />
                    Tamil Nadu 627002
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-100 text-primary hover:bg-accent hover:text-white transition-all shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Full Name</label>
                  <input type="text" className="w-full px-5 py-4 bg-bg-light border-none rounded-xl focus:ring-2 focus:ring-accent transition-all outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-4 bg-bg-light border-none rounded-xl focus:ring-2 focus:ring-accent transition-all outline-none" placeholder="john@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Service Interested In</label>
                <select className="w-full px-5 py-4 bg-bg-light border-none rounded-xl focus:ring-2 focus:ring-accent transition-all outline-none">
                  <option>Solar Power Plant</option>
                  <option>Water Treatment</option>
                  <option>Maintenance/AMC</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">Your Message</label>
                <textarea rows="4" className="w-full px-5 py-4 bg-bg-light border-none rounded-xl focus:ring-2 focus:ring-accent transition-all outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button className="btn btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg">
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
