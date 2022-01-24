<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Gallery.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Gallery object
$gallery = new Gallery($db);
echo "hey";
if (isset($_POST['gall-submit'])) {

    if (isset($_FILES["gall-file"])) {
        $gallery->image = $_POST['gall-filename'];
        $gallery->gall_file = $_FILES["gall-file"];
        $gallery->image = strtolower(str_replace(" ", "-", $gallery->image));
    }

    $gallery->name = $_POST['gall-filename'];
    $gallery->body = $_POST['gall-body'];
    $gallery->id = $_POST['gall-id'];
    $gallery->alt_name = $_POST['gall-alt'];

    if ($gallery->update()) {
        echo "update success!";
        move_uploaded_file($gallery->fileTempName, $gallery->destination);
        header("Location: /dashboard/?update=success");
    } else {
        echo "Me i dont't know why dis stuff is not working!";
    }
}
