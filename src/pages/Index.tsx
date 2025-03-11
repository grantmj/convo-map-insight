
import React from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import AssessmentCard from "@/components/AssessmentCard";
import { Link } from "react-router-dom";

const Index = () => {
  // Sample assessment data
  const featuredAssessments = [
    {
      id: "biology-101",
      title: "Biology 101",
      description: "Fundamental concepts in biology with focus on cellular structures and functions.",
      duration: "30-45 minutes",
      subject: "Biology",
      instructor: "Dr. Sarah Johnson"
    },
    {
      id: "computer-science",
      title: "Computer Science Fundamentals",
      description: "Core computer science concepts including algorithms, data structures, and programming basics.",
      duration: "40-50 minutes",
      subject: "Computer Science",
      instructor: "Prof. Alan Turing"
    },
    {
      id: "world-history",
      title: "World History Overview",
      description: "Key events and movements in world history from ancient civilizations to modern times.",
      duration: "35-45 minutes",
      subject: "History",
      instructor: "Dr. Michael Chen"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Featured Assessments Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Featured <span className="gradient-text">Assessments</span>
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl">
                  Explore our curated collection of assessments designed to evaluate and enhance your knowledge.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/student-assessment">
                  View All Assessments
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredAssessments.map((assessment) => (
                <AssessmentCard 
                  key={assessment.id}
                  id={assessment.id}
                  title={assessment.title}
                  description={assessment.description}
                  duration={assessment.duration}
                  subject={assessment.subject}
                  instructor={assessment.instructor}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-alterview-gradient text-white">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Assessment?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join instructors and students already using AlterView to revolutionize
              the way knowledge is assessed and learning is measured.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg" variant="default" className="bg-white text-alterview-purple hover:bg-gray-100">
                <Link to="/student-assessment">
                  Take an Assessment
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/instructor-dashboard">
                  For Instructors
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-alterview-darkPurple text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AlterView</h3>
              <p className="text-gray-300">
                Revolutionizing assessment through intelligent conversations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/student-assessment" className="text-gray-300 hover:text-white">Assessments</Link></li>
                <li><Link to="/instructor-dashboard" className="text-gray-300 hover:text-white">For Instructors</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-300">
                info@alterview.edu<br />
                1234 Education Lane<br />
                Knowledge City, KN 56789
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AlterView. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
