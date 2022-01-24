<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
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
if (isset($data->id)) {
    $wallpaper->user_id = $data->id;
}
$wallpaper->id = $data->wallpaper;

$wallpaper->download();

// Download Wallpaper
if ($wallpaper->res == true) {
    echo json_encode(
        array(
            'message' => 'Download audit successful!',
            'status' => 'Download allowed',
            'exists' => true,
            'downloads' => $wallpaper->downloads,
            'data' => [
                'name' => $wallpaper->name,
                'desktop' => $wallpaper->desktop,
                'tablet' => $wallpaper->tablet,
                'mobile' => $wallpaper->mobile,
            ],
        )
    );
} else {
    echo json_encode(
        array(
            'message' => 'Download audit Not successful!',
            'status' => 'Download not allowed',
            'exists' => false,
        )
    );
}
