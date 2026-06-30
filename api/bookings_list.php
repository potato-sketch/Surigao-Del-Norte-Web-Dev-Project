<?php
header("Content-Type: application/json");
$conn = require __DIR__ . "/../config/db.php";

session_start();

$userId = isset($_SESSION["user_id"]) ? (int)$_SESSION["user_id"] : 0;

if ($userId <= 0) {
    http_response_code(401);
    echo json_encode([]);
    exit;
}

$sql = "SELECT
            booking_id AS bookingId,
            tour_id AS tourId,
            num_of_guests AS guests,
            booking_date AS date,
            total_paid AS totalPaid,
            ref_code AS refCode,
            booked_at AS bookedAt
        FROM bookings
        WHERE user_id = ?
        ORDER BY booked_at DESC";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([]);
    exit;
}

$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$bookings = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $row["bookingId"] = (int)$row["bookingId"];
        $row["tourId"] = (int)$row["tourId"];
        $row["guests"] = (int)$row["guests"];
        $row["totalPaid"] = (float)$row["totalPaid"];

        $bookings[] = $row;
    }
}

echo json_encode($bookings);
$stmt->close();
$conn->close();
?>