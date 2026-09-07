import { Issue } from '@/lib/mock-data';
import { MapPin, Camera, ChevronRight, Check } from 'lucide-react';

interface IssuePreviewCardProps {
  issue: Issue;
  onViewDetails: (issue: Issue) => void;
  onClose: () => void;
}

export function IssuePreviewCard({ issue, onViewDetails, onClose }: IssuePreviewCardProps) {
  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-auto md:top-24 md:left-4 w-[calc(100vw-32px)] max-w-[320px] rounded-lg bg-white border border-[#D7DADE] shadow-[0_8px_30px_rgba(41,59,70,0.08)] p-3 flex gap-3 cursor-pointer z-50 hover:border-[#77BE86] transition-colors"
      onClick={() => onViewDetails(issue)}
    >
      <div className="shrink-0 w-[80px] h-[72px] rounded-md overflow-hidden bg-gray-100 flex items-center justify-center relative">
        {issue.images && issue.images.length > 0 ? (
          <img
            src={issue.images[0]}
            alt={issue.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Camera className="text-[#969696]" size={24} />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="text-sm font-semibold text-[#293B46] truncate">{issue.title}</h3>
          <div className="flex items-center text-xs text-[#7A7A7A] mt-1">
            <MapPin size={12} className="mr-1 shrink-0" />
            <span className="truncate">{issue.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2 text-xs text-[#7A7A7A]">
            <span>{issue.distance}</span>
            <span>•</span>
            <span>{issue.timeAgo}</span>
          </div>
          {issue.status === 'verified' && (
            <div className="flex items-center gap-1 text-xs bg-[#EAF7ED] text-[#328B46] rounded-full px-2 py-0.5 font-medium">
              <Check size={10} strokeWidth={3} />
              Verified
            </div>
          )}
        </div>
      </div>
      
      <div className="shrink-0 flex items-center justify-center pl-1">
        <ChevronRight size={16} className="text-[#969696]" />
      </div>
    </div>
  );
}
