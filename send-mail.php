<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

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

$message = "<h2>SEWA Expo Enquiry</h2>";
$message .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
$message .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";

foreach ($_POST as $key => $value) {
    if (in_array($key, ['name', 'email', 'subject'])) continue;
    if (!empty($value)) {
        $message .= "<p><strong>" . ucfirst(htmlspecialchars($key)) . ":</strong> " . htmlspecialchars(trim($value)) . "</p>";
    }
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'connect@sewaexpo.com';
    $mail->Password   = 'YOUR_APP_PASSWORD';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('connect@sewaexpo.com', 'SEWA Expo');
    $mail->addAddress('anubhav.diinfotech@gmail.com');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $message;
    $mail->AltBody = strip_tags($message);

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Thank you! Your details have been submitted.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send. Please try again.']);
}
