<?php

header("Content-Type: application/json");

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

$check->bind_param("s", $email);
$check->execute();

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

$stmt->bind_param(
    "sss",
    $fullName,
    $email,
    $hash
);

$success = $stmt->execute();

echo json_encode([
    "success" => $success
]);