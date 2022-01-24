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

    $id = new Create_id($db);
    $id->table = 'category';
    $id->col = 'category_id';
    $product->generate = $id;

    if (empty($_POST['categoryName'])) {
        header("Location: /dashboard/?upload=error");
        exit();
    } else {
        if (!$product->uploadCategory()) {
            header("Location: /dashboard/?upload=error");
            exit();
        } else {
            header("Location: /dashboard/?upload=success");
            exit();
        }

    }

}
