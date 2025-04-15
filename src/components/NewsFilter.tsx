
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, ChevronDown } from 'lucide-react';

type SortOrder = 'latest' | 'oldest';

interface NewsFilterProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const NewsFilter = ({ sortOrder, onSortChange }: NewsFilterProps) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <div className="flex items-center text-sm text-news-secondary">
        <Filter size={16} className="mr-2" />
        <span>Sort by:</span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <span>{sortOrder === 'latest' ? 'Latest to Oldest' : 'Oldest to Latest'}</span>
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onSortChange('latest')}>
            Latest to Oldest
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange('oldest')}>
            Oldest to Latest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NewsFilter;
