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
// あと各設定数値とかまとめていじれるように

// にこちゃんフィールド(正方形)の一辺の長さ
const fieldSize = 25;

// おやつの範囲
const treatRange = 5;
const hungerRange = treatRange;

// おやつの効果
const treatMagnitude = 20;

// たべすぎからおなかすくまでの時間と間隔
const hungerTimer = 5000; //10000;
const hungerInterval = 1000; //2000;

// おなかすくまでの回数
const hungerTimes = hungerTimer / hungerInterval;

// おやつ配達処理用の変数準備
// 配達先リスト
let tgtArray = [];
// 配達段階
let dlvTreatIndex = 0;

// にこちゃん背景色
const bgStm0 = "#aaa";
const bgStm1 = "#ccc";
const bgStm2 = "#fff";
const bgStm3 = "#fdd";
const bgStm4 = "#ee5";

document.getElementById("stm0").style.backgroundColor = bgStm0;
document.getElementById("stm1").style.backgroundColor = bgStm1;
document.getElementById("stm2").style.backgroundColor = bgStm2;
document.getElementById("stm3").style.backgroundColor = bgStm3;
document.getElementById("stm4").style.backgroundColor = bgStm4;


// にこちゃんフィールド配列とテーブルの準備


// にこちゃんフィールド配列初期化
const fieldArray = Array(fieldSize).fill(0);
fieldArray.forEach((value, index) => fieldArray[index] = Array(fieldSize).fill(0));
// 二行をいっぺんにやろうとしたらReferenceError
// 入れ子を適当に初期化しようとすると配列の相対参照になっちゃう
// forEachでindexつかえそうだったからそれでいっこずつ作ったらいけた

// fieldSizeに合わせて配列を作ろうとしたけどもっといっぺんに
/*
for (let i = 0; i < fieldSize; i++){
  const tArr = [];
  for (let ii = 0; ii < fieldSize; ii++){
    tArr.push(0);
  }
  fieldArray.push(tArr);
}
*/


// にこちゃんテーブル初期化

// にこちゃんテーブル取得
const fieldTable = document.getElementById("field");
fieldTable.style.fontSize = "20px";

// 行とか足すけれどここはforループがやりやすかった
for (let posY = 0; posY < fieldSize; posY++){
    
    // 行を追加していきます
    const newTr = document.createElement("tr");
    fieldTable.appendChild(newTr);

    for (let posX = 0; posX < fieldSize; posX++){
    
        // 作った行にセルを追加していきます
        const newTd = document.createElement("td");
        
        newTr.appendChild(newTd);
        
        newTd.onclick = devSmile(posX, posY);

        // 追加しながらにこちゃんフィールド配列ににこちゃんを入居させます
        fieldArray[posY][posX] = smileFactory(posX, posY);

        // そしたらにこちゃんテーブルのお顔を初期化
        fieldArray[posY][posX].stmCheck();

    }
}


/**
 * にこちゃんファクトリー関数
 * 配列の座標を受け取り、にこちゃんオブジェクトを返します
 * @param {number} posX - 配列のx位置 : tableでは cells
 * @param {number} posY - 配列のy位置 : tableでは rows
 * @returns {object}    - にこちゃんオブジェクト
 */
function smileFactory(posX, posY){
    /**
     * にこちゃんオブジェクト
     * posX     : 配列のx位置 : tableでは cells
     * posY     : 配列のY位置 : tableでは rows
     * stomach  : おなかいっぱい具合
     * treated  : おやつもらうメソッド stomach に treatMagnitude 足す
     * hungered : おなかすくメソッド   stomach を設定時間にあわせて減らす
     * stmCheck : おなかいっぱいチェックメソッド stomach によって table のお顔を変える
     * 
     */
    return {
        posX : posX,
        posY : posY,
        stomach : 50,
        treated : function (){
            this.stomach += treatMagnitude;
            if (this.stomach > 100) this.stomach = 100;
            this.stmCheck();
        },
        hungered : function(){
            this.stomach -= treatMagnitude * (hungerInterval / hungerTimer) / 4;
            if (this.stomach < 0) this.stomach = 0;
            this.stmCheck();
        },
        stmCheck : function(){
            let face = "";
            let bColor = "";
            if (this.stomach < 10){
                face = "😭";
                bColor = bgStm0;
            }else if (this.stomach < 30){
                face = "🤤";
                bColor = bgStm1;
            }else if (this.stomach < 60){
                face = "🙂";
                bColor = bgStm2;
            }else if (this.stomach < 90){
                face = "😊";
                bColor = bgStm3;
            }else{
                face = "🤢";
                bColor = bgStm4;
            }
            fieldTable.rows[posY].cells[posX].innerText = face;
            fieldTable.rows[posY].cells[posX].style.backgroundColor = bColor;
        }
    };
}


