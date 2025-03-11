
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import AIInterviewer from "@/components/AIInterviewer";
import KnowledgeMap from "@/components/KnowledgeMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Mascot from "@/components/Mascot";

// Sample test data
const assessments = [
  {
    id: "biology-101",
    title: "Biology 101",
    description: "Test your knowledge of basic biology concepts including cellular structure and function.",
    subject: "Biology",
    instructor: "Dr. Sarah Johnson",
    duration: "30-45 minutes",
    totalQuestions: 15,
    knowledgeAreas: ["Cell Structure", "Organelles", "Cell Division", "DNA Structure", "Protein Synthesis"]
  },
  {
    id: "computer-science",
    title: "Computer Science Fundamentals",
    description: "Assessment covering algorithms, data structures, and programming basics.",
    subject: "Computer Science",
    instructor: "Prof. Alan Turing",
    duration: "40-50 minutes",
    totalQuestions: 20,
    knowledgeAreas: ["Algorithms", "Data Structures", "Programming Basics", "Complexity Analysis", "Object-Oriented Programming"]
  },
  {
    id: "world-history",
    title: "World History Overview",
    description: "Explore your understanding of key events and movements in world history.",
    subject: "History",
    instructor: "Dr. Michael Chen",
    duration: "35-45 minutes",
    totalQuestions: 18,
    knowledgeAreas: ["Ancient Civilizations", "Middle Ages", "Renaissance", "Industrial Revolution", "Modern Era"]
  }
];

// Sample knowledge map data
const sampleKnowledgeNodes = [
  { id: "node-1", label: "Cell Structure", value: 85 },
  { id: "node-2", label: "Mitochondria", value: 92 },
  { id: "node-3", label: "Cell Membrane", value: 78 },
  { id: "node-4", label: "Cellular Respiration", value: 63 },
  { id: "node-5", label: "DNA Replication", value: 75 },
  { id: "node-6", label: "Protein Synthesis", value: 70 }
];

const sampleKnowledgeEdges = [
  { source: "node-1", target: "node-2", strength: 0.8 },
  { source: "node-1", target: "node-3", strength: 0.9 },
  { source: "node-2", target: "node-4", strength: 0.7 },
  { source: "node-4", target: "node-5", strength: 0.5 },
  { source: "node-5", target: "node-6", strength: 0.6 },
  { source: "node-3", target: "node-6", strength: 0.4 }
];

const StudentAssessment = () => {
  const { id } = useParams();
  const [activeAssessment, setActiveAssessment] = useState<any>(null);
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false);
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const assessment = assessments.find(a => a.id === id);
      if (assessment) {
        setActiveAssessment(assessment);
      }
    }
  }, [id]);

  const handleStartAssessment = () => {
    setIsAssessmentStarted(true);
    toast({
      title: "Assessment Started",
      description: `You've started the ${activeAssessment?.title} assessment.`,
    });
  };

  const handleNextQuestion = () => {
    const newQuestion = currentQuestion + 1;
    setCurrentQuestion(newQuestion);
    const newProgress = (newQuestion / activeAssessment.totalQuestions) * 100;
    setProgress(newProgress);
    
    if (newQuestion > activeAssessment.totalQuestions) {
      setIsAssessmentCompleted(true);
      toast({
        title: "Assessment Completed",
        description: "Great job! Your assessment has been submitted for review.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 md:px-8">
          {!id && (
            <>
              <div className="mb-12">
                <h1 className="text-3xl font-bold mb-2">Available Assessments</h1>
                <p className="text-gray-600">Choose an assessment to test your knowledge</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {assessments.map(assessment => (
                  <a href={`/student-assessment/${assessment.id}`} key={assessment.id} className="block">
                    <Card className="h-full transition-all hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                        <CardDescription>{assessment.subject}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{assessment.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline">{assessment.duration}</Badge>
                          <Badge variant="outline">{assessment.totalQuestions} Questions</Badge>
                        </div>
                        <p className="text-xs text-gray-500">Instructor: {assessment.instructor}</p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </>
          )}
          
          {activeAssessment && !isAssessmentStarted && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{activeAssessment.title} Assessment</CardTitle>
                  <CardDescription>{activeAssessment.subject}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-gray-600">{activeAssessment.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Questions</p>
                      <p className="text-gray-600">{activeAssessment.totalQuestions} Total</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Instructor</p>
                      <p className="text-gray-600">{activeAssessment.instructor}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-gray-600">{activeAssessment.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Knowledge Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {activeAssessment.knowledgeAreas.map((area: string) => (
                        <Badge key={area} variant="secondary">{area}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                    <Mascot message="Hi there! I'm Alter, your assessment guide. I'll be conducting your interview today. We'll have a conversation about the topics, and I'll adapt my questions based on your answers. Ready to begin?" />
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleStartAssessment}
                      className="bg-alterview-gradient hover:opacity-90 py-6 px-8 text-lg"
                    >
                      Start Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {isAssessmentStarted && !isAssessmentCompleted && (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium">Progress</h2>
                  <span className="text-sm text-gray-600">Question {currentQuestion} of {activeAssessment.totalQuestions}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>AI Interviewer</CardTitle>
                      <CardDescription>Have a conversation with our AI to assess your knowledge</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[500px] overflow-y-auto">
                      <AIInterviewer subject={activeAssessment.subject} />
                      <div className="mt-4 flex justify-end">
                        <Button onClick={handleNextQuestion}>
                          {currentQuestion >= activeAssessment.totalQuestions ? "Complete Assessment" : "Next Question"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Knowledge Map</CardTitle>
                      <CardDescription>Visualizing your understanding</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <KnowledgeMap 
                          nodes={sampleKnowledgeNodes}
                          edges={sampleKnowledgeEdges}
                          height={380}
                          width={300}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          
          {isAssessmentCompleted && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader className="text-center bg-green-50">
                  <div className="mx-auto mb-4 rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl">Assessment Completed!</CardTitle>
                  <CardDescription>Great job on completing the {activeAssessment.title} assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 py-6">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-4">Your Knowledge Map</h3>
                    <div className="h-[400px] mx-auto max-w-lg">
                      <KnowledgeMap 
                        nodes={sampleKnowledgeNodes}
                        edges={sampleKnowledgeEdges}
                        height={380}
                        width={500}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Key Insights</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></div>
                        <p className="text-sm">Strong understanding of <strong>Cell Structure</strong> and <strong>Mitochondria</strong></p>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 mr-2"></div>
                        <p className="text-sm">Moderate grasp of <strong>Protein Synthesis</strong></p>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-2"></div>
                        <p className="text-sm">Knowledge gap in <strong>Cellular Respiration</strong></p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col items-center pt-4">
                    <Mascot message="You've completed the assessment! Your results show strong understanding in several areas, with some concepts that could use more review. Check your detailed knowledge map for more insights." />
                    <div className="mt-6">
                      <Button asChild className="bg-alterview-gradient hover:opacity-90">
                        <a href="/student-assessment">Back to Assessments</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentAssessment;
