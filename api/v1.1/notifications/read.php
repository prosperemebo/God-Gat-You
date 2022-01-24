<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Notification.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate notification
$notification = new Notification($db);

// Wallpaper query
$result = $notification->read();

// Get row count
$num = $result->rowCount();

// Check if any post
if ($num > 0) {
    // notification array
    $notification_arr = array();
    $notification_arr['message'] = 'Found ' . $num . ' subscribers!';
    $notification_arr['index'] = $num;
    $notification_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $notification_item = array(
            'id' => $id,
            'token' => $token,
            'date' => $created_date,
        );

        // Push to data
        array_push($notification_arr['data'], $notification_item);
    }

    // Turn output to JSON
    echo json_encode($notification_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No subscribers found!',
        )
    );
}
