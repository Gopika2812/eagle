import { ChevronDown, Heart, Menu, ShoppingBag, User, X, Phone, Mail, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home', type: 'scroll' },
    { 
      name: 'Products', 
      to: '/all-products',
      type: 'route',
      dropdown: [
        { name: 'View All Products', to: '/all-products' },
        { name: 'Solar Geyser', to: '/products/solar-geyser' },
        { name: 'Solar Panel', to: '/products/solar-panel' },
        { name: 'Solar Plant', to: '/products/solar-plant' },
        { name: 'Battery Systems', to: '/products/battery-systems' },
        { name: 'Energy Systems', to: '/products/energy-systems' },
        { name: 'Water Treatment', to: '/products/water-treatment' },
      ]
    },
    { name: 'Services', to: 'services', type: 'scroll' },
    { name: 'Know Your Volt', to: '/know-your-volt', type: 'route', badge: 'New' },
    { name: 'Projects', to: 'projects', type: 'scroll' },
    { name: 'Contact', to: 'contact', type: 'scroll' },
  ];

  const actionIcons = [
    { icon: <ShoppingBag className="w-5 h-5" />, label: 'Cart' },
    { icon: <Heart className="w-5 h-5" />, label: 'Favorites' },
    { icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  const handleNavClick = (link) => {
    if (link.type === 'scroll') {
      if (isHomePage) {
        // If already on homepage, react-scroll will handle it if we use the component
        // But for mobile menu close:
        setIsMobileMenuOpen(false);
      } else {
        // If on another page, navigate to home then scroll (browser default or handled by App)
        navigate('/');
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const renderNavLink = (link, mobile = false) => {
    const commonClasses = mobile 
      ? "text-white text-2xl font-semibold hover:text-accent transition-colors py-2 flex items-center justify-center gap-2 w-full"
      : `text-sm font-semibold cursor-pointer transition-colors flex items-center gap-1 hover:text-accent ${
          isScrolled || !isHomePage ? 'text-primary' : 'lg:text-white lg:hover:text-accent text-primary'
        }`;

    if (link.type === 'scroll' && isHomePage) {
      return (
        <ScrollLink
          to={link.to}
          spy={true}
          smooth={true}
          offset={-80}
          className={commonClasses}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
        >
          {link.name}
        </ScrollLink>
      );
    }

    return (
      <RouterLink
        to={link.type === 'scroll' ? '/' : link.to}
        className={commonClasses}
        onClick={() => handleNavClick(link)}
      >
        {link.name}
        {link.badge && (
          <span className="absolute -top-1 right-0 translate-x-3/4 -translate-y-1/2 px-1.5 py-0.5 bg-accent text-[10px] text-white rounded-md leading-none font-bold">
            {link.badge}
          </span>
        )}
        {link.dropdown && !mobile && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
      </RouterLink>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-white/95 md:bg-transparent'}`}>
      {/* Top Bar - Official Contact Info */}
      <div className={`hidden md:block py-2 ${isScrolled || !isHomePage ? 'bg-primary/5 text-primary' : 'bg-primary/20 text-white'} border-b border-white/10`}>
        <div className="container flex justify-between items-center px-8 text-xs font-semibold tracking-wider">
          <div className="flex gap-8">
            <a href="tel:+919677071507" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              +91 9677071507
            </a>
            <a href="mailto:info@eagleenvitech.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent" />
              info@eagleenvitech.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-accent" />
            Mon - Sat: 9:00 AM - 9:00 PM
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`container flex justify-between items-center px-4 md:px-8 transition-all duration-300 ${isScrolled || !isHomePage ? 'py-3' : 'py-5'}`}>
        {/* Left: Logo */}
        <div className="flex-1 lg:flex-none">
          <RouterLink to="/" className="flex items-center cursor-pointer">
            <img 
              src="/logo.png" 
              alt="Eagle Envitech Logo" 
              className="h-10 md:h-12 w-auto transition-all duration-300" 
            />
          </RouterLink>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center gap-10 items-center">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group py-2"
              onMouseEnter={() => link.dropdown && setIsProductsDropdownOpen(true)}
              onMouseLeave={() => link.dropdown && setIsProductsDropdownOpen(false)}
            >
              {renderNavLink(link)}

              {/* Dropdown Menu */}
              {link.dropdown && (
                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-primary/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden py-3 transition-all duration-500 ${isProductsDropdownOpen ? 'opacity-100 visible translate-y-2' : 'opacity-0 invisible translate-y-4'}`}>
                  {link.dropdown.map((subItem) => (
                    <RouterLink
                      key={subItem.name}
                      to={subItem.to}
                      className="block px-8 py-3 text-sm font-medium text-white hover:bg-white/10 hover:text-accent transition-all cursor-pointer"
                      onClick={() => setIsProductsDropdownOpen(false)}
                    >
                      {subItem.name}
                    </RouterLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex-1 lg:flex-none flex items-center justify-end gap-3 md:gap-5">
          <div className="hidden md:flex gap-4 md:gap-5">
            {actionIcons.map((action, i) => (
              <button 
                key={i} 
                className={`transition-colors hover:opacity-80 p-2 rounded-full ${
                  isScrolled || !isHomePage ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-white text-primary'
                }`}
                title={action.label}
              >
                {action.icon}
              </button>
            ))}
          </div>

          <button 
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled || !isHomePage ? 'text-primary' : 'text-primary md:text-white'} />
            ) : (
              <Menu className={isScrolled || !isHomePage ? 'text-primary' : 'text-primary md:text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-primary z-[60] flex flex-col items-center justify-center gap-6 transition-transform duration-500 overflow-y-auto pt-20 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <button 
          className="absolute top-8 right-8 text-white p-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        
        {navLinks.map((link) => (
          <div key={link.name} className="w-full text-center">
            {renderNavLink(link, true)}
            
            {link.dropdown && (
              <div className="flex flex-col gap-4 mt-4 bg-white/5 py-4">
                {link.dropdown.map((sub) => (
                  <RouterLink
                    key={sub.name}
                    to={sub.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 text-lg hover:text-accent transition-colors"
                  >
                    {sub.name}
                  </RouterLink>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div className="flex gap-8 mt-10">
          {actionIcons.map((action, i) => (
            <button key={i} className="text-white flex flex-col items-center gap-1 group">
              <div className="p-4 rounded-full border border-white/20 group-hover:border-accent group-hover:text-accent transition-all">
                {action.icon}
              </div>
              <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

