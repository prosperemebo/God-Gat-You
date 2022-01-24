<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Product.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate purchases
$purchases = new Product($db);

// Product query
$result = $purchases->read_purchases();

// Get row count
$num = $result->rowCount();

// Check if any product
if ($num > 0) {
    // product array
    $purchases_arr = array();
    $purchases_arr['message'] = 'Found ' . $num . ' purchases!';
    $purchases_arr['index'] = $num;
    $purchases_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $purchases_item = array(
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
        array_push($purchases_arr['data'], $purchases_item);
    }

    // Turn output to JSON
    echo json_encode($purchases_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No purchasess found!',
        )
    );
}
