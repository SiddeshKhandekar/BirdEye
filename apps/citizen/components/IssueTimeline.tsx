"use client";

import React from "react";

interface IssueTimelineProps {
  steps: { status: string; label: string; completed: boolean; timestamp?: string }[];
}

export default function IssueTimeline({ steps }: IssueTimelineProps) {
  return (
    <div className="flex flex-col mt-3">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const nextCompleted = isLast ? false : steps[index + 1].completed;
        return (
          <div key={index} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  step.completed ? "bg-[#55B360]" : "bg-white border-2 border-[#D7DADE]"
                }`}
              />
              {!isLast && (
                <div
                  className={`w-0.5 h-5 ${
                    step.completed && nextCompleted ? "bg-[#55B360]" : "bg-[#D7DADE]"
                  }`}
                />
              )}
            </div>
            <div className="pb-4">
              <div
                className={`text-sm ${
                  step.completed ? "text-[#293B46] font-medium" : "text-[#969696]"
                }`}
              >
                {step.label}
              </div>
              {step.timestamp && (
                <div className="text-xs text-[#7A7A7A] mt-0.5">{step.timestamp}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
