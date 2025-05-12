
import { useState } from "react";
import { CheckCircle2, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface TaskCardProps {
  id: string;
  title: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'youtube';
  completed?: boolean;
  demo?: boolean;
  onComplete?: (id: string) => void;
}

export default function TaskCard({ id, title, platform, completed = false, demo = false, onComplete }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  
  const getPlatformIcon = () => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="text-pink-600" />;
      case 'facebook':
        return <Facebook className="text-blue-600" />;
      case 'twitter':
        return <Twitter className="text-blue-400" />;
      default:
        return <CheckCircle2 className="text-gray-400" />;
    }
  };

  const handleComplete = () => {
    if (demo) {
      toast("Demo mode", {
        description: "This is just a preview. Login to complete real tasks.",
      });
      return;
    }
    
    setIsCompleting(true);
    setTimeout(() => {
      setIsCompleted(true);
      setIsCompleting(false);
      if (onComplete) onComplete(id);
      toast("Task completed!", {
        description: "Great job! Your earnings will be credited soon.",
      });
    }, 1000);
  };

  return (
    <div className={`earnify-card ${isCompleted ? 'bg-gray-50 border-gray-100' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-50">
            {getPlatformIcon()}
          </div>
          <div>
            <h3 className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {title}
            </h3>
            <p className="text-xs text-gray-500 capitalize">{platform} task</p>
          </div>
        </div>
        
        {isCompleted ? (
          <div className="flex items-center text-earnify-green">
            <CheckCircle2 size={20} />
            <span className="ml-1 text-sm font-medium">Done</span>
          </div>
        ) : (
          <Button 
            size="sm" 
            variant={demo ? "outline" : "default"} 
            disabled={isCompleting}
            className={demo ? "border-earnify-blue text-earnify-blue hover:bg-earnify-blue hover:text-white" : ""}
            onClick={handleComplete}
          >
            {isCompleting ? "Processing..." : demo ? "Try Demo" : "Complete"}
          </Button>
        )}
      </div>
    </div>
  );
}
