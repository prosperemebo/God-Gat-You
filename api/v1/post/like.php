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
$post = new Post($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
$post->id = $data->post;
$post->user_id = $data->id;

$post->like();

// Post like
if ($post->res == true) {
    echo json_encode(
        array(
            'message' => 'Like audit successful!',
            'status' => 'Like allowed',
            'likes' => $post->likes,
            'exists' => true,
            'unliked' => $post->unliked,
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
