/**
 * freeeAPIOauthに関するクラス
 * スプレッドシートのコンテナバインドスクリプトに記述
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
   * OAuth2ライブラリからオブジェクトを取得するメソッド
   * @return {Object} freeeOAuthオブジェクト
   */
  getService() {
    return OAuth2.createService('freee')
    .setAuthorizationBaseUrl('https://accounts.secure.freee.co.jp/public_api/authorize')
    .setTokenUrl('https://accounts.secure.freee.co.jp/public_api/token')
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties());
  }


  /** 
   * アクセストークンを取得するメソッド
   * @return {string} アクセストークン
   */
  getMyAccessToken() { return this.getService().getAccessToken(); }


}
