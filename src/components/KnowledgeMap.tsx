
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  label: string;
  value: number; // 0-100 for knowledge level
  x?: number;
  y?: number;
}

interface Edge {
  source: string;
  target: string;
  strength: number; // 0-1
}

interface KnowledgeMapProps {
  className?: string;
  nodes: Node[];
  edges: Edge[];
  width?: number;
  height?: number;
}

const KnowledgeMap: React.FC<KnowledgeMapProps> = ({
  className,
  nodes,
  edges,
  width = 600,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize node positions if not set
  useEffect(() => {
    nodes.forEach(node => {
      if (node.x === undefined || node.y === undefined) {
        node.x = Math.random() * width;
        node.y = Math.random() * height;
      }
    });
  }, [nodes, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw edges
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);

      if (sourceNode?.x && sourceNode?.y && targetNode?.x && targetNode?.y) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        
        // Set line style based on strength
        const opacity = 0.2 + (edge.strength * 0.8);
        ctx.strokeStyle = `rgba(155, 135, 245, ${opacity})`;
        ctx.lineWidth = 1 + (edge.strength * 2);
        
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      if (node.x !== undefined && node.y !== undefined) {
        // Map knowledge value to node size (10-30)
        const nodeSize = 10 + ((node.value / 100) * 20);
        
        // Create gradient for node
        const gradient = ctx.createLinearGradient(
          node.x - nodeSize/2, 
          node.y - nodeSize/2, 
          node.x + nodeSize/2, 
          node.y + nodeSize/2
        );
        
        // Gradient colors based on value (blue to purple)
        if (node.value < 50) {
          gradient.addColorStop(0, '#1EAEDB');
          gradient.addColorStop(1, '#6E59A5');
        } else {
          gradient.addColorStop(0, '#6E59A5');
          gradient.addColorStop(1, '#9b87f5');
        }
        
        // Draw node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw node label
        ctx.font = '12px Arial';
        ctx.fillStyle = '#1A1F2C';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y + nodeSize + 15);
      }
    });
  }, [nodes, edges, width, height]);

  return (
    <div className={cn("rounded-lg overflow-hidden bg-white", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={width}
        height={height}
      />
    </div>
  );
};

export default KnowledgeMap;
