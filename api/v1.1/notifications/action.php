<?php
    if (isset($_POST['token'])) {
        $token = $_POST['token'];

        include_once './includes/dbh.inc.php';

        $cdate = date('Y-m-d');

        $stmt = mysqli_stmt_init($conn);
        $sql = "INSERT INTO tokens (token, created_date) VALUES (?, ?)";

        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo "SQL statement failed!";
        } else {
            mysqli_stmt_bind_param($stmt, "ss", $token, $cdate);
            
            if (mysqli_stmt_execute($stmt)) {
                echo 'Token saved';
            } else {
                echo 'Failed to save token';
            }
        }
    }
?>