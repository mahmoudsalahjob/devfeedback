import { auth } from "@/auth";
import { db } from "@/lib/db";
import VoteButton from "@/app/components/VoteButton";
import Link from "next/link";

export default async function RoadmapPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const feedbacks = await db.feedback.findMany({
    include: {
      user: true,
      votes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const planned = feedbacks.filter((f) => f.status === "Planned");
  const inProgress = feedbacks.filter((f) => f.status === "In-Progress");
  const live = feedbacks.filter((f) => f.status === "Live" || f.status === "Completed");

  const columns = [
    { title: "Planned", items: planned, badge: "bg-amber-100 text-amber-800 border-amber-200", desc: "Scheduled for future development" },
    { title: "In-Progress", items: inProgress, badge: "bg-blue-100 text-blue-800 border-blue-200", desc: "Currently being built" },
    { title: "Live", items: live, badge: "bg-emerald-100 text-emerald-800 border-emerald-200", desc: "Completed and released" },
  ];

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Roadmap</h1>
          <p className="text-gray-600 text-sm">Explore what we are planning, building, and have recently shipped.</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition shadow-sm"
        >
          ← Back to Feedback Board
        </Link>
      </header>

      {/* Kanban Board */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col.title} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-900">{col.title}</h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${col.badge}`}>
                  {col.items.length}
                </span>
              </div>
              <p className="text-xs text-gray-500">{col.desc}</p>
            </div>

            <div className="space-y-4 flex-1">
              {col.items.length === 0 ? (
                <div className="h-32 flex items-center justify-center border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs text-center p-4">
                  No items in this column yet.
                </div>
              ) : (
                col.items.map((item) => {
                  const voteCount = item.votes.length;
                  const hasVoted = currentUserId ? item.votes.some((v) => v.userId === currentUserId) : false;

                  return (
                    <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3 hover:shadow-sm transition">
                      <div className="flex items-start gap-3">
                        <VoteButton
                          feedbackId={item.id}
                          initialVoteCount={voteCount}
                          initialHasVoted={hasVoted}
                          isLoggedIn={!!currentUserId}
                        />
                        <div className="space-y-1 flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                            {item.category}
                          </span>
                          <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
