<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// File paths
$leads_file = __DIR__ . '/leads.json';
$config_file = __DIR__ . '/config.json';

// Credentials
$ADMIN_USER = "admin_growthx_console";
$ADMIN_PASS = "gx_AdM!n#9824_P";
$SUPER_USER = "superadmin_growthx_master";
$SUPER_PASS = "gx_SuP3r!9951_M";

// Ensure files exist
if (!file_exists($leads_file)) {
    file_put_contents($leads_file, json_encode([]));
}
if (!file_exists($config_file)) {
    file_put_contents($config_file, json_encode(['status' => 'live']));
}

// Parse request body
$input = json_decode(file_get_contents('php://input'), true);
$action = isset($_GET['action']) ? $_GET['action'] : (isset($input['action']) ? $input['action'] : '');

// 1. Get Site Status
if ($action === 'get_status') {
    $config = json_decode(file_get_contents($config_file), true);
    echo json_encode(['status' => isset($config['status']) ? $config['status'] : 'live']);
    exit;
}

// 2. Submit Lead
if ($action === 'submit_lead') {
    $fullName = isset($input['fullName']) ? trim($input['fullName']) : '';
    $phone = isset($input['phone']) ? trim($input['phone']) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $service = isset($input['service']) ? trim($input['service']) : '';
    $businessDetails = isset($input['businessDetails']) ? trim($input['businessDetails']) : '';
    
    if (!$fullName || !$email || !$phone) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
    
    // Capture diagnostics
    $ipAddress = isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0] : (isset($_SERVER['HTTP_X_REAL_IP']) ? $_SERVER['HTTP_X_REAL_IP'] : $_SERVER['REMOTE_ADDR']);
    $userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'unknown';
    
    $leads = json_decode(file_get_contents($leads_file), true);
    if (!is_array($leads)) {
        $leads = [];
    }
    
    $newLead = [
        'id' => uniqid(),
        'fullName' => $fullName,
        'phone' => $phone,
        'email' => $email,
        'service' => $service,
        'businessDetails' => $businessDetails,
        'submittedAt' => date('c'),
        'ipAddress' => trim($ipAddress),
        'userAgent' => $userAgent
    ];
    
    array_unshift($leads, $newLead);
    file_put_contents($leads_file, json_encode($leads, JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => true]);
    exit;
}

// 3. Get Admin Dashboard Data
if ($action === 'get_admin_data') {
    $username = isset($input['username']) ? $input['username'] : '';
    $password = isset($input['password']) ? $input['password'] : '';
    
    $isAdmin = $username === $ADMIN_USER && $password === $ADMIN_PASS;
    $isSuper = $username === $SUPER_USER && $password === $SUPER_PASS;
    
    if (!$isAdmin && !$isSuper) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
        exit;
    }
    
    $leads = json_decode(file_get_contents($leads_file), true);
    $config = json_decode(file_get_contents($config_file), true);
    
    echo json_encode([
        'role' => $isSuper ? 'super' : 'admin',
        'status' => isset($config['status']) ? $config['status'] : 'live',
        'leads' => is_array($leads) ? $leads : [],
        'totalLeads' => is_array($leads) ? count($leads) : 0
    ]);
    exit;
}

// 4. Toggle Maintenance Status
if ($action === 'toggle_maintenance') {
    $username = isset($input['username']) ? $input['username'] : '';
    $password = isset($input['password']) ? $input['password'] : '';
    $newStatus = isset($input['newStatus']) ? $input['newStatus'] : '';
    
    $isSuper = $username === $SUPER_USER && $password === $SUPER_PASS;
    if (!$isSuper) {
        http_response_code(403);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    if ($newStatus !== 'live' && $newStatus !== 'maintenance') {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid status']);
        exit;
    }
    
    file_put_contents($config_file, json_encode(['status' => $newStatus], JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'status' => $newStatus]);
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);
