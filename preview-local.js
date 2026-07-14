import http from "http";
import fs from "fs";
import path from "path";

const PORT = 8080;
const DIST_DIR = path.resolve("dist-spa");

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
    // Parse URL and strip query strings (like ?v=123)
    const urlPath = req.url.split("?")[0];
    
    // Resolve local path
    let filePath = path.join(DIST_DIR, urlPath === "/" ? "index.html" : urlPath);
    
    // Ensure the request does not escape DIST_DIR
    if (!filePath.startsWith(DIST_DIR)) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
    }

    // Check if path is a directory (e.g. results/ -> results/index.html)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
    }

    // Serve file if it exists, otherwise fall back to index.html for SPA client routing
    let ext = path.extname(filePath).toLowerCase();
    
    if (!fs.existsSync(filePath)) {
        // Fallback to index.html for SPA client-side routing, except for static assets
        if (!urlPath.startsWith("/assets/") && !urlPath.startsWith("/results/")) {
            filePath = path.join(DIST_DIR, "index.html");
            ext = ".html";
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end("404 Not Found");
            return;
        }
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end(`Internal Server Error: ${err.code}`);
            return;
        }
        
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        res.statusCode = 200;
        res.setHeader("Content-Type", contentType);
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log("\n========================================================");
    console.log("🚀 Local Production Preview Server is running!");
    console.log(`👉 Open http://localhost:${PORT} in your web browser`);
    console.log("========================================================");
    console.log("Press Ctrl+C to shut down the server.\n");
});
