'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');
const omikujiAnimation = document.getElementById('omikuji-animation');
const errorMessage = document.getElementById('error-message');
const todayParagraph = document.getElementById('today');

// 今日の日付を表示
const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

todayParagraph.innerText =
  year + '年' +
  month + '月' +
  date + '日';

// おみくじの結果
const fortunes = [
  {
    name: '大吉',
    comment: '最高の運勢です！！新しいことに挑戦すると良い一日になりそう！'
  },

  {
    name: '吉',
    comment: '良い一日になりそうです。自信を持って行動してみましょう！'
  },

  {
    name: '中吉',
    comment: '穏やかな運勢です。焦らず一歩ずつ進んでいきましょう。'
  },

  {
    name: '小吉',
    comment: '小さな幸せが見つかりそうな予感。身近な出来事に目を向けてみましょう。'
  },

  {
    name: '末吉',
    comment: 'これから運気が上がっていきそうです。今日は準備を大切にしましょう。'
  },

  {
    name: '凶',
    comment: '今日1日は少し慎重に過ごしたほうがよさそうです。落ち着いて行動しましょう。'
  },
  
  {
    name: '大凶',
    comment: '今日は無理をしないことが一番です。今は我慢の時です。運気が戻るまで待ちましょう。'
  }
];


// おみくじボタンをクリックしたとき
assessmentButton.addEventListener(
  'click',
  () => {

    // 入力された名前を取得
    const userName =
      userNameInput.value.trim();


    // 名前が入力されていない場合
    if (userName.length === 0) {

      errorMessage.innerText =
        '名前を入力してください。';

      return;
    }


    // エラーメッセージを消す
    errorMessage.innerText = '';


    // 先に今日のおみくじ結果を決める
    const fortune =
      assessment(userName);


    // 前の結果を消す
    resultDivision.innerText = '';
    tweetDivision.innerText = '';

    resultDivision.classList.remove(
      'result-show'
    );


    // 前回の凶アニメーションを消す
    omikujiAnimation.classList.remove(
      'bad-luck'
    );


    // 凶または大凶の場合
    if (
      fortune.name === '凶' ||
      fortune.name === '大凶'
    ) {

      omikujiAnimation.classList.add(
        'bad-luck'
      );

    }


    // おみくじ箱を表示
    omikujiAnimation.classList.add(
      'active'
    );


    // アニメーションを再スタート
    omikujiAnimation.classList.remove(
      'shake'
    );

    void omikujiAnimation.offsetWidth;

    omikujiAnimation.classList.add(
      'shake'
    );


    // 連打防止
    assessmentButton.disabled = true;


    // 1.6秒後に結果を表示
    setTimeout(
      () => {

        // おみくじ箱を消す
        omikujiAnimation.classList.remove(
          'active',
          'shake',
          'bad-luck'
        );


        /* ==============================
           おみくじ紙を作る
        ============================== */

        const fortunePaper =
          document.createElement('div');

        fortunePaper.className =
          'fortune-paper';


        // 名前
        const resultTitle =
          document.createElement('p');

        resultTitle.className =
          'result-title';

        resultTitle.innerText =
          userName +
          'さんの今日の運勢は';

        fortunePaper.appendChild(
          resultTitle
        );


        // 運勢
        const fortuneName =
          document.createElement('div');

        fortuneName.className =
          'fortune-name';

        fortuneName.innerText =
          fortune.name;

        fortunePaper.appendChild(
          fortuneName
        );


        // コメント
        const fortuneComment =
          document.createElement('p');

        fortuneComment.className =
          'fortune-comment';

        fortuneComment.innerText =
          fortune.comment;

        fortunePaper.appendChild(
          fortuneComment
        );


        // おみくじ紙を画面へ追加
        resultDivision.appendChild(
          fortunePaper
        );


        /* ==============================
           大吉だけキラキラ
        ============================== */

        if (fortune.name === '大吉') {

          createSparkles();

        }

        // 大凶の場合は暗い演出
        if (fortune.name === '大凶') {

          playDaikyoEffect();

        }


        // 結果表示アニメーション
        void resultDivision.offsetWidth;

        resultDivision.classList.add(
          'result-show'
        );


        /* ==============================
           X投稿
        ============================== */

        const anchor =
          document.createElement('a');


        const tweetText =
          '今日のおみくじは「' +
          fortune.name +
          '」でした！\n' +
          fortune.comment;


        const hrefValue =
          'https://twitter.com/intent/tweet?text=' +
          encodeURIComponent(tweetText) +
          '&hashtags=' +
          encodeURIComponent('今日のおみくじ');


        anchor.setAttribute(
          'href',
          hrefValue
        );

        anchor.setAttribute(
          'target',
          '_blank'
        );

        anchor.setAttribute(
          'rel',
          'noopener noreferrer'
        );


        anchor.innerText =
          'Xで結果を投稿する';


        tweetDivision.appendChild(
          anchor
        );


        // ボタンを再び有効にする
        assessmentButton.disabled = false;

      },

      2400
    );

  }
);

