
import React from "react";
import { 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ChartContainer } from "./chart";

// Bar Chart Component
export const BarChart = ({ data }: { data: any }) => {
  return (
    <ChartContainer config={{}} className="w-full h-full">
      <RechartsBarChart data={data.labels.map((label: string, index: number) => ({
        name: label,
        value: data.datasets[0].data[index]
      }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar 
          dataKey="value" 
          name={data.datasets[0].label} 
          fill={data.datasets[0].backgroundColor} 
          stroke={data.datasets[0].borderColor}
          strokeWidth={data.datasets[0].borderWidth || 1}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
};

// Area Chart Component
export const AreaChart = ({ data }: { data: any }) => {
  return (
    <ChartContainer config={{}} className="w-full h-full">
      <RechartsAreaChart data={data.labels.map((label: string, index: number) => ({
        name: label,
        value: data.datasets[0].data[index]
      }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="value" 
          name={data.datasets[0].label}
          fill={data.datasets[0].backgroundColor} 
          stroke={data.datasets[0].borderColor}
          fillOpacity={0.8}
        />
      </RechartsAreaChart>
    </ChartContainer>
  );
};

// Doughnut Chart Component
export const Doughnut = ({ data }: { data: any }) => {
  const COLORS = data.datasets[0].backgroundColor;
  
  return (
    <ChartContainer config={{}} className="w-full h-full">
      <PieChart>
        <Pie
          data={data.labels.map((label: string, index: number) => ({
            name: label,
            value: data.datasets[0].data[index]
          }))}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          label={({name, value}) => `${name}: ${value}`}
        >
          {data.labels.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
};
