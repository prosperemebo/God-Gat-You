<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Post.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Post object
$post = new Post($db);

if (isset($_POST['postSubmit'])) {

    $post->alt_name = $_POST['altPostName'];
    $post->title = $_POST['postTitle'];
    $post->id = $_POST['postId'];
    $post->description = $_POST['postDesc'];
    $post->tags = $_POST['postSearchKeys'];

    if (isset($_FILES["imgPost"])) {
        $post->post_file = $_FILES["imgPost"];
        $post->image = strtolower(str_replace(" ", "-", $_POST['postTitle']));
    }

    if ($post->update()) {
        if ($post->postPassed) {
            move_uploaded_file($post->fileTempName, $post->destination);
        }

        header("Location: /dashboard/?update=success");
    } else {
        echo "Me i dont't know why dis stuff is not working!";
    }
}
