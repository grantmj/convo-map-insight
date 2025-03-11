
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import AIInterviewer from "@/components/AIInterviewer";
import KnowledgeMap from "@/components/KnowledgeMap";
import Mascot from "@/components/Mascot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AssessmentInfo {
  title: string;
  subject: string;
  instructor: string;
  description: string;
}

interface ConceptNode {
  id: string;
  label: string;
  value: number;
}

interface ConceptEdge {
  source: string;
  target: string;
  strength: number;
}

const StudentAssessment = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [showWelcome, setShowWelcome] = useState(true);
  const [assessmentInfo, setAssessmentInfo] = useState<AssessmentInfo | null>(null);
  const [progress, setProgress] = useState(0);
  const [knowledgeNodes, setKnowledgeNodes] = useState<ConceptNode[]>([]);
  const [knowledgeEdges, setKnowledgeEdges] = useState<ConceptEdge[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [mascotMessage, setMascotMessage] = useState("I'll guide you through this assessment. Just answer the questions as best you can!");

  // Simulated assessment data based on ID
  useEffect(() => {
    // In a real app, fetch this data from your API
    const assessments: Record<string, AssessmentInfo> = {
      "biology-101": {
        title: "Biology 101",
        subject: "Biology",
        instructor: "Dr. Sarah Johnson",
        description: "Fundamental concepts in biology with focus on cellular structures and functions."
      },
      "computer-science": {
        title: "Computer Science Fundamentals",
        subject: "Computer Science",
        instructor: "Prof. Alan Turing",
        description: "Core computer science concepts including algorithms, data structures, and programming basics."
      },
      "world-history": {
        title: "World History Overview",
        subject: "History",
        instructor: "Dr. Michael Chen",
        description: "Key events and movements in world history from ancient civilizations to modern times."
      },
      // Default assessment if no ID is provided or ID doesn't match
      "default": {
        title: "General Knowledge Assessment",
        subject: "Mixed Topics",
        instructor: "AlterView AI",
        description: "An adaptive assessment covering various subjects to test your general knowledge."
      }
    };

    // Set assessment info based on ID or use default
    setAssessmentInfo(assessments[id || ""] || assessments["default"]);
    
    // Clear any previous assessment data
    setKnowledgeNodes([]);
    setKnowledgeEdges([]);
    setProgress(0);
    setFeedback(null);
    
  }, [id]);

  // Effect to handle the welcome screen timeout
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Handle response evaluation from AI Interviewer
  const handleResponseEvaluated = (evaluation: {
    score: number;
    feedback: string;
    concepts: string[];
  }) => {
    // Update progress
    setProgress(prev => Math.min(100, prev + 15));
    
    // Update mascot message
    const messages = [
      "That's a good response! Keep going.",
      "I'm analyzing your understanding. You're doing well!",
      "Interesting perspective. Let's continue exploring this topic.",
      "I can see your knowledge growing with each answer!"
    ];
    
    setMascotMessage(messages[Math.floor(Math.random() * messages.length)]);
    
    // Update feedback
    setFeedback(evaluation.feedback);
    
    // Display toast notification
    toast({
      title: "Response Evaluated",
      description: "Your knowledge map has been updated.",
    });
    
    // Update knowledge map
    updateKnowledgeMap(evaluation);
  };

  // Simulates updating the knowledge map based on evaluation
  const updateKnowledgeMap = (evaluation: {
    score: number;
    concepts: string[];
  }) => {
    // Add new concepts as nodes
    const newNodes = [...knowledgeNodes];
    
    evaluation.concepts.forEach(concept => {
      // Check if this concept already exists
      const existingNodeIndex = newNodes.findIndex(node => node.label === concept);
      
      if (existingNodeIndex >= 0) {
        // Update existing node value
        newNodes[existingNodeIndex].value = Math.min(100, newNodes[existingNodeIndex].value + (evaluation.score / 2));
      } else {
        // Add new node
        newNodes.push({
          id: `node-${newNodes.length + 1}`,
          label: concept,
          value: evaluation.score
        });
      }
    });
    
    setKnowledgeNodes(newNodes);
    
    // Create edges between concepts
    if (evaluation.concepts.length > 1) {
      const newEdges = [...knowledgeEdges];
      
      // Connect first concept to others
      for (let i = 1; i < evaluation.concepts.length; i++) {
        const sourceId = newNodes.find(node => node.label === evaluation.concepts[0])?.id;
        const targetId = newNodes.find(node => node.label === evaluation.concepts[i])?.id;
        
        if (sourceId && targetId) {
          // Check if edge already exists
          const edgeExists = newEdges.some(
            edge => (edge.source === sourceId && edge.target === targetId) || 
                   (edge.source === targetId && edge.target === sourceId)
          );
          
          if (!edgeExists) {
            newEdges.push({
              source: sourceId,
              target: targetId,
              strength: 0.5 + (Math.random() * 0.5) // Random strength between 0.5-1
            });
          }
        }
      }
      
      setKnowledgeEdges(newEdges);
    }
  };

  // Render the welcome screen
  if (showWelcome) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-alterview-blue to-alterview-purple">
        <div className="text-center text-white animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Welcome to AlterView</h1>
          <p className="text-xl">Preparing your assessment experience...</p>
          <div className="mt-6">
            <Progress value={30} className="w-64 mx-auto bg-white/20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button asChild variant="ghost" className="mr-4">
                <Link to="/">
                  <ArrowLeft className="mr-2" size={18} />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">
                {assessmentInfo?.title || "Assessment"}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Progress:</span>
              <Progress value={progress} className="w-24 md:w-40" />
              <span className="text-sm font-medium">{progress}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Assessment information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Details</CardTitle>
                  <CardDescription>
                    Information about this assessment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                      <p>{assessmentInfo?.subject}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Instructor</h3>
                      <p>{assessmentInfo?.instructor}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Description</h3>
                      <p className="text-sm">{assessmentInfo?.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="relative">
                <Mascot message={mascotMessage} className="mb-4" />
              </div>
              
              {feedback && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-alterview-blue" />
                      Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{feedback}</p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Right column - Interview and Knowledge Map */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="interview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="interview">Interview</TabsTrigger>
                  <TabsTrigger value="knowledge-map">Knowledge Map</TabsTrigger>
                </TabsList>
                <TabsContent value="interview" className="mt-4">
                  <AIInterviewer 
                    topic={assessmentInfo?.subject || "General Knowledge"} 
                    onResponseEvaluated={handleResponseEvaluated}
                  />
                </TabsContent>
                <TabsContent value="knowledge-map" className="mt-4">
                  <Card className="h-[600px]">
                    <CardHeader>
                      <CardTitle>Your Knowledge Map</CardTitle>
                      <CardDescription>
                        A visual representation of your understanding
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[500px]">
                      {knowledgeNodes.length > 0 ? (
                        <KnowledgeMap 
                          nodes={knowledgeNodes}
                          edges={knowledgeEdges}
                          height={450}
                          width={600}
                          className="h-full"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <p className="mb-2">No knowledge mapped yet</p>
                            <p className="text-sm">Answer questions in the interview to build your knowledge map</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentAssessment;
