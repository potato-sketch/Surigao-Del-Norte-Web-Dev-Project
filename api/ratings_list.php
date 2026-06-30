<?php
header("Content-Type: application/json");
$conn = require __DIR__ . "/../config/db.php";

session_start();

$userId = isset($_SESSION["user_id"]) ? (int)$_SESSION["user_id"] : 0;

if ($userId <= 0) {
    http_response_code(401);
    echo json_encode(new stdClass());
    exit;
}

$sql = "SELECT
            booking_id,
            rating_value,
            review,
            rated_at
        FROM ratings
        WHERE user_id = ?
        ORDER BY rated_at DESC";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(new stdClass());
    exit;
}

$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$ratings = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $ratings[(int)$row["booking_id"]] = [
            "stars" => (int)$row["rating_value"],
            "comment" => $row["review"],
            "rated_at" => $row["rated_at"]
        ];
    }
}

echo json_encode($ratings);
$stmt->close();
$conn->close();
?>