<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'config.php';
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$turnstileToken = isset($_POST['cf-turnstile-response']) ? $_POST['cf-turnstile-response'] : '';

$verify = curl_init();
curl_setopt($verify, CURLOPT_URL, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
curl_setopt($verify, CURLOPT_POST, true);
curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query(['secret' => TURNSTILE_SECRET, 'response' => $turnstileToken]));
curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($verify);
curl_close($verify);
$responseData = json_decode($response, true);

if (!isset($responseData['success']) || $responseData['success'] !== true) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'CAPTCHA verification failed. Please try again.']);
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

$fields = [];
foreach ($_POST as $key => $value) {
    if (in_array($key, ['name', 'email', 'subject'])) continue;
    if (!empty($value)) {
        $fields[] = [
            'label' => ucfirst($key),
            'value' => htmlspecialchars(trim($value))
        ];
    }
}

$rows = '';
foreach ($fields as $i => $field) {
    $bg = $i % 2 === 0 ? '#f9fafb' : '#ffffff';
    $rows .= "<tr style='background:{$bg}'>
        <td style='padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;width:160px'>{$field['label']}</td>
        <td style='padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827'>{$field['value']}</td>
    </tr>";
}

$timestamp = date('F j, Y \a\t g:i A');

$message = "
<!DOCTYPE html>
<html>
<head><meta charset='utf-8'></head>
<body style='margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif'>
<table width='100%' cellpadding='0' cellspacing='0' style='padding:40px 0;background:#f3f4f6'>
    <tr><td align='center'>
        <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)'>
            <tr>
                <td style='background:linear-gradient(135deg,#1a4d3e 0%,#2c5f52 100%);padding:32px 40px;text-align:center'>
                    <h1 style='margin:0;color:#ffffff;font-size:24px;letter-spacing:1px'>SEWA EXPO 2026</h1>
                    <p style='margin:8px 0 0;color:#d4a574;font-size:14px;letter-spacing:2px;text-transform:uppercase'>New Enquiry Received</p>
                </td>
            </tr>
            <tr>
                <td style='padding:32px 40px 24px'>
                    <table width='100%' cellpadding='0' cellspacing='0' style='border:1px solid #e5e7eb;border-radius:8px;overflow:hidden'>
                        <tr style='background:#1a4d3e'>
                            <td colspan='2' style='padding:12px 16px;color:#ffffff;font-weight:600;font-size:14px'>Contact Details</td>
                        </tr>
                        <tr style='background:#f9fafb'>
                            <td style='padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;width:160px'>Name</td>
                            <td style='padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827'>" . htmlspecialchars($name) . "</td>
                        </tr>
                        <tr>
                            <td style='padding:12px 16px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151'>Email</td>
                            <td style='padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827'><a href='mailto:" . htmlspecialchars($email) . "' style='color:#1a4d3e;text-decoration:none'>" . htmlspecialchars($email) . "</a></td>
                        </tr>
                        {$rows}
                    </table>
                </td>
            </tr>
            <tr>
                <td style='padding:0 40px 32px;color:#9ca3af;font-size:12px;text-align:center'>
                    <p style='margin:0'>SEWA Expo 2026 | Empowering Golden Years</p>
                </td>
            </tr>
        </table>
    </td></tr>
</table>
</body>
</html>";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'connect@sewaexpo.com';
    $mail->Password   = SMTP_APP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('connect@sewaexpo.com', 'SEWA Expo');
    $mail->addAddress('anubhav.diinfotech@gmail.com');
    $mail->addCC('karan.kumar@diinfotech.com');
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
