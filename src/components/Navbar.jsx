import { ChevronDown, Heart, Menu, ShoppingBag, User, X, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { projectCategories } from '../data/projectsData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // Mobile accordion state
  const [isMobileProductsExpanded, setIsMobileProductsExpanded] = useState(false);
  const [isMobileProjectsExpanded, setIsMobileProjectsExpanded] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [expandedMobileSubcategory, setExpandedMobileSubcategory] = useState(null);

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
      isMegaMenu: true,
    },
    { name: 'Services', to: 'services', type: 'scroll' },
    { name: 'Know Your Volt', to: '/know-your-volt', type: 'route', badge: 'New' },
    { name: 'Projects', to: '/projects', type: 'route', isProjectsMenu: true },
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
        setIsMobileMenuOpen(false);
      } else {
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
      : `text-sm font-semibold cursor-pointer transition-colors flex items-center gap-1 hover:text-accent ${isScrolled || !isHomePage ? 'text-primary' : 'lg:text-white lg:hover:text-accent text-primary'
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
        onClick={(e) => {
          if (link.isMegaMenu && mobile) {
            e.preventDefault(); // Don't navigate on mobile, let the accordion handle it
            setIsMobileProductsExpanded(!isMobileProductsExpanded);
          } else if (link.isProjectsMenu && mobile) {
            e.preventDefault();
            setIsMobileProjectsExpanded(!isMobileProjectsExpanded);
          } else {
            handleNavClick(link);
          }
        }}
      >
        {link.name}
        {link.badge && (
          <span className="absolute -top-1 right-0 translate-x-3/4 -translate-y-1/2 px-1.5 py-0.5 bg-accent text-[10px] text-white rounded-md leading-none font-bold">
            {link.badge}
          </span>
        )}
        {link.isMegaMenu && <ChevronDown className={`w-4 h-4 transition-transform ${mobile && isMobileProductsExpanded ? 'rotate-180' : 'group-hover:rotate-180'}`} />}
        {link.isProjectsMenu && <ChevronDown className={`w-4 h-4 transition-transform ${mobile && isMobileProjectsExpanded ? 'rotate-180' : 'group-hover:rotate-180'}`} />}
      </RouterLink>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-white/95 md:bg-transparent'}`}>
      {/* Top Bar - Official Contact Info */}
      <div className={`hidden md:block py-2 ${isScrolled || !isHomePage ? 'bg-primary/5 text-primary' : 'bg-primary/20 text-white'} border-b border-white/10`}>
        <div className="container flex justify-between items-center px-8 text-xs font-semibold tracking-wider">
          <div className="flex gap-8">
            <a href="tel:+919677071507 " className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              +91 96770 71507 | 96777 14607
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
              onMouseEnter={() => {
                if (link.isMegaMenu) setIsMegaMenuOpen(true);
                if (link.isProjectsMenu) setIsProjectsMenuOpen(true);
              }}
              onMouseLeave={() => {
                if (link.isMegaMenu) setIsMegaMenuOpen(false);
                if (link.isProjectsMenu) setIsProjectsMenuOpen(false);
              }}
            >
              {renderNavLink(link)}

              {/* Mega Menu Dropdown */}
              {link.isMegaMenu && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-primary/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 flex ${isMegaMenuOpen ? 'opacity-100 visible translate-y-2' : 'opacity-0 invisible translate-y-4'}`}
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                >
                  {/* Left Column - Main Categories */}
                  <div className="w-1/3 bg-white/5 border-r border-white/10 py-4">
                    {categories.map((cat) => (
                      <div
                        key={cat.slug}
                        className={`px-6 py-3 cursor-pointer text-sm font-semibold flex items-center justify-between transition-colors ${activeCategory?.slug === cat.slug ? 'bg-accent/20 text-accent border-l-4 border-accent' : 'text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}
                        onMouseEnter={() => setActiveCategory(cat)}
                        onClick={() => {
                          setIsMegaMenuOpen(false);
                          navigate(`/all-products?category=${cat.slug}`);
                        }}
                      >
                        {cat.name}
                        <ChevronRight className={`w-4 h-4 ${activeCategory?.slug === cat.slug ? 'text-accent' : 'text-gray-500'}`} />
                      </div>
                    ))}
                  </div>

                  {/* Right Column - Subcategories & Items */}
                  <div className="w-2/3 p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                    <div className="mb-4 pb-2 border-b border-white/10 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">{activeCategory?.name}</h3>
                      <RouterLink
                        to={`/all-products?category=${activeCategory?.slug}`}
                        className="text-accent text-sm hover:underline"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        View All
                      </RouterLink>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {activeCategory?.subcategories?.map((subcat) => (
                        <div key={subcat.slug} className="mb-4">
                          <RouterLink
                            to={`/all-products?category=${activeCategory.slug}&subcategory=${subcat.slug}`}
                            className="font-bold text-accent text-sm mb-2 block hover:underline"
                            onClick={() => setIsMegaMenuOpen(false)}
                          >
                            {subcat.name}
                          </RouterLink>
                          <ul className="space-y-2">
                            {subcat.items?.map((item) => (
                              <li key={item.slug}>
                                <RouterLink
                                  to={`/all-products?category=${activeCategory.slug}&subcategory=${subcat.slug}&item=${item.slug}`}
                                  className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                                  onClick={() => setIsMegaMenuOpen(false)}
                                >
                                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors"></span>
                                  {item.name}
                                </RouterLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Dropdown */}
              {link.isProjectsMenu && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-[280px] bg-primary/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col py-2 ${isProjectsMenuOpen ? 'opacity-100 visible translate-y-2' : 'opacity-0 invisible translate-y-4'}`}
                  onMouseEnter={() => setIsProjectsMenuOpen(true)}
                  onMouseLeave={() => setIsProjectsMenuOpen(false)}
                >
                  <RouterLink
                    to="/projects"
                    className="px-6 py-3 border-b border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
                    onClick={() => setIsProjectsMenuOpen(false)}
                  >
                    All Projects
                  </RouterLink>
                  {projectCategories.map((cat) => (
                    <RouterLink
                      key={cat.slug}
                      to={`/projects?category=${cat.slug}`}
                      className="px-6 py-3 text-gray-300 text-sm font-semibold hover:bg-white/5 hover:text-white hover:pl-8 transition-all flex items-center justify-between group"
                      onClick={() => setIsProjectsMenuOpen(false)}
                    >
                      {cat.name}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
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
                className={`transition-colors hover:opacity-80 p-2 rounded-full ${isScrolled || !isHomePage ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'bg-white text-primary'
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
        className={`fixed inset-0 bg-primary/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-start pt-20 pb-6 px-6 transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } lg:hidden`}
      >
        <button
          className="absolute top-8 right-8 text-white p-2 hover:text-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>

        <div className="w-full flex flex-col gap-4 overflow-y-auto max-h-[80vh] py-10 px-4 custom-scrollbar">
          {navLinks.map((link) => (
            <div key={link.name} className="w-full">
              <div className="relative inline-block w-full">
                {renderNavLink(link, true)}
              </div>

              {/* Mobile Nested Categories Accordion */}
              {link.isMegaMenu && isMobileProductsExpanded && (
                <div className="flex flex-col gap-2 mt-4 mb-6 bg-white/5 p-4 rounded-2xl w-full text-left">
                  <RouterLink
                    to="/all-products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-accent font-bold text-lg mb-2 text-center border-b border-white/10 pb-2"
                  >
                    View All Products
                  </RouterLink>

                  {categories.map((cat) => (
                    <div key={cat.slug} className="mb-2">
                      <button
                        onClick={() => setExpandedMobileCategory(expandedMobileCategory === cat.slug ? null : cat.slug)}
                        className="w-full flex items-center justify-between text-white font-semibold text-base py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {cat.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileCategory === cat.slug ? 'rotate-180 text-accent' : ''}`} />
                      </button>

                      {/* Subcategories Accordion */}
                      {expandedMobileCategory === cat.slug && (
                        <div className="ml-4 mt-2 border-l border-white/10 pl-4 flex flex-col gap-2">
                          <RouterLink
                            to={`/all-products?category=${cat.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-accent text-sm py-1 font-semibold"
                          >
                            All {cat.name}
                          </RouterLink>

                          {cat.subcategories?.map(subcat => (
                            <div key={subcat.slug}>
                              <button
                                onClick={() => {
                                  if (subcat.items?.length > 0) {
                                    setExpandedMobileSubcategory(expandedMobileSubcategory === subcat.slug ? null : subcat.slug);
                                  } else {
                                    setIsMobileMenuOpen(false);
                                    navigate(`/all-products?category=${cat.slug}&subcategory=${subcat.slug}`);
                                  }
                                }}
                                className="w-full flex items-center justify-between text-gray-300 text-sm py-2 hover:text-white transition-colors text-left"
                              >
                                {subcat.name}
                                {subcat.items?.length > 0 && (
                                  <ChevronDown className={`w-3 h-3 transition-transform ${expandedMobileSubcategory === subcat.slug ? 'rotate-180 text-accent' : ''}`} />
                                )}
                              </button>

                              {/* Items List */}
                              {expandedMobileSubcategory === subcat.slug && subcat.items?.length > 0 && (
                                <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/5 pl-3">
                                  <RouterLink
                                    to={`/all-products?category=${cat.slug}&subcategory=${subcat.slug}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-accent text-xs py-1"
                                  >
                                    All {subcat.name}
                                  </RouterLink>
                                  {subcat.items.map(item => (
                                    <RouterLink
                                      key={item.slug}
                                      to={`/all-products?category=${cat.slug}&subcategory=${subcat.slug}&item=${item.slug}`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-gray-400 text-xs py-1.5 hover:text-white transition-colors"
                                    >
                                      {item.name}
                                    </RouterLink>
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
              )}

              {/* Mobile Projects Accordion */}
              {link.isProjectsMenu && isMobileProjectsExpanded && (
                <div className="flex flex-col gap-2 mt-4 mb-6 bg-white/5 p-4 rounded-2xl w-full text-left">
                  <RouterLink
                    to="/projects"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-accent font-bold text-lg mb-2 text-center border-b border-white/10 pb-2"
                  >
                    View All Projects
                  </RouterLink>

                  {projectCategories.map((cat) => (
                    <RouterLink
                      key={cat.slug}
                      to={`/projects?category=${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between text-white font-semibold text-sm py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {cat.name}
                      <ChevronRight className="w-4 h-4 text-accent" />
                    </RouterLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center gap-6 mt-10 pt-10 border-t border-white/10">
            {actionIcons.map((action, i) => (
              <button key={i} className="text-white flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 border border-white/10 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent transition-all">
                  {action.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}} />
    </nav>
  );
};

export default Navbar;
