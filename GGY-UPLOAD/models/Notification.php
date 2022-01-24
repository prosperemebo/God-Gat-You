<?php
class Notification
{
    // DB stuff
    private $conn;
    private $table = 'tokens';

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Read
    public function read()
    {
        // Query
        $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY `id` DESC';

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        // Execute
        $stmt->execute();

        return $stmt;
    }
}
