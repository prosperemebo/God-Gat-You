<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Product.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate product
$product = new Product($db);

// Get amount from url
$product->id = isset($_GET['id']) ? $_GET['id'] : die();
$id = new Create_id($db);
$id->table = 'products';
$id->col = 'product_id';
$generate = $id->create_id();

// Product query
$result = $product->read_single();

// Get row count
$num = $result->rowCount();

// Check if any post
if ($num > 0) {
    // product array
    $product_arr = array();
    $product_arr['message'] = 'Found ' . $num . ' product!';
    $product_arr['data'] = array();
    $row = $result->fetch(PDO::FETCH_ASSOC);

    extract($row);

    $product_arr['data'] = array(
        'id' => $id,
        'product_id' => $product_id,
        'category_id' => $category_id,
        'category_name' => $category_name,
        'cart_id' => $generate,
        'product_desc' => $product_desc,
        'image' => $image,
        'alt_name' => $alt_name,
        'price' => $price,
    );

    // Push to data
    // array_push($product_arr['data'], $product_item);

    // Turn output to JSON
    echo json_encode($product_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No product found!',
        )
    );
}
