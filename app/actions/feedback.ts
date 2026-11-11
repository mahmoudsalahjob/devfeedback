"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export async function createFeedback(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in first to add feedback.");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = (formData.get("category") as string) || "Feature";

  if (!title || !description) {
    throw new Error("Please fill in all required fields.");
  }

  await db.feedback.create({
    data: {
      title,
      description,
      category,
      userId: session.user.id,
    },
  });

  revalidatePath("/");
}

export async function toggleVote(feedbackId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to vote.");
  }

  const userId = session.user.id;

  const existingVote = await db.vote.findUnique({
    where: {
      userId_feedbackId: {
        userId,
        feedbackId,
      },
    },
  });

  if (existingVote) {
    await db.vote.delete({
      where: {
        id: existingVote.id,
      },
    });
  } else {
    await db.vote.create({
      data: {
        userId,
        feedbackId,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/roadmap");
  revalidatePath(`/feedback/${feedbackId}`);
}

export async function addComment(feedbackId: string, formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to comment.");
  }

  const content = formData.get("content") as string;

  if (!content || !content.trim()) {
    throw new Error("Comment content cannot be empty.");
  }

  await db.comment.create({
    data: {
      content: content.trim(),
      userId: session.user.id,
      feedbackId,
    },
  });

  revalidatePath(`/feedback/${feedbackId}`);
  revalidatePath("/");
}
