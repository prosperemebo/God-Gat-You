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
    $wallpaper->alt_name = $_POST['wall-alt'];
    $wallpaper->name = $_POST['wall-name'];
    $wallpaper->id = $_POST['wall-id'];
    $wallpaper->body = $_POST["wall-body"];

    // echo $_POST['wall-alt'];
    // echo "<br>";
    // echo $wallpaper->name;
    // echo "<br>";
    // echo $wallpaper->body;

    if (isset($_FILES["wall-thumbfile"])) {
        $wallpaper->thumbFile = $_FILES["wall-thumbfile"];
        $wallpaper->thumbnail = $_POST['wall-name'] . ' thumbanail';
        $wallpaper->thumbnail = str_replace(".", "", $wallpaper->thumbnail);
    }

    if (isset($_FILES["wall-deskfile"])) {
        $wallpaper->deskFile = $_FILES["wall-deskfile"];
        $wallpaper->desktop = 'GOD GAT YOU ' . $_POST['wall-name'] . ' Wallpaper Desktop__' . uniqid("", true);
        $wallpaper->desktop = str_replace(".", "", $wallpaper->desktop);
    }

    if (isset($_FILES["wall-tabfile"])) {
        $wallpaper->tabFile = $_FILES["wall-tabfile"];
        $wallpaper->tablet = 'GOD GAT YOU ' . $_POST['wall-name'] . ' Wallpaper Tablet__' . uniqid("", true);
        $wallpaper->tablet = str_replace(".", "", $wallpaper->tablet);
    }

    if (isset($_FILES["wall-mobfile"])) {
        $wallpaper->mobFile = $_FILES["wall-mobfile"];
        $wallpaper->mobile = 'GOD GAT YOU ' . $_POST['wall-name'] . ' Wallpaper Mobile__' . uniqid("", true);
        $wallpaper->mobile = str_replace(".", "", $wallpaper->mobile);
    }

    if (!$wallpaper->update()) {
        header("Location: /dashboard/?upload=error");

        echo json_encode(
            array(
                'message' => 'Update Failed!',
                'status' => false,
            )
        );
    } else {

        echo json_encode(
            array(
                'message' => 'Update Success!',
                'status' => true,
            )
        );

        if ($wallpaper->thumbPassed) {
            if (isset($wallpaper->thumbFileTempName) && isset($wallpaper->thumbFileDestination)) {
                if (unlink($_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/wallpaper' . $wallpaper->pthumbnail)) {
                    move_uploaded_file($wallpaper->thumbFileTempName, $wallpaper->thumbFileDestination);
                }
            }
        }

        if ($wallpaper->deskPassed) {
            if (isset($wallpaper->deskFileTempName) && isset($wallpaper->deskFileDestination)) {
                if (unlink($_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/' . $wallpaper->pdesktop)) {
                    move_uploaded_file($wallpaper->deskFileTempName, $wallpaper->deskFileDestination);
                }
            }
        }

        if ($wallpaper->tabPassed) {
            if (isset($wallpaper->tabFileTempName) && isset($wallpaper->tabFileDestination)) {
                if (unlink($_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/' . $wallpaper->ptablet)) {
                    move_uploaded_file($wallpaper->tabFileTempName, $wallpaper->tabFileDestination);
                }
            }
        }

        if ($wallpaper->mobPassed) {
            if (isset($wallpaper->mobFileTempName) && isset($wallpaper->mobFileDestination)) {
                if (unlink($_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/' . $wallpaper->pmobile)) {
                    move_uploaded_file($wallpaper->mobFileTempName, $wallpaper->mobFileDestination);
                }
            }
        }

        header("Location: /dashboard/?update=success");

    }
}
