<?php
$conn = new mysqli("localhost", "root", "", "movies_db");

if ($conn->connect_error) {
    die(json_encode(["error" => "Falha na conexão com o banco de dados."]));
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']); 
    $query = $conn->prepare("SELECT id, title, year, genre, poster FROM movies WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();

    $result = $query->get_result();
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(["error" => "Filme não encontrado."]);
    }
} else {
    echo json_encode(["error" => "Nenhum ID fornecido."]);
}

$conn->close();
?>
