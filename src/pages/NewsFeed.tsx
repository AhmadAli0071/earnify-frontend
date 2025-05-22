
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Image, Heart, MessageSquare, Share, UserRound, Clock, X, AlertCircle, Sparkles, Lightbulb } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
    isAdmin?: boolean;
  };
  title: string;
  content: string;
  image?: string;
  timePosted: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  category: 'update' | 'tip' | 'alert' | 'general';
  isNew?: boolean;
  isPinned?: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    initials: string;
  };
  content: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'update':
      return <Sparkles size={16} className="text-purple-500" />;
    case 'tip':
      return <Lightbulb size={16} className="text-indigo-500" />;
    case 'alert':
      return <AlertCircle size={16} className="text-rose-500" />;
    default:
      return null;
  }
};

const getCategoryLabel = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};

export default function NewsFeed() {
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Earnify Team",
        avatar: "",
        initials: "ET",
        isAdmin: true,
      },
      title: "Platform Update: New Task Types Added!",
      content: "We're excited to announce that we've added new task types to the platform! Now you can earn by completing YouTube video tasks and Twitter retweet tasks. These new task types offer higher rewards and are available for all users. Check out the Tasks section to start earning more today!",
      timePosted: "2 hours ago",
      likes: 24,
      comments: [
        {
          id: "c1",
          author: {
            name: "Robert Smith",
            initials: "RS",
          },
          content: "This is great! I'm excited to try the YouTube tasks.",
        },
      ],
      isLiked: false,
      category: "update",
      isNew: true,
      isPinned: true,
    },
    {
      id: "2",
      author: {
        name: "Michael Johnson",
        avatar: "",
        initials: "MJ",
      },
      title: "Question About Withdrawals",
      content: "Does anyone know how many tasks we need to complete before we can do our first withdrawal? I've been working on tasks for a few days now and am getting close to the minimum amount.",
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
      category: "general",
    },
    {
      id: "3",
      author: {
        name: "Earnify Team",
        avatar: "",
        initials: "ET",
        isAdmin: true,
      },
      title: "Important: Withdrawal System Maintenance",
      content: "We'll be performing scheduled maintenance on our withdrawal system tomorrow from 2 AM to 4 AM UTC. During this time, withdrawals will be temporarily unavailable. All pending withdrawals will be processed once the maintenance is complete. We apologize for any inconvenience this may cause.",
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
          content: "Thanks for the heads-up!",
        },
      ],
      isLiked: false,
      category: "alert",
    },
    {
      id: "4",
      author: {
        name: "Earnify Team",
        avatar: "",
        initials: "ET",
        isAdmin: true,
      },
      title: "Pro Tip: Maximize Your Earnings",
      content: "Did you know you can significantly increase your earnings by upgrading your package? Our Premium packages offer up to 5x higher task rewards compared to the Basic package. Plus, you'll get priority access to high-paying tasks before they're available to everyone else!",
      timePosted: "2 days ago",
      likes: 36,
      comments: [],
      isLiked: false,
      category: "tip",
    },
    {
      id: "5",
      author: {
        name: "Sarah Williams",
        avatar: "",
        initials: "SW",
      },
      title: "Just Upgraded My Package!",
      content: "Just upgraded to the $50 package! Looking forward to higher earnings 🚀 Has anyone else tried this package? What kind of daily earnings are you seeing?",
      image: "https://placehold.co/600x400",
      timePosted: "3 days ago",
      likes: 42,
      comments: [
        {
          id: "c5",
          author: {
            name: "David Brown",
            initials: "DB",
          },
          content: "Great choice! I did the same last week.",
        },
        {
          id: "c6",
          author: {
            name: "Emma Watson",
            initials: "EW",
          },
          content: "Let us know how it goes!",
        },
      ],
      isLiked: false,
      category: "general",
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
      title: "New Post",
      content: newPostContent,
      timePosted: "Just now",
      likes: 0,
      comments: [],
      isLiked: false,
      category: "general",
      isNew: true,
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

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    return post.category === activeTab;
  });

  // Sort posts: pinned first, then by date
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // Pinned posts first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    // Then sort by date (assuming newer posts have larger IDs)
    return Number(b.id) - Number(a.id);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">News Feed</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-white">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="update">Updates</TabsTrigger>
              <TabsTrigger value="tip">Tips</TabsTrigger>
              <TabsTrigger value="alert">Alerts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Create Post Box */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow p-4 mb-6"
        >
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
        </motion.div>
        
        {/* Posts List */}
        <div className="space-y-5">
          <AnimatePresence>
            {sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300"
              >
                {/* Post Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {post.author.avatar ? (
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        ) : (
                          <AvatarFallback className={`text-white ${post.author.isAdmin ? 'bg-earnify-blue' : 'bg-earnify-green'}`}>
                            {post.author.initials}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-800">{post.author.name}</h3>
                          {post.author.isAdmin && (
                            <Badge variant="info" className="text-xs">Admin</Badge>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          <span>{post.timePosted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {post.isPinned && (
                        <div className="text-amber-500 flex items-center text-xs font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 2-9 9 5 5 9-9z"/>
                            <path d="m2 15 7 7"/>
                          </svg>
                          <span className="ml-1">Pinned</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        {post.category !== 'general' && (
                          <Badge variant={post.category as any} className="flex items-center gap-1">
                            {getCategoryIcon(post.category)}
                            {getCategoryLabel(post.category)}
                          </Badge>
                        )}
                        
                        {post.isNew && (
                          <Badge variant="new" className="ml-1">New</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Post Content */}
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h2>
                  <p className="text-gray-700 line-clamp-3">{post.content}</p>
                  
                  {post.image && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img src={post.image} alt="Post" className="w-full h-auto object-cover hover:opacity-95 transition-opacity" />
                    </div>
                  )}
                  
                  <Button 
                    variant="link" 
                    className="text-earnify-blue p-0 mt-2 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                  >
                    Read More
                  </Button>
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
                      
                      <button 
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                        }}
                      >
                        <MessageSquare size={16} />
                        <span>{post.comments.length}</span>
                      </button>
                      
                      <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                        <Share size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Comments Preview (only show if there are comments) */}
                {post.comments.length > 0 && (
                  <div className="bg-gray-50 px-4 py-3 rounded-b-xl">
                    {post.comments.slice(0, 1).map((comment) => (
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
                    
                    {post.comments.length > 1 && (
                      <button 
                        className="text-xs text-earnify-blue hover:underline mt-1 ml-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                        }}
                      >
                        View all {post.comments.length} comments
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {sortedPosts.length === 0 && (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <div className="text-gray-400 mb-3">
                <AlertCircle size={40} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">No posts in this category</h3>
              <p className="text-gray-500 mt-1">Check other categories or come back later</p>
            </div>
          )}
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

      {/* Post Detail Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-2">
                  {selectedPost.title}
                  {selectedPost.author.isAdmin && (
                    <Badge variant="info" className="text-xs">Admin</Badge>
                  )}
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback className={`text-white ${selectedPost.author.isAdmin ? 'bg-earnify-blue' : 'bg-earnify-green'}`}>
                      {selectedPost.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{selectedPost.author.name}</p>
                    <p className="text-xs text-gray-500">{selectedPost.timePosted}</p>
                  </div>
                </div>
                
                <div>
                  {selectedPost.category !== 'general' && (
                    <Badge variant={selectedPost.category as any} className="flex items-center gap-1">
                      {getCategoryIcon(selectedPost.category)}
                      {getCategoryLabel(selectedPost.category)}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-800 whitespace-pre-wrap">{selectedPost.content}</p>
                
                {selectedPost.image && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img src={selectedPost.image} alt="Post" className="w-full h-auto object-cover" />
                  </div>
                )}
                
                <div className="flex items-center justify-start gap-4 border-t border-gray-100 pt-4 mt-4">
                  <button 
                    onClick={() => toggleLike(selectedPost.id)}
                    className={`flex items-center gap-1 ${
                      selectedPost.isLiked ? "text-red-500" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Heart size={18} className={selectedPost.isLiked ? "fill-red-500" : ""} />
                    <span>{selectedPost.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <MessageSquare size={18} />
                    <span>{selectedPost.comments.length}</span>
                  </button>
                  
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <Share size={18} />
                  </button>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="font-medium text-gray-700 mb-3">Comments ({selectedPost.comments.length})</h3>
                  
                  <div className="space-y-3">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gray-300">
                            {comment.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm flex-1">
                          <div className="font-medium text-gray-800">{comment.author.name}</div>
                          <div className="mt-1 text-gray-700">{comment.content}</div>
                        </div>
                      </div>
                    ))}

                    {selectedPost.comments.length === 0 && (
                      <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                    )}

                    <div className="flex items-start gap-2 mt-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-earnify-blue text-white">CU</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <Textarea 
                          placeholder="Write a comment..."
                          className="min-h-[60px] text-sm"
                        />
                        <div className="mt-2 flex justify-end">
                          <Button size="sm">Post Comment</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
