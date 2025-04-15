import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Upload, PlusCircle } from 'lucide-react';
import Navbar from '../components/Navbar'

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { categories } from '@/data/navCategories';
import ArticleManagement from '@/components/ArticleManagement';

type ArticleFormData = {
  title: string;
  content: string;
  image: string;
  category: string;
  subcategory: string;
  author: string;
  summary: string;
};

const Admin = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get subcategories based on selected category
  const subcategories = selectedCategory
    ? categories.find((cat) => cat.name === selectedCategory)?.subcategories || []
    : [];

  const form = useForm<ArticleFormData>({
    defaultValues: {
      title: '',
      content: '',
      image: '',
      category: '',
      subcategory: '',
      author: 'Admin User', 
    },
  });

  const onSubmit = (data: ArticleFormData) => {
    console.log('Article data submitted:', data);

    
    // Show success message
    toast.success('Article published successfully!');
    
    // Reset form
    form.reset();
    setPreviewImage(null);
    setSelectedCategory(null);
    
    // Navigate to homepage to see the article (in a real app)
    // navigate('/');
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
        form.setValue('image', result); // Store base64 string or URL
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

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Portal</h1>
      
      <Tabs defaultValue="add-article" className="mb-8">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="add-article">Add New Article</TabsTrigger>
          <TabsTrigger value="manage-articles">Manage Articles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add-article">
          <Card>
            <CardHeader>
              <CardTitle>Create New Article</CardTitle>
              <CardDescription>
                Fill in the details below to publish a new article to the website.
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
                          <Textarea placeholder="Enter article summary" {...field} className="min-h-[100px]" />
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
                                  onClick={() => {
                                    setPreviewImage(null);
                                    field.onChange('');
                                  }}
                                >
                                  Change Image
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50" onClick={() => document.getElementById('image-upload')?.click()}>
                                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Click to upload an image</p>
                                <input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="hidden"
                                />
                              </div>
                            )}
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
                            className="min-h-[200px]" 
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
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Publish Article
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage-articles">
          <Card>
            <CardHeader>
              <CardTitle>Manage Articles</CardTitle>
              <CardDescription>
                Edit or delete existing articles from this interface.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ArticleManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
};

export default Admin;
