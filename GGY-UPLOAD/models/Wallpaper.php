<?php
class Wallpaper
{
    // DB Stuff
    private $conn;
    private $table = 'wallpapers';

    // Porperties
    public $id;
    public $name;
    public $alt_name;
    public $thumbnail;
    public $desktop;
    public $tablet;
    public $mobile;
    public $pthumbnail;
    public $pdesktop;
    public $ptablet;
    public $pmobile;
    public $body;
    public $downloads;
    public $likes;
    public $index;
    public $page;
    public $user_id;
    public $order;
    public $res;
    public $unliked;

    // Files
    public $thumbFile;
    public $deskFile;
    public $tabFile;
    public $mobFile;

    // Temp name
    public $thumbFileTempName;
    public $deskFileTempName;
    public $tabFileTempName;
    public $mobFileTempName;

    // Destination
    public $thumbFileDestination;
    public $deskFileDestination;
    public $tabFileDestination;
    public $mobFileDestination;

    // Tests
    public $thumbPassed;
    public $deskPassed;
    public $tabPassed;
    public $mobPassed;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get wallpapers
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

    public function read_index()
    {

        // Query
        $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY id DESC LIMIT ' . $this->page . ', ' . $this->index;

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // Execute
        $stmt->execute();

        return $stmt;
    }

