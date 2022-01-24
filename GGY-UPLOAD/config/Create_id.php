<?php
class Create_id
{
    private $conn;

    public $table;
    public $col;
    public $keyExists;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function create_id()
    {

        $sql = "SELECT * FROM " . $this->table;

        // Prepare statement
        $stmt = $this->conn->prepare($sql);

        $stmt->execute();

        $num = $stmt->rowCount();

        $keyLength = 20;
        $str = "12345678901275hhahzhzyrwqwerxvcn09hc5478qwetyuiopa1234501975rncjdhgbccvdcdhcvdcjdcdvcbdcddxcdvcddvcdvcdcdcdcdvcdcgweqsacbxsockdcchcsdfghjklzxcvbnmasdfghjhgfd";
        $randstr = substr(str_shuffle($str), 0, $keyLength);

        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if ($row[$this->col] == $randstr) {
                    $this->keyExists = true;
                    break;
                } else {
                    $this->keyExists = false;
                }
            }
        }

        while ($this->keyExists == true) {
            $randstr = substr(str_shuffle($str), 0, $keyLength);
        }

        return $randstr;
    }
}