
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchForm from './SearchForm';

interface NavActionsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  isAdmin: boolean;
}

const NavActions = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isAdmin,
}: NavActionsProps) => {
  return (
    <div className="hidden md:flex md:items-center md:space-x-2">
      {/* <SearchForm 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleSearch={handleSearch} 
      /> */}
      
      {isAdmin && (
        <Link to="/admin">
          <Button variant="outline" className="nav-link flex items-center">
            <User size={16} className="mr-1" />
            Admin
          </Button>
        </Link>
      )}
      
      <Link to="/signin">
        <Button variant="ghost" className="nav-link">
          Sign In
        </Button>
      </Link>
      <Link to="/register">
        <Button className="bg-blue-500 text-white hover:bg-news-secondary">
          Register
        </Button>
      </Link>
    </div>
  );
};

export default NavActions;
