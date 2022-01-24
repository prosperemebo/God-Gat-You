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

// Get amount from url
$gallery->index = isset($_GET['a']) ? $_GET['a'] : die();
$gallery->page = isset($_GET['p']) ? $_GET['p'] : die();

// Fix page
$gallery->page = ($gallery->page - 1) * $gallery->index;

// Gallery query
$result = $gallery->read_index();

echo $result;
