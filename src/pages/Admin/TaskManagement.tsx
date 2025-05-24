
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Clock,
  Upload
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useForm } from "react-hook-form";

export default function TaskManagement() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow Instagram Page",
      description: "Follow our main Instagram page and screenshot",
      reward: 2.50,
      category: "social",
      isActive: true,
      completions: 245,
      createdAt: "2024-01-20"
    },
    {
      id: 2,
      title: "Like Facebook Post",
      description: "Like our latest Facebook post about the new features",
      reward: 1.25,
      category: "social",
      isActive: true,
      completions: 189,
      createdAt: "2024-01-19"
    },
    {
      id: 3,
      title: "Subscribe to YouTube Channel",
      description: "Subscribe to our YouTube channel and take screenshot",
      reward: 3.00,
      category: "social",
      isActive: false,
      completions: 67,
      createdAt: "2024-01-18"
    }
  ]);

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      taskTitle: "Follow Instagram Page",
      user: "Alex Thompson",
      email: "alex@example.com",
      submittedAt: "2024-01-20 14:30",
      status: "pending",
      proof: "screenshot.png",
      reward: 2.50
    },
    {
      id: 2,
      taskTitle: "Like Facebook Post", 
      user: "Madison Lee",
      email: "madison@example.com",
      submittedAt: "2024-01-20 12:15",
      status: "approved",
      proof: "screenshot.png",
      reward: 1.25
    },
    {
      id: 3,
      taskTitle: "Subscribe to YouTube Channel",
      user: "Devon Smith",
      email: "devon@example.com",
      submittedAt: "2024-01-19 16:20",
      status: "rejected",
      proof: "screenshot.png",
      reward: 3.00,
      rejectionReason: "Invalid screenshot"
    }
  ]);

  const taskForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      reward: 0,
      category: "social",
      instructions: ""
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">Unknown</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "social":
        return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Social Media</Badge>;
      case "survey":
        return <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">Survey</Badge>;
      case "review":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Review</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-500 border-gray-500/30">General</Badge>;
    }
  };

  const handleCreateTask = (data: any) => {
    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      description: data.description,
      reward: parseFloat(data.reward),
      category: data.category,
      isActive: true,
      completions: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([newTask, ...tasks]);
    taskForm.reset();
  };

  const pendingSubmissions = submissions.filter(s => s.status === "pending");
  const approvedSubmissions = submissions.filter(s => s.status === "approved");
  const activeTasks = tasks.filter(t => t.isActive);
  const totalRewards = submissions.filter(s => s.status === "approved").reduce((sum, s) => sum + s.reward, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Task Management</h1>
            <p className="text-gray-400">Create and manage daily tasks for users</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new task for users to complete and earn rewards
                </DialogDescription>
              </DialogHeader>
              <Form {...taskForm}>
                <form onSubmit={taskForm.handleSubmit(handleCreateTask)} className="space-y-4">
                  <FormField
                    control={taskForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Task Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Follow Instagram Page" 
                            className="bg-gray-800 border-gray-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={taskForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Description</FormLabel>
                        <FormControl>
                          <textarea 
                            placeholder="Describe what users need to do..." 
                            className="w-full h-24 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={taskForm.control}
                      name="reward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Reward ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              step="0.01"
                              placeholder="2.50" 
                              className="bg-gray-800 border-gray-700 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={taskForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400">Category</FormLabel>
                          <FormControl>
                            <select 
                              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                              {...field}
                            >
                              <option value="social">Social Media</option>
                              <option value="survey">Survey</option>
                              <option value="review">Review</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={taskForm.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400">Detailed Instructions</FormLabel>
                        <FormControl>
                          <textarea 
                            placeholder="Step-by-step instructions for completing the task..." 
                            className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-md text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                      Create Task
                    </Button>
                    <Button type="button" variant="outline" className="border-gray-700 text-gray-300">
                      Cancel
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
                <CheckSquare className="h-8 w-8 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Active Tasks</p>
                  <p className="text-2xl font-bold text-white">{activeTasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Pending Reviews</p>
                  <p className="text-2xl font-bold text-yellow-400">{pendingSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Check className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Approved Today</p>
                  <p className="text-2xl font-bold text-green-400">{approvedSubmissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Upload className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Rewards Paid</p>
                  <p className="text-2xl font-bold text-blue-400">${totalRewards.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="bg-gray-900/70 border border-gray-800 mb-6">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">All Tasks</TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Submissions</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <CheckSquare className="h-5 w-5 text-indigo-400" />
                  <span>All Tasks ({tasks.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">Task</TableHead>
                      <TableHead className="text-gray-400">Category</TableHead>
                      <TableHead className="text-gray-400">Reward</TableHead>
                      <TableHead className="text-gray-400">Completions</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell>
                          <div>
                            <p className="text-white font-medium">{task.title}</p>
                            <p className="text-gray-400 text-sm">{task.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(task.category)}</TableCell>
                        <TableCell className="text-green-400 font-medium">${task.reward.toFixed(2)}</TableCell>
                        <TableCell className="text-blue-400">{task.completions}</TableCell>
                        <TableCell>
                          <Badge className={task.isActive ? 
                            "bg-green-500/20 text-green-500 border-green-500/30" : 
                            "bg-red-500/20 text-red-500 border-red-500/30"
                          }>
                            {task.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-indigo-700 text-indigo-400">
                              <Edit className="h-4 w-4" />
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
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions">
            <Card className="bg-gray-900/70 backdrop-blur-md border-gray-700/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-indigo-400" />
                  <span>Task Submissions ({submissions.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Task</TableHead>
                      <TableHead className="text-gray-400">Reward</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Submitted</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id} className="border-gray-800 hover:bg-gray-800/50">
                        <TableCell>
                          <div>
                            <p className="text-white font-medium">{submission.user}</p>
                            <p className="text-gray-400 text-sm">{submission.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{submission.taskTitle}</TableCell>
                        <TableCell className="text-green-400 font-medium">${submission.reward.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell className="text-gray-400">{submission.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-indigo-700 text-indigo-400">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {submission.status === "pending" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="border-red-700 text-red-500">
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
