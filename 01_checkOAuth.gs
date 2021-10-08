/** OAuth2.0ライブラリはインストールしましたか？ */
// 1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF

/** 00_setProperties.gsは実行しましたか？ */
//setClientIdAndSecret()

/** 認証確認用関数 */
function checkMyAuth() {

  const f = new FreeeApiOauth();

  // 初回のみ要実行
  // f.alertAuth(); //スプレッドシートを確認してください

  const accessToken = f.getMyAccessToken();
  // console.log(accessToken);

}