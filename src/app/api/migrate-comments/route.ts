import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Update all blog documents that don't have a comments field
    const result = await Blog.updateMany(
      { 
        $or: [
          { comments: { $exists: false } },
          { comments: null }
        ]
      },
      { 
        $set: { comments: [] } 
      }
    );

    console.log(`Updated ${result.modifiedCount} blog documents with empty comments arrays`);

    // Verify all blogs now have the comments field
    const allBlogs = await Blog.find({}).lean();
    const blogStatus = allBlogs.map(blog => ({
      title: blog.title,
      slug: blog.slug,
      hasComments: !!blog.comments,
      commentCount: blog.comments ? blog.comments.length : 0
    }));

    return NextResponse.json({
      message: "Migration completed successfully",
      updatedCount: result.modifiedCount,
      blogStatus: blogStatus
    });

  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { error: "Migration failed", details: error },
      { status: 500 }
    );
  }
}