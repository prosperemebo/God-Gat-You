<?php
header('Allow-Control-Access-Origin: *');
header('Content-Type: application/json');
header('Author: GOD GAT YOU Reframed by Prosper Emebo');

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Admin.php';

// Instantiate database and connect
$database = new Database();
$db = $database->connect();

// Instantiate admin
$admin = new Admin($db);

// access Token
$admin->token = isset($_GET['token']) ? $_GET['token'] : die();

// ID the admin you want
$admin->id = isset($_GET['id']) ? $_GET['id'] : die();

if ($admin->delete()) {
    if ($admin->allAccess) {
        echo json_encode(
            array(
                'message' => 'Admin Delete Success, your application will reload in a while!',
                'status' => true,
            )
        );
    } else {
        echo json_encode(
            array(
                'message' => 'Access denied!',
                'access' => false,
            )
        );
    }
} else {
    echo json_encode(
        array(
            'message' => 'Admin delete unsuccessful!',
            'status' => false,
        )
    );
}
