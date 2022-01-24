<?php
class Post
{
    // DB stuff
    private $conn;
    private $table = 'posts';

    // Properties
    public $id;
    public $cid;
    public $post_id;
    public $user_id;
    public $views;
    public $comments_num;
    public $likes;
    public $title;
    public $tags;
    public $description;
    public $image;
    public $date;
    public $alt_name;
    public $index;
    public $page;
    public $query;
    public $res;
    public $generate;
    public $unliked;
    public $postPassed;

    // Files
    public $post_file;

    // Temp name
    public $fileTempName;

    // Destination
    public $destination;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Read all posts
    public function read()
    {

        $sql = "SELECT * FROM `comments` WHERE post_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            $this->comments = $stmt->rowCount();

            // Query
            $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY `order` DESC';

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
                $post_arr = array();
                $post_arr['message'] = 'Found ' . $num . ' posts!';
                $post_arr['index'] = $num;
                $post_arr['status'] = true;
                $post_arr['data'] = array();

                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $post_item = array(
                        'id' => $id,
                        'post_id' => $post_id,
                        'post_name' => $title,
                        'body' => $description,
                        'image' => $image,
                        'date' => $date,
                        'alt_name' => $alt_name,
                        'views' => $views,
                        'comments' => $this->comments,
                        'likes' => $likes,
                        'tags' => $tags,
                    );

                    $sql = "SELECT * FROM `comments` WHERE post_id = :id";

                    $stmt = $this->conn->prepare($sql);

                    $stmt->bindParam(':id', $post_id);

                    if ($stmt->execute()) {
                        $post_item['comments'] = $stmt->rowCount();

                        // Push to data
                        array_push($post_arr['data'], $post_item);
                    }
                }

