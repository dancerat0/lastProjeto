<?php
$conn = new mysqli("localhost", "root", "", "movies_db");
$id = $_GET['id'];

$sql = "DELETE FROM movies WHERE id = $id";
$conn->query($sql);
$conn->close();
?>
