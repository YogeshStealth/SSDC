<?php
// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400'); // 24 hours
    http_response_code(200);
    exit();
}

// Set CORS headers for actual request
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get the raw POST data
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // Debug: Log received data
        error_log("Received data: " . print_r($data, true));

        // Validate required fields
        $required_fields = ['name', 'email', 'phone', 'city', 'stream', 'course'];
        $missing_fields = [];
        
        foreach ($required_fields as $field) {
            if (empty($data[$field])) {
                $missing_fields[] = $field;
            }
        }

        if (!empty($missing_fields)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Missing required fields: ' . implode(', ', $missing_fields)
            ]);
            exit;
        }

        // Validate email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email format'
            ]);
            exit;
        }

        // Validate phone number (10 digits)
        if (!preg_match('/^[0-9]{10}$/', $data['phone'])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Invalid phone number format'
            ]);
            exit;
        }

        // Prepare data for Google Sheets
        $formData = [
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'city' => $data['city'],
            'stream' => $data['stream'],
            'course' => $data['course']
        ];

        // Google Apps Script URL
        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwuJMZy57KQn6OHCCg5IDkBXudhNHzSh7HaWZrZqhW6pNgJ2jKyjYV4dMTF1eTTdt_yig/exec';

        // Send data to Google Apps Script
        $ch = curl_init($googleScriptUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($formData));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects
        curl_setopt($ch, CURLOPT_MAXREDIRS, 5); // Maximum number of redirects to follow
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        $response = curl_exec($ch);
        
        // Log curl error if any
        if (curl_errno($ch)) {
            error_log("Curl error: " . curl_error($ch));
        }
        
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch);

        // Log the response from Google Script
        error_log("Google Script Response: " . $response);
        error_log("HTTP Code: " . $httpCode);
        error_log("Final URL: " . $finalUrl);

        // Consider both 200 and 302 as success for Google Script
        if ($httpCode === 200 || $httpCode === 302) {
            echo json_encode([
                'success' => true,
                'message' => 'Form submitted successfully'
            ]);
        } else {
            throw new Exception("Google Script returned HTTP code: " . $httpCode);
        }
    } catch (Exception $e) {
        error_log("Error in submit_form.php: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error submitting form: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
} 