                // Turn output to JSON
                return json_encode($post_arr, JSON_UNESCAPED_UNICODE);
            } else {
                return json_encode(
                    array(
                        'message' => 'No posts found!',
                        'status' => false,
                    )
                );
            }
        }
    }

    // Read Index
    public function read_index()
    {

        $sql = "SELECT * FROM `comments` WHERE post_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
            $this->comments = $stmt->rowCount();

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
                $post_arr = array();
                $post_arr['message'] = 'Found ' . $num . ' posts!';
                $post_arr['index'] = $num;
                $post_arr['status'] = true;
                $post_arr['data'] = array();

                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $post_item = array(
                        'id' => $id,
                        'post_id' => $post_id,
                        'post_name' => $title,
                        'body' => $description,
                        'image' => $image,
                        'date' => $date,
                        'alt_name' => $alt_name,
                        'views' => $views,
                        'comments' => $this->comments,
                        'likes' => $likes,
                        'tags' => $tags,
                    );

                    $sql = "SELECT * FROM `comments` WHERE post_id = :id";

                    $stmt = $this->conn->prepare($sql);

                    $stmt->bindParam(':id', $post_id);

                    if ($stmt->execute()) {
                        $post_item['comments'] = $stmt->rowCount();

                        // Push to data
                        array_push($post_arr['data'], $post_item);
                    }
                }

                // Turn output to JSON
                return json_encode([
                    'message' => 'Found ' . $num . ' posts!',
                    'index' => $num,
                    'status' => true,
                    'data' => $post_arr['data']
                    ], JSON_UNESCAPED_UNICODE);
            } else {
                return json_encode(
                    array(
                        'message' => 'No posts found!',
                        'status' => false,
                    )
                );
            }
        }
    }

    // Read index
    public function read_popular()
    {
        // Query
        $sql = "SELECT * FROM (SELECT * FROM " . $this->table . " ORDER BY views DESC LIMIT " . $this->index . ") sub ORDER BY views DESC;";

        $stmt = $this->conn->prepare($sql);

        // EXECUTE
        $stmt->execute();

        return $stmt;
    }

    // Read Single
    public function read_single()
    {
        // Query
        $sql = 'SELECT * FROM ' . $this->table . ' WHERE post_id = :id';

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

            // post array
            $post_arr = array();
            $post_arr['message'] = 'Found ' . $num . ' post!';
            $post_arr['status'] = true;

            extract($paper);

            $post_item = array(
                'id' => $id,
                'post_id' => $post_id,
                'image' => $image,
                'title' => $title,
                'tags' => $tags,
                'alt_name' => $alt_name,
                'body' => $description,
                'likes' => $likes,
                'views' => $views,
                'commentNum' => 0,
                'date' => $date,
                'liked' => $isLiked,
                'comments' => array(),
            );

            // Push to data
            $post_arr['data'] = $post_item;

            $sql = "SELECT * FROM `comments` WHERE post_id = :id";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':id', $this->id);

            if ($stmt->execute()) {
                $post_arr['data']['commentNum'] = $stmt->rowCount();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    $comment_item = array(
                        'id' => $id,
                        'commenter' => $commenter,
                        'comment_id' => $comment_id,
                        'description' => $description,
                        'date' => $date,
                    );

                    // Push to data
                    array_push($post_arr['data']['comments'], $comment_item);
                }

                // Turn output to JSON
                return json_encode($post_arr);
            }
        } else {
            return json_encode(
                array(
                    'message' => 'No post found!',
                    'status' => false,
                )
            );
        }
    }

    // Read index
    public function search()
    {
        // Query
        // $sql = "SELECT * FROM ".$this->table."
        //             WHERE
        //                 `title` LIKE :q
        //             OR
        //                 `description` LIKE :q
        //             OR
        //                 `date` LIKE :q
        //             OR
        //                 `tags` LIKE :q
        //             OR
        //                 `alt_name` LIKE :q
        // ORDER BY `order` DESC;";

        $sql = "SELECT * FROM (SELECT * FROM " . $this->table . "  WHERE
                            `title` LIKE :q
                        OR
                            `description` LIKE :q
                        OR
                            `date` LIKE :q
                        OR
                            `tags` LIKE :q
                        OR
                            `alt_name` LIKE :q ORDER BY views DESC) sub ORDER BY views DESC;";

        // Prepare
        $stmt = $this->conn->prepare($sql);

        $query = "%$this->query%";

        $stmt->bindParam(':q', $query);

        // EXECUTE
        $stmt->execute();

        return $stmt;
    }

    // Comment
    public function comment()
    {
        $this->table = 'comments';

        // Query
        $sql = "INSERT INTO " . $this->table . "
                    SET
                        post_id = :id,
                        comment_id = :cid,
                        commenter = :commenter,
                        user_id = :user_id,
                        description = :comment,
                        `date` = :date
            ";

        $stmt = $this->conn->prepare($sql);

        $this->cid = $this->generate->create_id();

        $date = date('Y-m-d');

        $stmt->bindParam(':id', $this->post_id);
        $stmt->bindParam(':cid', $this->cid);
        $stmt->bindParam(':commenter', $this->title);
        $stmt->bindParam(':user_id', $this->id);
        $stmt->bindParam(':comment', $this->description);
        $stmt->bindParam(':date', $date);

        if ($stmt->execute()) {
            $sql = "SELECT * FROM " . $this->table . " WHERE post_id = :id";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":id", $this->post_id);

            if ($stmt->execute()) {
                $this->res = $stmt;

                $sql = "SELECT * FROM " . $this->table . " WHERE user_id = :id";

                $stmt = $this->conn->prepare($sql);

                $stmt->bindParam(":id", $this->id);

                if ($stmt->execute()) {
                    $comments = $stmt->rowCount();

                    $sql = "UPDATE users SET comments = :cmtNum WHERE user_id = :id";

                    $stmt = $this->conn->prepare($sql);

                    $stmt->bindParam(":cmtNum", $comments);
                    $stmt->bindParam(":id", $this->id);

                    if ($stmt->execute()) {
                        return true;
                    }
                }
            }
        }

        printf("ERROR: %s.\n", $stmt->error);

        return false;
    }

    public function delete_comment()
    {
        $this->table = 'comments';

        $sql = "DELETE FROM " . $this->table . " WHERE comment_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Like
    public function like()
    {

        // Query
        $sql = "SELECT * FROM `likes` WHERE post_id = :pid AND `user_id` = :uid";

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
                        $userlikes = 0;
                    }

                    // Query
                    $sql = "UPDATE " . $this->table . "
                            SET
                                likes = :likes
                            WHERE
                                post_id = :id
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
                                post_id = :id
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

        // $this->table = 'likes';

        // // Query
        // $sql = "INSERT INTO ".$this->table."
        //         SET
        //             post_id = :id,
        //             user_id = :user_id
        // ";

        // $stmt = $this->conn->prepare($sql);

        // $stmt->bindParam(':id', $this->post_id);
        // $stmt->bindParam(':user_id', $this->id);

        // if ($stmt->execute()) {
        //     return true;
        // }

        // printf("ERROR: %s.\n", $stmt->error);

        // return false;

    }

    // View
    public function view()
    {
        $this->table = 'views';

        $sql = "SELECT * FROM posts WHERE post_id = :post_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':post_id', $this->post_id);
        $stmt->execute();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $sql = 'SELECT * FROM ' . $this->table . ' WHERE post_id = :pid AND user_id = :uid';

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':pid', $this->post_id);
            $stmt->bindParam(':uid', $this->id);

            $stmt->execute();
            $num = $stmt->rowCount();

            if ($num > 0) {
                $this->res = $num;
                return true;
            } else {
                $sql = "INSERT INTO " . $this->table . "
                        SET
                            post_id = :id,
                            user_id = :user_id
                        ";

                $stmt = $this->conn->prepare($sql);

                $stmt->bindParam(':id', $this->post_id);
                $stmt->bindParam(':user_id', $this->id);

                if ($stmt->execute()) {
                    $sql = 'SELECT * FROM posts WHERE post_id = :pid';
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':pid', $this->post_id);

                    $stmt->execute();

                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                    if (!empty($row)) {
                        $this->views = $row['views'] + 1;
                        $this->res = $this->views;

                        $sql = 'UPDATE posts SET views = ' . $this->views . ' WHERE post_id = :id';
                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':id', $this->post_id);

                        if ($stmt->execute()) {
                            $sql = 'SELECT * FROM users WHERE user_id = :uid';
                            $stmt = $this->conn->prepare($sql);
                            $stmt->bindParam(':uid', $this->id);

                            $stmt->execute();

                            $row = $stmt->fetch(PDO::FETCH_ASSOC);

                            if (!empty($row)) {
                                $uv = $row['views'] + 1;

                                $sql = 'UPDATE users SET views = ' . $uv . ' WHERE user_id = :id';
                                $stmt = $this->conn->prepare($sql);

                                $stmt->bindParam(':id', $this->id);

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

    // Read all posts
    public function read_comments()
    {
        $this->table = 'comments';

        // Query
        $sql = "SELECT * FROM " . $this->table . " WHERE post_id = :id ORDER BY id DESC";

        // Prepare
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':id', $this->id);

        // Execute
        $stmt->execute();

        return $stmt;
    }

    public function upload()
    {
        $fileName = $this->post_file["name"];
        $fileType = $this->post_file["type"];
        $this->fileTempName = $this->post_file["tmp_name"];
        $fileError = $this->post_file["error"];
        $fileSize = $this->post_file["size"];

        $fileExt = explode(".", $fileName);
        $fileActualExt = strtolower(end($fileExt));

        $allowed = array("png", "jpg", "jpeg", "gif");

        if (in_array($fileActualExt, $allowed)) {
            if ($fileError == 0) {
                if ($fileSize < 10000000) {
                    $this->image = $this->image . "." . uniqid("", true) . "." . $fileActualExt;
                    $this->destination = "../../../assets/uploads/blog/blog" . $this->image;

                    if (empty($this->alt_name)) {
                        header("Location: /dashboard/?upload=error");
                        exit();
                    } else {
                        $sql = "SELECT * FROM " . $this->table;
                        $stmt = $this->conn->prepare($sql);

                        if ($stmt->execute()) {
                            $row = $stmt->fetch(PDO::FETCH_ASSOC);
                            $this->order = $stmt->rowCount() + 1;

                            $this->id = $this->generate->create_id();
                            $this->views = 0;
                            $this->likes = 0;

                            $date = date('Y-m-d');

                            $sql = "INSERT INTO " . $this->table . "
                                SET post_id = :pid,
                                    views = :vws,
                                    likes = :lks,
                                    title = :ttl,
                                    description = :desc,
                                    tags = :tgs,
                                    image = :img,
                                    `order` = :ord,
                                    alt_name = :alt,
                                    `date` = :dat
                            ";

                            $stmt = $this->conn->prepare($sql);

                            $stmt->bindParam(':pid', $this->id);
                            $stmt->bindParam(':vws', $this->views);
                            $stmt->bindParam(':lks', $this->likes);
                            $stmt->bindParam(':ttl', $this->title);
                            $stmt->bindParam(':desc', $this->description);
                            $stmt->bindParam(':tgs', $this->tags);
                            $stmt->bindParam(':img', $this->image);
                            $stmt->bindParam(':ord', $this->order);
                            $stmt->bindParam(':alt', $this->alt_name);
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
                    echo "<h1 style='font-size: 30px; color: red;'>Sorry There was a critical error; File is Too Big; Confused! please meet developer KODA_P</h1>";
                    exit();
                }
            } else {
                echo "<h1 style='font-size: 30px; color: red;'>Sorry There was a critical error; Confused! please meet developer KODA_P</h1>";
                exit();
            }
        } else {
            echo "<h1 style='font-size: 30px; color: red;'>Please Upload A proper File Type; Confused! please meet developer KODA_P</h1>";
            exit();
        }
    }

    public function update()
    {
        $sql = "SELECT * FROM " . $this->table . " WHERE post_id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":id", $this->id);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $prevImg = "../../../assets/uploads/blog/blog" . $result['image'];

        if ($this->post_file) {
            $fileName = $this->post_file["name"];
            $fileType = $this->post_file["type"];
            $this->fileTempName = $this->post_file["tmp_name"];
            $fileError = $this->post_file["error"];
            $fileSize = $this->post_file["size"];

            $fileExt = explode(".", $fileName);
            $fileActualExt = strtolower(end($fileExt));
        }

        $allowed = array("png", "jpg", "jpeg", "gif");

        if ($this->post_file) {
            if (in_array($fileActualExt, $allowed)) {
                if ($fileError == 0) {
                    if ($fileSize < 10000000) {
                        $this->image = $this->image . "." . uniqid("", true) . "." . $fileActualExt;
                        $this->destination = "../../../assets/uploads/blog/blog" . $this->image;

                        $this->postPassed = true;
                    } else {
                        $this->postPassed = false;
                    }
                } else {
                    $this->postPassed = false;
                }
            } else {
                $this->postPassed = false;
            }
        }

        $param = [];

        if ($this->postPassed) {
            array_push($param, " image = :img, ");
        }

        if (empty($this->alt_name)) {
            header("Location: /dashboard/?update=error");
            exit();
        } else {

            $sql = "UPDATE " . $this->table . "
                SET
                    title = :ttl,
                    description = :desc,
                    tags = :tgs,
                    " . join("", $param) . "
                    alt_name = :alt
                WHERE post_id = :pid
            ";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':pid', $this->id);
            $stmt->bindParam(':ttl', $this->title);
            $stmt->bindParam(':desc', $this->description);
            $stmt->bindParam(':tgs', $this->tags);

            if ($this->postPassed) {
                $stmt->bindParam(':img', $this->image);
            }

            $stmt->bindParam(':alt', $this->alt_name);

            if ($stmt->execute()) {
                if ($this->postPassed) {
                    unlink($prevImg);
                }

                return true;
            }
        }

        return false;
    }

    public function delete()
    {
        if ($this->id) {
            $sql = "SELECT * FROM " . $this->table . " WHERE post_id = :pid";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":pid", $this->id);

            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    extract($result);

                    $thumbnail = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/blog/blog' . $image;

                    if (unlink($thumbnail)) {
                        $sql = "DELETE FROM " . $this->table . " WHERE post_id = :pid";

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(":pid", $post_id);

                        if ($stmt->execute()) {
                            $sql = "DELETE FROM `comments` WHERE post_id = :pid";

                            $stmt = $this->conn->prepare($sql);

                            $stmt->bindParam(":pid", $post_id);

                            if ($stmt->execute()) {
                                $sql = "DELETE FROM `likes` WHERE post_id = :pid";

                                $stmt = $this->conn->prepare($sql);

                                $stmt->bindParam(":pid", $post_id);

                                if ($stmt->execute()) {
                                    $sql = "DELETE FROM `views` WHERE post_id = :pid";

                                    $stmt = $this->conn->prepare($sql);

                                    $stmt->bindParam(":pid", $post_id);

                                    if ($stmt->execute()) {
                                        return true;
                                    }
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