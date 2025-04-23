import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/data/navCategories';
import SearchForm from './SearchForm';
import { useSelector } from 'react-redux';

interface MobileMenuProps {
  categories: Category[];
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isAdmin: boolean;
}

const MobileMenu = ({
  categories,
  isOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isAdmin,
}: MobileMenuProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);


  const toggleSubcategories = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };
  const isLoggedIn=useSelector((state: any) => state.login.isLoggedIn);
  isAdmin = useSelector((state: any) => state.login.isAdmin);

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
        {categories.map((category) => (
          <div key={category.name} className="py-2">
            <div className="flex items-center justify-between">
              {/* Category Link */}
              <Link
                to={category.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-news-primary hover:text-news-accent"
              >
                {category.name}
              </Link>
              {/* Toggle Button for Subcategories */}
              {category.subcategories.length > 0 && (
                <button
                  onClick={() => toggleSubcategories(category.name)}
                  className={`text-gray-500 focus:outline-none transform transition-transform duration-300 ${
                    openCategory === category.name ? 'rotate-180' : ''
                  }`}
                >
                  {openCategory === category.name ? (
                    <span className="text-lg">−</span>
                  ) : (
                    <span className="text-lg">+</span>
                  )}
                </button>
              )}
            </div>
            <div
              className={`pl-4 space-y-1 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                openCategory === category.name ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.name}
                  to={subcategory.path}
                  className="block px-3 py-1 rounded-md text-sm text-gray-700 hover:text-news-accent"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="pt-4 pb-3 border-t border-gray-200">
          {/* <div className="flex items-center px-5">
            <SearchForm
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
          </div> */}
          <div className="mt-3 px-2 space-y-1">
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-news-primary hover:text-news-accent"
              >
                Admin Portal
              </Link>
            )}
            {!isLoggedIn && <Link
              to="/signin"
              className="block px-3 py-2 rounded-md text-base font-medium text-news-primary hover:text-news-accent"
            >
              Sign In
            </Link>}
            {/* <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-news-primary text-white hover:bg-news-secondary text-center"
            >
              Register
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
