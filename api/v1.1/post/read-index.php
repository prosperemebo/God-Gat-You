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

// Get amount from url
$post->index = isset($_GET['a']) ? $_GET['a'] : die();
$post->page = isset($_GET['p']) ? $_GET['p'] : die();

// Fix page
$post->page = ($post->page - 1) * $post->index;

// Post query
$result = $post->read_index();
echo $result;

// // Get row count
// $num = $result->rowCount();

// // Check if any post
// if ($num > 0) {
//     // post array
//     $post_arr = array();
//     $post_arr['message'] = 'Found '.$num.' posts!';
//     $post_arr['index'] = $num;
//     $post_arr['status'] = true;
//     $post_arr['data'] = array();

//     while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
//         extract($row);

//          $post_item = array(
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

//         // Push to data
//         array_push($post_arr['data'], $post_item);
//     }

//     // Turn output to JSON
//     echo json_encode($post_arr);

// } else {
//     echo json_encode(
//         array(
//             'message' => 'No posts found!',
//             'status' => false
//         )
//     );
// }
