<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Post.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new User object
$comment = new Post($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
$comment->post_id = $data->post;
$comment->title = $data->commenter;
$comment->id = $data->user;
$comment->description = $data->comment;
if ($data->id) {
    $id = $data->id;
} else {
    $id = null;
}

$comment->generate = new Create_id($db);
$comment->generate->table = 'comments';
$comment->generate->col = 'comment_id';

// Create User
if ($comment->comment()) {
    $result = $comment->res;

    // Get row count
    $num = $result->rowCount();

    // Check if any post
    if ($num > 0) {
        // comment array
        $comment_arr = array();
        $comment_arr['comments'] = array();
        $comment_arr['message'] = 'Comment Successful!';
        $comment_arr['id'] = $id;
        $comment_arr['status'] = true;

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $comment_item = array(
                'id' => $id,
                'commenter' => $commenter,
                'description' => $description,
                'date' => $date,
            );

            // Push to data
            array_push($comment_arr['comments'], $comment_item);
        }

        // Turn output to JSON
        echo json_encode($comment_arr);
    }
} else {
    echo json_encode(
        array(
            'message' => 'Comment not Successful!',
            'status' => false,
        )
    );
}

// // Get row count
// $num = $result->rowCount();

// // Check if any post
// if ($num > 0) {
//     // gallery array
//     $gallery_arr = array();
//     $gallery_arr['data'] = array();
//     $row = $result->fetch(PDO::FETCH_ASSOC);

//     extract($row);

//     $gallery_item = array(
//         'id' => $id,
//         'image' => $image,
//         'alt_name' => $alt_name,
//     );

//     // Push to data
//     array_push($gallery_arr['data'], $gallery_item);

//     // Turn output to JSON
//     echo json_encode($gallery_arr);

// } else {
//     echo json_encode(
//         array(
//             'message' => 'No pictures found!'
//         )
//     );
// }
