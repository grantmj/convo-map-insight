
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Book, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  subject: string;
  instructor: string;
  className?: string;
  completed?: boolean;
  score?: number;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  id,
  title,
  description,
  duration,
  subject,
  instructor,
  className,
  completed = false,
  score
}) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          {completed && (
            <span className={cn(
              "text-sm px-3 py-1 rounded-full",
              score && score >= 80 ? "bg-green-100 text-green-800" :
              score && score >= 60 ? "bg-yellow-100 text-yellow-800" :
              "bg-red-100 text-red-800"
            )}>
              Score: {score}%
            </span>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-alterview-blue" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Book className="h-4 w-4 mr-2 text-alterview-purple" />
            <span>{subject}</span>
          </div>
          <div className="flex items-center col-span-2">
            <User className="h-4 w-4 mr-2 text-alterview-blue" />
            <span>{instructor}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant={completed ? "outline" : "default"} className={!completed ? "bg-alterview-gradient w-full" : "w-full"}>
          <Link to={`/student-assessment/${id}`}>
            <span>{completed ? "Review Assessment" : "Start Assessment"}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard;
