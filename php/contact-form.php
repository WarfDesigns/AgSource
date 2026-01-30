<?php
declare(strict_types=1);

// TODO: Update these values to match your hosting.com reseller account and destination inbox.
$recipientEmail = 'hello@agsource.com';
$fromEmail = 'no-reply@agsource.com';
$fromName = 'Ag Source Website';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method Not Allowed';
    exit;
}

// Basic spam trap: bots fill hidden fields.
if (!empty($_POST['company'] ?? '')) {
    http_response_code(400);
    echo 'Invalid submission.';
    exit;
}

$fields = [
    'name' => trim($_POST['name'] ?? ''),
    'email' => trim($_POST['email'] ?? ''),
    'phone' => trim($_POST['phone'] ?? ''),
    'location' => trim($_POST['location'] ?? ''),
    'service' => trim($_POST['service'] ?? ''),
    'farm_name' => trim($_POST['farm_name'] ?? ''),
    'acres' => trim($_POST['acres'] ?? ''),
    'message' => trim($_POST['message'] ?? ''),
    'form_source' => trim($_POST['form_source'] ?? 'website'),
];

if ($fields['name'] === '' || $fields['email'] === '') {
    http_response_code(400);
    echo 'Name and email are required.';
    exit;
}

if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo 'Please provide a valid email address.';
    exit;
}

$subject = 'New website inquiry from ' . $fields['name'];
$lines = [
    'Form source: ' . $fields['form_source'],
    'Name: ' . $fields['name'],
    'Email: ' . $fields['email'],
    'Phone: ' . ($fields['phone'] ?: 'Not provided'),
    'County/Region: ' . ($fields['location'] ?: 'Not provided'),
    'Service Interest: ' . ($fields['service'] ?: 'Not provided'),
    'Farm Name: ' . ($fields['farm_name'] ?: 'Not provided'),
    'Approximate Acres: ' . ($fields['acres'] ?: 'Not provided'),
    'Message:',
    $fields['message'] ?: 'Not provided',
];
$body = implode("\r\n", $lines);

$headers = [
    'From: ' . $fromName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $fields['name'] . ' <' . $fields['email'] . '>',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($recipientEmail, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo 'We could not send your message at this time. Please try again later.';
    exit;
}

echo 'Thank you! Your message has been sent.';