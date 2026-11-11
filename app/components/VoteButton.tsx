"use client";

import { toggleVote } from "@/app/actions/feedback";
import { useState, useTransition } from "react";

interface VoteButtonProps {
  feedbackId: string;
  initialVoteCount: number;
  initialHasVoted: boolean;
  isLoggedIn: boolean;
}

export default function VoteButton({
  feedbackId,
  initialVoteCount,
  initialHasVoted,
  isLoggedIn,
}: VoteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);

  const handleVote = () => {
    if (!isLoggedIn) {
      alert("Please sign in with GitHub to vote.");
      return;
    }

    // Optimistic update
    const newHasVoted = !hasVoted;
    setHasVoted(newHasVoted);
    setVoteCount((prev) => (newHasVoted ? prev + 1 : prev - 1));

    startTransition(async () => {
      try {
        await toggleVote(feedbackId);
      } catch (error: any) {
        // Revert on error
        setHasVoted(hasVoted);
        setVoteCount(initialVoteCount);
        alert(error.message || "Failed to vote");
      }
    });
  };

  return (
    <button
      onClick={handleVote}
      disabled={isPending}
      className={`flex flex-col items-center justify-center border rounded-xl px-3 py-2 min-w-16 transition ${
        hasVoted
          ? "bg-blue-600 border-blue-600 text-white shadow-sm"
          : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100"
      } ${isPending ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className="text-lg font-bold">{voteCount}</span>
      <span className={`text-[10px] uppercase font-semibold ${hasVoted ? "text-blue-100" : "text-gray-500"}`}>
        {hasVoted ? "Voted" : "Votes"}
      </span>
    </button>
  );
}
