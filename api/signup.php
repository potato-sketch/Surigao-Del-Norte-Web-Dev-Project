<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);
    exit;
}

$conn = require __DIR__ . "/../config/db.php";

$fullName = trim($_POST["full_name"] ?? "");
$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if (!$fullName || !$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

$check = $conn->prepare(
    "SELECT user_id FROM users WHERE email = ?"
);

if (!$check) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare signup validation query."
    ]);
    exit;
}

$check->bind_param("s", $email);

if (!$check->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to validate email address."
    ]);
    exit;
}

if ($check->get_result()->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email already exists."
    ]);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare(
    "INSERT INTO users(full_name,email,password)
     VALUES(?,?,?)"
);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare signup query."
    ]);
    exit;
}

$stmt->bind_param(
    "sss",
    $fullName,
    $email,
    $hash
);

$success = $stmt->execute();

echo json_encode([
    "success" => $success,
    "message" => $success
        ? "Account created successfully."
        : "Could not create account right now."
]);