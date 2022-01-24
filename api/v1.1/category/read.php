<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Product.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate product
$product = new Product($db);

// Get category from url
$product->category_id = isset($_GET['c']) ? $_GET['c'] : die();

// Product query
$result = $product->readProducts();

// Get row count
$num = $result->rowCount();

// Check if any product
if ($num > 0) {
    // product array
    $product_arr = array();
    $product_arr['message'] = 'Found ' . $num . ' products!';
    $product_arr['index'] = $num;
    $product_arr['category'] = $product->name;
    $product_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $product_item = array(
            'id' => $id,
            'product_id' => $product_id,
            'category_id' => $category_id,
            'product_desc' => $product_desc,
            'category_name' => $category_name,
            'image' => $image,
            'alt_name' => $alt_name,
            'price' => $price,
        );

        // Push to data
        array_push($product_arr['data'], $product_item);
    }

    // Turn output to JSON
    echo json_encode($product_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No products found!',
            'data' => array(),
            'category' => $product->name,
        )
    );
}
