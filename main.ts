import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const postPath = join(repoRoot, "POST.json");

// Read and parse first so a malformed POST.json fails loudly instead of
// silently copying a broken entry file into the output directory.
const post = JSON.parse(readFileSync(postPath, "utf8"));
if (typeof post !== "object" || post === null || typeof post.url !== "string") {
  throw new Error("POST.json must be an object with a string url field");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postPath, join(outDir, "POST.json"));
console.log(`Copied POST.json for ${post.url} to ${outDir}`);
