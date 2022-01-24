<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Wallpaper.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Wallpaper object
$wallpaper = new Wallpaper($db);

if (isset($_POST['wall-submit'])) {
    $wallpaper->thumbnail = $_POST['wall-name'] . ' thumbanail';

    $wallpaper->thumbnail = str_replace(".", "", $wallpaper->thumbnail);

    $wallpaper->desktop = 'GOD GAT YOU ' . $_POST['wall-name'] . ' Wallpaper Desktop__' . uniqid("", true);

    $wallpaper->desktop = str_replace(".", "", $wallpaper->desktop);

    $wallpaper->tablet = 'GOD GAT YOU ' . $_POST['wall-name'] . ' Wallpaper Tablet__' . uniqid("", true);

    $wallpaper->tablet = str_replace(".", "", $wallpaper->tablet);

    $wallpaper->mobile = 'GOD GAT YOU ' . $_POST['wall-name'] . ' Wallpaper Mobile__' . uniqid("", true);

    $wallpaper->mobile = str_replace(".", "", $wallpaper->mobile);

    $wallpaper->alt_name = $_POST['wall-alt'];
    $wallpaper->name = $_POST['wall-name'];
    $wallpaper->body = $_POST["download-appreciation"];
    $wallpaper->res = new Create_id($db);
    $wallpaper->res->table = 'wallpapers';
    $wallpaper->res->col = 'paper_id';

    $wallpaper->thumbFile = $_FILES["wall-thumbfile"];
    $wallpaper->deskFile = $_FILES["wall-deskfile"];
    $wallpaper->tabFile = $_FILES["wall-tabfile"];
    $wallpaper->mobFile = $_FILES["wall-mobfile"];

    if (!$wallpaper->upload()) {
        header("Location: /dashboard/?upload=error");

        echo json_encode(
            array(
                'message' => 'Upload Failed!',
                'status' => false,
            )
        );
    } else {
        header("Location: /dashboard/?upload=success");

        echo json_encode(
            array(
                'message' => 'Upload Success!',
                'status' => true,
            )
        );

        move_uploaded_file($wallpaper->thumbFileTempName, $wallpaper->thumbFileDestination);
        move_uploaded_file($wallpaper->deskFileTempName, $wallpaper->deskFileDestination);
        move_uploaded_file($wallpaper->tabFileTempName, $wallpaper->tabFileDestination);
        move_uploaded_file($wallpaper->mobFileTempName, $wallpaper->mobFileDestination);
    }
}
