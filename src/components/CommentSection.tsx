
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Comment } from './NewsCard';
import { toast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';

interface CommentSectionProps {
  articleId: number;
  comments: Comment[];
}

const CommentSection = ({ articleId, comments }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [displayedComments, setDisplayedComments] = useState(comments);
  const [totalComments, setTotalComments] = useState(3); 

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      toast({
        title: "Comment can't be empty",
        description: "Please write something before submitting",
        variant: "destructive"
      });
      return;
    }

    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // In a real app, this would be sent to an API
    const comment: Comment = {
      id: Date.now(),
      author: "Guest User", // In a real app, this would be the logged-in user
      content: newComment,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month:'long',
        day: 'numeric'
      }),
    };
    
    setDisplayedComments([comment,...displayedComments]);
    setNewComment('');
    
    toast({
      title: "Comment added!",
      description: "Your comment has been added successfully"
    });
  };

  const handleLoadMoreComments = () => {
    if (totalComments < displayedComments.length) {
      setTotalComments((prev) => prev + 3);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments ({displayedComments.length})</h3>
      
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-end">
          <Button type="submit" className="bg-news-primary text-white hover:bg-news-secondary">
            Post Comment
          </Button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4 mt-6">
        {displayedComments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          displayedComments.slice(0,totalComments).map((comment) => (
            <div key={comment.id} className="p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                  <User size={16} className="text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">{comment.author}</div>
                  <div className="text-xs text-gray-500">{comment.date}</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{comment.content}</p>
            </div>
          ))
        )}
      </div>
      <div className="text-center py-4">
        {displayedComments.length > totalComments && (
          <button 
            onClick={handleLoadMoreComments} 
            className="text-news-primary hover:text-news-secondary"
          >
            Load More Comments
          </button>
        )}
    </div>
    </div>
  );
};

export default CommentSection;
