<?php
    $conn = new mysqli("localhost", "root", "", "movies_db");
    $sql = "delete from movies";

    $qry = $conn->prepare($sql);
    $qry->execute();
?>
