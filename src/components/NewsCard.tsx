
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, Clock, MessageSquare, Share2 } from 'lucide-react';
import CommentSection from './CommentSection';
import { Button } from '@/components/ui/button';

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  subcategory: string;
  readTime: number;
  image: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface NewsCardProps {
  article: NewsArticle;
  expanded?: boolean;
}

const handleShare = () => {
  console.log(navigator.share);
  if (navigator.share) {
    navigator.share({
      title: 'Check out this article!',
      text: 'I found this article interesting.',
      url: window.location.href,
    })
    .then(() => console.log('Share successful'))
    .catch((error) => console.error('Error sharing:', error));
  }
  else {
    // Fallback for browsers that don't support the Web Share API
    alert('Sharing is not supported in this browser. Please copy the link.');
  }
}

const NewsCard = ({ article, expanded = false }: NewsCardProps) => {
  const [showComments, setShowComments] = React.useState(false);
  const [totalComments, setTotalComments] = React.useState(3);

  const handleLoadMoreComments = () => {
    if (totalComments < article.comments.length) {
        setTotalComments((prev) => prev + 3);
    }
};

  return (
    <Card className="mb-8 overflow-hidden transition-shadow hover:shadow-md hover:border-gray-800">
      <div className="relative">
      <Link to={`/article/${article.id}`} state={{ article }}> 
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 bg-news-accent text-white px-2 py-1 text-xs">
          {article.category}
        </div>
      </Link>
      </div>
      <CardContent className="p-4">
      <Link to={`/article/${article.id}`} state={{ article }}> 
        <h2 className="news-header">{article.title}</h2>
        <div className="flex items-center text-xs text-news-muted mb-3">
          <span className="mr-3">By {article.author}</span>
          <div className="flex items-center mr-3">
            <Calendar size={12} className="mr-1" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>{article.readTime} min read</span>
          </div>
        </div>
        <p className="news-text">
          {expanded ? article.content : article.summary}
        </p>
        </Link>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-news-muted hover:text-news-primary flex items-center"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare size={16} className="mr-1" />
            <span>{article.comments.length} Comments</span>
          </Button>
          <Button onClick={()=>handleShare()} variant="ghost" size="sm" className="text-news-muted hover:text-news-primary flex items-center">
            <Share2 size={16} className="mr-1" />
            <span>Share</span>
          </Button>
        </div>
        {!expanded && (
          <Link to={`/article/${article.id}`} state={{ article }}>
            <Button variant="link" className="text-news-primary hover:text-news-accent">
              Read More
            </Button>
          </Link>
        )}
      </CardFooter>
      {showComments && (
        <div className="p-4 bg-gray-50 border-t">
          <CommentSection articleId={article.id} comments={article.comments} />
        </div>
      )}
    </Card>
  );
};

export default NewsCard;
