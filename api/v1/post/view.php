<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Post.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new User object
$view = new Post($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
$view->post_id = $data->post;
$view->id = $data->id;

// Create User
if (!empty($view->id)) {
    if ($view->view()) {
        echo json_encode(
            array(
                'message' => 'View Successful!',
                'views' => $view->res,
                'status' => true,
            )
        );
    } else {
        echo json_encode(
            array(
                'message' => 'View not Successful!',
                'status' => false,
            )
        );
    }
}