// 大吉の星のキラキラ
function createSparkles() {

  const symbols = [
    '✦',
    '✧',
    '★',
    '✶'
  ];

  // 星をまとめて入れておく箱
  const fragment =
    document.createDocumentFragment();


  // 18個のキラキラを作る
  for (let i = 0; i < 18; i++) {

    const sparkle =
      document.createElement('span');

    sparkle.className = 'sparkle';

    sparkle.innerText =
      symbols[
        Math.floor(
          Math.random() * symbols.length
        )
      ];

    sparkle.style.left =
      (-10 + Math.random() * 120) + '%';

    sparkle.style.top =
      (-10 + Math.random() * 110) + '%';

    sparkle.style.fontSize =
      (28 + Math.random() * 30) + 'px';

    sparkle.style.animationDelay =
      (Math.random() * 0.4) + 's';

    sparkle.style.animationDuration =
      (1.2 + Math.random() * 0.6) + 's';

    // すぐ画面には追加せず、
    // fragmentに入れておく
    fragment.appendChild(
      sparkle
    );
  }


  // 最後に一度だけまとめて追加
  resultDivision.appendChild(
    fragment
  );

}


// 大凶の暗い演出を行う関数
function playDaikyoEffect() {

  // 前回の演出を消す
  document.body.classList.remove(
    'daikyo-mode'
  );

  resultDivision.classList.remove(
    'daikyo-result'
  );

  // アニメーションを最初から再生する
  void document.body.offsetWidth;

  // 画面を暗くする
  document.body.classList.add(
    'daikyo-mode'
  );

  // 「大凶」の文字を揺らす
  resultDivision.classList.add(
    'daikyo-result'
  );

  // 3秒後に演出を終了する
  setTimeout(
    () => {

      document.body.classList.remove(
        'daikyo-mode'
      );

      resultDivision.classList.remove(
        'daikyo-result'
      );

    },
    3000
  );

}

// 名前を受け取って
// 今日のおみくじを返す関数
function assessment(userName) {

  // 今日の日付を取得
  const today = new Date();

  const year =
    today.getFullYear();

  const month =
    today.getMonth() + 1;

  const date =
    today.getDate();


  // 名前と今日の日付から
  // 保存用の名前を作る
  const key =
    userName +
    '-' +
    year +
    '-' +
    month +
    '-' +
    date;

  // 今日すでに引いた結果を確認
  const savedResult =
    localStorage.getItem(key);


  // 今日すでに引いている場合
  if (savedResult !== null) {

    return fortunes[
      Number(savedResult)
    ];

  }

  // 0～6の数字をランダムに作る
  const index =
    Math.floor(
      Math.random() *
      fortunes.length
    );


  // 今日の結果を保存する
  localStorage.setItem(
    key,
    index
  );


  // おみくじの結果を返す
  return fortunes[index];
}
