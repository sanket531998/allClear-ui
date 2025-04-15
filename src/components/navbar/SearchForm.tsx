
import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }: SearchFormProps) => {
  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="pl-3 pr-8 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-news-primary text-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-news-primary"
      >
        <Search size={16} />
      </button>
    </form>
  );
};

export default SearchForm;
