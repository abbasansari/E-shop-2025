"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableDetailsProps {
  title: string;
  content: string;
  className?: string;
  defaultExpanded?: boolean;
}

const ExpandableDetails = ({
  title,
  content,
  className,
  defaultExpanded = false
}: ExpandableDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <div className={cn('border-b', className)}>
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="text-base font-medium">{title}</span>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isExpanded ? 'max-h-96 pb-4' : 'max-h-0'
        )}
      >
        <div className="text-sm text-muted-foreground whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
};

export default ExpandableDetails;