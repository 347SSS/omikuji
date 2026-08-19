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
    const userName = userNameInput.value.trim();

    // 名前が入力されていない場合
    if (userName.length === 0) {
      errorMessage.innerText =
        '名前を入力してください。';

      return;
    }

    // エラーメッセージを消す
    errorMessage.innerText = '';

    // 前のおみくじ結果を消す
    resultDivision.innerText = '';
    tweetDivision.innerText = '';

    // 前回の結果表示アニメーションを消す
    resultDivision.classList.remove('result-show');

    // おみくじ箱を表示する
    omikujiAnimation.classList.add('active');

    // 揺れアニメーションを最初から再生する
    omikujiAnimation.classList.remove('shake');

    void omikujiAnimation.offsetWidth;

    omikujiAnimation.classList.add('shake');

    // アニメーション中はボタンを押せなくする
    assessmentButton.disabled = true;


    // 0.9秒後に結果を表示する
    setTimeout(
      () => {

        // おみくじ箱を消す
        omikujiAnimation.classList.remove(
          'active',
          'shake'
        );

        // おみくじを引く
        const fortune = assessment(userName);


        // 名前の表示
        const resultTitle =
          document.createElement('p');

        resultTitle.className =
          'result-title';

        resultTitle.innerText =
          userName +
          'さんの今日の運勢は';

        resultDivision.appendChild(
          resultTitle
        );


        // 運勢の表示
        const fortuneName =
          document.createElement('div');

        fortuneName.className =
          'fortune-name';

        fortuneName.innerText =
          fortune.name;

        resultDivision.appendChild(
          fortuneName
        );


        // コメントの表示
        const fortuneComment =
          document.createElement('p');

        fortuneComment.className =
          'fortune-comment';

        fortuneComment.innerText =
          fortune.comment;

        resultDivision.appendChild(
          fortuneComment
        );


        // 結果をふわっと表示する
        resultDivision.classList.add(
          'result-show'
        );


        // X投稿リンクを作成
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


        // 再びボタンを押せるようにする
        assessmentButton.disabled = false;

      },
      1600
    );

  }
);


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
