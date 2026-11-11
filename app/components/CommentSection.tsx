"use client";

import { addComment } from "@/app/actions/feedback";
import { Comment, User } from "@prisma/client";
import { useState, useTransition } from "react";

type CommentWithUser = Comment & {
  user: User;
};

interface CommentSectionProps {
  feedbackId: string;
  comments: CommentWithUser[];
  isLoggedIn: boolean;
}

export default function CommentSection({ feedbackId, comments, isLoggedIn }: CommentSectionProps) {
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please sign in with GitHub to comment.");
      return;
    }
    if (!content.trim()) return;

    const formData = new FormData();
    formData.append("content", content);

    startTransition(async () => {
      try {
        await addComment(feedbackId, formData);
        setContent("");
      } catch (error: any) {
        alert(error.message || "Failed to add comment");
      }
    });
  };

  return (
    <div className="space-y-6 pt-6 border-t border-gray-200">
      <h3 className="font-bold text-xl text-gray-900">Discussion ({comments.length})</h3>

      {/* Comment Form */}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={3}
            placeholder="Write a comment or share your thoughts..."
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending || !content.trim()}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isPending ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm text-gray-600">
          Please sign in with GitHub to join the discussion.
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  {comment.user.image ? (
                    <img src={comment.user.image} alt={comment.user.name || "User"} className="w-5 h-5 rounded-full" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white text-[10px]">
                      {comment.user.name?.[0] || "U"}
                    </div>
                  )}
                  <span className="font-semibold text-gray-800">{comment.user.name || "Anonymous"}</span>
                </div>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
