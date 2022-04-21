/**
 * freeeAPIOauthに関するクラス
 */
class AccessToken {


  /**
   * clientId,clientSecretプロパティを定義するコンストラクタ
   * @constructor
   */
  constructor() {
    this.clientId = CLIENT_ID;
    this.clientSecret = CLIENT_SECRET;
  }


 /** 
   * アクセストークンを取得するメソッド
   * @return {string} アクセストークン
   */
  getMyAccessToken() {
    return this.getService_().getAccessToken();
  }


 /** 
   * OAuth2ライブラリからオブジェクトを取得するメソッド
   * @return {Object} freeeOAuthオブジェクト
   */
  getService_() {
    return OAuth2.createService('freee')
      .setAuthorizationBaseUrl('https://accounts.secure.freee.co.jp/public_api/authorize')
      .setTokenUrl('https://accounts.secure.freee.co.jp/public_api/token')
      .setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET)
      .setCallbackFunction('authCallback')
      .setPropertyStore(PropertiesService.getUserProperties());
  }

}

/** アクセストークン確認用 */
function checkMyAccessToken() {

  const a = new AccessToken();
  console.log(a.getMyAccessToken());

}
