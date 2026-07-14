import fs from "fs";
import path from "path";

const staticDir = path.resolve(".vercel/output/static");

if (fs.existsSync(staticDir)) {
  const files = fs.readdirSync(staticDir);
  files.forEach((file) => {
    if (file.endsWith(".php") || file === ".htaccess") {
      const filePath = path.join(staticDir, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`[clean-vercel] Removed static file: ${file}`);
      } catch (err) {
        console.error(`[clean-vercel] Failed to remove ${file}:`, err);
      }
    }
  });
} else {
  console.log("[clean-vercel] .vercel/output/static directory does not exist, skipping cleanup.");
}
