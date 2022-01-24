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

$admin->token = isset($_GET['token']) ? $_GET['token'] : die();

// Product query
$result = $admin->read();

if ($admin->allAccess) {
    // Get row count
    $num = $result->rowCount();

    // Check if any admin
    if ($num > 0 && isset($result)) {
        // admin array

        $num = $num - 1;

        $admin_arr = array();
        $admin_arr['message'] = 'Found ' . intval($num) . ' administrators!';
        $admin_arr['index'] = $num;
        $admin_arr['status'] = true;
        $admin_arr['access'] = true;
        $admin_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            if ($username !== 'super') {
                $admin_item = array(
                    'id' => $id,
                    'username' => $username,
                    'token' => $token,
                    'status' => $status,
                );

                // Push to data
                array_push($admin_arr['data'], $admin_item);
            }
        }

        // Turn output to JSON
        echo json_encode($admin_arr);
    } else {
        echo json_encode(
            array(
                'message' => 'No administrators found!',
                'status' => false,
                'access' => true,
            )
        );
    }
} else {
    echo json_encode(
        array(
            'message' => 'Access denied!',
            'access' => false,
        )
    );
}
