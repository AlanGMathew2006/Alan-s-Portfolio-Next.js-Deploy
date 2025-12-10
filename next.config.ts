import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses this project as the workspace root
  // This also makes Next load the .env in this folder.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
