<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Gallery.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate gallery
$gallery = new Gallery($db);

// Wallpaper query
$result = $gallery->read();

// Get row count
$num = $result->rowCount();

// Check if any post
if ($num > 0) {
    // gallery array
    $gallery_arr = array();
    $gallery_arr['message'] = 'Found ' . $num . ' images!';
    $gallery_arr['index'] = $num;
    $gallery_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $gallery_item = array(
            'id' => $id,
            'image_id' => $image_id,
            'image' => $image,
            'alt_name' => $alt_name,
            'title' => $title,
            'likes' => $likes,
            'comments' => $gallery->getCmtNum($image_id),
        );

        // Push to data
        array_push($gallery_arr['data'], $gallery_item);
    }

    // Turn output to JSON
    echo json_encode($gallery_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No pictures found!',
        )
    );
}
