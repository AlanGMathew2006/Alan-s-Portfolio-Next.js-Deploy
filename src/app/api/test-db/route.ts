import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";

export async function GET() {
  try {
    // Test the database connection
    const connection = await connectDB();

    if (connection) {
      return NextResponse.json(
        {
          message: "Database connected successfully!",
          status: "connected",
          database: connection.connection.name,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Database connection failed",
          status: "disconnected",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        message: "Database connection error",
        error: error instanceof Error ? error.message : "Unknown error",
        status: "error",
      },
      { status: 500 }
    );
  }
}
