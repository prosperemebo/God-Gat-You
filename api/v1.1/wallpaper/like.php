<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Wallpaper.php';

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, dicta! Ipsam iusto porro et? Repellat quisquam itaque recusandae nobis aliquid eligendi, voluptas, odit quibusdam atque doloribus consequuntur quis sapiente totam!

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Wallpaper object
$wallpaper = new Wallpaper($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
$wallpaper->user_id = $data->id;
$wallpaper->id = $data->wallpaper;

$wallpaper->like();

// Like Wallpaper
if ($wallpaper->res == true) {
    echo json_encode(
        array(
            'message' => 'Like audit successful!',
            'status' => 'Like allowed',
            'likes' => $wallpaper->likes,
            'exists' => true,
            'unliked' => $wallpaper->unliked,
        )
    );
} else {
    echo json_encode(
        array(
            'message' => 'Like audit Not successful!',
            'status' => 'Like not allowed',
            'exists' => false,
        )
    );
}
