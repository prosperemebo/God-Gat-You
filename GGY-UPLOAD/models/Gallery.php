<?php
class Gallery
{
    // DB stuff
    private $conn;
    private $table = 'gallery';

    // Properties
    public $id;
    public $user_id;
    public $image;
    public $name;
    public $alt_name;
    public $body;
    public $order;
    public $index;
    public $likes;
    public $comments;
    public $page;

    // Files
    public $gall_file;

    // Other
    public $generate;
    public $res;
    public $fileTempName;
    public $destination;
    public $gallPassed;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Read
    public function read()
    {
        // Query
        $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY `order` DESC';

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // Execute
        $stmt->execute();

        return $stmt;
    }

    public function getCmtNum($id)
    {
        $sql = "SELECT * FROM `comments` WHERE post_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            $num = $stmt->rowCount();
            return $num;
        }
    }

    // Read Index
    public function read_index()
    {

        $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY `order` DESC';

        $stmt = $this->conn->prepare($sql);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($stmt->execute()) {
            $result1 = $stmt;

            // Query
            $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY `order` DESC LIMIT ' . $this->page . ', ' . $this->index;

            // Prepare statement
            $stmt = $this->conn->prepare($sql);

            // Execute
            $stmt->execute();

            $result = $stmt;

            // Get row count
            $num = $result->rowCount();

            // Check if any post
            if ($num > 0) {
                // gallery array
                $gallery_arr = array();
                $gallery_arr['message'] = 'Found ' . $num . ' pictures!';
                $gallery_arr['index'] = $num;
                $gallery_arr['status'] = true;
                $gallery_arr['map'] = array();
                $gallery_arr['data'] = array();

                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $gallery_item = array(
                        'id' => $id,
                        'image_id' => $image_id,
                        'image' => $image,
                        'alt_name' => $alt_name,
                        'likes' => $likes,
                        'comments' => $this->comments,
                    );

                    $sql = "SELECT * FROM `comments` WHERE post_id = :id";

                    $stmt = $this->conn->prepare($sql);

                    $stmt->bindParam(':id', $image_id);

                    if ($stmt->execute()) {
                        $gallery_item['comments'] = $stmt->rowCount();

                        // Push to data
                        array_push($gallery_arr['data'], $gallery_item);
                    }
                }

                while ($row = $result1->fetch(PDO::FETCH_ASSOC)) {
                    array_push($gallery_arr["map"], $row['image_id']);
                }

                // Turn output to JSON
                return json_encode($gallery_arr);
            } else {
                return json_encode(
                    array(
                        'message' => 'No pictures found!',
                        'status' => false,
                    )
                );
            }
        }

        // Query
        // $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY `order` DESC';

        // // Prepare statement
        // $stmt = $this->conn->prepare($sql);

        // // Execute
        // if ($stmt->execute()) {

        //     $result = $stmt;

        //     // Get row count
        //     $num = $result->rowCount();

        //     // Check if any post
        //     if ($num > 0) {
        //         // wallpaper array
        //         $wallpaper_arr = array();
        //         $wallpaper_arr['message'] = 'Found ' . $num . ' wallpapers!';
        //         $wallpaper_arr['index'] = $num;
        //         $wallpaper_arr['data'] = array();

        //         while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        //             extract($row);

        //             $wallpaper_item = array(
        //                 'id' => $id,
        //                 'paper_id' => $paper_id,
        //                 'likes' => $likes,
        //                 'downloads' => $downloads,
        //                 'wallpaper_name' => $title,
        //                 'alt_name' => $alt_title,
        //                 'thumbnail' => $thumbnail,
        //             );

        //             // Push to data
        //             array_push($wallpaper_arr['data'], $wallpaper_item);
        //         }

        //         // Turn output to JSON
        //         return json_encode($wallpaper_arr);
        //     } else {
        //         return json_encode(
        //             array(
        //                 'message' => 'No wallpapers found!',
        //             )
        //         );
        //     }
        // }
    }


    public function read_single()
    {

        // Query
        $sql = 'SELECT * FROM ' . $this->table . ' WHERE image_id = :id';

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // Bind param
        $stmt->bindParam(':id', $this->id);

        // Execute
        $stmt->execute();

        // Fetch Data
        $paper = $stmt->fetch(PDO::FETCH_ASSOC);

        // Get row count
        $num = $stmt->rowCount();

        if ($num > 0) {
            $isLiked = null;

            if (isset($this->user_id)) {
                $sql = "SELECT * FROM `likes` WHERE `post_id` = :pid AND `user_id` = :uid";

                $stmt = $this->conn->prepare($sql);

                $stmt->bindParam(":pid", $this->id);
                $stmt->bindParam(":uid", $this->user_id);

                if ($stmt->execute()) {
                    // Fetch Data
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    if (empty($row)) {
                        $isLiked = false;
                    } else {
                        $isLiked = true;
                    }
                }
            }

            // gallery array
            $gallery_arr = array();
            $gallery_arr['message'] = 'Found ' . $num . ' picture!';

            extract($paper);

            $gallery_item = array(
                'id' => $id,
                'image_id' => $image_id,
                'image' => $image,
                'name' => $title,
                'alt_name' => $alt_name,
                'body' => $body,
                'likes' => $likes,
                'commentNum' => 0,
                'date' => $date,
                'liked' => $isLiked,
                'comments' => array(),
            );

            // Push to data
            $gallery_arr['data'] = $gallery_item;

            $sql = "SELECT * FROM `comments` WHERE post_id = :id";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':id', $this->id);

            if ($stmt->execute()) {
                $gallery_arr['data']['commentNum'] = $stmt->rowCount();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $comment_item = array(
                        'id' => $id,
                        'comment_id' => $comment_id,
                        'commenter' => $commenter,
                        'description' => $description,
                        'date' => $date,
                    );

                    // Push to data
                    array_push($gallery_arr['data']['comments'], $comment_item);
                }

                // Turn output to JSON
                return json_encode($gallery_arr);
            }
        } else {
            return json_encode(
                array(
                    'message' => 'No images found!',
                )
            );
        }
    }

    public function like()
    {
        // Query
        $sql = "SELECT * FROM `likes` WHERE post_id = :pid AND user_id = :uid";

        // Prepare Statement
        $stmt = $this->conn->prepare($sql);

        // Bind param
        $stmt->bindParam(':uid', $this->user_id);
        $stmt->bindParam(':pid', $this->id);

        // Execute
        $stmt->execute();

        // Fetch Data
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (empty($row)) {
            // Query
            $sql = "SELECT * FROM likes WHERE post_id = :wid";

            // Prepare statement
            $stmt = $this->conn->prepare($sql);

            // Bind param
            $stmt->bindParam(':wid', $this->id);

            if ($stmt->execute()) {
                // Fetch Data
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                $this->likes = $stmt->rowCount() + 1;

                if ($this->likes < 0) {
                    $this->likes = 0;
                }

                // Query
                $sql = "SELECT * FROM users WHERE user_id = :wid";

                // Prepare statement
                $stmt = $this->conn->prepare($sql);

                // Bind param
                $stmt->bindParam(':wid', $this->user_id);

                // Execute
                $stmt->execute();

                // Fetch Data
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!empty($row)) {
                    $userlikes = $row['likes'] + 1;

                    if ($userlikes < 0) {
                        $this->likes = 0;
                    }

                    // Query
                    $sql = "UPDATE " . $this->table . "
                            SET
                                likes = :likes
                            WHERE
                                image_id = :id
                        ";

                    // Prepare statement
                    $stmt = $this->conn->prepare($sql);

                    // Bind param
                    $stmt->bindParam(':likes', $this->likes);
                    $stmt->bindParam(':id', $this->id);

                    // Execute
                    if ($stmt->execute()) {
                        $this->res = true;
                    }

                    $sql = "UPDATE users
                            SET
                                likes = :likes
                            WHERE
                                user_id = :id
                        ";

                    // Prepare statement
                    $stmt = $this->conn->prepare($sql);

                    // Bind param
                    $stmt->bindParam(':likes', $userlikes);
                    $stmt->bindParam(':id', $this->user_id);

                    // Execute
                    if ($stmt->execute()) {
                        $this->res = true;
                    }

                    $sql = "INSERT INTO `likes` SET post_id = :pid, user_id = :ui";

                    // Prepare statement
                    $stmt = $this->conn->prepare($sql);

                    // Bind Data
                    $stmt->bindParam(':pid', $this->id);
                    $stmt->bindParam(':ui', $this->user_id);

                    // Execute
                    if ($stmt->execute()) {
                        $this->res = true;
                        $this->unliked = false;
                    }
                } else {
                    $this->res = false;
                }
            } else {
                $this->res = false;
            }
        } else {
            // Query
            $sql = "SELECT * FROM likes WHERE post_id = :wid";

            // Prepare statement
            $stmt = $this->conn->prepare($sql);

            // Bind param
            $stmt->bindParam(':wid', $this->id);

            // Execute
            $stmt->execute();

            // Fetch Data
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!empty($row)) {
                $this->likes = $stmt->rowCount() - 1;

                if ($this->likes < 0) {
                    $this->likes = 0;
                }

                // Query
                $sql = "SELECT * FROM users WHERE user_id = :wid";

                // Prepare statement
                $stmt = $this->conn->prepare($sql);

                // Bind param
                $stmt->bindParam(':wid', $this->user_id);

                // Execute
                $stmt->execute();

                // Fetch Data
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!empty($row)) {
                    $userlikes = $row['likes'] - 1;

                    if ($userlikes < 0) {
                        $userlikes = 0;
                    }

                    // Query
                    $sql = "UPDATE " . $this->table . "
                            SET
                                likes = :likes
                            WHERE
                                image_id = :id
                        ";

                    // Prepare statement
                    $stmt = $this->conn->prepare($sql);

                    // Bind param
                    $stmt->bindParam(':likes', $this->likes);
                    $stmt->bindParam(':id', $this->id);

                    // Execute
                    if ($stmt->execute()) {
                        $this->res = true;
                    }

                    $sql = "UPDATE users
                            SET
                                likes = :likes
                            WHERE
                                user_id = :id
                        ";

                    // Prepare statement
                    $stmt = $this->conn->prepare($sql);

                    // Bind param
                    $stmt->bindParam(':likes', $userlikes);
                    $stmt->bindParam(':id', $this->user_id);

                    // Execute
                    if ($stmt->execute()) {
                        $this->res = true;
                    }

                    $sql = "DELETE FROM `likes` WHERE `post_id` = :pid AND `user_id` = :ui";

                    // Prepare statement
                    $stmt = $this->conn->prepare($sql);

                    // Bind Data
                    $stmt->bindParam(':pid', $this->id);
                    $stmt->bindParam(':ui', $this->user_id);

                    // Execute
                    if ($stmt->execute()) {
                        $this->res = true;
                        $this->unliked = true;
                    }
                } else {
                    $this->res = false;
                }
            } else {
                $this->res = false;
            }
        }
    }

    public function upload()
    {
        $fileName = $this->gall_file['name'];
        $fileType = $this->gall_file['type'];
        $this->fileTempName = $this->gall_file['tmp_name'];
        $fileError = $this->gall_file['error'];
        $fileSize = $this->gall_file['size'];

        $fileExt = explode(".", $fileName);
        $fileActualExt = strtolower(end($fileExt));

        $allowed = array("jpg", "jpeg", "png", "gif");

        if (in_array($fileActualExt, $allowed)) {
            if ($fileError === 0) {
                if ($fileSize < 10000000) {
                    $this->image = $this->image . "." . uniqid("", true) . "." . $fileActualExt;
                    $this->destination = "../../../assets/uploads/gallery/gallery" . $this->image;

                    if (empty($this->alt_name)) {
                        header("Location: /dashboard/?upload=error");
                        exit();
                    } else {
                        $sql = "SELECT * FROM " . $this->table;

                        $stmt = $this->conn->prepare($sql);

                        if ($stmt->execute()) {
                            $row = $stmt->fetch(PDO::FETCH_ASSOC);
                            $this->order = $stmt->rowCount() + 1;
                            $this->likes = 0;
                            $this->id = $this->generate->create_id();

                            $date = date('Y-m-d');

                            $sql = "INSERT INTO " . $this->table . "
                                    SET `image_id` = :imgID,
                                        `image` = :img,
                                        `title` = :tit,
                                        `alt_name` = :alt,
                                        `body` = :bdy,
                                        `likes` = :lk,
                                        `order` = :ord,
                                        `date` = :dat
                                ";

                            $stmt = $this->conn->prepare($sql);

                            $stmt->bindParam(':imgID', $this->id);
                            $stmt->bindParam(':img', $this->image);
                            $stmt->bindParam(':tit', $this->name);
                            $stmt->bindParam(':alt', $this->alt_name);
                            $stmt->bindParam(':bdy', $this->body);
                            $stmt->bindParam(':lk', $this->likes);
                            $stmt->bindParam(':ord', $this->order);
                            $stmt->bindParam(':dat', $date);

                            if ($stmt->execute()) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }
                } else {
                    echo "Hey! Sorry The file size is too big; try contacting the developer Koda_P and the designer!";
                    return false;
                    exit();
                }
            } else {
                echo "Hey! Sorry there was an error :( please contact the developer; Koda_P";
                return false;
                exit();
            }
        } else {
            return false;
            echo "Hey! Sorry you need to upload a proper file type :(";
            exit();
        }
    }

    public function update()
    {

        $sql = "SELECT * FROM " . $this->table . " WHERE image_id = :pid";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":pid", $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $prevImg = $row['image'];

        if (isset($this->gall_file)) {
            $fileName = $this->gall_file['name'];
            $fileType = $this->gall_file['type'];
            $this->fileTempName = $this->gall_file['tmp_name'];
            $fileError = $this->gall_file['error'];
            $fileSize = $this->gall_file['size'];

            $fileExt = explode(".", $fileName);
            $fileActualExt = strtolower(end($fileExt));
        }

        $allowed = array("jpg", "jpeg", "png", "gif");

        if (isset($this->gall_file)) {
            if (in_array($fileActualExt, $allowed)) {
                if ($fileError === 0) {
                    if ($fileSize < 10000000) {
                        $this->image = $this->image . "." . uniqid("", true) . "." . $fileActualExt;
                        $this->destination = "../../../assets/uploads/gallery/gallery" . $this->image;

                        $this->gallPassed = true;
                    } else {
                        $this->gallPassed = false;
                    }
                } else {
                    $this->gallPassed = false;
                }
            } else {
                $this->gallPassed = false;
            }
        }

        $param = [];

        if ($this->gallPassed) {
            array_push($param, ' `image` = :img, ');
        }

        $sql = "UPDATE " . $this->table . "
                SET
                    `title` = :tit,
                    `alt_name` = :alt,
                    " . join("", $param) . "
                    `body` = :bdy WHERE `image_id` = :imgID
        ";

        $stmt = $this->conn->prepare($sql);

        if ($this->gallPassed) {
            $stmt->bindParam(':img', $this->image);
        }

        $stmt->bindParam(':tit', $this->name);
        $stmt->bindParam(':alt', $this->alt_name);
        $stmt->bindParam(':bdy', $this->body);
        $stmt->bindParam(':imgID', $this->id);

        if ($stmt->execute()) {

            if ($this->gallPassed) {
                unlink("../../../assets/uploads/gallery/gallery" . $prevImg);
            }

            return true;
        } else {
            return false;
        }
    }

    public function delete()
    {
        if ($this->id) {
            $sql = "SELECT * FROM " . $this->table . " WHERE image_id = :pid";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":pid", $this->id);

            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    extract($result);

                    $thumbnail = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/gallery/gallery' . $image;

                    if (unlink($thumbnail)) {
                        $sql = "DELETE FROM " . $this->table . " WHERE image_id = :pid";

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(":pid", $image_id);

                        if ($stmt->execute()) {
                            $sql = "DELETE FROM `comments` WHERE post_id = :pid";

                            $stmt = $this->conn->prepare($sql);

                            $stmt->bindParam(":pid", $image_id);

                            if ($stmt->execute()) {
                                $sql = "DELETE FROM `likes` WHERE post_id = :pid";

                                $stmt = $this->conn->prepare($sql);

                                $stmt->bindParam(":pid", $image_id);

                                if ($stmt->execute()) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        return false;
    }
}
