<?php
$conn = new mysqli("localhost", "root", "", "movies_db");

header('Content-Type: application/json');

try {
    $conn = connect();

    $query = "SELECT * FROM log ORDER BY datahora DESC";
    $stmt = $conn->query($query);
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($logs);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erro ao listar logs: " . $e->getMessage()]);
}
$conn->close();
?>