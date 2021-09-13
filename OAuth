//マイアプリ情報
const CLIENT_ID = 'クライアントID';
const CLIENT_SECRET = 'クライアントシークレット';

// 認証のエンドポイントとなるダイアログを表示します。
function alertAuth() {

  const service = getService();
  const authorizationUrl = service.getAuthorizationUrl();

  const template = HtmlService.createTemplate(
    '<a href="<?= authorizationUrl ?>" target="_blank">認証</a>. ' +
    'こちらをクリックすると表示される新しいウィンドウで「許可する」をクリックしてください。');
  template.authorizationUrl = authorizationUrl;

  const page = template.evaluate();
  SpreadsheetApp.getUi().showModalDialog(page, "認証をしてください");

}

//freeeAPIのサービスを取得
function getService() {
  return OAuth2.createService('freee')
    .setAuthorizationBaseUrl('https://accounts.secure.freee.co.jp/public_api/authorize')
    .setTokenUrl('https://accounts.secure.freee.co.jp/public_api/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback_')
    .setPropertyStore(PropertiesService.getUserProperties())
}

//認証コールバック
function authCallback_(request) {
  const service = getService();
  const isAuthorized = service.handleCallback(request);

  if (isAuthorized) {
    return HtmlService.createHtmlOutput('認証に成功しました。ウィンドウを閉じてください。');
  } else {
    return HtmlService.createHtmlOutput('認証に失敗しました。');
  };
}

//アクセストークン取得
function getMyAccessToken() {

  //freeeAPIのサービスからアクセストークンを取得
  const accessToken = getService().getAccessToken();
  console.log(accessToken);

}
