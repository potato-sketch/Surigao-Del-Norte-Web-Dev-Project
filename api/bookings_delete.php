<?php
header("Content-Type: application/json");
$conn = require __DIR__ . "/../config/db.php";

session_start();

$userId = isset($_SESSION["user_id"]) ? (int)$_SESSION["user_id"] : 0;
$bookingId = isset($_POST["bookingId"]) ? (int)$_POST["bookingId"] : 0;

if ($userId <= 0) {
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "You must be signed in to cancel a booking."
    ]);
    exit;
}

if ($bookingId <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid booking selected."
    ]);
    exit;
}

$checkSql = "SELECT booking_id FROM bookings WHERE booking_id = ? AND user_id = ? LIMIT 1";
$checkStmt = $conn->prepare($checkSql);

if (!$checkStmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed."
    ]);
    exit;
}

$checkStmt->bind_param("ii", $bookingId, $userId);
$checkStmt->execute();
$booking = $checkStmt->get_result()->fetch_assoc();
$checkStmt->close();

if (!$booking) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Booking not found."
    ]);
    exit;
}

$deleteSql = "DELETE FROM bookings WHERE booking_id = ? AND user_id = ? LIMIT 1";
$deleteStmt = $conn->prepare($deleteSql);

if (!$deleteStmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed."
    ]);
    exit;
}

$deleteStmt->bind_param("ii", $bookingId, $userId);

if ($deleteStmt->execute() && $deleteStmt->affected_rows > 0) {
    echo json_encode([
        "success" => true,
        "message" => "Booking canceled successfully."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to cancel booking right now."
    ]);
}

$deleteStmt->close();
$conn->close();
?>