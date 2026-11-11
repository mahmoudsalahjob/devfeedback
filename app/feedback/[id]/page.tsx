import { auth } from "@/auth";
import { db } from "@/lib/db";
import VoteButton from "@/app/components/VoteButton";
import CommentSection from "@/app/components/CommentSection";
import Link from "next/link";
import { notFound } from "next/navigation";

interface FeedbackDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function FeedbackDetailPage({ params }: FeedbackDetailPageProps) {
  const { id } = await params;
  const session = await auth();
  const currentUserId = session?.user?.id;

  const feedback = await db.feedback.findUnique({
    where: { id },
    include: {
      user: true,
      votes: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!feedback) {
    notFound();
  }

  const voteCount = feedback.votes.length;
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
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation */}
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition flex items-center gap-1"
          >
            ← Back to Feedback Board
          </Link>
        </div>

        {/* Main Feedback Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <VoteButton
              feedbackId={feedback.id}
              initialVoteCount={voteCount}
              initialHasVoted={hasVoted}
              isLoggedIn={!!currentUserId}
            />

            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${categoryColors[feedback.category] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                  {feedback.category}
                </span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColors[feedback.status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                  {feedback.status}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900">{feedback.title}</h1>

              {/* Author & Date */}
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                {feedback.user.image ? (
                  <img src={feedback.user.image} alt={feedback.user.name || "User"} className="w-6 h-6 rounded-full border" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white text-xs">
                    {feedback.user.name?.[0] || "U"}
                  </div>
                )}
                <span className="font-semibold text-gray-700">{feedback.user.name || "Anonymous"}</span>
                <span>•</span>
                <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="text-gray-700 text-base whitespace-pre-wrap border-t border-gray-100 pt-4 leading-relaxed">
            {feedback.description}
          </div>

          {/* Comment Section */}
          <CommentSection
            feedbackId={feedback.id}
            comments={feedback.comments}
            isLoggedIn={!!currentUserId}
          />
        </div>
      </div>
    </main>
  );
}
