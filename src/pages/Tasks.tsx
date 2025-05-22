
import { useState } from "react";
import { CheckCircle, AlertCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TaskCard from "@/components/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { 
      id: "task1", 
      title: "Follow @earnify on Instagram", 
      platform: "instagram", 
      completed: false,
      estimatedTime: "1-2 min",
      description: "Follow our official Instagram account to stay updated with the latest news and promotions",
      instructions: [
        "Open Instagram and search for @earnify",
        "Visit our profile and tap 'Follow'",
        "Take a screenshot of your follow status",
        "Upload the screenshot as proof"
      ],
      imageExample: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=400"
    },
    { 
      id: "task2", 
      title: "Like our Facebook post", 
      platform: "facebook", 
      completed: false,
      estimatedTime: "1 min",
      description: "Like our latest post on Facebook to earn your daily reward"
    },
    { 
      id: "task3", 
      title: "Retweet our latest announcement", 
      platform: "twitter", 
      completed: false,
      estimatedTime: "2-3 min",
      description: "Find and retweet our latest announcement on Twitter"
    },
    { 
      id: "task4", 
      title: "Follow our Facebook page", 
      platform: "facebook", 
      completed: false,
      estimatedTime: "1 min",
      description: "Follow our Facebook page to stay updated with the latest news"
    },
    { 
      id: "task5", 
      title: "Join our Instagram giveaway", 
      platform: "instagram", 
      completed: false,
      estimatedTime: "3-4 min",
      description: "Participate in our latest Instagram giveaway to win exciting prizes"
    },
  ]);
  
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasksCount / tasks.length) * 100;
  
  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    
    // Check if all tasks are completed
    const updatedCompletedCount = tasks.filter(task => task.id === taskId ? true : task.completed).length;
    if (updatedCompletedCount === tasks.length) {
      toast("All tasks completed!", {
        description: "Great job! You've completed all your tasks for today.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-800">Daily Tasks</h1>
              <p className="text-gray-600">Complete all tasks to maximize your daily earnings</p>
            </div>
            
            <Card className="md:w-auto w-full">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="bg-gray-100 rounded-full p-2">
                  {progressPercentage === 100 ? (
                    <CheckCircle className="text-earnify-green h-5 w-5" />
                  ) : (
                    <AlertCircle className="text-amber-500 h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {progressPercentage === 100 
                      ? "All tasks completed!" 
                      : `${completedTasksCount}/${tasks.length} tasks completed`}
                  </p>
                  <Progress value={progressPercentage} className="h-1.5 w-32 mt-1" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">Today's Tasks</h2>
            <Button variant="outline" size="sm" className="text-sm">
              <Filter className="h-4 w-4 mr-1" /> Filter
            </Button>
          </div>
          
          <div className="grid gap-3 mb-6">
            {tasks.map(task => (
              <TaskCard 
                key={task.id}
                id={task.id}
                title={task.title}
                platform={task.platform as any}
                estimatedTime={task.estimatedTime}
                description={task.description}
                instructions={task.instructions}
                imageExample={task.imageExample}
                completed={task.completed}
                onComplete={handleCompleteTask}
              />
            ))}
          </div>
          
          {completedTasksCount === tasks.length && (
            <div className="mt-6 bg-earnify-lightGreen p-4 rounded-lg">
              <div className="flex items-center text-earnify-green">
                <CheckCircle size={20} className="mr-2" />
                <p className="font-medium">All tasks completed!</p>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                You've completed all your tasks for today. Your account will be credited with your daily earnings.
              </p>
            </div>
          )}
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Task Guidelines</CardTitle>
              <CardDescription>
                Follow these guidelines to ensure your tasks are validated
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600">
              <p>• Complete all tasks daily to receive your full earnings</p>
              <p>• Tasks must be completed genuinely - our system detects fake interactions</p>
              <p>• If a task requires proof, make sure to upload clear screenshots</p>
              <p>• New tasks become available every 24 hours</p>
              <p>• Contact support if you encounter any issues with task validation</p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tasks;