/**
 * おやつ配達関数ファクトリー関数
 * table のにこちゃんたちの onclick のための準備
 * 配達先リストを作る
 * @param {number} sX - おやつ配達x位置
 * @param {number} sY - おやつ配達y位置
 * @returns {function} - 配達中心から treatRange の範囲の treated するための関数を作る
 */
function devSmile (sX, sY){
    return function(){
        // 配達先リストに中身がない場合に実行
        if (tgtArray.length === 0){
            // クリック位置から配達範囲にいるにこちゃんの位置をリストに追加
            for (let i = 0; i < fieldSize; i++){
                for (let ii = 0; ii < fieldSize; ii++){
                    let lenX = ii - sX;
                    let lenY = i  - sY;
                    const len = Math.round(Math.sqrt((lenX**2) + (lenY**2)));
                    if (len <= treatRange){
                        tgtArray.push([len, i, ii]);
                    }
                }
            }

            devMsg("tgtPositions", sX + " " + sY);
            devMsg("tgtArray", tgtArray);

        }
    }
}


// にこちゃんフィールド状態表示
devMsg("fieldArray", fieldArray);

// おやつ配る関数 タイマーつきでかわいく
const devTraet = window.setInterval(function (){
    // 配達先リストに中身がある場合に実行
    if (tgtArray.length !== 0){
        // 配達先リストで中心から近い順におやつ配達
        const tArr = tgtArray.filter((x) => x[0] === dlvTreatIndex);
        tArr.forEach((tgt) => fieldArray[tgt[1]][tgt[2]].treated());
        dlvTreatIndex ++;
        // 配達が終わったらリストと順番を初期化
        if (dlvTreatIndex > treatRange){
            dlvTreatIndex = 0;
            tgtArray = [];
        }
    }
}, 50);



// おなかすく処理準備
// さらに範囲でおなかすく配列
let hungerArray = [];
// おなかすく位置
let hungerX = 0;
let hungerY = 0;
// おなかすく段階
let hungerIndex = 0;

// ランダム位置から一定回数おなかすく
// もともとのおなかすく処理に重ねておなかすく
const hunger = window.setInterval(function (){

    devMsg("hungerIndex",hungerIndex)

    // 範囲でおなかすく配列が空の場合、ランダム位置から範囲でおなかすく配列作成
    if (hungerArray.length === 0){
        hungerX = Math.floor(Math.random() * fieldSize);
        hungerY = Math.floor(Math.random() * fieldSize);
        for (let i = 0; i < fieldSize; i++){
            for (let ii = 0; ii < fieldSize; ii++){
                let lenX = ii - hungerX;
                let lenY = i  - hungerY;
                const len = Math.round(Math.sqrt((lenX**2) + (lenY**2)));
                if (len <= hungerRange){
                    hungerArray.push([i, ii]);
                }
            }
        }
    }

    // 範囲でおなかすく配列でおなかがすいていく
    hungerArray.forEach((tgt) => fieldArray[tgt[0]][tgt[1]].hungered());
    hungerIndex ++;

    // 範囲でおなかすく配列を一定回数使ったら、リストと順番を初期化
    if(hungerIndex > hungerTimes - 1){
        hungerIndex = 0;
        hungerArray = [];
    }

    // 全体でもおなかがすいていく
    fieldArray.forEach((tgt) => tgt.forEach((tgt2) => tgt2.hungered()));

}, hungerInterval);



// ケーキを作ります

const cake = document.createElement("div");
cake.id = "cake";
cake.innerText="🍰"
document.body.appendChild(cake);


//上記のdivタグをマウスに追従させる処理
document.addEventListener('mousemove', function (e) {
    cake.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});