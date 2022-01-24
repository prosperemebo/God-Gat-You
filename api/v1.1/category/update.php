<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Product.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate product
$product = new Product($db);

if (isset($_POST['createCategory'])) {

    $product->name = $_POST['categoryName'];
    $product->id = $_POST['categoryId'];

    echo $product->name;
    echo '<br>';
    echo $product->id;

    if (empty($_POST['categoryName'])) {
        header("Location: /dashboard/?update=error");
        exit();
    } else {
        if (!$product->updateCategory()) {
            header("Location: /dashboard/?update=error");
            exit();
        } else {
            header("Location: /dashboard/?update=success");
            exit();
        }
    }
}
