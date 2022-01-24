<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Gallery.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate gallery
$gallery = new Gallery($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
if (isset($data->id)) {
    $gallery->user_id = $data->id;
}
$gallery->id = $data->gallery;

// Gallery query
$result = $gallery->read_single();

echo $result;

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
