
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Category } from '@/data/navCategories';

interface CategoryDropdownProps {
  category: Category;
}

const CategoryDropdown = ({ category }: CategoryDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="nav-link flex items-center space-x-1">
          <span>{category.name}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        <DropdownMenuItem asChild>
          <Link to={category.path} className="dropdown-link font-medium">
            All {category.name}
          </Link>
        </DropdownMenuItem>
        {category.subcategories.map((subcategory) => (
          <DropdownMenuItem key={subcategory.name} asChild>
            <Link to={subcategory.path} className="dropdown-link">
              {subcategory.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
