'use strict'

// 開発用設定とメッセージ表示関数

let developer = true;

function devMsg(title, msg){
    if (developer) {
        console.group(title);
        console.log(msg);
        console.groupEnd(title);
    }
}


// HTMLの主要な要素取得

const busElm = document.getElementById("business");

const visitorNameIn = document.getElementById("visitorName");


// 記録用配列の初期化

const recordArray = [];


// 用件ボタンのリスト
// "用件", "ID"

const btnLst = [
    ["りんご",     "apple"],
    ["バナナ",     "banana"],
    ["チョコレート", "chocolate"],
    ["ドーナツ",    "doughnuts"],
]


/**
 * ボタン追加関数
 * 用件ボタンのリストからページにボタンを追加
 * @param {string} text - ボタンの表示文字
 * @param {string}   id - 用件管理用のID
 * @returns {undefined}
 */ 
function addButton(text, id){

    // ボタン生成
    const rBtn = document.createElement("button");
    rBtn.innerText  = text;
    rBtn.id    = id;

    // ボタンと改行を追加
    busElm.appendChild(document.createElement("br"));
    busElm.appendChild(document.createElement("br"));
    busElm.appendChild(rBtn);

    // ボタンにクリック時のイベント追加
    rBtn.onclick = recordLog(rBtn);

}

// 用件ボタンのリストからボタン生成･追加
btnLst.forEach((btn) => addButton(btn[0], btn[1]));


/**
 * ボタン追加関数
 * 日時、名前、用件を配列に記録、
 * コンソールに出力
 * @param {object} rBtn - 用件ボタン
 * @returns {undefined}
 */ 
function recordLog(rBtn){
    return function(){
        const name = visitorNameIn.value;




        // 入力した名前が tomato だったらページ遷移
        if(name === "tomato"){
            window.location.href="happifier.html";
            return;
        }
        


        if(name){
            const now = new Date();
            const date = now.getMonth() + "/" + now.getDate(); 
            const time = now.getHours() + ":" + now.getMinutes();
            const logText = date + "," + time + "," + name + "," + rBtn.innerText + "," + rBtn.id;
            recordArray.push(logText);
            console.log(logText);
        }else{
            alert("来場者名を入力してください。");
            visitorNameIn.focus();
        }
    }
}