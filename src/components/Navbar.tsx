
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { categories } from '@/data/navCategories';
import CategoryDropdown from './navbar/CategoryDropdown';
import NavActions from './navbar/NavActions';
import MobileMenu from './navbar/MobileMenu';
import img from '../data/F6268B9C-2F3B-4DC2-BD58-D2DA52E73434.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  // For demonstration purposes only - in a real app, this would come from auth state
  const isAdmin = true;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 bg-opacity-90">
      <div className="news-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
          <img src={img} alt="Logo" className="h-12 w-17" />
          </Link>

          {/* Desktop Logo */}
          {/* <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-news-primary">All</span>
              <span className="text-2xl font-bold text-news-accent">Clear</span>
            </Link>
            <h2 className="text-2xl font-bold text-news-primary bg-gradient-to-r from-blue-600 to-blue-100 bg-clip-text text-transparent">AllClear</h2>
          </div> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {categories.map((category) => (
              <CategoryDropdown key={category.name} category={category} />
            ))}
          </div>

          {/* Search, Sign In, Register */}
          <NavActions
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            isAdmin={isAdmin}
          />

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-news-primary hover:bg-gray-100 focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        categories={categories}
        isOpen={isMobileMenuOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isAdmin={isAdmin}
      />
    </nav>
  );
};

export default Navbar;
