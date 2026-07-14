<?php
header("Content-Type: application/json");

function scan($dir) {
    if (!is_dir($dir)) {
        return ["error" => "$dir is not a directory"];
    }
    $files = scandir($dir);
    $res = [];
    foreach ($files as $file) {
        if ($file === '.' || $file === '..') continue;
        $path = $dir . '/' . $file;
        $res[] = [
            "name" => $file,
            "type" => is_dir($path) ? "dir" : "file",
            "size" => is_dir($path) ? null : filesize($path)
        ];
    }
    return $res;
}

echo json_encode([
    "root" => scan(__DIR__),
    "assets" => scan(__DIR__ . '/assets')
], JSON_PRETTY_PRINT);
?>
