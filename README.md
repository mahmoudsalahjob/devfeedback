1. DevFeedback & Roadmap Board (SaaS)

    Complexity: Intermediate

    Concept: A micro-SaaS platform where product teams create public feedback boards for users to submit feature requests and vote on roadmaps.

How the Tech Stack Is Used:

    Auth.js: User login via GitHub or Google for feature submitters, plus role-based access for board admins.

    PostgreSQL & Prisma: Relational models for Users, Boards, Posts, Upvotes, and Comments. Prisma relations handle Upvote uniqueness (userId + postId).

    Next.js Server Actions: Handle fast upvoting and instant comment submissions with optimistic UI updates.

    Tailwind CSS: Responsive Kanban layout (Planned, In Progress, Completed columns).

---------------------
GitHub OAuth Login/Logout: Users can click a button, be redirected to GitHub to grant permissions, and then return to the main page already logged in—with their name and profile picture displayed. (Completed)


1. Submitting New Ideas or Suggestions (Create Feedback) (In Progress)

Concept: A simple form that allows users to enter a title and a detailed description for their suggestion, and select a category (e.g., "Feature," "Bug," or "Improvement"). 

Value: Gives users a voice to easily share their needs.

2. Viewing the List of Suggestions (Feedback Board / Feed)

Concept: A main page that displays all ideas submitted by other users in the form of "cards." 

Filtering and Sorting: Options to sort ideas by "Most Upvoted" or "Newest," or to filter them by category (e.g., viewing only "Bugs").

3. Upvoting System

Concept: Each idea card includes an upvote button (a "+1" indicator). 

Controls: Users can click the button once to support an idea (they cannot vote more than once for the same idea).

4. Public Roadmap View

Concept: A separate tab or page, designed as a Kanban board, that displays the status of ideas across three columns:

Planned: Ideas approved by the company that are scheduled for development. 

In-Progress: Features currently under development. 

Live / Completed: Features that have been completed and released to the public. 5. Comments and Discussions

Concept: The ability to open any idea and comment on it, facilitating discussion among users or allowing the team to provide responses.