<?php

session_start();

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

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

if ($email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT user_id, full_name, password FROM users WHERE email = ?"
);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare login query."
    ]);
    exit;
}

$stmt->bind_param("s", $email);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to execute login query."
    ]);
    exit;
}

$result = $stmt->get_result();
$user = $result ? $result->fetch_assoc() : null;

if (!$user || !password_verify($password, $user["password"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid credentials."
    ]);
    exit;
}

$_SESSION["user_id"] = $user["user_id"];
$_SESSION["full_name"] = $user["full_name"];

echo json_encode([
    "success" => true,
    "user_id" => $user["user_id"],
    "full_name" => $user["full_name"]
]);