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

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
if (isset($data->id)) {
    $post->user_id = $data->id;
}
$post->id = $data->post;

// Post query
$result = $post->read_single();

echo $result;

// // Get row count
// $num = $result->rowCount();

// // Check if any post
// if ($num > 0) {
//     // post array
//     $post_arr = array();
//     $post_arr['message'] = 'Found '.$num.' post!';
//     $post_arr['status'] = true;
//     $post_arr['data'] = array();
//     $row = $result->fetch(PDO::FETCH_ASSOC);

//     extract($row);

//     $post_item = array(
//             'id' => $id,
//             'post_id' => $post_id,
//             'post_name' => $title,
//             'body' => $description,
//             'image' => $image,
//             'date' => $date,
//             'alt_name' => $alt_name,
//             'views' => $views,
//             'comments' => $comments,
//             'likes' => $likes,
//             'tags' => $tags
//         );

//     // Push to data
//     array_push($post_arr['data'], $post_item);

//     // Turn output to JSON
//     echo json_encode($post_arr);

// } else {
//     echo json_encode(
//         array(
//             'message' => 'No post found!',
//             'status' => false
//         )
//     );
// }
