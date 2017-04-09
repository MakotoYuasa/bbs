<?php
// 定数
define("LOGFILE", "./log.json");
if(!file_exists(LOGFILE)) {
    file_put_contents(LOGFILE, "[]");
}

// 判定する
$type = isset($_GET["type"]) ? $_GET["type"] : "";
if($type == "getLog") {
    getLog();
}else if($type == "writeLog") {
    writeLog();
}else {
    echo "[]";
    exit;
} 

// ログ所得
function getLog() {
    // ファイルの内容を全て文字列にして読み込む
    $json = file_get_contents(LOGFILE);
    if($json == "") {
        $json = "[]";
    }
    echo $json;
}

function writeLog() {
    $name = !empty($_GET["name"]) ? $_GET["name"] : "名無しさん";
    $body = isset($_GET["body"]) ? $_GET["body"] : "";

    // 特殊文字をHTMLエンティティに変換
    $name = htmlspecialchars($name);
    $body = htmlspecialchars($body);

    // ファイルの内容を全て文字列にして読み込む
    $json = file_get_contents(LOGFILE);

    // JSONエンコードされた文字列を受け取って, 変数に変換
    $a = json_decode($json);
    if(!is_array($a)) {
        $a = array();
    }
    array_unshift($a, array("name"=>$name, "body"=>$body));

    // JSON形式にする
    $json = json_encode($a);
    file_put_contents(LOGFILE, $json);
    //echo "ok";
}

?>