
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NewsCard from '@/components/NewsCard';
import NewsFilter from '@/components/NewsFilter';
import { NewsArticle } from '@/components/NewsCard';
import { newsArticles } from '@/data/newsData';
const Footer = React.lazy(() => import('../components/Footer/Footer'));
import { color } from 'd3-color';
import SubNavbar from '@/components/SubNavbar';
import { Sub } from '@radix-ui/react-dropdown-menu';

const Index = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');

  useEffect(() => {
    // Sort the articles based on the selected sort order
    const sortedArticles = [...newsArticles].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });
    
    setArticles(sortedArticles);
  }, [sortOrder]);

  const handleSortChange = (order: 'latest' | 'oldest') => {
    setSortOrder(order);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* <SubNavbar /> */}
      <main className="news-container py-8">
        {/* Hero section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-news-primary mb-2">
            ALLCLEAR
          </h1>
          <p className="text-xl text-gray-600">
            News and knowledge, worldwide.
          </p>
        </div>
        
        {/* News filters */}
        <NewsFilter sortOrder={sortOrder} onSortChange={handleSortChange} />
        
        {/* News grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
