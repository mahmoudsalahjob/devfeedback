import { db } from "@/lib/db";
import FeedbackCard from "./FeedbackCard";

interface FeedbackFeedProps {
  currentUserId?: string;
  category?: string;
  sort?: string;
}

export default async function FeedbackFeed({ currentUserId, category, sort }: FeedbackFeedProps) {
  // Build query options
  const whereClause = category && category !== "All" ? { category } : {};
  
  const orderByClause = sort === "oldest" 
    ? { createdAt: "asc" as const }
    : { createdAt: "desc" as const };

  const feedbacks = await db.feedback.findMany({
    where: whereClause,
    include: {
      user: true,
      votes: true,
      comments: true,
    },
    orderBy: orderByClause,
  });

  // If sort is "votes", sort in memory by vote count
  if (sort === "votes") {
    feedbacks.sort((a, b) => b.votes.length - a.votes.length);
  }

  if (feedbacks.length === 0) {
    return (
      <div className="p-12 text-center bg-white border border-gray-200 rounded-2xl text-gray-500">
        No feedback suggestions found. Be the first to add one!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback} currentUserId={currentUserId} />
      ))}
    </div>
  );
}
