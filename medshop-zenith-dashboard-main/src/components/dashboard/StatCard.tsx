
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  className,
}) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs ${
                  change.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.isPositive ? "+" : "-"}{Math.abs(change.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-medblue bg-opacity-10">
          <Icon className="text-medblue" size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
