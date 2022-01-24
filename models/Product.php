<?php
class Product
{
    // DB stuff
    private $conn;
    private $table = 'products';

    // Properties
    public $id;
    public $product_id;
    public $category_id;
    public $product_desc;
    public $price;
    public $image;
    public $alt_name;
    public $index;
    public $page;
    public $name;
    public $generate;
    public $file;
    public $destination;
    public $tmp_name;
    public $prodpassed;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Read all posts
    public function read()
    {
        // Query
        $sql = 'SELECT
                c.category_name as category_name,
                p.id,
                p.product_id,
                p.category_id,
                p.product_desc,
                p.price,
                p.image,
                p.alt_name
                FROM
                ' . $this->table . ' p
                LEFT JOIN
                category c ON p.category_id = c.category_id ORDER BY id DESC';

        // Prepare
        $stmt = $this->conn->prepare($sql);

        // Execute
        $stmt->execute();

        return $stmt;
    }

    // Read all posts
    public function read_purchases()
    {
        // Query
        $sql = 'SELECT * FROM purchaseindemand ORDER BY id DESC';

        // Prepare
        $stmt = $this->conn->prepare($sql);

        // Execute
        $stmt->execute();

        return $stmt;
    }

    // Read all product from a specifc category
    public function readProducts()
    {
        $sql = "SELECT * FROM `category` WHERE category_id = :cid";


        // Prepare
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':cid', $this->category_id);

        // Execute
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->name = $result['category_name'];

        // Query
        $sql = 'SELECT
                c.category_name as category_name,
                p.id,
                p.product_id,
                p.category_id,
                p.product_desc,
                p.price,
                p.image,
                p.alt_name
                FROM
                ' . $this->table . ' p
                LEFT JOIN
                category c ON p.category_id = c.category_id WHERE p.category_id = :cid ORDER BY id DESC';

