import mongoose, { Schema } from "mongoose";
import connectDB from "./db";

export type Project = {
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
};

// mongoose schema
const projectSchema = new Schema<Project>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  technologies: { type: [String], required: true },
  githubUrl: { type: String, required: false },
  liveUrl: { type: String, required: false },
});

//defining the collection and model
const Project =
  mongoose.models["projects"] || mongoose.model("projects", projectSchema);

export async function getProjects(): Promise<Project[] | null> {
  await connectDB();

  try {
    const projects = await Project.find().lean();
    return projects as unknown as Project[];
  } catch (err) {
    return null;
  }
}

export default Project;
