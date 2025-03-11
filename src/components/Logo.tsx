
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, showText = true }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/lovable-uploads/bc492265-be37-4cc8-99b7-e96ddea9747b.png"
        alt="AlterView Logo" 
        className="h-10 w-auto"
      />
      {showText && (
        <div className="ml-2 flex flex-col">
          <span className="text-2xl font-bold text-alterview-darkPurple">AlterView</span>
          <span className="text-xs text-gray-600">Interview Assessment</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
