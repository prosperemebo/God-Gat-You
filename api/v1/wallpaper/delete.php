<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Wallpaper.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Wallpaper object
$wallpaper = new Wallpaper($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
$wallpaper->id = $data->wallpaper;

// Like Wallpaper
if ($wallpaper->delete()) {
    echo json_encode(
        array(
            'message' => 'Delete successful!',
            'status' => true,
        )
    );
} else {
    echo json_encode(
        array(
            'message' => 'Delete not successful!',
            'status' => false,
        )
    );
}
