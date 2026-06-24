<?php
header("Content-Type: application/json");
$conn = require __DIR__ . "/../config/db.php";

$tourId = isset($_POST["tourId"]) ? (int)$_POST["tourId"] : 0;
$guests = isset($_POST["guests"]) ? (int)$_POST["guests"] : 0;
$date = isset($_POST["date"]) ? $_POST["date"] : "";
$totalPaid = isset($_POST["totalPaid"]) ? (float)$_POST["totalPaid"] : 0;
$refCode = isset($_POST["refCode"]) ? $_POST["refCode"] : "";
$bookedAt = isset($_POST["bookedAt"]) ? $_POST["bookedAt"] : date("Y-m-d H:i:s");

if ($tourId <= 0 || $guests <= 0 || empty($date) || empty($refCode)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit;
}

$sql = "INSERT INTO bookings (
            user_id,
            tour_id,
            num_of_guests,
            booking_date,
            total_paid,
            ref_code,
            booked_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed."
    ]);
    exit;
}

session_start();

$userId = $_SESSION["user_id"];

$stmt->bind_param(
    "iiisdss",
    $userId,
    $tourId,
    $guests,
    $date,
    $totalPaid,
    $refCode,
    $bookedAt
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Booking saved."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Booking save failed."
    ]);
}

$stmt->close();
$conn->close();
?>