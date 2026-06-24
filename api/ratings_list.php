<?php
header("Content-Type: application/json");
$conn = require __DIR__ . "/../config/db.php";

$sql = "SELECT
            booking_id,
            rating_value,
            review,
            rated_at
        FROM ratings
        ORDER BY rated_at DESC";

$result = $conn->query($sql);

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
$conn->close();
?>