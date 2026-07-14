import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const distDir = path.resolve("dist-spa").replace(/\\/g, "/");
const readyZip = path.resolve("ready-to-upload.zip").replace(/\\/g, "/");
const distZip = path.resolve("dist-spa.zip").replace(/\\/g, "/");

console.log("Starting ZIP packaging process...");

// Clean up existing zip files
[readyZip, distZip].forEach(zip => {
    if (fs.existsSync(zip)) {
        try {
            fs.unlinkSync(zip);
            console.log(`Removed existing zip: ${zip}`);
        } catch (err) {
            console.error(`Could not remove ${zip}:`, err.message);
        }
    }
});

// Update index.php with compiled asset file names (resolving hashed asset files dynamically)
try {
    const assetsDir = path.join(distDir, "assets");
    if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir);
        const jsFile = files.find(f => f.startsWith("index-") && f.endsWith(".js"));
        const cssFile = files.find(f => f.startsWith("styles-") && f.endsWith(".css"));

        if (jsFile && cssFile) {
            const indexPhpPath = path.join(distDir, "index.php");
            if (fs.existsSync(indexPhpPath)) {
                let content = fs.readFileSync(indexPhpPath, "utf-8");
                content = content.replace(/assets\/index-[a-zA-Z0-9_-]+\.js/g, `assets/${jsFile}`);
                content = content.replace(/assets\/styles-[a-zA-Z0-9_-]+\.css/g, `assets/${cssFile}`);
                fs.writeFileSync(indexPhpPath, content, "utf-8");
                console.log(`Updated assets in dist-spa/index.php: JS=${jsFile}, CSS=${cssFile}`);
            }
        } else {
            console.warn("Could not find compiled JS/CSS in dist-spa/assets.");
        }
    } else {
        console.warn("dist-spa/assets directory does not exist.");
    }
} catch (err) {
    console.error("Failed to update index.php assets:", err.message);
}


// PowerShell script to build the ZIP using forward slashes
const psScript = `
[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression') | Out-Null
[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem') | Out-Null

$zipPath = '${readyZip}'
$stream = New-Object System.IO.FileStream($zipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path '${distDir}' -Recurse -File

foreach ($file in $files) {
    # Compute relative path from dist-spa
    $rel = $file.FullName.Substring('${distDir}/'.Length)
    # Replace backslashes with forward slashes for Linux compatibility
    $entryName = $rel.Replace('\\', '/')
    
    Write-Output "Adding entry: $entryName"
    
    # Create the entry in the ZIP archive
    $entry = $archive.CreateEntry($entryName)
    $entryStream = $entry.Open()
    
    # Write the file contents to the entry
    $fileStream = New-Object System.IO.FileStream($file.FullName, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read)
    $fileStream.CopyTo($entryStream)
    
    $fileStream.Close()
    $entryStream.Close()
}

$archive.Dispose()
$stream.Close()
Write-Output "ZIP created successfully at $zipPath"
`;

try {
    // Write PS script to temporary file to avoid command length limits or quoting issues
    const tempPsFile = path.resolve("temp_zip_script.ps1");
    fs.writeFileSync(tempPsFile, psScript, "utf-8");

    console.log("Running compression script...");
    const cmd = `powershell -ExecutionPolicy Bypass -File "${tempPsFile}"`;
    const output = execSync(cmd, { encoding: "utf-8" });
    console.log(output);

    // Clean up temporary script
    fs.unlinkSync(tempPsFile);

    // Copy to dist-spa.zip
    fs.copyFileSync(readyZip, distZip);
    console.log(`Copied ZIP to ${distZip}`);
    
    console.log("Packaging completed successfully!");
} catch (err) {
    console.error("Failed to build ZIP:", err.message);
    if (err.stdout) console.log("Stdout:", err.stdout);
    if (err.stderr) console.error("Stderr:", err.stderr);
    process.exit(1);
}
