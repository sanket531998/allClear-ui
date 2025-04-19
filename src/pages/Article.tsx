import Navbar from '../components/Navbar';
import Footer from "../components/Footer/Footer";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

import { toast } from '@/components/ui/use-toast';

function Article() {
    const [newComment, setNewComment] = React.useState("");
    const location = useLocation();
    const article = location.state.article;

    const [comments, setComments] = useState(article.comments);
    const [totalComments, setTotalComments] = useState(3); // Start by showing 3 comments

    // Ref for the comments container
    const commentsContainerRef = useRef(null);

    const handleLoadMoreComments = () => {
        if (totalComments < article.comments.length) {
            setTotalComments((prev) => prev + 3);
        }
    };

    const handleNewComment = async () => {
        if (newComment.trim() === "") {
            toast({
                title: "Comment can't be empty",
                description: "Please write something before submitting",
                variant: "destructive"
            });
            return;
        }
        const commentObject = {
            id: Date.now(),
            author: "Guest User",
            content: newComment,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };
        comments.push(commentObject);
        await comments.sort((a,b)=>{
            return new Date(b.date).getTime()-new Date(a.date).getTime();
        })
        setNewComment("");
        console.log(comments);
    };

    useEffect(()=>{
        console.log("Comment added")
    },[comments]);

    return (
        <>
            <Navbar />
            <div className="news-container py-8">
                <h1 className="text-4xl font-bold text-news-primary mb-2">{article.title}</h1>
                <p className="text-xl text-gray-600 mb-4 italic">{article.summary}</p>
                <img src={article.image} alt={article.title} className="w-full h-96 object-cover mb-4" />
                <p className="text-gray-700 mb-4">{article.content}</p>
                <div className="flex items-center text-xs text-news-muted mb-3">
                    <span className="mr-3">By {article.author}</span>
                    <div className="flex items-center mr-3">
                        <span>{article.date}</span>
                    </div>
                    <div className="flex items-center">
                        <span>{article.readTime} min read</span>
                    </div>
                </div>

                <div>
                    <div>
                        <input 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
                            type="text" 
                            placeholder="Post a comment..." 
                            className="w-full p-2 border rounded-lg mb-4" 
                        />
                        <button onClick={handleNewComment} className="bg-news-primary text-white px-4 py-2 rounded-lg hover:bg-news-secondary">
                            Post Comment
                        </button>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 pt-2">Comments</h3>
                    <div
                        ref={commentsContainerRef} 
                        style={{ maxHeight: '400px', overflowY: 'auto' }} 
                        className="space-y-4 border-b pb-4"
                    >
                        {comments.length === 0 ? (
                            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
                        ) : (
                            comments.slice(0, totalComments).map((comment) => (
                                <div key={comment.id} className="p-4 bg-white rounded-lg shadow-sm border">
                                    <div className="flex items-center mb-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                            <span>{comment.author.charAt(0)}</span>
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

                    {comments.length > totalComments && (
                        <div className="text-center py-4">
                            {totalComments < comments.length &&  (
                                <button 
                                    onClick={()=>handleLoadMoreComments()} 
                                    className="text-news-primary hover:text-news-secondary"
                                >
                                    Load More Comments
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Article;
