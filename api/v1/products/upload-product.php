<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Product.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate product
$product = new Product($db);

if (isset($_POST['submitProduct'])) {

    $product->name = 'product';

    $product->price = $_POST['price'];

    $product->product_desc = $_POST['productDesc'];

    $product->category_id = $_POST['productCategory'];

    $product->alt_name = $_POST['altName'];

    $product->file = $_FILES['productImg'];

    $id = new Create_id($db);
    $id->table = 'products';
    $id->col = 'product_id';

    $product->generate = $id;

    if (empty($_POST['productDesc'])) {
        header("Location: /dashboard/?upload=error");
        exit();
    } else {
        if (!$product->uploadProduct()) {
            header("Location: /dashboard/?upload=error");
            exit();
        } else {
            move_uploaded_file($product->tmp_name, $product->destination);
            header("Location: /dashboard/?upload=success");
            exit();
        }
    }
}
