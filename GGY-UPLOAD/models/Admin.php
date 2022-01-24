<?php
class Admin
{
    // Db stuff
    private $conn;
    private $table = 'administrators';

    // Properties
    public $id;
    public $name;
    public $password;
    public $status;
    public $token;
    public $generate;
    public $fraud;
    public $access;
    public $address;
    public $used;
    public $allAccess;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Minister Admin
    public function minister()
    {
        $sql = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    if (password_verify($this->password, $password) || $this->username == $username) {
                        $this->used = true;
                        break;
                    } else {
                        $this->used = false;
                    }
                }
            }
        }

        if ($this->used) {
            return false;
        } else {
            $sql = 'INSERT INTO ' . $this->table . '
                        SET
                            username = :unm,
                            password = :pwd,
                            status = :sts,
                            token = :tkn
                ';

            $stmt = $this->conn->prepare($sql);

            $this->password = password_hash($this->password, PASSWORD_DEFAULT);

            $this->token = $this->generate->create_id();

            $stmt->bindParam(':unm', $this->username);
            $stmt->bindParam(':pwd', $this->password);
            $stmt->bindParam(':sts', $this->status);
            $stmt->bindParam(':tkn', $this->token);

            if ($stmt->execute()) {
                return true;
            }
        }

        return false;
    }

    // Auth
    public function auth()
    {

        $sql = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    if (password_verify($this->password, $password) && $this->username == $username && $status == 0) {
                        $this->access = true;
                        $this->token = $this->generate->create_id();

                        $this->allAccess = false;

                        if ($username == 'super' && $this->token == $token && $status == 1) {
                            $this->allAccess = true;
                            return true;
                            break;
                        }

                        $sql = 'UPDATE ' . $this->table . '
                                            SET
                                                `status` = 1,
                                                `token` = :tkn
                                            WHERE `password` = :pwd AND `username` = :usn
                                    ';

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':pwd', $password);
                        $stmt->bindParam(':usn', $username);
                        $stmt->bindParam(':tkn', $this->token);

                        if ($stmt->execute()) {
                            return true;
                            break;
                        }
                    } else {
                        $this->access = false;
                        $this->allAccess = false;
                    }
                }
            }
        }



        return false;
    }

    public function exit()
    {
        $sql = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    if ($this->token == $token && $status == 1) {
                        $this->access = true;
                        $this->token = $this->generate->create_id();
                        $sql = 'UPDATE ' . $this->table . '
                                    SET
                                        `status` = 0,
                                        `token` = :ttkn
                                    WHERE `token` = :tkn
                            ';

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':ttkn', $this->token);
                        $stmt->bindParam(':tkn', $token);

                        if ($stmt->execute()) {
                            return true;
                            break;
                        }
                    } else {
                        $this->access = false;
                    }
                }
            }
        }

        return false;
    }

    public function verify()
    {
        $sql = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    if ($username == 'super' && $this->token == $token && $status == 1) {
                        $this->allAccess = true;
                        $this->token = $this->generate->create_id();
                        $sql = 'UPDATE ' . $this->table . '
                                    SET
                                        `token` = :ttkn
                                    WHERE `token` = :tkn
                            ';

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':ttkn', $this->token);
                        $stmt->bindParam(':tkn', $token);

                        if ($stmt->execute()) {
                            return true;
                            break;
                        }
                    }

                    if ($this->token == $token && $status == 1) {
                        $this->allAccess = false;
                        $this->token = $this->generate->create_id();
                        $sql = 'UPDATE ' . $this->table . '
                                    SET
                                        `token` = :ttkn
                                    WHERE `token` = :tkn
                            ';

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':ttkn', $this->token);
                        $stmt->bindParam(':tkn', $token);

                        if ($stmt->execute()) {
                            return true;
                            break;
                        }
                    }
                }
            }
        }

        return false;
    }

    public function read()
    {
        $sql = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    if ($username == 'super' && $this->token == $token && $status == 1) {
                        $this->allAccess = true;
                        return $stmt;
                        break;
                    }
                }
            }
        }
    }

    public function delete()
    {
        $sql = 'SELECT * FROM ' . $this->table;

        $stmt = $this->conn->prepare($sql);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);

                    if ($username == 'super' && $this->token == $token && $status == 1) {
                        $sql = "DELETE FROM " . $this->table . " WHERE `token` = :tkn";

                        $stmt = $this->conn->prepare($sql);

                        $stmt->bindParam(':tkn', $this->id);

                        $stmt->execute();
                        $this->allAccess = true;
                        return true;
                        break;
                    }
                }
            }
        }

        return false;
    }

    // Create User
    // public function create() {
    //     // Query
    //     $sql = 'INSERT INTO '.$this->table.' 
    //             SET
    //                 user_id = :user_id,
    //                 downloads = :downloads,
    //                 likes = :likes,
    //                 comments = :comments,
    //                 views = :viewed,
    //                 name = :name
    //     ';

    //     // Prepare statement
    //     $stmt = $this->conn->prepare($sql);

    //     // Prepare Values
    //     $this->user_id = $this->generate->create_id();
    //     $this->downloads = 0;
    //     $this->likes = 0;
    //     $this->comments = 0;
    //     $this->viewed = 0;

    //     // Bind Data
    //     $stmt->bindParam(':user_id', $this->user_id);
    //     $stmt->bindParam(':downloads', $this->downloads);
    //     $stmt->bindParam(':likes', $this->likes);
    //     $stmt->bindParam(':comments', $this->comments);
    //     $stmt->bindParam(':viewed', $this->viewed);
    //     $stmt->bindParam(':name', $this->name);

    //     // Execute Query
    //     if ($stmt->execute()) {
    //         return true;
    //     }

    //     // Print Error if something goes worng
    //     printf("ERROR: %s.\n", $stmt->error);

    //     return false;
    // }

    // public function auth() {
    //     // Query
    //     $sql = "SELECT * FROM ".$this->table." WHERE userID = :userID";

    //     // Prepare Statement
    //     $stmt = $this->conn->prepare($sql);

    //     // Bind params
    //     $stmt->bindParam(':userID', $this->user_id);

    //     // Execute
    //     $stmt->execute();

    //     // Get Num Rows
    //     $num = $stmt->rowCount();

    //     if ($num > 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
}
