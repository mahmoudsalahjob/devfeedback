import { Comment, Feedback, User, Vote } from "@prisma/client";
import VoteButton from "./VoteButton";
import Link from "next/link";

type FeedbackWithRelations = Feedback & {
  user: User;
  votes: Vote[];
  comments?: Comment[];
};

interface FeedbackCardProps {
  feedback: FeedbackWithRelations;
  currentUserId?: string;
}

export default function FeedbackCard({ feedback, currentUserId }: FeedbackCardProps) {
  const voteCount = feedback.votes.length;
  const commentCount = feedback.comments?.length || 0;
  const hasVoted = currentUserId ? feedback.votes.some((v) => v.userId === currentUserId) : false;

  const categoryColors: Record<string, string> = {
    Feature: "bg-purple-100 text-purple-700 border-purple-200",
    Bug: "bg-red-100 text-red-700 border-red-200",
    Improvement: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const statusColors: Record<string, string> = {
    Planned: "bg-amber-100 text-amber-800 border-amber-200",
    "In-Progress": "bg-blue-100 text-blue-800 border-blue-200",
    Live: "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition">
      {/* Interactive Vote Button */}
      <VoteButton
        feedbackId={feedback.id}
        initialVoteCount={voteCount}
        initialHasVoted={hasVoted}
        isLoggedIn={!!currentUserId}
      />

      {/* Main Content */}
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${categoryColors[feedback.category] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
              {feedback.category}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColors[feedback.status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
              {feedback.status}
            </span>
          </div>

          <Link
            href={`/feedback/${feedback.id}`}
            className="text-xs font-medium text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
          >
            💬 {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
          </Link>
        </div>

        <Link href={`/feedback/${feedback.id}`} className="block group">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{feedback.title}</h3>
        </Link>
        
        <p className="text-gray-600 text-sm whitespace-pre-wrap">{feedback.description}</p>

        {/* Footer info: Author & Date */}
        <div className="flex items-center justify-between pt-2 text-xs text-gray-500 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {feedback.user.image ? (
              <img src={feedback.user.image} alt={feedback.user.name || "User"} className="w-5 h-5 rounded-full" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white text-[10px]">
                {feedback.user.name?.[0] || "U"}
              </div>
            )}
            <span>{feedback.user.name || "Anonymous"}</span>
          </div>
          <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
