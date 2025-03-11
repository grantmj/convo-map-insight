
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-white shadow-sm z-40 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="z-50">
          <Logo />
        </Link>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden z-50" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-alterview-blue font-medium transition-colors">
            Home
          </Link>
          <Link to="/student-assessment" className="text-gray-700 hover:text-alterview-blue font-medium transition-colors">
            Take Assessment
          </Link>
          <Link to="/instructor-dashboard" className="text-gray-700 hover:text-alterview-blue font-medium transition-colors">
            Instructor Dashboard
          </Link>
          <Button asChild className="bg-alterview-gradient hover:opacity-90 transition-opacity">
            <Link to="/student-assessment">
              Start Assessment
            </Link>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-40 animate-fade-in">
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Link 
                to="/" 
                className="text-xl font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/student-assessment" 
                className="text-xl font-medium"
                onClick={toggleMenu}
              >
                Take Assessment
              </Link>
              <Link 
                to="/instructor-dashboard" 
                className="text-xl font-medium"
                onClick={toggleMenu}
              >
                Instructor Dashboard
              </Link>
              <Button 
                asChild 
                className="bg-alterview-gradient hover:opacity-90 transition-opacity mt-4 w-40"
                onClick={toggleMenu}
              >
                <Link to="/student-assessment">
                  Start Assessment
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
