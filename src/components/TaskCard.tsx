
import { useState } from "react";
import { CheckCircle2, Instagram, Facebook, Twitter, Clock, ArrowRight, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import TaskDetailPopup from "./TaskDetailPopup";

interface TaskCardProps {
  id: string;
  title: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'youtube';
  estimatedTime?: string;
  description?: string;
  instructions?: string[];
  imageExample?: string;
  completed?: boolean;
  demo?: boolean;
  onComplete?: (id: string) => void;
}

export default function TaskCard({ 
  id, 
  title, 
  platform, 
  estimatedTime = "1-2 min",
  description = "",
  instructions = [],
  imageExample,
  completed = false, 
  demo = false, 
  onComplete 
}: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [showDetails, setShowDetails] = useState(false);
  
  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="text-pink-600" />;
      case 'facebook':
        return <Facebook className="text-blue-600" />;
      case 'twitter':
        return <Twitter className="text-blue-400" />;
      case 'youtube':
        return <Youtube className="text-red-600" />;
      default:
        return <CheckCircle2 className="text-gray-400" />;
    }
  };

  const handleComplete = (taskId: string) => {
    if (demo) {
      toast("Demo mode", {
        description: "This is just a preview. Login to complete real tasks.",
      });
      return;
    }
    
    setIsCompleted(true);
    if (onComplete) onComplete(taskId);
  };

  // Default instructions if none provided
  const defaultInstructions = [
    `Visit the official ${platform} page`,
    `Complete the required action (like, follow, etc.)`,
    `Take a screenshot as proof`,
    `Submit the proof to earn your reward`
  ];

  // Full task data to pass to popup
  const taskData = {
    id,
    title,
    platform,
    description: description || `Complete this ${platform} task to earn your daily reward`,
    instructions: instructions.length > 0 ? instructions : defaultInstructions,
    imageExample,
    estimatedTime,
    completed: isCompleted
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
        transition={{ duration: 0.2 }}
        className={`earnify-card rounded-xl border transition-all duration-300 overflow-hidden ${
          isCompleted ? 'bg-gray-50 border-gray-100' : 'bg-white hover:border-earnify-blue'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-gray-50">
              {getPlatformIcon()}
            </div>
            <div>
              <h3 className={`font-medium ${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>
                {title}
              </h3>
              <div className="flex items-center mt-1">
                <Badge 
                  className={`mr-2 ${
                    isCompleted 
                      ? 'bg-earnify-green text-white' 
                      : 'bg-earnify-blue/10 text-earnify-blue border-0'
                  }`}
                  variant={isCompleted ? "default" : "outline"}
                >
                  {isCompleted ? "Completed" : "Pending"}
                </Badge>
                <span className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  {estimatedTime}
                </span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`px-2 py-1 h-auto ${
              isCompleted ? 'text-earnify-green' : 'text-earnify-blue hover:text-earnify-blue/80'
            }`}
            onClick={() => setShowDetails(true)}
          >
            {isCompleted ? (
              <CheckCircle2 size={18} />
            ) : (
              <>View <ArrowRight size={14} className="ml-1" /></>
            )}
          </Button>
        </div>
      </motion.div>
      
      {/* Task Detail Popup */}
      <TaskDetailPopup
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        task={taskData}
        onComplete={handleComplete}
      />
    </>
  );
}
