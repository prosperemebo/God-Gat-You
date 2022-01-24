<?php
    class User  {
        // Db stuff
        private $conn;
        private $table = 'users';

        // Properties
        public $id;
        public $user_id;
        public $name;
        public $downloads;
        public $likes;
        public $comments;
        public $viewed;
        public $generate;

        public function __construct($db) {
            $this->conn = $db;
        }

        // Read
        public function read() {
            $sql= "SELECT * FROM " . $this->table;

            $stmt = $this->conn->prepare($sql);

            $stmt->execute();

            return $stmt;
        }

        // Create User
        public function create() {
            // Query
            $sql = 'INSERT INTO '.$this->table.' 
                    SET
                        user_id = :user_id,
                        downloads = :downloads,
                        likes = :likes,
                        comments = :comments,
                        views = :viewed,
                        name = :name
            ';

            // Prepare statement
            $stmt = $this->conn->prepare($sql);

            // Prepare Values
            $this->user_id = $this->generate->create_id();
            $this->downloads = 0;
            $this->likes = 0;
            $this->comments = 0;
            $this->viewed = 0;

            // Bind Data
            $stmt->bindParam(':user_id', $this->user_id);
            $stmt->bindParam(':downloads', $this->downloads);
            $stmt->bindParam(':likes', $this->likes);
            $stmt->bindParam(':comments', $this->comments);
            $stmt->bindParam(':viewed', $this->viewed);
            $stmt->bindParam(':name', $this->name);

            // Execute Query
            if ($stmt->execute()) {
                return true;
            }

            // Print Error if something goes worng
            printf("ERROR: %s.\n", $stmt->error);

            return false;
        }

        public function auth() {
            // Query
            $sql = "SELECT * FROM ".$this->table." WHERE userID = :userID";

            // Prepare Statement
            $stmt = $this->conn->prepare($sql);

            // Bind params
            $stmt->bindParam(':userID', $this->user_id);

            // Execute
            $stmt->execute();

            // Get Num Rows
            $num = $stmt->rowCount();

            if ($num > 0) {
                return true;
            } else {
                return false;
        }
    }
}