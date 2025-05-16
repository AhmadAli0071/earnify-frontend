
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const glassPanelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + (i * 0.1),
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const coinVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4 + (i * 0.15),
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

const taskCompletedVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.6 + (i * 0.1),
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

export const LandingHero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Initialize simple canvas animation if needed
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
      
      // Animation frame for potential future canvas animations
      let frameCount = 0;
      
      const render = () => {
        frameCount++;
        if (!canvasRef.current || !ctx) return;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Add particle effects or additional animations here if needed
        
        requestAnimationFrame(render);
      };
      
      render();
      
      // Cleanup function
      return () => {
        // Cancel animation if component unmounts
      };
    }
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[550px] overflow-hidden bg-gray-900 rounded-xl">
      {/* Background canvas for potential particle effects */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 z-10"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 z-20"></div>
      
      {/* Main content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8">
        {/* 3D Platform Visualization */}
        <div className="relative w-full max-w-md h-[400px] perspective-1000">
          {/* User Dashboard Panel (Center) */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-gray-800/80 backdrop-blur-md rounded-2xl border border-indigo-500/30 shadow-xl shadow-indigo-500/20 p-4 rotate-y-15 z-30"
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 15 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-700/50 mb-3">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">E</div>
                <span className="text-sm font-bold text-white">Earnify</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
            
            {/* Balance Display */}
            <div className="bg-indigo-900/30 rounded-lg p-3 mb-3 text-center">
              <p className="text-xs text-indigo-300">Total Earnings</p>
              <h3 className="text-2xl font-bold text-white">$248.50</h3>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-green-400">+$12.25 today</span>
              </div>
            </div>
            
            {/* Task Status */}
            <div className="space-y-2 mb-4">
              <motion.div 
                custom={0}
                variants={taskCompletedVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between p-2 bg-green-900/20 rounded-md border border-green-800/30"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-green-300">Instagram Task</span>
                </div>
                <span className="text-xs font-medium text-green-400">+$3.50</span>
              </motion.div>
              
              <motion.div 
                custom={1}
                variants={taskCompletedVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between p-2 bg-green-900/20 rounded-md border border-green-800/30"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-green-300">Twitter Task</span>
                </div>
                <span className="text-xs font-medium text-green-400">+$2.75</span>
              </motion.div>
              
              <motion.div 
                custom={2}
                variants={taskCompletedVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-between p-2 bg-gray-800/50 rounded-md border border-gray-700/30"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-4 rounded-full bg-gray-700/50 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-gray-600"></div>
                  </div>
                  <span className="text-xs text-gray-400">YouTube Task</span>
                </div>
                <span className="text-xs font-medium text-gray-400">$5.00</span>
              </motion.div>
            </div>
            
            {/* Available Tasks */}
            <div className="bg-gray-700/30 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-400">12 More Tasks Available</p>
              <p className="text-xs text-indigo-300 mt-1">Potential Earnings: $42.50</p>
            </div>
          </motion.div>
          
          {/* Left-side floating glass panel */}
          <motion.div 
            custom={0}
            variants={glassPanelVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-[30%] left-0 w-32 h-40 bg-gray-800/40 backdrop-blur-md rounded-lg border border-indigo-500/20 shadow-lg shadow-indigo-500/10 p-3 -rotate-6 transform translate-x-4 z-20"
          >
            <div className="w-full h-4 bg-gray-700/50 rounded mb-2"></div>
            <div className="w-2/3 h-3 bg-gray-700/50 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-indigo-600/30 rounded"></div>
              <div className="w-full h-3 bg-indigo-600/30 rounded"></div>
              <div className="w-3/4 h-3 bg-indigo-600/30 rounded"></div>
            </div>
          </motion.div>
          
          {/* Right-side floating glass panel */}
          <motion.div 
            custom={1}
            variants={glassPanelVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-[35%] right-0 w-36 h-44 bg-gray-800/40 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-lg shadow-purple-500/10 p-3 rotate-6 transform -translate-x-4 z-10"
          >
            <div className="w-full h-4 bg-gray-700/50 rounded mb-2"></div>
            <div className="w-2/3 h-3 bg-gray-700/50 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 bg-purple-600/20 rounded"></div>
              <div className="h-8 bg-purple-600/20 rounded"></div>
              <div className="h-8 bg-purple-600/20 rounded"></div>
              <div className="h-8 bg-purple-600/20 rounded"></div>
            </div>
          </motion.div>
          
          {/* Floating coins */}
          <motion.div 
            custom={0}
            variants={coinVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-[15%] left-[20%] w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/20 border-4 border-yellow-300 flex items-center justify-center z-40"
          >
            <span className="text-lg font-bold text-yellow-800">$</span>
          </motion.div>
          
          <motion.div 
            custom={1}
            variants={coinVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-[25%] right-[25%] w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/20 border-4 border-yellow-300 flex items-center justify-center z-40"
          >
            <span className="text-base font-bold text-yellow-800">$</span>
          </motion.div>
          
          <motion.div 
            custom={2}
            variants={coinVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-[20%] left-[30%] w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/20 border-3 border-yellow-300 flex items-center justify-center z-40"
          >
            <span className="text-sm font-bold text-yellow-800">$</span>
          </motion.div>
        </div>
        
        {/* Bottom text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-indigo-300 font-medium">
            Real-time earnings through simple social media tasks
          </p>
        </motion.div>
      </div>
    </div>
  );
};
