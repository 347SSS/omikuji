'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');


// おみくじの結果
const fortunes = [
  {
    name: '大吉',
    comment: '最高の運勢です！新しいことに挑戦すると良い一日になりそうです。'
  },

  {
    name: '吉',
    comment: '良い一日になりそうです。自信を持って行動してみましょう。'
  },

  {
    name: '中吉',
    comment: '穏やかな運勢です。焦らず一歩ずつ進んでいきましょう。'
  },

  {
    name: '小吉',
    comment: '小さな幸せが見つかりそうです。身近な出来事に目を向けてみましょう。'
  },

  {
    name: '末吉',
    comment: 'これから運気が上がっていきそうです。今日は準備を大切にしましょう。'
  },

  {
    name: '凶',
    comment: '少し慎重に過ごしたほうがよさそうです。落ち着いて行動しましょう。'
  },
  
  {
    name: '大凶',
    comment: '今日は無理をしないことが一番です。ゆっくり過ごしましょう。'
  }
];


// おみくじボタンをクリックしたとき
assessmentButton.addEventListener(
  'click',
  () => {

    // 入力された名前を取得
    const userName = userNameInput.value;

    // 名前が入力されていなければ処理を終了
    if (userName.length === 0) {
      return;
    }

    // おみくじの結果を取得
    const fortune = assessment(userName);


    // 診断結果エリアを空にする
    resultDivision.innerText = '';


    // 見出しを作成
    const header = document.createElement('h3');

    header.innerText =
      userName + 'さんの今日の運勢は「' +
      fortune.name +
      '」です！';

    resultDivision.appendChild(header);


    // コメントを作成
    const paragraph = document.createElement('p');

    paragraph.innerText = fortune.comment;

    resultDivision.appendChild(paragraph);


    // X投稿エリアを空にする
    tweetDivision.innerText = '';


    // X投稿用のリンクを作成
    const anchor = document.createElement('a');

    const tweetText =
      userName +
      'さんの今日のおみくじは「' +
      fortune.name +
      '」でした！\n' +
      fortune.comment;

    const hrefValue =
      'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(tweetText) +
      '&hashtags=' +
      encodeURIComponent('今日のおみくじ');

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('target', '_blank');

    anchor.innerText = 'Xで結果を投稿する';

    tweetDivision.appendChild(anchor);
  }
);


// 名前を受け取って、おみくじの結果を返す関数
function assessment(userName) {

  // 今日の日付を取得
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();


  // 名前と今日の日付を組み合わせて保存用の名前を作る
  const key =
    userName +
    '-' +
    year +
    '-' +
    month +
    '-' +
    date;


  // 今日すでにおみくじを引いているか確認する
  const savedResult = localStorage.getItem(key);


  // すでに今日のおみくじを引いていた場合
  if (savedResult !== null) {

    // 保存されていた結果を返す
    return fortunes[Number(savedResult)];
  }


  // まだ引いていない場合は
  // 0～6の数字をランダムに作る
  const index =
    Math.floor(Math.random() * fortunes.length);


  // 今日のおみくじの結果を保存する
  localStorage.setItem(key, index);


  // おみくじの結果を返す
  return fortunes[index];
}