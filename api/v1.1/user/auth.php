<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/User.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new User object
$user = new User($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
$user->user_id = $data->id;

// Create User
if ($user->auth()) {
    echo json_encode(
        array(
            'message' => 'User Auth Successful!',
            'status' => 'User Exists',
            'exists' => true,
        )
    );
} else {
    echo json_encode(
        array(
            'message' => 'User Auth Not successful!',
            'status' => 'User not recognisiable',
            'exists' => false,
        )
    );
}