        // Prepare
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':cid', $this->category_id);

        // Execute
        $stmt->execute();

        return $stmt;
    }

    // Read index
    public function read_index()
    {
        // Query
        $sql = 'SELECT
             c.category_name as category_name,
             p.id,
             p.product_id,
             p.category_id,
             p.product_desc,
             p.price,
             p.image,
             p.alt_name
            FROM
             ' . $this->table . ' p
             LEFT JOIN
              category c ON p.category_id = c.category_id ORDER BY id DESC LIMIT ' . $this->page . ', ' . $this->index;

        $stmt = $this->conn->prepare($sql);

        // EXECUTE
        $stmt->execute();

        return $stmt;
    }

    // Read an amout of products from a specific category
    public function readProductsIndex()
    {
        // Query
        $sql = 'SELECT
             c.category_name as category_name,
             p.id,
             p.product_id,
             p.category_id,
             p.product_desc,
             p.price,
             p.image,
             p.alt_name
            FROM
             ' . $this->table . ' p
             LEFT JOIN
              category c ON p.category_id = c.category_id WHERE p.category_id = :cid ORDER BY id DESC LIMIT ' . $this->page . ', ' . $this->index;

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':cid', $this->category_id);

        // EXECUTE
        $stmt->execute();

        return $stmt;
    }

    // Read Single
    public function read_single()
    {
        // Query
        // $sql = 'SELECT
        //      `id`,
        //      product_id,
        //      category_id,
        //      product_desc,
        //      price,
        //      `image`,
        //      alt_name
        //     FROM
        //      `products`
        //     WHERE product_id = :id
        // ';

        $sql = 'SELECT
             c.category_name as category_name,
             p.id,
             p.product_id,
             p.category_id,
             p.product_desc,
             p.price,
             p.image,
             p.alt_name
            FROM
             ' . $this->table . ' p
             LEFT JOIN
              category c ON p.category_id = c.category_id WHERE product_id = :id';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $this->id);

        // EXECUTE
        $stmt->execute();

        return $stmt;
    }

    // Read Single
    public function read_single_purchase()
    {

        $sql = 'SELECT * FROM purchaseindemand WHERE purchase_id = :id';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $this->id);

        // EXECUTE
        $stmt->execute();

        return $stmt;
    }

    // Read Single
    public function read_single_purchase_user()
    {

        $sql = 'SELECT * FROM purchaseindemand WHERE userID = :id AND `status` = "0"';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $this->id);

        // EXECUTE
        $stmt->execute();

        return $stmt;
    }

    public function readCategory()
    {
        // Query
        $sql = 'SELECT * FROM `category`';

        // Prepare
        $stmt = $this->conn->prepare($sql);

        // Execute
        $stmt->execute();

        // Get row count
        $num = $stmt->rowCount();

        // Check if any product
        if ($num > 0) {
            // product array
            $category_arr = array();
            $category_arr['message'] = 'Found ' . $num . ' categories!';
            $category_arr['index'] = $num;
            $category_arr['data'] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $categories = array(
                    'id' => $category_id,
                    'name' => $category_name
                );

                // $sql = "SELECT * FROM `products` WHERE category_id = :cid";

                // $stmt = $this->conn->prepare($sql);

                // $stmt->bindParam(":cid", $category_id);

                // $stmt->execute();

                // $prodNum = $stmt->rowCount();

                // $categories['products'] = $prodNum;

                // Push to data
                array_push($category_arr['data'], $categories);
            }

            // Turn output to JSON
            return json_encode($category_arr);
        } else {
            return json_encode(
                array(
                    'message' => 'No category found!'
                )
            );
        }
    }

    public function uploadCategory()
    {
        $sql = "SELECT * FROM category;";
        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        $rowCount = $stmt->rowCount();
        $setCategoryOrder = $rowCount + 1;

        $sql = "INSERT INTO category
                        SET
                            category_id = :cid,
                            category_name = :cname,
                            `order` = :ord
            ";

        $stmt = $this->conn->prepare($sql);

        $this->id = $this->generate->create_id();

        // echo $setCategoryOrder;
        // echo '<br/>';
        // echo $this->id;
        // echo '<br/>';
        // echo $this->name;

        $stmt->bindParam(':cid', $this->id);
        $stmt->bindParam(':cname', $this->name);
        $stmt->bindParam(':ord', $setCategoryOrder);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function updateCategory()
    {
        $sql = "UPDATE category
            SET
                category_name = :cname
            WHERE
                category_id = :cid
        ";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':cid', $this->id);
        $stmt->bindParam(':cname', $this->name);

        // Execute query
        if ($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    public function uploadProduct()
    {
        $fileName = $this->file['name'];
        $fileType = $this->file['type'];
        $this->tmp_name = $this->file['tmp_name'];
        $fileError = $this->file['error'];
        $fileSize = $this->file['size'];

        $fileExt = explode('.', $fileName);
        $fileActualExt = strtolower(end($fileExt));

        $allowed = array("jpg", "jpeg", "png", "gif");

        if (in_array($fileActualExt, $allowed)) {
            if ($fileError == 0) {
                if ($fileSize < 10000000) {

                    $imageFullName = $this->name . "." . uniqid("", true) . "." . $fileActualExt;
                    $this->destination = "../../../assets/uploads/store/" . $imageFullName;

                    if (empty($this->price)) {
                        return false;
                        exit();
                    } else {

                        $sql = "SELECT * FROM products";

                        // Prepare
                        $stmt = $this->conn->prepare($sql);

                        // Execute
                        $stmt->execute();

                        $setProductOrder = $stmt->rowCount() + 1;

                        $this->id = $this->generate->create_id();

                        $sql = "INSERT INTO products
                                        SET
                                            `product_id` = :pid,
                                            `category_id` = :cid,
                                            `product_desc` = :pdes,
                                            `price` = :prc,
                                            `image` = :img,
                                            `order` = :ord,
                                            `alt_name` = :anm
                            ";

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':pid', $this->id);
                        $stmt->bindParam(':cid', $this->category_id);
                        $stmt->bindParam(':pdes', $this->product_desc);
                        $stmt->bindParam(':prc', $this->price);
                        $stmt->bindParam(':img', $imageFullName);
                        $stmt->bindParam(':ord', $setProductOrder);
                        $stmt->bindParam(':anm', $this->alt_name);

                        // Execute query
                        if ($stmt->execute()) {
                            return true;
                        }

                        // Print error if something goes wrong
                        printf("Error: %s.\n", $stmt->error);

                        return false;
                    }
                }
            } else {
                echo "Hey! Sorry there was an error :( please contact the developer; Koda_P";
                exit();
            }
        } else {
            echo "Hey! Sorry you need to upload a proper file type :(";
            exit();
        }
    }

    public function update()
    {
        $sql = "SELECT * FROM products WHERE product_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id", $this->id);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $previmg = $result["image"];

        if (isset($this->file)) {
            $fileName = $this->file['name'];
            $fileType = $this->file['type'];
            $this->tmp_name = $this->file['tmp_name'];
            $fileError = $this->file['error'];
            $fileSize = $this->file['size'];

            $fileExt = explode('.', $fileName);
            $fileActualExt = strtolower(end($fileExt));
        }

        $allowed = array("jpg", "jpeg", "png", "gif");

        if (isset($this->file)) {
            if (in_array($fileActualExt, $allowed)) {
                if ($fileError == 0) {
                    if ($fileSize < 10000000) {

                        $imageFullName = $this->name . "." . uniqid("", true) . "." . $fileActualExt;
                        $this->destination = "../../../assets/uploads/store/" . $imageFullName;
                        $this->prodpassed = true;
                    } else {
                        $this->prodpassed = false;
                    }
                } else {
                    $this->prodpassed = false;
                }
            } else {
                $this->prodpassed = false;
            }
        }

        if (empty($this->price)) {
            return false;
            exit();
        } else {

            $param = [];

            if ($this->prodpassed) {
                array_push($param, ' `image` = :img, ');
            }

            $sql = "UPDATE products
                SET
                    `category_id` = :cid,
                    `product_desc` = :pdes,
                    `price` = :prc,
                    " . join("", $param) . "
                    `alt_name` = :anm WHERE product_id = :pid
            ";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':cid', $this->category_id);
            $stmt->bindParam(':pid', $this->id);
            $stmt->bindParam(':pdes', $this->product_desc);
            $stmt->bindParam(':prc', $this->price);

            if ($this->prodpassed) {
                $stmt->bindParam(':img', $imageFullName);
            }

            $stmt->bindParam(':anm', $this->alt_name);

            // Execute query
            if ($stmt->execute()) {
                if ($this->prodpassed) {
                    unlink("../../../assets/uploads/store/" . $previmg);
                }

                return true;
            }

            // Print error if something goes wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }
    }

    public function delete()
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE product_id = :pid";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":pid", $this->id);

        if ($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $image = $result['image'];

            $sql = "DELETE FROM " . $this->table . " WHERE product_id = :pid";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':pid', $this->id);

            if ($stmt->execute()) {
                if (unlink("../../../assets/uploads/store/" . $image)) {
                    return true;
                }
            }
        }

        return false;
    }

    public function delete_purchase()
    {
        $sql = "DELETE FROM purchaseindemand WHERE purchase_id = :pid";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':pid', $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function deleteCategory()
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE category_id = :pid";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":pid", $this->id);

        if ($stmt->execute()) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                unlink("../../../assets/uploads/store/" . $image);
            }

            $sql = "DELETE FROM " . $this->table . " WHERE category_id = :pid";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':pid', $this->id);

            if ($stmt->execute()) {
                $sql = "DELETE FROM category WHERE category_id = :pid";

                $stmt = $this->conn->prepare($sql);

                $stmt->bindParam(':pid', $this->id);

                if ($stmt->execute()) {
                    return true;
                }
            }
        }

        return false;
    }
}
