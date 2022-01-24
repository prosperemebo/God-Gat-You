<?php
    class Database {
        private $host = 'localhost';
        private $db_name = 'godgatyou';
        private $username = 'root';
        private $password = '';
        private $conn;

        public function connect() {
            $dsn = 'mysql:host='.$this->host.'; dbname='.$this->db_name.';charset=utf8';
            $this->conn = null;

            try {
                $this->conn = new PDO($dsn, $this->username, $this->password);

                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch(PDOException $e) {
                echo 'Connection Error: '.$e.getMessage();
            }

            return $this->conn;
        }
    }