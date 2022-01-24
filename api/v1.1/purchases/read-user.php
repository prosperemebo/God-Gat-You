<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Product.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate purchase
$purchase = new Product($db);

// Get amount from url
$purchase->id = isset($_GET['id']) ? $_GET['id'] : die();

// Product query
$result = $purchase->read_single_purchase_user();

// Get row count
$num = $result->rowCount();

// Check if any post
if ($num > 0) {
    // purchase array
    $purchase_arr = array();
    $purchase_arr['message'] = 'Found ' . $num . ' purchase!';
    $purchase_arr['data'] = array();
    $row = $result->fetch(PDO::FETCH_ASSOC);

    extract($row);

    if (
        $status === '1'
    ) {
        $purchase_arr['purchase'] = true;
    }

    $purchase_arr['data'] = array(
        'id' => $id,
        'amount_paid' => $row['amount-paid'],
        'user_id' => $userID,
        'purchase_id' => $purchase_id,
        'first_name' => $row['first-name'],
        'last_name' => $row['last-name'],
        'mobile_number' => $row['mobile-number'],
        'message' => $message,
        'email' => $email,
        'reference' => $reference,
        'status' => $status,
    );

    // Push to data
    // array_push($purchase_arr['data'], $purchase_item);

    // Turn output to JSON
    echo json_encode($purchase_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No purchase found!',
            'status' => false,
            'purchase' => false,
        )
    );
}
