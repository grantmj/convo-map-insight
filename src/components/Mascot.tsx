
import React from "react";
import { cn } from "@/lib/utils";

interface MascotProps {
  className?: string;
  message?: string;
  isAnimated?: boolean;
}

const Mascot: React.FC<MascotProps> = ({ 
  className, 
  message = "Hi! I'm Alter, your assessment guide.",
  isAnimated = true
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        "relative w-16 h-16 rounded-full bg-alterview-gradient flex items-center justify-center",
        isAnimated && "animate-float"
      )}>
        {/* Simple mascot face */}
        <div className="absolute w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <div className="relative w-8 h-8">
            {/* Eyes */}
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-alterview-blue"></div>
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-alterview-blue"></div>
            {/* Smile */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-alterview-purple rounded-b-full"></div>
          </div>
        </div>
      </div>
      {message && (
        <div className="ml-4 p-3 bg-white rounded-lg shadow-md max-w-xs relative">
          <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-r-8 border-b-8 border-transparent border-r-white"></div>
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Mascot;
