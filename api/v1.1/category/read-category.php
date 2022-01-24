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

// Product query
$result = $product->readCategory();

echo $result;

// // Get row count
// $num = $result->rowCount();

// // Check if any product
// if ($num > 0) {
//     // product array
//     $category_arr = array();
//     $category_arr['message'] = 'Found '.$num.' categories!';
//     $category_arr['index'] = $num;
//     $category_arr['data'] = array();

//     while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
//         extract($row);

//         $categories = array(
//             'id' => $category_id,
//             'name' => $category_name
//         );

//         // Push to data
//         array_push($category_arr['data'], $categories);
//     }

//     // Turn output to JSON
//     echo json_encode($category_arr);

// } else {
//     echo json_encode(
//         array(
//             'message' => 'No category found!'
//         )
//     );
// }
