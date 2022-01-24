<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/User.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate user
$user = new User($db);

// Product query
$result = $user->read();

// Get row count
$num = $result->rowCount();

// Check if any user
if ($num > 0) {
    // user array
    $user_arr = array();
    $user_arr['message'] = 'Found ' . $num . ' users!';
    $user_arr['index'] = $num;
    $user_arr['status'] = true;
    $user_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $user_item = array(
            'id' => $id,
            'user_id' => $user_id,
            'username' => $name,
            'downloads' => $downloads,
            'likes' => $likes,
            'comments' => $comments,
            'views' => $views,
        );

        // Push to data
        array_push($user_arr['data'], $user_item);
    }

    // Turn output to JSON
    echo json_encode($user_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No users found!',
        )
    );
}
