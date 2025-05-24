
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Newspaper,
  Plus,
  Edit,
  Trash2,
  Pin,
  Eye,
  Calendar,
  MessageSquare
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useForm } from "react-hook-form";

export default function NewsfeedManagement() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to Earnify - Start Earning Today!",
      content: "We're excited to have you join our platform. Complete your first task and start earning money today!",
      category: "announcement",
      isPinned: true,
      isPublished: true,
      createdAt: "2024-01-20",
      views: 1250,
      author: "Admin"
    },
    {
      id: 2,
      title: "New High-Paying Tasks Available",
      content: "Check out our latest batch of high-paying social media tasks. Earn up to $5 per task!",
      category: "update",
      isPinned: false,
      isPublished: true,
      createdAt: "2024-01-19",
      views: 890,
      author: "Admin"
    },
    {
      id: 3,
      title: "Weekly Earnings Report",
      content: "Our community has earned over $50,000 this week! See how you can maximize your earnings.",
      category: "report",
      isPinned: false,
      isPublished: false,
      createdAt: "2024-01-18",
      views: 0,
      author: "Admin"
    }
  ]);

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      category: "announcement"
    }
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "announcement":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Announcement</Badge>;
      case "update":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Update</Badge>;
      case "report":
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Report</Badge>;
      case "tip":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Tip</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">General</Badge>;
    }
  };

  const togglePin = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isPinned: !post.isPinned } : post
    ));
  };

  const togglePublish = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isPublished: !post.isPublished } : post
    ));
  };

  const handleCreatePost = (data: any) => {
    const newPost = {
      id: posts.length + 1,
      title: data.title,
      content: data.content,
      category: data.category,
      isPinned: false,
      isPublished: true,
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      author: "Admin"
    };
    setPosts([newPost, ...posts]);
    form.reset();
  };

  const publishedPosts = posts.filter(p => p.isPublished);
  const draftPosts = posts.filter(p => !p.isPublished);
  const pinnedPosts = posts.filter(p => p.isPinned);
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Newsfeed Management</h1>
            <p className="text-gray-400">Create and manage announcements and updates</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new announcement or update for your users
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreatePost)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter post title..." 
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Content</FormLabel>
                        <FormControl>
                          <textarea 
                            placeholder="Enter post content..." 
                            className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Category</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            {...field}
                          >
                            <option value="announcement">Announcement</option>
                            <option value="update">Update</option>
                            <option value="report">Report</option>
                            <option value="tip">Tip</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      Publish Post
                    </Button>
                    <Button type="button" variant="outline" className="border-gray-700 text-gray-300">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Newspaper className="h-8 w-8 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-white">{publishedPosts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Edit className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Drafts</p>
                  <p className="text-2xl font-bold text-yellow-400">{draftPosts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Pin className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Pinned</p>
                  <p className="text-2xl font-bold text-green-400">{pinnedPosts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Eye className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-blue-400">{totalViews.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table */}
        <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-indigo-400" />
              <span>All Posts ({posts.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Title</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Views</TableHead>
                  <TableHead className="text-gray-400">Created</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-medium">{post.title}</p>
                          {post.isPinned && <Pin className="h-4 w-4 text-yellow-400" />}
                        </div>
                        <p className="text-gray-400 text-sm truncate max-w-md">{post.content}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(post.category)}</TableCell>
                    <TableCell>
                      <Badge className={post.isPublished ? 
                        "bg-green-500/20 text-green-500 border-green-500/30" : 
                        "bg-gray-500/20 text-gray-500 border-gray-500/30"
                      }>
                        {post.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-blue-400">{post.views.toLocaleString()}</TableCell>
                    <TableCell className="text-gray-400">{post.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-indigo-700 text-indigo-400">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={post.isPinned ? 
                            "border-yellow-700 text-yellow-400 bg-yellow-700/20" : 
                            "border-gray-700 text-gray-400"
                          }
                          onClick={() => togglePin(post.id)}
                        >
                          <Pin className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className={post.isPublished ? 
                            "border-gray-700 text-gray-400" : 
                            "border-green-700 text-green-400"
                          }
                          onClick={() => togglePublish(post.id)}
                        >
                          {post.isPublished ? "Unpublish" : "Publish"}
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-700 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
