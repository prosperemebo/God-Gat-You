<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Wallpaper.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate wallpaper
$wallpaper = new Wallpaper($db);

// Get data
$data = json_decode(file_get_contents('php://input'));

// Set id
if (isset($data->id)) {
    $wallpaper->user_id = $data->id;
}
$wallpaper->id = $data->wallpaper;

// Wallpaper query
$result = $wallpaper->read_single();

echo $result;

// Get row count
// $num = $result->rowCount();

// // Check if any post
// if ($num > 0) {
//     // wallpaper array
//     $wallpaper_arr = array();
//     $wallpaper_arr['message'] = 'Found '.$num.' wallpaper!';
//     $wallpaper_arr['data'] = array();
//     $row = $result->fetch(PDO::FETCH_ASSOC);

//     extract($row);

//     $wallpaper_item = array(
//             'id' => $id,
//             'paper_id' => $paper_id,
//             'wallpaper_name' => $title,
//             'alt_name' => $alt_title,
//             'thumbnail' => $thumbnail,
//             'likes' => $likes,
//             'downloads' => $downloads,
//             'body' => $body
//         );

//     // Push to data
//     array_push($wallpaper_arr['data'], $wallpaper_item);

//     // Turn output to JSON
//     echo json_encode($wallpaper_arr);

// } else {
//     echo json_encode(
//         array(
//             'message' => 'No wallpaper found!'
//         )
//     );
// }
