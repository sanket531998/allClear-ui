
import  { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Upload, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/data/navCategories';
import { NewsArticle } from '@/components/NewsCard';

// Sample articles (same as in ArticleManagement)
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

type ArticleFormData = {
  title: string;
  content: string;
  image: string;
  category: string;
  subcategory: string;
  author: string;
  summary: string;
};

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get subcategories based on selected category
  const subcategories = selectedCategory
    ? categories.find((cat) => cat.name === selectedCategory)?.subcategories || []
    : [];

  const form = useForm<ArticleFormData>({
    defaultValues: {
      title: '',
      content: '',
      summary: '',
      image: '',
      category: '',
      subcategory: '',
      author: ''
    },
  });

  // Fetch article data
  useEffect(() => {
    if (!id) return;
    
    // In a real app, this would be an API call to fetch the article
    const articleId = parseInt(id);
    const article = sampleArticles.find(a => a.id === articleId);
    
    if (article) {
      form.reset({
        title: article.title,
        content: article.content,
        summary: article.summary,
        image: article.image,
        category: article.category,
        subcategory: article.subcategory,
        author: article.author
      });
      
      setPreviewImage(article.image);
      setSelectedCategory(article.category);
    } else {
      toast.error('Article not found');
      navigate('/admin');
    }
    
    setLoading(false);
  }, [id, form, navigate]);

  const onSubmit = (data: ArticleFormData) => {
    // In a real app, this would call an API to update the article
    console.log('Updated article data:', data);
    
    // Show success message
    toast.success('Article updated successfully!');
    
    // Navigate back to the article management page
    navigate('/admin');
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to your server/storage
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        form.setValue('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle category change to update subcategory options
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue('category', value);
    form.setValue('subcategory', ''); // Reset subcategory when category changes
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading article...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <Button  onClick={() => navigate('/admin')}>
          Back to Admin
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Article</CardTitle>
          <CardDescription>
            Make changes to the article and save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter article title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              <FormField
                control={form.control}
                name="summary"
                rules={{ required: 'Summary is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Summary</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief summary of the article" 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={handleCategoryChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subcategory - only shown if category is selected */}
              {selectedCategory && (
                <FormField
                  control={form.control}
                  name="subcategory"
                  rules={{ required: 'Subcategory is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subcategories.map((subcategory) => (
                            <SelectItem key={subcategory.name} value={subcategory.name}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Author */}
              <FormField
                control={form.control}
                name="author"
                rules={{ required: 'Author is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload */}
              <FormField
                control={form.control}
                name="image"
                rules={{ required: 'Featured image is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center gap-4">
                        {previewImage ? (
                          <div className="relative w-full">
                            <img 
                              src={previewImage} 
                              alt="Preview" 
                              className="w-full h-48 object-cover rounded-md" 
                            />
                            <Button
                              type="button"
                              className="absolute top-2 right-2 bg-white"
                              onClick={() => document.getElementById('image-upload')?.click()}
                            >
                              Change Image
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-8 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50" onClick={() => document.getElementById('image-upload')?.click()}>
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Click to upload an image</p>
                          </div>
                        )}
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a high-quality image for your article.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                rules={{ required: 'Article content is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your article content here..." 
                        className="min-h-[300px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" className="bg-news-primary hover:bg-news-secondary">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticle;
