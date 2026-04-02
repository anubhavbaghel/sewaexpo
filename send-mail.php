<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : 'New SEWA Expo Enquiry';

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name and email are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

$message = "Name: $name\nEmail: $email\n\n";
foreach ($_POST as $key => $value) {
    if (in_array($key, ['name', 'email', 'subject'])) continue;
    if (!empty($value)) {
        $message .= ucfirst($key) . ": " . trim($value) . "\n";
    }
}

$to = 'anubhav.diinfotech@gmail.com';
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $message, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Thank you! Your details have been submitted.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send. Please try again.']);
}
