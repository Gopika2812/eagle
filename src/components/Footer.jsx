import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const renderFooterLink = (to, name) => {
    if (isHomePage) {
      return (
        <ScrollLink
          to={to}
          smooth={true}
          duration={500}
          offset={-80}
          className="hover:text-accent transition-colors cursor-pointer"
        >
          {name}
        </ScrollLink>
      );
    }
    return (
      <RouterLink to="/" className="hover:text-accent transition-colors">
        {name}
      </RouterLink>
    );
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10 overflow-hidden relative">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
              <RouterLink to="/">
                <img
                  src="/logo.png"
                  alt="Eagle Envitech Logo"
                  className="h-10 w-auto"
                />
              </RouterLink>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              51/15, Trivandrum Rd, Kattnayakan, Palayamkottai, Tirunelveli, Tamil Nadu 627002. <br />
              +91 9677071507 | 96777 14607 info@eagleenvitech.com
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent"></span>
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>{renderFooterLink('home', 'Home')}</li>
              <li>{renderFooterLink('about', 'About Us')}</li>
              <li>{renderFooterLink('services', 'Our Services')}</li>
              <li>{renderFooterLink('projects', 'Client Portfolio')}</li>
              <li>{renderFooterLink('sustainability', 'Sustainability')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Our Products
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent"></span>
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li><RouterLink to="/products/solar-geyser" className="hover:text-accent transition-colors">Solar Geyser</RouterLink></li>
              <li><RouterLink to="/products/solar-panel" className="hover:text-accent transition-colors">Solar Panels</RouterLink></li>
              <li><RouterLink to="/products/solar-plant" className="hover:text-accent transition-colors">Solar Plants</RouterLink></li>
              <li><RouterLink to="/products/battery-systems" className="hover:text-accent transition-colors">Battery Systems</RouterLink></li>
              <li><RouterLink to="/all-products" className="hover:text-accent transition-colors">View All</RouterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-accent"></span>
            </h4>
            <p className="text-gray-400 mb-6">Stay updated with our latest green initiatives.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 focus:outline-none focus:border-accent text-white"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-accent-light px-6 rounded-full font-bold transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {currentYear} Eagle Envitech. All rights reserved. Designed by{' '}
            <a 
              href="https://higaiautomation.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-accent hover:underline transition-all font-semibold"
            >
              HIGAI AUTOMATION LLP
            </a>
          </p>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-accent rounded-full flex items-center justify-center hover:translate-y-[-5px] transition-all"
          >
            <ArrowUp className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
