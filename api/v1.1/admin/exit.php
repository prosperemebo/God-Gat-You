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

// Set token
$admin->token = $data->token;

$id = new Create_id($db);
$id->table = 'administrators';
$id->col = 'token';
$admin->generate = $id;

// Create admin
if ($admin->exit()) {
    echo json_encode(
        array(
            'message' => 'Exit successful',
            'status' => true,
        )
    );
} else {
    echo json_encode(
        array(
            'message' => 'Exit not successful',
            'status' => false,
        )
    );
}
