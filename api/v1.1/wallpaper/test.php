<?php

if (isset($_POST['submit'])) {
    if ($_FILES['img'] && $_FILES['imgg'] && $_FILES['imggg']) {
        echo "Upload success!";
    } else {
        echo "Upload failed!";
    }
}

echo "hry";
