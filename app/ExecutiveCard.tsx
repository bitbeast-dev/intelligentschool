import { ReactNode } from 'react';

interface ExecutiveCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: ReactNode;
  color: string;
  description?: string;
  className?: string;
}

export default function ExecutiveCard({
  title,
  value,
  change,
  trend,
  icon,
  color,
  description,
  className = ''
}: ExecutiveCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          {icon}
        </div>
        {change && (
          <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            trend === 'up' ? 'bg-green-100 text-green-800' :
            trend === 'down' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {change}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 font-medium mb-2 text-sm sm:text-base">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{value}</p>
      {description && (
        <p className="text-xs sm:text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}