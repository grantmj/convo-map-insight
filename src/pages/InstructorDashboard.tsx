
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import KnowledgeMap from "@/components/KnowledgeMap";
import AssessmentCard from "@/components/AssessmentCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, AreaChart, Doughnut } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data for instructor dashboard
const sampleStudents = [
  { id: "student-1", name: "Alex Johnson", assessmentCount: 5, avgScore: 87 },
  { id: "student-2", name: "Mia Williams", assessmentCount: 4, avgScore: 74 },
  { id: "student-3", name: "Daniel Brown", assessmentCount: 6, avgScore: 91 },
  { id: "student-4", name: "Sophia Davis", assessmentCount: 3, avgScore: 82 },
  { id: "student-5", name: "James Wilson", assessmentCount: 5, avgScore: 68 },
];

const sampleAssessments = [
  {
    id: "biology-101",
    title: "Biology 101",
    description: "Cellular structures and functions",
    duration: "30-45 minutes",
    subject: "Biology",
    instructor: "Dr. Sarah Johnson",
    completed: true,
    avgScore: 84,
    studentCount: 28
  },
  {
    id: "computer-science",
    title: "Computer Science Fundamentals",
    description: "Algorithms and data structures",
    duration: "40-50 minutes",
    subject: "Computer Science",
    instructor: "Prof. Alan Turing",
    completed: true,
    avgScore: 76,
    studentCount: 32
  },
  {
    id: "world-history",
    title: "World History Overview",
    description: "Ancient to modern civilizations",
    duration: "35-45 minutes",
    subject: "History",
    instructor: "Dr. Michael Chen",
    completed: true,
    avgScore: 81,
    studentCount: 24
  },
  {
    id: "physics-intro",
    title: "Introduction to Physics",
    description: "Basic concepts in physics",
    duration: "45-60 minutes",
    subject: "Physics",
    instructor: "Dr. Richard Feynman",
    completed: false,
    studentCount: 0
  },
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

const InstructorDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [view, setView] = useState("overview");

  // Chart data for assessment performance
  const chartData = {
    labels: ["Biology 101", "Computer Science", "World History", "Chemistry Basics", "Mathematics 101"],
    datasets: [
      {
        label: "Average Score",
        data: [84, 76, 81, 79, 88],
        backgroundColor: "rgba(155, 135, 245, 0.6)",
        borderColor: "#9b87f5",
        borderWidth: 2,
      }
    ]
  };

  // Chart data for monthly assessments
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Assessments Completed",
        data: [12, 19, 15, 21, 28, 24],
        backgroundColor: "rgba(30, 174, 219, 0.2)",
        borderColor: "#1EAEDB",
        tension: 0.3,
        fill: true,
      }
    ]
  };

  // Chart data for concept distribution
  const conceptData = {
    labels: ["Biology", "Computer Science", "History", "Physics", "Mathematics"],
    datasets: [
      {
        data: [28, 32, 24, 18, 22],
        backgroundColor: [
          "#1EAEDB",
          "#9b87f5",
          "#6E59A5",
          "#E5DEFF",
          "#1A1F2C",
        ],
        borderWidth: 1,
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
              <p className="text-gray-600">Monitor student progress and assessment performance</p>
            </div>
            
            <div className="flex space-x-4">
              <Select defaultValue="all" onValueChange={(val) => setSelectedStudent(val !== "all" ? val : null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  {sampleStudents.map(student => (
                    <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button className="bg-alterview-gradient hover:opacity-90">
                Create Assessment
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant={view === "overview" ? "default" : "outline"}
              className={view === "overview" ? "bg-alterview-gradient" : ""}
              onClick={() => setView("overview")}
            >
              Overview
            </Button>
            <Button
              variant={view === "assessments" ? "default" : "outline"}
              className={view === "assessments" ? "bg-alterview-gradient" : ""}
              onClick={() => setView("assessments")}
            >
              Assessments
            </Button>
            <Button
              variant={view === "students" ? "default" : "outline"}
              className={view === "students" ? "bg-alterview-gradient" : ""}
              onClick={() => setView("students")}
            >
              Students
            </Button>
            <Button
              variant={view === "knowledge" ? "default" : "outline"}
              className={view === "knowledge" ? "bg-alterview-gradient" : ""}
              onClick={() => setView("knowledge")}
            >
              Knowledge Maps
            </Button>
          </div>
          
          {view === "overview" && (
            <>
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">24</div>
                    <p className="text-xs text-green-600">↑ 12% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Active Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">156</div>
                    <p className="text-xs text-green-600">↑ 8% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Avg. Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">87%</div>
                    <p className="text-xs text-green-600">↑ 3% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Avg. Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">78.4</div>
                    <p className="text-xs text-green-600">↑ 2.1 from last month</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Assessment Performance</CardTitle>
                    <CardDescription>Average scores by assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart data={chartData} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Distribution</CardTitle>
                    <CardDescription>By number of students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <Doughnut data={conceptData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Activity</CardTitle>
                  <CardDescription>Number of assessments taken over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <AreaChart data={monthlyData} />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {view === "assessments" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Assessments</h2>
                <div className="flex space-x-4">
                  <Input placeholder="Search assessments..." className="w-60" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleAssessments.map(assessment => (
                  <AssessmentCard
                    key={assessment.id}
                    id={assessment.id}
                    title={assessment.title}
                    description={assessment.description}
                    duration={assessment.duration}
                    subject={assessment.subject}
                    instructor={assessment.instructor}
                    completed={assessment.completed}
                    score={assessment.avgScore}
                  />
                ))}
              </div>
            </>
          )}
          
          {view === "students" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Student Performance</h2>
                <div className="flex space-x-4">
                  <Input placeholder="Search students..." className="w-60" />
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                  <CardDescription>Performance metrics for all enrolled students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                      <thead className="text-xs uppercase bg-gray-100">
                        <tr>
                          <th className="px-6 py-3">Student Name</th>
                          <th className="px-6 py-3">Assessments Completed</th>
                          <th className="px-6 py-3">Average Score</th>
                          <th className="px-6 py-3">Performance Status</th>
                          <th className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleStudents.map(student => (
                          <tr key={student.id} className="border-b">
                            <td className="px-6 py-4 font-medium">{student.name}</td>
                            <td className="px-6 py-4">{student.assessmentCount}</td>
                            <td className="px-6 py-4">{student.avgScore}%</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                student.avgScore >= 85 ? "bg-green-100 text-green-800" :
                                student.avgScore >= 70 ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {student.avgScore >= 85 ? "Excellent" :
                                 student.avgScore >= 70 ? "Good" :
                                 "Needs Improvement"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="link" className="text-alterview-blue p-0">View Details</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
          
          {view === "knowledge" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Knowledge Maps</h2>
                <div className="flex space-x-4">
                  <Select defaultValue="biology-101">
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select Assessment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biology-101">Biology 101</SelectItem>
                      <SelectItem value="computer-science">Computer Science Fundamentals</SelectItem>
                      <SelectItem value="world-history">World History Overview</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Knowledge Map Visualization</CardTitle>
                    <CardDescription>Concept relationships and mastery levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[500px]">
                      <KnowledgeMap 
                        nodes={sampleKnowledgeNodes}
                        edges={sampleKnowledgeEdges}
                        height={480}
                        width={700}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Concept Mastery</CardTitle>
                      <CardDescription>Student understanding by concept</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sampleKnowledgeNodes.map(node => (
                          <div key={node.id}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{node.label}</span>
                              <span className="text-sm font-medium">{node.value}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-alterview-gradient rounded-full h-2" 
                                style={{ width: `${node.value}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                          <p className="text-sm">Strong connection between <strong>Cell Structure</strong> and <strong>Cell Membrane</strong></p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
