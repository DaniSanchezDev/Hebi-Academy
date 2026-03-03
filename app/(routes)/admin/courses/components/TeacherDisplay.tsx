'use client';

import { User as UserIcon } from 'lucide-react';
import Image from 'next/image';

interface TeacherDisplayProps {
  userId: string; 
  teacherName?: string;
  teacherImageUrl?: string;
}

export default function TeacherDisplay({ userId, teacherName, teacherImageUrl }: TeacherDisplayProps) {
  const displayName = teacherName || userId;
  
  const formattedId = (name: string) => {
    if (name === userId && userId.length > 10) { 
        return `${userId.slice(0, 4)}...${userId.slice(-4)}`;
    }
    return name;
  };

  return (
    <div className="flex items-center gap-2">
      {teacherImageUrl ? (
        <Image 
          src={teacherImageUrl} 
          alt={displayName} 
          width={24} 
          height={24} 
          className="rounded-full object-cover h-6 w-6" 
        />
      ) : (
        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700">
          <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </span>
      )}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {formattedId(displayName)}
      </span>
    </div>
  );
}
