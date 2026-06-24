<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "surigaodelnortedb";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    die("Connection failed: " . $conn->connect_error);
}

return $conn;