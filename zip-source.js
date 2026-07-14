import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const sourceDir = path.resolve(".").replace(/\\/g, "/");
const sourceZip = path.resolve("project-source.zip").replace(/\\/g, "/");

console.log("Starting source ZIP packaging process...");

if (fs.existsSync(sourceZip)) {
    try {
        fs.unlinkSync(sourceZip);
        console.log(`Removed existing source zip: ${sourceZip}`);
    } catch (err) {
        console.error(`Could not remove ${sourceZip}:`, err.message);
    }
}

// PowerShell script to build the ZIP, excluding node_modules, build outputs, and existing zips
const psScript = `
[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression') | Out-Null
[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem') | Out-Null

$zipPath = '${sourceZip}'
$stream = New-Object System.IO.FileStream($zipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)

# Get all files, excluding node_modules, build outputs, version control, and temporary/zip files
$files = Get-ChildItem -Path '${sourceDir}' -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\\\node_modules\\\\' -and
    $_.FullName -notmatch '\\\\dist-spa\\\\' -and
    $_.FullName -notmatch '\\\\.output\\\\' -and
    $_.FullName -notmatch '\\\\.wrangler\\\\' -and
    $_.FullName -notmatch '\\\\.tanstack\\\\' -and
    $_.FullName -notmatch '\\\\.git\\\\' -and
    $_.FullName -notmatch '\\\\.lovable\\\\' -and
    $_.Name -notmatch '\\.zip$' -and
    $_.Name -notmatch '^temp_'
}

foreach ($file in $files) {
    # Compute relative path from sourceDir
    $rel = $file.FullName.Substring('${sourceDir}/'.Length)
    # Replace backslashes with forward slashes for Linux compatibility
    $entryName = $rel.Replace('\\\\', '/')
    
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
    const tempPsFile = path.resolve("temp_source_zip_script.ps1");
    fs.writeFileSync(tempPsFile, psScript, "utf-8");

    console.log("Running source compression script...");
    const cmd = `powershell -ExecutionPolicy Bypass -File "${tempPsFile}"`;
    const output = execSync(cmd, { encoding: "utf-8" });
    console.log(output);

    // Clean up temporary script
    fs.unlinkSync(tempPsFile);

    console.log("Source packaging completed successfully!");
} catch (err) {
    console.error("Failed to build source ZIP:", err.message);
    if (err.stdout) console.log("Stdout:", err.stdout);
    if (err.stderr) console.error("Stderr:", err.stderr);
    process.exit(1);
}
