
import React from "react";
import { 
  Book, 
  Layout, 
  MessageSquare, 
  Users, 
  BarChart, 
  GraduationCap 
} from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="w-12 h-12 text-alterview-blue" />,
    title: "Conversational Assessments",
    description: "Natural dialogue-based evaluations that adapt based on student responses to thoroughly assess understanding."
  },
  {
    icon: <Book className="w-12 h-12 text-alterview-purple" />,
    title: "Knowledge Mapping",
    description: "Real-time conceptual graphs that visualize student understanding and identify connections between concepts."
  },
  {
    icon: <GraduationCap className="w-12 h-12 text-alterview-blue" />,
    title: "Adaptive Difficulty",
    description: "Questions that progressively increase in complexity based on the quality of student responses."
  },
  {
    icon: <Layout className="w-12 h-12 text-alterview-purple" />,
    title: "Immediate Feedback",
    description: "Detailed feedback that identifies knowledge gaps and suggests areas for improvement after each assessment."
  },
  {
    icon: <BarChart className="w-12 h-12 text-alterview-blue" />,
    title: "Comprehensive Analytics",
    description: "In-depth analysis of assessment results with visualization tools for instructors to track progress."
  },
  {
    icon: <Users className="w-12 h-12 text-alterview-purple" />,
    title: "LMS Integration",
    description: "Seamless integration with common Learning Management Systems for a streamlined educational experience."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Innovative</span> Assessment Features
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            AlterView's AI-powered platform transforms how we evaluate knowledge, providing deeper insights and more meaningful assessments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
