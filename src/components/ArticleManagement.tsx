
import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { NewsArticle } from '@/components/NewsCard';

// Sample articles for demo purposes - in a real app this would come from your database. Need to import it from store
const sampleArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Middle Class Housing Crisis Explained",
    summary: "How rising costs affect middle-income families",
    content: "The housing market continues to present challenges for middle-income families across the country...",
    author: "Jane Smith",
    date: "2025-04-01",
    category: "Middle Class",
    subcategory: "Housing",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    comments: []
  },
  {
    id: 2,
    title: "Tech Giants Announce New AI Features",
    summary: "Major tech companies unveil AI innovations",
    content: "In a series of announcements this week, major technology companies revealed their latest AI advancements...",
    author: "John Doe",
    date: "2025-04-02",
    category: "Technology",
    subcategory: "AI",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1677442135144-e695c4f5ae0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    comments: []
  },
  {
    id: 3,
    title: "Education Costs Continue to Rise",
    summary: "Middle class families facing higher education expenses",
    content: "New data shows that college tuition and related expenses have increased by 8% over the past year...",
    author: "Sarah Johnson",
    date: "2025-04-03",
    category: "Middle Class",
    subcategory: "Education",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    comments: []
  }
];

const ArticleManagement = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(sampleArticles);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  // Handle editing an article
  const handleEdit = (articleId: number) => {
    // In a real app, navigate to edit page with the article ID
    navigate(`/admin/edit/${articleId}`);
    // For demo purposes, just show a toast
    toast.info(`Editing article ID: ${articleId}`);
  };

  // Handle deleting an article
  const handleDelete = (articleId: number) => {
    // In a real app, this would call an API to delete from database
    const updatedArticles = articles.filter(article => article.id !== articleId);
    setArticles(updatedArticles);
    setArticleToDelete(null);
    toast.success('Article deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Articles</h2>
        <Button onClick={() => window.location.href = '/admin'}>
          Add New Article
        </Button>
      </div>

      <Table>
        <TableCaption>A list of all published articles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>{article.subcategory}</TableCell>
              <TableCell>{article.date}</TableCell>
              <TableCell>{article.author}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEdit(article.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive border-destructive hover:bg-destructive/10"
                        onClick={() => setArticleToDelete(article.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the article
                          "{article.title}" and remove it from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(article.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArticleManagement;
