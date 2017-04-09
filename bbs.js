// 初期化処理
window.onload = function() {
    $("postBtn").onclick = writeLog;
    showLog();
};

function showLog() {
    // Ajaxでログを所得
    ajaxGet(
        "./api.php?type=getLog",
        function(xhr, text) {
            var logs = JSON.parse(text);
            renderLog(logs);
        }
    )
}

function renderLog(logs) {
    var html = "";
    for (var i in logs) {
        var m = logs[i];
        var name = m["name"];
        var body = m["body"];
        html += "<li>" + name + " 「" + body + "」</li>";
    }
    $("logList").innerHTML = html;
}

// 書き込みを投稿
function writeLog() {
    var name = $("name").value;
    var body = $("body").value;
    var params = "type=writeLog&" + "name="
        + encodeURI(name) + "&" + "body=" + encodeURI(body);

    ajaxGet("./api.php?" + params,
        function(xhr, text) {
            $("body").value = "";  // 初期化する
            showLog();  // 反映する
        }
    );
}

// ajax
function ajaxGet(url, callback) {
    // XHR 組み込みオブジェクト
    // サーバから受信済みのwebページからさらにサーバへ通信リクエストを送れる
    var xhr = new XMLHttpRequest();

    /* 
    xhr.open(method,url,async)
    method : GET or POST
    async : true(非同期) or false(同期)
    */
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {  // HTTPステータス:200 200番台は正常
                callback(xhr, xhr.responseText);
            }
        }
    };
    xhr.send('');  // 通信
    return xhr;
}

// id所得
function $(id) {
    return document.getElementById(id);
}