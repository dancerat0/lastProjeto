<?php
$conn = new mysqli("localhost", "root", "", "movies_db");

$title = $_GET['title'];
$year = $_GET['year'];
$genre = $_GET['genre'];
$poster = $_GET['poster'];

$sql = "INSERT INTO movies (title, year, genre, poster) VALUES ('$title', '$year', '$genre', '$poster')";
if ($conn->query($sql) === TRUE) {
    echo "Novo filme inserido com sucesso!";

    $numeroregistros = 1; 

    $log_sql = "INSERT INTO log (numeroregistros) VALUES ('$numeroregistros')";
    if ($conn->query($log_sql) === TRUE) {
        echo "Log inserido com sucesso!";
    } else {
        echo "Erro ao registrar log: " . $conn->error;
    }

} else {
    echo "Erro ao inserir filme: " . $conn->error;
}
$conn->close();
?>
