<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Post.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate post
$post = new Post($db);

$id = isset($_GET['id']) ? $_GET['id'] : die();

$post->id = $id;

// Post query
$result = $post->read_comments();

// Get row count
$num = $result->rowCount();

// Check if any post
if ($num > 0) {
    // post array
    $post_arr = array();
    $post_arr['message'] = 'Found ' . $num . ' comments!';
    $post_arr['index'] = $num;
    $post_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $post_item = array(
            'id' => $id,
            'post_id' => $post_id,
            'commenter' => $commenter,
            'description' => $description,
            'date' => $date,
        );

        // Push to data
        array_push($post_arr['data'], $post_item);
    }

    // Turn output to JSON
    echo json_encode($post_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No comments found!',
        )
    );
}
