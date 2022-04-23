/** コンテナバインドスクリプトで実行していますか？ */
//

/** OAuth2.0ライブラリはインストールしましたか？ */
// 1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF

/** 00_setProperties.gsは実行しましたか？ */
//setClientIdAndSecret()

/** 初回、および認証が切れているときに実行する */
//実行ログに「実行完了」が表示されたらスプレッドシートを確認します

function alertAuth() {

  const freeeOAuthObject = OAuth2.createService('freee')
    .setAuthorizationBaseUrl('https://accounts.secure.freee.co.jp/public_api/authorize')
    .setTokenUrl('https://accounts.secure.freee.co.jp/public_api/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback_')
    .setPropertyStore(PropertiesService.getUserProperties());

  const authorizationUrl = freeeOAuthObject.getAuthorizationUrl();

  // スタンドアロンスクリプトの場合
  // console.log(authorizationUrl);
  // return

  //コンテナバインドスクリプトの場合
  const template = HtmlService.createTemplate(
    '<a href="<?= authorizationUrl ?>" target="_blank">認証</a>. ' +
    'こちらをクリックすると表示される新しいウィンドウで「許可する」をクリックしてください。');
  template.authorizationUrl = authorizationUrl;

  const page = template.evaluate();
  SpreadsheetApp.getUi().showModalDialog(page, "認証をしてください");

  console.log('スプレッドシートを開く');

}



//認証コールバック関数
function authCallback_(request) {

  const service = OAuth2.createService('freee')
    .setAuthorizationBaseUrl('https://accounts.secure.freee.co.jp/public_api/authorize')
    .setTokenUrl('https://accounts.secure.freee.co.jp/public_api/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback_')
    .setPropertyStore(PropertiesService.getUserProperties());

  const isAuthorized = service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('認証に成功しました。タブを閉じてください。');
  } else {
    return HtmlService.createHtmlOutput('認証に失敗しました。');
  };
}


