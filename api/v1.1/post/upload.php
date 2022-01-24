<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Post.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate a new Post object
$post = new Post($db);

if (isset($_POST['postSubmit'])) {
    $post->image = strtolower(str_replace(" ", "-", $_POST['postTitle']));
    $post->alt_name = $_POST['altPostName'];
    $post->title = $_POST['postTitle'];
    $post->description = $_POST['postDesc'];
    $post->tags = $_POST['postSearchKeys'];
    $post->generate = new Create_id($db);
    $post->generate->table = 'posts';
    $post->generate->col = 'post_id';

    $post->post_file = $_FILES["imgPost"];

    if ($post->upload()) {
        echo "upload success!";
        move_uploaded_file($post->fileTempName, $post->destination);
        header("Location: /dashboard/?upload=success");
    } else {
        echo "Me i dont't know why dis stuff is not working!";
    }

}
