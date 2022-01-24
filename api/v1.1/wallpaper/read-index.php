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

// Get amount from url
$wallpaper->index = isset($_GET['a']) ? $_GET['a'] : die();
$wallpaper->page = isset($_GET['p']) ? $_GET['p'] : die();

// Fix page
$wallpaper->page = ($wallpaper->page - 1) * $wallpaper->index;

// Wallpaper query
$result = $wallpaper->read_index();
$result2 = $wallpaper->read();

// Get row count
$num = $result->rowCount();

// Check if any post
if ($num > 0) {
    // wallpaper array
    $wallpaper_arr = array();
    $wallpaper_arr['message'] = 'Found ' . $num . ' wallpapers!';
    $wallpaper_arr['index'] = $num;
    $wallpaper_arr['map'] = array();
    $wallpaper_arr['data'] = array();
    $wallpaper_arr['status'] = true;

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $wallpaper_item = array(
            'id' => $id,
            'paper_id' => $paper_id,
            'wallpaper_name' => $title,
            'alt_name' => $alt_title,
            'thumbnail' => $thumbnail,
        );

        // Push to data
        array_push($wallpaper_arr['data'], $wallpaper_item);
    }

    while ($row = $result2->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $wallpaper_item = $paper_id;

        // Push to data
        array_push($wallpaper_arr['map'], $wallpaper_item);
    }

    // Turn output to JSON
    echo json_encode($wallpaper_arr);
} else {
    echo json_encode(
        array(
            'message' => 'No wallpapers found!',
            'status' => false,
        )
    );
}
