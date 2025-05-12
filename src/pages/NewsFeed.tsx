
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Image, Heart, MessageSquare, Share, UserRound, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  image?: string;
  timePosted: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    initials: string;
  };
  content: string;
}

export default function NewsFeed() {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Jessica Chen",
        avatar: "",
        initials: "JC",
      },
      content: "Just completed my daily tasks and earned $1.2 today! 💰 This platform is amazing!",
      timePosted: "2 hours ago",
      likes: 24,
      comments: [
        {
          id: "c1",
          author: {
            name: "Robert Smith",
            initials: "RS",
          },
          content: "That's awesome! I earned $1.5 yesterday.",
        },
      ],
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: "Michael Johnson",
        avatar: "",
        initials: "MJ",
      },
      content: "Does anyone know how many tasks we need to complete before we can do our first withdrawal?",
      timePosted: "5 hours ago",
      likes: 7,
      comments: [
        {
          id: "c2",
          author: {
            name: "Amanda Lee",
            initials: "AL",
          },
          content: "I think it depends on your package, but usually around 10 tasks.",
        },
      ],
      isLiked: true,
    },
    {
      id: "3",
      author: {
        name: "Sarah Williams",
        avatar: "",
        initials: "SW",
      },
      content: "Just upgraded to the $50 package! Looking forward to higher earnings 🚀",
      image: "https://placehold.co/600x400",
      timePosted: "1 day ago",
      likes: 42,
      comments: [
        {
          id: "c3",
          author: {
            name: "David Brown",
            initials: "DB",
          },
          content: "Great choice! I did the same last week.",
        },
        {
          id: "c4",
          author: {
            name: "Emma Watson",
            initials: "EW",
          },
          content: "Let us know how it goes!",
        },
      ],
      isLiked: false,
    },
  ]);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        avatar: "",
        initials: "CU",
      },
      content: newPostContent,
      timePosted: "Just now",
      likes: 0,
      comments: [],
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">News Feed</h1>
        
        {/* Create Post Box */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-earnify-blue text-white">CU</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[80px] mb-3 focus:border-earnify-blue"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" className="text-gray-500">
                  <Image size={16} className="mr-1" />
                  Add Image
                </Button>
                
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim()}
                  className="bg-earnify-blue hover:bg-earnify-blue/90"
                >
                  <Plus size={16} className="mr-1" />
                  Create Post
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow animate-fade-in">
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {post.author.avatar ? (
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      ) : (
                        <AvatarFallback className="bg-earnify-green text-white">
                          {post.author.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div>
                      <h3 className="font-medium text-gray-800">{post.author.name}</h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        <span>{post.timePosted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                
                {post.image && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img src={post.image} alt="Post" className="w-full h-auto" />
                  </div>
                )}
              </div>
              
              {/* Post Actions */}
              <div className="px-4 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1 text-sm ${
                        post.isLiked ? "text-red-500" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Heart size={16} className={post.isLiked ? "fill-red-500" : ""} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      <MessageSquare size={16} />
                      <span>{post.comments.length}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                      <Share size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="bg-gray-50 px-4 py-3 rounded-b-xl">
                  {post.comments.slice(0, 2).map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2 mb-2 last:mb-0">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-gray-300">
                          {comment.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="bg-white rounded-lg px-3 py-2 text-sm flex-1">
                        <span className="font-medium text-gray-800">{comment.author.name}:</span>{" "}
                        {comment.content}
                      </div>
                    </div>
                  ))}
                  
                  {post.comments.length > 2 && (
                    <button className="text-xs text-earnify-blue hover:underline mt-1 ml-8">
                      View all {post.comments.length} comments
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
      
      {/* Mobile Create Post Button */}
      <div className="md:hidden fixed bottom-6 right-6">
        <Button 
          className="rounded-full h-14 w-14 shadow-lg bg-earnify-blue hover:bg-earnify-blue/90"
          onClick={() => {
            const textarea = document.querySelector('textarea');
            if (textarea) {
              textarea.focus();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Plus size={24} />
          <span className="sr-only">Create Post</span>
        </Button>
      </div>
    </div>
  );
}
