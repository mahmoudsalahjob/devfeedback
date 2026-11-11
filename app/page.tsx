import { auth, signIn, signOut } from "@/auth";
import CreateFeedbackForm from "./components/CreateFeedbackForm";
import FeedbackFeed from "./components/FeedbackFeed";
import Link from "next/link";

interface HomePageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const session = await auth();
  const params = await searchParams;
  const currentCategory = params.category || "All";
  const currentSort = params.sort || "newest";

  const categories = ["All", "Feature", "Bug", "Improvement"];

  return (
    <main className="min-h-screen p-6 md:p-12 bg-gray-50 space-y-8">
      {/* Header section with User Info and Auth Buttons */}
      <header className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DevFeedback</h1>
          <p className="text-gray-600 text-sm">Share your ideas and vote on features</p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/roadmap"
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition shadow-sm"
          >
            View Roadmap 🗺️
          </Link>

          {session?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-9 h-9 rounded-full border"
                  />
                )}
                <span className="font-medium text-gray-700 text-sm hidden sm:inline">{session.user.name}</span>
              </div>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-sm font-medium rounded-lg hover:bg-red-100 transition"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition"
              >
                Sign in with GitHub
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Create Form or Login Prompt */}
        <div className="md:col-span-1 space-y-6">
          {session?.user ? (
            <CreateFeedbackForm />
          ) : (
            <div className="p-6 bg-white border border-yellow-200 rounded-2xl shadow-sm text-yellow-800 text-center space-y-3">
              <p className="text-sm">Please log in with GitHub to add new suggestions and vote.</p>
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition"
                >
                  Sign in with GitHub
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Feed, Filter, and Sort */}
        <div className="md:col-span-2 space-y-6">
          {/* Filtering and Sorting Bar (Tasks 1 & 2) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = currentCategory === cat;
                return (
                  <Link
                    key={cat}
                    href={`/?category=${cat}&sort=${currentSort}`}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>

            {/* Sorting Dropdown / Buttons */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Sort:</span>
              <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
                <Link
                  href={`/?category=${currentCategory}&sort=newest`}
                  className={`px-2.5 py-1 rounded-md font-medium transition ${
                    currentSort === "newest" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Newest
                </Link>
                <Link
                  href={`/?category=${currentCategory}&sort=votes`}
                  className={`px-2.5 py-1 rounded-md font-medium transition ${
                    currentSort === "votes" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Top Voted
                </Link>
              </div>
            </div>
          </div>

          {/* Feedback Feed */}
          <FeedbackFeed currentUserId={session?.user?.id} category={currentCategory} sort={currentSort} />
        </div>
      </div>
    </main>
  );
}