    public function read_single()
    {

        // Query
        $sql = 'SELECT * FROM ' . $this->table . ' WHERE paper_id = :id';

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

            // wallpaper array
            $wallpaper_arr = array();
            $wallpaper_arr['message'] = 'Found ' . $num . ' wallpaper!';

            extract($paper);

            $wallpaper_item = array(
                'id' => $id,
                'wallpaper_name' => $title,
                'alt_name' => $alt_title,
                'thumbnail' => $thumbnail,
                'desktop' => $desktop,
                'tablet' => $tablet,
                'mobile' => $mobile,
                'likes' => $likes,
                'downloads' => $downloads,
                'body' => $body,
                'liked' => $isLiked,
            );

            // Push to data
            $wallpaper_arr['data'] = $wallpaper_item;

            // Turn output to JSON
            return json_encode($wallpaper_arr);
        } else {
            return json_encode(
                array(
                    'message' => 'No wallpaper found!',
                )
            );
        }
    }

    public function download()
    {
        // Query
        $sql = "SELECT
                        *
                    FROM
                        " . $this->table . "
                    WHERE
                        paper_id = :wid";

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // Bind param
        $stmt->bindParam(':wid', $this->id);

        // Execute
        $stmt->execute();

        // Fetch Data
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!empty($row)) {
            $this->downloads = $row['downloads'] + 1;
            $this->name = $row['title'];
            $this->desktop = $row['desktop'];
            $this->tablet = $row['tablet'];
            $this->mobile = $row['mobile'];

            // Query
            $sql = "UPDATE " . $this->table . "
                    SET
                        downloads = :downloads
                    WHERE
                        paper_id = :id
                ";

            // Prepare statement
            $stmt = $this->conn->prepare($sql);

            // Bind param
            $stmt->bindParam(':downloads', $this->downloads);
            $stmt->bindParam(':id', $this->id);

            // Execute
            if ($stmt->execute()) {
                $this->res = true;
            }

            if (isset($this->user_id)) {
                // Query
                $sql = "SELECT * FROM
                                users
                            WHERE
                                user_id = :wid";

                // Prepare statement
                $stmt = $this->conn->prepare($sql);

                // Bind param
                $stmt->bindParam(':wid', $this->user_id);

                // Execute
                $stmt->execute();

                // Fetch Data
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                if (!empty($row)) {
                    $userdownloads = $row['downloads'] + 1;

                    $sql = "UPDATE users
                            SET
                                downloads = :downloads
                            WHERE
                                user_id = :id
                        ";

                    // Prepare statement
                    $stmt = $this->conn->prepare($sql);

                    // Bind param
                    $stmt->bindParam(':downloads', $userdownloads);
                    $stmt->bindParam(':id', $this->user_id);

                    // Execute
                    if ($stmt->execute()) {
                        $this->res = true;
                    }
                }
            }
        } else {
            $this->res = false;
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
            $sql = "SELECT * FROM " . $this->table . " WHERE paper_id = :wid";

            // Prepare statement
            $stmt = $this->conn->prepare($sql);

            // Bind param
            $stmt->bindParam(':wid', $this->id);

            // Execute
            $stmt->execute();

            // Fetch Data
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!empty($row)) {
                $this->likes = $row['likes'] + 1;

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
                                paper_id = :id
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

                    $sql = "INSERT INTO likes SET post_id = :pid, user_id = :ui";

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
            $sql = "SELECT * FROM " . $this->table . " WHERE paper_id = :wid";

            // Prepare statement
            $stmt = $this->conn->prepare($sql);

            // Bind param
            $stmt->bindParam(':wid', $this->id);

            // Execute
            $stmt->execute();

            // Fetch Data
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!empty($row)) {
                $this->likes = $row['likes'] - 1;

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
                                paper_id = :id
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
        if (empty($this->thumbnail)) {
            $this->thumbnail = 'wallpaperthumb';
        } else {
            $this->thumbnail = strtolower(str_replace(" ", "-", $this->thumbnail));
        }
        if (empty($this->desktop)) {
            $this->desktop = 'wallpaperdesk';
        } else {
            $this->desktop = str_replace(" ", "_", $this->desktop);
        }
        if (empty($this->tablet)) {
            $this->tablet = 'wallpapertab';
        } else {
            $this->tablet = str_replace(" ", "_", $this->tablet);
        }
        if (empty($this->mobile)) {
            $this->mobile = 'wallpapermob';
        } else {
            $this->mobile = str_replace(" ", "_", $this->mobile);
        }

        // Thumbnail
        $thumbFileName = $this->thumbFile['name'];
        $thumbFileType = $this->thumbFile['type'];
        $this->thumbFileTempName = $this->thumbFile['tmp_name'];
        $thumbFileError = $this->thumbFile['error'];
        $thumbFileSize = $this->thumbFile['size'];

        $thumbFileExt = explode(".", $thumbFileName);
        $thumbFileActualExt = strtolower(end($thumbFileExt));

        // Desktop
        $deskFileName = $this->deskFile['name'];
        $deskFileType = $this->deskFile['type'];
        $this->deskFileTempName = $this->deskFile['tmp_name'];
        $deskFileError = $this->deskFile['error'];
        $deskFileSize = $this->deskFile['size'];

        $deskFileExt = explode(".", $deskFileName);
        $deskFileActualExt = strtolower(end($deskFileExt));

        // Tablet
        $tabFileName = $this->tabFile['name'];
        $tabFileType = $this->tabFile['type'];
        $this->tabFileTempName = $this->tabFile['tmp_name'];
        $tabFileError = $this->tabFile['error'];
        $tabFileSize = $this->tabFile['size'];

        $tabFileExt = explode(".", $tabFileName);
        $tabFileActualExt = strtolower(end($tabFileExt));

        // Mobile
        $mobFileName = $this->mobFile['name'];
        $mobFileType = $this->mobFile['type'];
        $this->mobFileTempName = $this->mobFile['tmp_name'];
        $mobFileError = $this->mobFile['error'];
        $mobFileSize = $this->mobFile['size'];

        $mobFileExt = explode(".", $mobFileName);
        // $mobFileActualExt=  strtolower(end($mobFileExt));
        $mobFileActualExt = end($mobFileExt);

        $allowed = array("jpg", "jpeg", "png", "gif");

        if (
            in_array($thumbFileActualExt, $allowed) && in_array($deskFileActualExt, $allowed) && in_array($tabFileActualExt, $allowed) && in_array($mobFileActualExt, $allowed)
        ) {
            if ($thumbFileError === 0 && $deskFileError === 0 && $tabFileError === 0 && $mobFileError === 0) {
                if ($thumbFileSize < 10000000 && $deskFileSize < 10000000 && $tabFileSize < 10000000 && $mobFileSize < 10000000) {

                    $this->thumbnail = $this->thumbnail . "." . uniqid("", true) . "." . $thumbFileActualExt;
                    $this->desktop = $this->desktop . "." . $deskFileActualExt;
                    $this->tablet = $this->tablet . "." . $tabFileActualExt;
                    $this->mobile = $this->mobile . "." . $mobFileActualExt;
                    // $this->thumbnail = $this->thumbnail.".".uniqid("", true).".".$thumbFileActualExt;
                    // $this->desktop = $this->desktop.".".uniqid("", true).".".$deskFileActualExt;
                    // $this->tablet = $this->tablet.".".uniqid("", true).".".$tabFileActualExt;
                    // $this->mobile = $this->mobile.".".uniqid("", true).".".$mobFileActualExt;

                    $this->thumbFileDestination = "../../../assets/uploads/wallpaper/wallpaper" . $this->thumbnail;
                    $this->deskFileDestination = "../../../assets/uploads/wallpaper/" . $this->desktop;
                    $this->tabFileDestination = "../../../assets/uploads/wallpaper/" . $this->tablet;
                    $this->mobFileDestination = "../../../assets/uploads/wallpaper/" . $this->mobile;

                    $sql = "SELECT * FROM " . $this->table;
                    $stmt = $this->conn->prepare($sql);
                    if (!$stmt->execute()) {
                    } else {
                        $row = $stmt->fetch(PDO::FETCH_ASSOC);
                        // $stmt->store_result();
                        $rowCount = $stmt->rowCount();
                        $this->order = $rowCount + 1;
                        $this->downloads = 0;
                        $this->likes = 0;

                        $this->id = $this->res->create_id();

                        $sql = "INSERT INTO " . $this->table . "
                                    SET
                                        paper_id = :id,
                                        title = :name,
                                        alt_title = :alt_name,
                                        thumbnail = :thumb,
                                        desktop = :desk,
                                        tablet = :tab,
                                        mobile = :mob,
                                        `order` = :ord,
                                        body = :body,
                                        likes = :like,
                                        downloads = :down";

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':id', $this->id);
                        $stmt->bindParam(':name', $this->name);
                        $stmt->bindParam(':alt_name', $this->alt_name);
                        $stmt->bindParam(':thumb', $this->thumbnail);
                        $stmt->bindParam(':desk', $this->desktop);
                        $stmt->bindParam(':tab', $this->tablet);
                        $stmt->bindParam(':mob', $this->mobile);
                        $stmt->bindParam(':ord', $this->order);
                        $stmt->bindParam(':body', $this->body);
                        $stmt->bindParam(':like', $this->likes);
                        $stmt->bindParam(':down', $this->downloads);

                        // Execute query
                        if (!$stmt->execute()) {
                            echo "Execution error";
                            return false;
                        } else {

                            // move_uploaded_file($thumbFileTempName, $thumbFileDestination);
                            // move_uploaded_file($deskFileTempName, $deskFileDestination);
                            // move_uploaded_file($tabFileTempName, $tabFileDestination);
                            // move_uploaded_file($mobFileTempName, $mobFileDestination);
                            return true;
                        }
                    }
                } else {
                    echo "Hey! Sorry The file size is too big; try contacting the developer Koda_P and the designer!";
                    exit();
                }
            } else {
                echo "Hey! Sorry there was an error :( please contact the developer; Koda_P";
                exit();
            }
        } else {
            echo "Hey! Sorry you need to upload a proper file type :(";
            print_r($thumbFileActualExt);
            print_r($deskFileActualExt);
            print_r($tabFileActualExt);
            print_r($mobFileActualExt);
            exit();
        }
    }

    public function delete()
    {
        if ($this->id) {
            $sql = "SELECT * FROM " . $this->table . " WHERE paper_id = :pid";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(":pid", $this->id);

            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    extract($result);

                    $thumbnail = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/wallpaper' . $thumbnail;
                    $desktop = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/' . $desktop;
                    $tablet = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/' . $tablet;
                    $mobile = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/wallpaper/' . $mobile;

                    if (unlink($thumbnail) && unlink($desktop) && unlink($tablet) && unlink($mobile)) {
                        $sql = "DELETE FROM " . $this->table . " WHERE paper_id = :pid";

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(":pid", $paper_id);

                        if ($stmt->execute()) {
                            $sql = "DELETE FROM `likes` WHERE post_id = :pid";

                            $stmt = $this->conn->prepare($sql);

                            $stmt->bindParam(":pid", $paper_id);

                            if ($stmt->execute()) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    public function update()
    {

        $sql = "SELECT * FROM " . $this->table . " WHERE paper_id = :pid";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(":pid", $this->id);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // $this->thumbnail = $row['thumbnail'];
        // $this->desktop = $row['desktop'];
        // $this->tablet = $row['tablet'];
        // $this->mobile = $row['mobile'];

        $this->pthumbnail = $row['thumbnail'];
        $this->pdesktop = $row['desktop'];
        $this->ptablet = $row['tablet'];
        $this->pmobile = $row['mobile'];

        // Thumbnail
        if (isset($this->thumbFile)) {
            if (empty($this->thumbnail)) {
                $this->thumbnail = 'wallpaperthumb';
            } else {
                $this->thumbnail = strtolower(str_replace(" ", "-", $this->thumbnail));
            }

            $thumbFileName = $this->thumbFile['name'];
            $thumbFileType = $this->thumbFile['type'];
            $this->thumbFileTempName = $this->thumbFile['tmp_name'];
            $thumbFileError = $this->thumbFile['error'];
            $thumbFileSize = $this->thumbFile['size'];

            $thumbFileExt = explode(".", $thumbFileName);
            $thumbFileActualExt = strtolower(end($thumbFileExt));

            // $this->thumbnail = explode(".", $this->thumbnail);
            // $this->thumbnail = $this->thumbnail[0] . '.' . $this->thumbnail[1] . '.' . $this->thumbnail[2];
        }

        // Desktop
        if (isset($this->deskFile)) {
            if (empty($this->desktop)) {
                $this->desktop = 'wallpaperdesk';
            } else {
                $this->desktop = str_replace(" ", "_", $this->desktop);
            }

            $deskFileName = $this->deskFile['name'];
            $deskFileType = $this->deskFile['type'];
            $this->deskFileTempName = $this->deskFile['tmp_name'];
            $deskFileError = $this->deskFile['error'];
            $deskFileSize = $this->deskFile['size'];

            $deskFileExt = explode(".", $deskFileName);
            $deskFileActualExt = strtolower(end($deskFileExt));

            // $this->desktop = explode(".", $this->desktop);
            // $this->desktop = $this->desktop[0] . '.' . $this->desktop[1] . '.' . $this->desktop[2];
        }

        // Tablet
        if (isset($this->tabFile)) {
            if (empty($this->tablet)) {
                $this->tablet = 'wallpapertab';
            } else {
                $this->tablet = str_replace(" ", "_", $this->tablet);
            }

            $tabFileName = $this->tabFile['name'];
            $tabFileType = $this->tabFile['type'];
            $this->tabFileTempName = $this->tabFile['tmp_name'];
            $tabFileError = $this->tabFile['error'];
            $tabFileSize = $this->tabFile['size'];

            $tabFileExt = explode(".", $tabFileName);
            $tabFileActualExt = strtolower(end($tabFileExt));
            // $this->tablet = explode(".", $this->tablet);
            // $this->tablet = $this->tablet[0] . '.' . $this->tablet[1] . '.' . $this->tablet[2];
        }

        // Mobile
        if (isset($this->mobFile)) {
            if (empty($this->mobile)) {
                $this->mobile = 'wallpapermob';
            } else {
                $this->mobile = str_replace(" ", "_", $this->mobile);
            }

            $mobFileName = $this->mobFile['name'];
            $mobFileType = $this->mobFile['type'];
            $this->mobFileTempName = $this->mobFile['tmp_name'];
            $mobFileError = $this->mobFile['error'];
            $mobFileSize = $this->mobFile['size'];

            $mobFileExt = explode(".", $mobFileName);
            $mobFileActualExt = strtolower(end($mobFileExt));
            // $mobFileActualExt = end($mobFileExt);
            // $this->mobile = explode(".", $this->mobile);
            // $this->mobile = $this->mobile[0] . '.' . $this->mobile[1] . '.' . $this->mobile[2];
        }

        $allowed = array("jpg", "jpeg", "png", "gif");

        // Thumbnail
        if (isset($this->thumbFile)) {
            if (in_array($thumbFileActualExt, $allowed)) {
                if ($thumbFileError === 0) {
                    if ($thumbFileSize < 10000000) {
                        $this->thumbnail = $this->thumbnail . "." . uniqid("", true) . "." . $thumbFileActualExt;

                        $this->thumbFileDestination = "../../../assets/uploads/wallpaper/wallpaper" . $this->thumbnail;

                        $this->thumbPassed = true;
                    } else {
                        $this->thumbPassed = false;
                    }
                } else {
                    $this->thumbPassed = false;
                }
            } else {
                $this->thumbPassed = false;
            }
        } else {
            $this->thumbPassed = false;
        }

        // Desktop
        if (isset($this->deskFile)) {
            if (in_array($deskFileActualExt, $allowed)) {
                if ($deskFileError === 0) {
                    if ($deskFileSize < 10000000) {
                        $this->desktop = $this->desktop . "." . $deskFileActualExt;

                        $this->deskFileDestination = "../../../assets/uploads/wallpaper/" . $this->desktop;

                        $this->deskPassed = true;
                    } else {
                        $this->deskPassed = false;
                    }
                } else {
                    $this->deskPassed = false;
                }
            } else {
                $this->deskPassed = false;
            }
        } else {
            $this->deskPassed = false;
        }

        // Tablet
        if (isset($this->tabFile)) {
            if (in_array($tabFileActualExt, $allowed)) {
                if ($tabFileError === 0) {
                    if ($tabFileSize < 10000000) {
                        $this->tablet = $this->tablet . "." . $tabFileActualExt;

                        $this->tabFileDestination = "../../../assets/uploads/wallpaper/" . $this->tablet;

                        $this->tabPassed = true;
                    } else {
                        $this->tabPassed = false;
                    }
                } else {
                    $this->tabPassed = false;
                }
            } else {
                $this->tabPassed = false;
            }
        } else {
            $this->tabPassed = false;
        }

        // Mobile
        if (isset($this->mobFile)) {
            if (in_array($mobFileActualExt, $allowed)) {
                if ($mobFileError === 0) {
                    if ($mobFileSize < 10000000) {
                        $this->mobile = $this->mobile . "." . $mobFileActualExt;

                        $this->mobFileDestination = "../../../assets/uploads/wallpaper/" . $this->mobile;

                        $this->mobPassed = true;
                    } else {
                        $this->mobPassed = false;
                    }
                } else {
                    $this->mobPassed = false;
                }
            } else {
                $this->mobPassed = false;
            }
        } else {
            $this->mobPassed = false;
        }

        $param = [];

        if ($this->thumbPassed) {
            array_push($param, ' thumbnail = :thumb, ');
        }

        if ($this->deskPassed) {
            array_push($param, ' desktop = :desk, ');
        }

        if ($this->tabPassed) {
            array_push($param, ' tablet = :tab, ');
        }

        if ($this->mobPassed) {
            array_push($param, ' mobile = :mob, ');
        }

        $sql = "UPDATE " . $this->table . "
                    SET
                        title = :name,
                        alt_title = :alt_name,
                " . join("", $param) . "
                        body = :body WHERE paper_id = :pid
        ";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':alt_name', $this->alt_name);

        if ($this->thumbPassed) {
            $this->thumbnail = $this->thumbnail;
            $stmt->bindParam(':thumb', $this->thumbnail);
        }

        if ($this->deskPassed) {
            $stmt->bindParam(':desk', $this->desktop);
        }

        if ($this->tabPassed) {
            $stmt->bindParam(':tab', $this->tablet);
        }

        if ($this->mobPassed) {
            $stmt->bindParam(':mob', $this->mobile);
        }

        $stmt->bindParam(':body', $this->body);
        $stmt->bindParam(':pid', $this->id);

        // Execute query
        if (!$stmt->execute()) {
            echo "Execution error";
            return false;
        } else {
            return true;
        }
    }

}
