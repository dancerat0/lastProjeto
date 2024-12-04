<?php
$conn = new mysqli("localhost", "root", "", "movies_db");
$sql = "SELECT * FROM movies";
$result = $conn->query($sql);
$movies = [];

while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
$conn->close();
?>
