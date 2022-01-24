<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Gallery.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Gallery object
$gallery = new Gallery($db);

if (isset($_POST['gall-submit'])) {

    $gallery->image = $_POST['gall-filename'];
    $gallery->name = $_POST['gall-filename'];
    $gallery->body = $_POST['gall-body'];
    $gallery->alt_name = $_POST['gall-alt'];
    $gallery->gall_file = $_FILES["gall-file"];
    $gallery->generate = new Create_id($db);
    $gallery->generate->table = 'gallery';
    $gallery->generate->col = 'image_id';

    if (empty($_POST['gall-filename'])) {
        $gallery->image = 'gallery';
    } else {
        $gallery->image = strtolower(str_replace(" ", "-", $gallery->image));
    }

    if ($gallery->upload()) {
        echo "upload success!";
        move_uploaded_file($gallery->fileTempName, $gallery->destination);
        header("Location: /dashboard/?upload=success");
    } else {
        echo "Me i dont't know why dis stuff is not working!";
    }

}
