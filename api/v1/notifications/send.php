<?php
    define('SERVER_API_KEY', 'AAAA6cYyNVQ:APA91bHHUUmvuk1N9I-9ytxMzyWP__13XFGThV_aeqHZvg_KwEMOBYffoRTMNtupq03rC1K2OjhigaTMs7aCDES9GNlIFXezg3h-dwo3bCm3dXdDLK_p6Br903HA2eMIfbOD8z6gM-Pw');

    class DbConnect {
        private $host = 'localhost';
        private $dbName = 'godgatyou';
        private $user = 'root';
        private $pass = '';

        public function connect() {
            try {
                $conn = new PDO('mysql:host=' . $this->host . '; dbname=' . $this->dbName, $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            } catch( PDOException $e) {
                echo 'Database Error: ' . $e->getMessage();
            }
        }
    }
    
    $db = new DbConnect;
    $conn = $db-> connect();
    $stmt = $conn -> prepare("SELECT * FROM tokens");
    $stmt->execute();
    $tokens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($tokens as $token) {
        $registrationIds[] = $token['token'];
    }

    $header = [
        'Authorization: Key='.SERVER_API_KEY,
        'Content-Type: Application/json'
        ];

    // PLEASE INSERT NOTIFICATION BELOW //        
    // PLEASE INSERT NOTIFICATION BELOW //        
    // PLEASE INSERT NOTIFICATION BELOW //        
    
    $msg = [
        'title' => 'New wallpaper!',
        'body' => 'Trust the process wallpaper is now avaliable for download',
        'icon' => '/assets/images/icons/app-icon-96x96.png',
        'image' => '/assets/images/about5.jpg',
        'url' => "http://localhost/wallpaper/",
        'action' => "Download Now"
    ];

    // PLEASE INSERT NOTIFICATION ABOVE //        
    // PLEASE INSERT NOTIFICATION ABOVE //        
    // PLEASE INSERT NOTIFICATION ABOVE //        
    
    $payload = [
        'registration_ids' => $registrationIds,
        'data' => $msg
    ];

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://fcm.googleapis.com/fcm/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode( $payload ),
  CURLOPT_HTTPHEADER => $header
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
