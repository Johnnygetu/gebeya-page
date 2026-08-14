import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Store, Search, Phone, ChevronDown } from 'lucide-react';
import { categories } from '@/lib/categories';

export default function Header({ searchQuery, onSearchChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      {/* Top bar */}
      <div className="bg-primary-800 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <p className="hidden sm:block">Ethiopia's smart marketplace — buy and sell anything, no commission</p>
          <div className="flex items-center gap-1.5 ml-auto">
            <Phone className="w-3 h-3" />
            <span>+251 911 234 567</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-primary-700 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-neutral-900">
              Gebiya
            </span>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search for anything..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Categories dropdown - desktop */}
          <div className="hidden lg:block relative">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
            >
              Categories
              <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
            </button>
            {categoriesOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg py-2 animate-fade-in">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setCategoriesOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    <cat.icon className="w-4 h-4 text-neutral-400" />
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA + mobile menu button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/post')}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-primary-700 text-white text-sm font-semibold rounded-lg hover:bg-primary-800 transition-colors"
            >
              Post Listing
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar - mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for anything..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category strip - desktop */}
      <nav className="hidden lg:block border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 h-11">
          <Link
            to="/"
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              location.pathname === '/'
                ? 'text-primary-700 bg-primary-50'
                : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                location.pathname === `/category/${cat.slug}`
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-neutral-600 hover:text-primary-700 hover:bg-primary-50'
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white animate-fade-in max-h-[70vh] overflow-y-auto scrollbar-thin">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            <Link
              to="/"
              className="px-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
            >
              All Listings
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
              >
                <cat.icon className="w-4 h-4 text-neutral-400" />
                {cat.label}
              </Link>
            ))}
            <button
              onClick={() => navigate('/post')}
              className="mt-2 inline-flex items-center justify-center px-4 py-2.5 bg-primary-700 text-white text-sm font-semibold rounded-lg hover:bg-primary-800 transition-colors"
            >
              Post Listing
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
