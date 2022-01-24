<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Gallery.php';

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, dicta! Ipsam iusto porro et? Repellat quisquam itaque recusandae nobis aliquid eligendi, voluptas, odit quibusdam atque doloribus consequuntur quis sapiente totam!

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new gallery object
$gallery = new Gallery($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
$gallery->user_id = $data->id;
$gallery->id = $data->gallery;

$gallery->like();

// Like gallery
if ($gallery->res == true) {
    echo json_encode(
        array(
            'message' => 'Like audit successful!',
            'status' => 'Like allowed',
            'likes' => $gallery->likes,
            'exists' => true,
            'unliked' => $gallery->unliked,
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
