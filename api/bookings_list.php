<?php
header("Content-Type: application/json");
$conn = require __DIR__ . "/../config/db.php";

$sql = "SELECT
            booking_id AS bookingId,
            tour_id AS tourId,
            num_of_guests AS guests,
            booking_date AS date,
            total_paid AS totalPaid,
            ref_code AS refCode,
            booked_at AS bookedAt
        FROM bookings
        ORDER BY booked_at DESC";

$result = $conn->query($sql);

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
$conn->close();
?>