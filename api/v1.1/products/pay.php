<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Database.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/config/Create_id.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/models/Product.php';

// Instantiate a new DB and connect
$database = new Database();
$db = $database->connect();

// Instantiate product
$product = new Product($db);

if (isset($_POST['productCheckout'])) {
    $customer_firstname = htmlspecialchars(strip_tags($_POST['first']));
    $customer_lastname = htmlspecialchars(strip_tags($_POST['last']));
    $customer_email = htmlspecialchars(strip_tags($_POST['email']));
    $customer_phone = htmlspecialchars(strip_tags($_POST['phone']));
    $uid = htmlspecialchars(strip_tags($_POST['uid']));
    $purchase_description = htmlspecialchars(strip_tags($_POST['desc']));

    $pid = new Create_id($db);
    $pid->table = 'purchaseindemand';
    $pid->col = 'purchase_id';
    $pid = $pid->create_id();

    $amount = $_POST['amount'];

    $realAmount = json_decode($amount);
    $actualAmount = +0;

    // while ($product = $amount) {
    //     // $sql = 'SELECT
    //     //      c.category_name as category_name,
    //     //      p.id,
    //     //      p.product_id,
    //     //      p.category_id,
    //     //      p.product_desc,
    //     //      p.price,
    //     //      p.image,
    //     //      p.alt_name
    //     //     FROM
    //     //      products p
    //     //      LEFT JOIN
    //     //       category c ON p.category_id = c.category_id WHERE product_id = :id
    //     // ';

    //     // $stmt = $db->prepare($sql);

    //     // $stmt->bindParam(':id', $product->product_id);

    //     // // EXECUTE
    //     // $stmt->execute();

    //     // $result = $stmt->fetch(PDO::FETCH_ASSOC);

    //     // $actualAmount = $actualAmount + ($result['price'] * $product->quantity);
    //     print_r($product);
    // }

    foreach ($realAmount as $product => $good) {

        $sql = "SELECT * FROM products WHERE product_id = :id";

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':id', $good->id);

        //   EXECUTE
        if (
            $stmt->execute()
        ) {

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            // print_r($stmt);

            if ($result) {
                $actualAmount += ($result['price'] * $good->quantity);
            }
        }
    }

    $sql = "INSERT INTO `purchaseindemand`
                SET
            `amount-paid` = :amt,
            userID = `:uid`,
            `first-name` = :fnm,
            `last-name` = `:lnm`,
            `mobile-number` = `:mnm`,
            `message` = :msg,
            `email` = :eml,
            `status` = `0`
    ";

    $sql = "INSERT INTO purchaseindemand(`amount-paid`, userID, purchase_id, `first-name`, `last-name`, `mobile-number`, `message`, email, `status`) VALUES (?,?,?,?,?,?,?,?,?)";

    $stmt = $db->prepare($sql);
    $sts = 0;

    $stmt->bindParam(1, $actualAmount);
    $stmt->bindParam(2, $uid);
    $stmt->bindParam(3, $pid);
    $stmt->bindParam(4, $customer_firstname);
    $stmt->bindParam(5, $customer_lastname);
    $stmt->bindParam(6, $customer_phone);
    $stmt->bindParam(7, $purchase_description);
    $stmt->bindParam(8, $customer_email);
    $stmt->bindParam(9, $sts);

    print_r($stmt);

    if ($stmt->execute()) {
        header("Location: /store/pay/?pay=" . $pid);
    }
}
