/*
	//	HTML, JavaScript を勉強中の方の為に、
  //	コメント文を添えておきます
*/
		
var display,mov,first,old,yet,uicon; // 変数の宣言
var str='Setting...'; // 文字アニメーションに表示する文字列
var plus=new Audio(); // 増えた音
var minus=new Audio(); // 減った音
var prime=new Audio(); // 素数の音
plus.src='plus.mp3';
minus.src='minus.mp3';
prime.src='nc156168.mp3';
var flag=false; // 制御用
isPrime=num=>{i=0;if(num%2==1&&num>1){for(i=2;num%i!=0;i++){console.log(0)}}return (i==num||num==2)&&num!=0};
// 素数判定の関数　NAME=VALUE=>TODO というのは「アロー関数」と呼ばれる表記方法です。

function init(){ // 読み込まれた時に起動します
	display=document.getElementById('display'); // メッセージ数を表示するエリア
	mov=document.getElementById('mov'); // 文字アニメーションを表示するエリア
}
function start(){ // doneが押されたら起動します
	uicon=document.getElementById('usericon'); // ユーザーアイコンを表示するエリア
	user=document.getElementById('txt').value; // 入力されたユーザー名を取得
	if(user!=null&&user!='')uicon.src=getIcon(user); // ユーザー名が空でないなら、getIcon関数を呼び出す
	mov.innerText='';
	str='Getting...';
	yet=true;
	old=null;
	flag=true;
}
		
icon=ID=>{return `https://cdn2.scratch.mit.edu/get_image/user/${ID}_128x128.png`}; // IDを挿入したAPIリンクを返す関数
function getIcon(user){ // アイコンのURLを戻り値とする関数です
	rq=new XMLHttpRequest(); // XMLHttpRequestを作成
	rq.open('GET',`https://api.scratch.mit.edu/users/${user}`,false); // ユーザーAPIからデータを取得
	rq.send(null); // 空データを送信して戻り値を取得
	if(rq.readyState==4&&rq.status==200){return icon(JSON.parse(rq.responseText).id)}}
	// JSONを利用してAPIの戻り値からidを取得

setInterval(function(){ // setIntervalは一定の間隔で繰り返す動作です
	if(flag){
		set=user=>`https://api.scratch.mit.edu/users/${user}/messages/count`; // カウント取得
		rq=new XMLHttpRequest();
		rq.open('GET',set(user),false);rq.send(null);
		if(rq.readyState==4&&rq.status==200){
			r=JSON.parse(rq.responseText).count; // JSONを利用してAPIの戻り値からcountを取得
			console.log(`${user}\'s messages:${r}`);
			// console.logはデバッグ用です
			if(isPrime(r)&&yet){prime.play();yet=false;} // 素数ならすっご～いを鳴らす
			if(old!=r){if(old!=null){old<r?plus.play():minus.play();}old=r;yet=true;}
			display.innerText=`${user}\'s messages:${r}`; // メッセージ数を反映
		}
	}
	mov.innerText=str.substr(0,mov.innerText.length%(str.length)+1); // 文字列アニメーション
},500); // 500ms(ミリセカンド)で呼び出しています
