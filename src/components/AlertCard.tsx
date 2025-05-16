// src/components/ui/AlertCard.tsx

import { cn } from '@/utils/class-name.utils'; 
import { Info, AlertTriangle, XCircle } from 'lucide-react';

interface AlertCardProps {
  type?: 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

const typeStyles = {
  info: {
    icon: <Info className="w-5 h-5 text-blue-600" />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export default function AlertCard({
  type = 'info',
  title,
  message,
}: AlertCardProps) {
  const { icon, bg, border } = typeStyles[type];

  return (
    <div className={cn('w-full p-4 border rounded-xl flex gap-3', bg, border)}>
      {icon}
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </div>
  );
}
