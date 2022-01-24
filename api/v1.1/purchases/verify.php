<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

$ref = $_GET['reference'];
$id = $_GET['id'];

if ($ref == '' || $id == '') {
    header("Location: javascript://history.go(-1)");
}

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.paystack.co/transaction/verify/" . rawurlencode($ref),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
        "Authorization: Bearer sk_test_5183072f15d02ccdb453b2165b441c194525ffea",
        "Cache-Control: no-cache",
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    // echo $response;
    $result = json_decode($response);
}

if ($result->data->status == "success") {
    $status = true;
    $reference = $result->data->reference;
    date_default_timezone_set('Africa/Lagos');
    $Date_time = date('m/d/Y h:i:s a', time());

    $sql = "SELECT * FROM purchaseindemand WHERE purchase_id = :id";

    $stmt = $db->prepare($sql);

    $stmt->bindParam(":id", $id);

    if ($stmt->execute()) {
        $num = $stmt->rowCount();

        if ($num > 0) {

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            $sql = "UPDATE purchaseindemand
                SET
              reference = :rfr,
              status = 1
                WHERE
              purchase_id = :pid
      ";

            // $sql = "UPDATE purchaseindemand SET (`reference`, `status`) VALUES (?,?) WHERE purchase_id = ?";

            $sts = 0;

            $stmt = $db->prepare($sql);

            $stmt->bindParam(":rfr", $reference);
            $stmt->bindParam(":pid", $id);

            if (!$stmt->execute()) {
                echo 'There was an error during transaction';
                exit;
            } else {
                header("Location: /store/purchase/?purchase=success&id=" . $id);
                exit;
            }
        }
    } else {
        echo 'Invalid purchase id!';
    }
} else {
    header("Location: /store/purchase/?purchase=error");
    exit;
}
