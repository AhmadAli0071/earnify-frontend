
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, X, Clock, AlertCircle, ArrowLeft, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";

interface TaskDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  task: {
    id: string;
    title: string;
    platform: 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'youtube';
    description: string;
    instructions: string[];
    imageExample?: string;
    estimatedTime: string;
    completed: boolean;
  };
  onComplete: (taskId: string) => void;
}

export default function TaskDetailPopup({ 
  isOpen, 
  onClose, 
  task,
  onComplete
}: TaskDetailPopupProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setFile(null);
      toast.success("Proof uploaded successfully");
    }, 1500);
  };

  const handleComplete = () => {
    setIsSubmitting(true);
    // Simulate completion delay
    setTimeout(() => {
      onComplete(task.id);
      setIsSubmitting(false);
      toast.success("Task marked as completed!");
      onClose();
    }, 1000);
  };

  const getPlatformIcon = () => {
    switch (task.platform) {
      case 'instagram':
        return "📱";
      case 'facebook':
        return "👍";
      case 'twitter':
        return "🐦";
      case 'youtube':
        return "📺";
      case 'tiktok':
        return "🎵";
      default:
        return "🔗";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white rounded-xl shadow-lg p-0 overflow-hidden">
        <div className={`w-full h-2 ${task.platform === 'instagram' ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500' : 
                          task.platform === 'facebook' ? 'bg-gradient-to-r from-blue-600 to-blue-400' :
                          task.platform === 'twitter' ? 'bg-gradient-to-r from-blue-400 to-sky-300' :
                          task.platform === 'youtube' ? 'bg-gradient-to-r from-red-600 to-red-400' : 
                          'bg-gradient-to-r from-gray-600 to-gray-400'}`} />
        
        <DialogHeader className="pt-6 px-6 pb-2 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-2xl bg-gray-100">
                {getPlatformIcon()}
              </div>
              <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-8 w-8" 
              onClick={onClose}
            >
              <X size={18} />
            </Button>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock size={14} className="mr-1" />
            <span>Estimated time: {task.estimatedTime}</span>
          </div>
        </DialogHeader>

        <div className="p-6">
          <p className="text-gray-700 mb-4">{task.description}</p>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Instructions:</h4>
            <ul className="space-y-2">
              {task.instructions.map((instruction, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="flex items-start"
                >
                  <div className="min-w-5 mr-2 text-earnify-blue">•</div>
                  <span className="text-sm text-gray-600">{instruction}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {task.imageExample && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Example:</h4>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img 
                  src={task.imageExample} 
                  alt="Task Example" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
          
          {!task.completed && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Upload Proof:</h4>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="task-proof"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <label htmlFor="task-proof" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {file ? file.name : "Click to upload screenshot"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </span>
                  </div>
                </label>
                {file && (
                  <div className="mt-3">
                    <Button 
                      size="sm" 
                      onClick={handleUpload} 
                      disabled={isUploading}
                      className="bg-earnify-blue hover:bg-blue-600"
                    >
                      {isUploading ? "Uploading..." : "Upload Proof"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="bg-gray-50 p-4 flex flex-col sm:flex-row sm:justify-between gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="sm:order-1 order-2"
          >
            <ArrowLeft size={16} className="mr-1" /> Back to Tasks
          </Button>
          
          {task.completed ? (
            <div className="flex items-center text-earnify-green">
              <CheckCircle size={18} className="mr-1" />
              <span className="text-sm font-medium">Task Completed</span>
            </div>
          ) : (
            <Button 
              className="bg-earnify-green hover:bg-green-600 sm:order-2 order-1"
              size="sm"
              disabled={isSubmitting}
              onClick={handleComplete}
            >
              {isSubmitting ? "Processing..." : "Mark as Completed"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
