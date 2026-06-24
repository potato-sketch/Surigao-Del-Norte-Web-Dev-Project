<?php
header("Content-Type: application/json");
$conn = require __DIR__ . "/../config/db.php";

$bookingId = isset($_POST["bookingId"]) ? (int)$_POST["bookingId"] : 0;
$stars = isset($_POST["stars"]) ? (int)$_POST["stars"] : 0;
$comment = isset($_POST["comment"]) ? trim($_POST["comment"]) : "";

session_start();

$userId = $_SESSION["user_id"];

if ($bookingId <= 0 || $stars < 1 || $stars > 5) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid rating data.",
        "debug" => [
            "bookingId" => $bookingId,
            "stars" => $stars,
            "comment" => $comment
        ]
    ]);
    exit;
}

$sql = "INSERT INTO ratings (
            booking_id,
            user_id,
            rating_value,
            review
        )
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            rating_value = VALUES(rating_value),
            review = VALUES(review),
            rated_at = CURRENT_TIMESTAMP";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Prepare failed: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("iiis", $bookingId, $userId, $stars, $comment);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Rating saved."
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>