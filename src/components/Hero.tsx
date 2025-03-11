
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Mascot from "@/components/Mascot";

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-alterview-lightPurple alterview-clip-path py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Redefining</span> Student Assessment
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              AlterView uses AI-powered conversations to assess student knowledge,
              creating personalized learning maps and detailed feedback.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" className="bg-alterview-gradient hover:opacity-90 transition-opacity">
                <Link to="/student-assessment">
                  Take an Assessment
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/instructor-dashboard">
                  Instructor Dashboard
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-12 -right-6 z-10">
                <Mascot message="Ready for a smart conversation about what you know?" />
              </div>
              <div className="relative rounded-xl shadow-xl overflow-hidden bg-white p-4">
                <div className="bg-gray-100 rounded-lg p-6 space-y-4">
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-alterview-blue flex items-center justify-center text-white font-bold mr-4">
                      AI
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-gray-800">Tell me about the concept of photosynthesis and its role in ecosystems.</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-alterview-lightPurple rounded-lg p-3 shadow-sm">
                      <p className="text-gray-800">Photosynthesis is the process where plants convert light energy into chemical energy...</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-alterview-purple flex items-center justify-center text-white font-bold ml-4">
                      U
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <div className="animate-pulse-light bg-alterview-gradient h-1 w-16 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-alterview-lightPurple rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-alterview-blue rounded-full opacity-10 translate-y-1/3 -translate-x-1/3"></div>
    </div>
  );
};

export default Hero;
