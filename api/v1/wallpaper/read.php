<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Wallpaper.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate wallpaper
$wallpaper = new Wallpaper($db);

// Wallpaper query
$result = $wallpaper->read();

// Get row count
$num = $result->rowCount();

// Check if any post
if ($num > 0) {
    // wallpaper array
    $wallpaper_arr = array();
    $wallpaper_arr['message'] = 'Found ' . $num . ' wallpapers!';
    $wallpaper_arr['index'] = $num;
    $wallpaper_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $wallpaper_item = array(
            'id' => $id,
            'paper_id' => $paper_id,
            'likes' => $likes,
            'downloads' => $downloads,
            'wallpaper_name' => $title,
            'alt_name' => $alt_title,
            'thumbnail' => $thumbnail,
        );

        // Push to data
        array_push($wallpaper_arr['data'], $wallpaper_item);
    }

    // Turn output to JSON
    echo json_encode($wallpaper_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No wallpapers found!',
        )
    );
}
