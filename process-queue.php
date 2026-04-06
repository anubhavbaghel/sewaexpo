<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../config.php';
require __DIR__ . '/PHPMailer-master/src/Exception.php';
require __DIR__ . '/PHPMailer-master/src/PHPMailer.php';
require __DIR__ . '/PHPMailer-master/src/SMTP.php';

$queueFile = __DIR__ . '/email_queue.json';
if (!file_exists($queueFile)) {
    exit;
}

$queue = json_decode(file_get_contents($queueFile), true);
if (empty($queue)) {
    exit;
}

$now = time();
$remaining = [];

foreach ($queue as $item) {
    if ($item['scheduled'] > $now) {
        $remaining[] = $item;
        continue;
    }

    $email = $item['email'];
    $name = $item['name'];
    $subject = $item['subject'];

    $autoReply = new PHPMailer(true);
    try {
        $autoReply->isSMTP();
        $autoReply->Host       = 'smtp.gmail.com';
        $autoReply->SMTPAuth   = true;
        $autoReply->Username   = 'connect@sewaexpo.com';
        $autoReply->Password   = SMTP_APP_PASSWORD;
        $autoReply->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $autoReply->Port       = 587;

        $autoReply->setFrom('connect@sewaexpo.com', 'SEWA EXPO');
        $autoReply->addAddress($email);
        $autoReply->isHTML(true);

        if (stripos($subject, 'Registration') !== false) {
            $autoReply->Subject = 'Welcome to SEWA EXPO';

            $autoReplyBody = "<!DOCTYPE html>
<html>
<head><meta charset='utf-8'></head>
<body style='margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif'>
<table width='100%' cellpadding='0' cellspacing='0' style='padding:40px 0;background:#f3f4f6'>
    <tr><td align='center'>
        <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)'>
            <tr>
                <td style='background:linear-gradient(135deg,#1a4d3e 0%,#2c5f52 100%);padding:32px 40px;text-align:center'>
                    <h1 style='margin:0;color:#ffffff;font-size:24px;letter-spacing:1px'>SEWA EXPO 2026</h1>
                </td>
            </tr>
            <tr>
                <td style='padding:32px 40px'>
                    <p style='color:#333333;font-size:16px;margin-bottom:16px'>Dear <strong>" . htmlspecialchars($name) . "</strong>,</p>
                    <p style='color:#555555;font-size:14px;line-height:1.6;margin-bottom:16px'>Greetings from SEWA EXPO!</p>
                    <p style='color:#555555;font-size:14px;line-height:1.6;margin-bottom:16px'>Thank you for registering for SEWA EXPO, scheduled to take place from <strong>September 12-13, 2026</strong> at <strong>Park Plaza, Central Business District, Behind Karkarduma Court, East Delhi</strong>.</p>
                    <p style='color:#555555;font-size:14px;line-height:1.6;margin-bottom:24px'>For any assistance or queries, feel free to reach out to us at <a href='mailto:connect@sewaexpo.com' style='color:#1a4d3e'>connect@sewaexpo.com</a>, or visit our website: <a href='https://www.sewaexpo.com' style='color:#1a4d3e'>www.sewaexpo.com</a></p>
                    <div style='margin:24px 0'>
                        <p style='color:#1a4d3e;font-size:14px;font-weight:600;margin-bottom:12px'>Stay connected:</p>
                        <a href='https://www.facebook.com/profile.php?id=61585048915310' style='display:inline-block;margin-right:12px'><img src='https://cdn-icons-png.flaticon.com/512/124/124010.png' alt='Facebook' width='32' height='32'></a>
                        <a href='https://www.instagram.com/sewaexpo/' style='display:inline-block'><img src='https://cdn-icons-png.flaticon.com/512/2111/2111463.png' alt='Instagram' width='32' height='32'></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td style='padding:0 40px 32px;color:#9ca3af;font-size:12px;text-align:center'>
                    <p style='margin:0'>© 2026 SEWA Expo. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </td></tr>
</table>
</body>
</html>";
        } else {
            $autoReply->Subject = 'Thank You for Contacting SEWA EXPO';

            $autoReplyBody = "<!DOCTYPE html>
<html>
<head><meta charset='utf-8'></head>
<body style='margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif'>
<table width='100%' cellpadding='0' cellspacing='0' style='padding:40px 0;background:#f3f4f6'>
    <tr><td align='center'>
        <table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)'>
            <tr>
                <td style='background:linear-gradient(135deg,#1a4d3e 0%,#2c5f52 100%);padding:32px 40px;text-align:center'>
                    <h1 style='margin:0;color:#ffffff;font-size:24px;letter-spacing:1px'>SEWA EXPO 2026</h1>
                </td>
            </tr>
            <tr>
                <td style='padding:32px 40px'>
                    <p style='color:#333333;font-size:16px;margin-bottom:16px'>Dear <strong>" . htmlspecialchars($name) . "</strong>,</p>
                    <p style='color:#555555;font-size:14px;line-height:1.6;margin-bottom:16px'>Thank you for reaching out to SEWA EXPO!</p>
                    <p style='color:#555555;font-size:14px;line-height:1.6;margin-bottom:16px'>We have received your message and will get back to you shortly.</p>
                    <p style='color:#555555;font-size:14px;line-height:1.6;margin-bottom:24px'>For any urgent queries, feel free to reach out to us at <a href='mailto:connect@sewaexpo.com' style='color:#1a4d3e'>connect@sewaexpo.com</a>, or visit our website: <a href='https://www.sewaexpo.com' style='color:#1a4d3e'>www.sewaexpo.com</a></p>
                    <div style='margin:24px 0'>
                        <p style='color:#1a4d3e;font-size:14px;font-weight:600;margin-bottom:12px'>Stay connected:</p>
                        <a href='https://www.facebook.com/profile.php?id=61585048915310' style='display:inline-block;margin-right:12px'><img src='https://cdn-icons-png.flaticon.com/512/124/124010.png' alt='Facebook' width='32' height='32'></a>
                        <a href='https://www.instagram.com/sewaexpo/' style='display:inline-block'><img src='https://cdn-icons-png.flaticon.com/512/2111/2111463.png' alt='Instagram' width='32' height='32'></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td style='padding:0 40px 32px;color:#9ca3af;font-size:12px;text-align:center'>
                    <p style='margin:0'>© 2026 SEWA Expo. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </td></tr>
</table>
</body>
</html>";
        }

        $autoReply->Body = $autoReplyBody;
        $autoReply->AltBody = strip_tags($autoReplyBody);
        $autoReply->send();
    } catch (Exception $e) {
        error_log("Auto-reply failed for $email: " . $e->getMessage());
    }
}

file_put_contents($queueFile, json_encode($remaining));
