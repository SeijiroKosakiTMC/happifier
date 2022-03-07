# happifier


## これは何？

お客さんが来た時の名前・時間・用件などを記録します。

<br>
<br>

## やること・できること

名前を入力して、用件ボタンを押すと、名前・時間・用件などを文字列にして配列に記録します。


来場者名が空欄の場合は、ボタン操作時にメッセージを表示し、来場者名にフォーカスします。


記録はコンソールからの操作で取り出せます。ダウンロードできるようにしたい。

<br>
<br>

## 使い方

ボタンの設定は JavaScript の配列に入力しておき、

その値をもとに生成されます。

<br>
<br>
<br>
<br>
<br>


# そんなことはどうでもいい

## そんなことはどうでもよくて、

隠しモードがあります(本命)

<br>

# これは何？
かわいいにこちゃんたちがお腹を空かせています。

ケーキをあげましょう。

<br>
<br>

## できること・使ったもの

## にこちゃんフィールドの配列とテーブルの動的生成

forループ、forEachなどを使ってコードに書いた数字から

データ管理用の配列と表示用のテーブルを生成

<br>

苦労した点

　2次元配列の自動生成時、上手にやらないと2次元目の配列が参照渡しになった。

　forEachの使い方か何かで解決、仕組みをわかり切っていないので要解析

<br>
<br>

## にこちゃんのオブジェクト管理

にこちゃんフィールド配列の中ににこちゃんオブジェクトを代入

にこちゃんオブジェクトには

　・にこちゃんたちの座標、空腹具合のプロパティ、

　・おなかすく・おやつたべる・顔の変更のメソッド

があり、これらもフィールドと同時に動的に生成される。

<br>

苦労した点

　それぞれのオブジェクト生成に関数を使い、そのメソッドを作るのにファクトリー関数を使った

　ファクトリー関数とクロージャーの考え方でいっぱい混乱

　メソッドも関数一つずつ作りながら確認して作成

　21億回くらいリファクタしました

<br>
<br>

## 配列と繰り返し処理を使った座標の管理と操作

おやつの配達と空腹時、指定点からの効果範囲とそれぞれのにこちゃんまでの距離を算出

おやつ配達時には、距離を使いながら近い順番に遅延時間を設けて繰り返し処理

<br>

苦労した点

　遅延のためにループ関数使わずに

　配列と数える人をグローバルスコープで使った

　力技

<br>
<br>

## HTML要素と Java Script つなぐ

にこちゃんたちの背景色、顔、クリック時の関数、その他について

JavaScriptとの動きをつなぐ

にこちゃんテーブル動的生成もそう

プログラムの仕組みでHTMLが出来上がるの楽しい

<br>

苦労した点

　HTML要素はappendするときに複製されないのを忘れてた

　動的生成時にいるだけ作るようにした

<br>
<br>
<br>

# 総じて

<br>

プログラミングは独学で少し経験あったが

　配列、オブジェクトなどの使い方

　データとしての関数の使い方

などをはじめとして多くを学ぶことができた。

🔓🔢🍐😋

<br>

またHTML･CSSとJavaScriptを使うことで

UIも簡単に作ることができるようになれば、

道具としてのソフトウェアを沢山作っていけると考える。

<br>

CSSの使い方はじめUI設計はまだ不得手なところであり

続けて勉強していきたい

<br>
<br>

DIGカレッジ講師陣・運営・同クラスのみなさま、ありがとうございました

今後もデジタル化に向けた能力向上と改善のためお世話になります。

どうぞよろしくお願い致します。
