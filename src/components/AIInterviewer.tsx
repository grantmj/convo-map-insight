import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import Mascot from "./Mascot";

interface Message {
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface AIInterviewerProps {
  className?: string;
  topic?: string;
  subject?: string;
  onResponseEvaluated?: (evaluation: {
    score: number;
    feedback: string;
    concepts: string[];
  }) => void;
}

const AIInterviewer: React.FC<AIInterviewerProps> = ({
  className,
  topic,
  subject,
  onResponseEvaluated
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const assessmentTopic = topic || subject;

  useEffect(() => {
    const timer = setTimeout(() => {
      const initialMessage: Message = {
        role: 'ai',
        content: `Hello! I'm your AI interviewer for today's assessment on ${assessmentTopic}. Let's start with a simple question: Could you explain what ${assessmentTopic} means to you?`,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [assessmentTopic]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    setTimeout(() => {
      simulateAIResponse(userMessage.content);
    }, 2000);
  };

  const simulateAIResponse = (userMessage: string) => {
    const responses = [
      `That's an interesting perspective on ${assessmentTopic}. Could you elaborate on how it connects to real-world applications?`,
      `Great explanation! Now, let's dig deeper. What do you think are the key challenges in understanding ${assessmentTopic}?`,
      `I see your point. Let's explore a related concept: how does ${assessmentTopic} relate to other areas you've studied?`,
      `That makes sense. Let's test your knowledge with a more advanced question: What are the theoretical foundations of ${assessmentTopic}?`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const aiMessage: Message = {
      role: 'ai',
      content: randomResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsThinking(false);
    
    if (onResponseEvaluated) {
      onResponseEvaluated({
        score: Math.floor(Math.random() * 100),
        feedback: `Your explanation of ${assessmentTopic} shows good understanding, though there are some areas that could be expanded.`,
        concepts: [`${assessmentTopic} fundamentals`, 'theoretical frameworks', 'practical applications']
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (isRecording) {
      setTimeout(() => {
        setInputValue(`This is a simulated voice response about ${assessmentTopic}.`);
      }, 500);
    }
  };

  return (
    <div className={cn("flex flex-col h-[600px] rounded-xl shadow-md border border-gray-200 bg-white", className)}>
      <div className="p-4 border-b border-gray-200 bg-alterview-gradient rounded-t-xl">
        <h2 className="text-white font-semibold text-lg">Interview Assessment: {assessmentTopic}</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={cn(
            "flex",
            message.role === 'user' ? "justify-end" : "justify-start"
          )}>
            {message.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-alterview-blue flex items-center justify-center text-white font-bold mr-2">
                AI
              </div>
            )}
            
            <div className={cn(
              "max-w-[70%] rounded-lg p-3 shadow-sm",
              message.role === 'user' 
                ? "bg-alterview-lightPurple text-gray-800"
                : "bg-white text-gray-800 border border-gray-200"
            )}>
              <p className="text-sm">{message.content}</p>
              <span className="text-xs text-gray-500 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-alterview-purple flex items-center justify-center text-white font-bold ml-2">
                U
              </div>
            )}
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-alterview-blue flex items-center justify-center text-white font-bold mr-2">
              AI
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-alterview-blue animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-alterview-blue animate-pulse delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-alterview-blue animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your response..."
            className="flex-grow resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button
              size="icon"
              variant={isRecording ? "destructive" : "secondary"}
              onClick={toggleRecording}
              className="rounded-full h-10 w-10"
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
            <Button
              size="icon"
              onClick={handleSendMessage}
              className="rounded-full h-10 w-10 bg-alterview-gradient hover:opacity-90"
              disabled={inputValue.trim() === ''}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewer;
