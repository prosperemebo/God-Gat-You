<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Admin.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Admin object
$admin = new Admin($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set name
$admin->username = $data->username;
$admin->password = $data->password;

$id = new Create_id($db);
$id->table = 'administrators';
$id->col = 'token';
$admin->generate = $id;

// Create admin
if ($admin->auth()) {
    echo json_encode(
        array(
            'message' => 'Access Granted',
            'token' => $admin->token,
            'status' => true,
            'allAccess' => $admin->allAccess,
        )
    );
} else {
    echo json_encode(
        array(
            'message' => 'Access Denied',
            'status' => false,
        )
    );
}
