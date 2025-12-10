import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/database/commentSchema";

export async function POST(request: NextRequest) {
  try {
    const { slug, user, comment } = await request.json();

    if (!slug || !user || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Add new comment using the Comment schema
    const savedComment = await addComment({
      user: user,
      comment: comment,
      blogSlug: slug,
    });

    if (!savedComment) {
      return NextResponse.json(
        { error: "Failed to save comment" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Comment added successfully",
        comment: savedComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
