'use strict'

const PROPERTIES = new Properties();

/**
 * freeeAPIOauthに関するクラス
 * スプレッドシートのコンテナバインドスクリプトに記述
 */
class FreeeApiOauth {


  /**
   * freeeApiOauthに関するコンストラクタ
   * @constructor
   */
  constructor() {
    this.clientId = PROPERTIES.get('CLIENT_ID');
    this.clientSecret = PROPERTIES.get('CLIENT_SECRET');
  }


  /** 
  * 認証のエンドポイントとなるダイアログを表示するメソッド（初回のみ）
  */
  alertAuth() {

    const authorizationUrl = this.getService().getAuthorizationUrl();

    const template = HtmlService.createTemplate(
      '<a href="<?= authorizationUrl ?>" target="_blank">認証</a>. ' +
      'こちらをクリックすると表示される新しいウィンドウで「許可する」をクリックしてください。');
    template.authorizationUrl = authorizationUrl;

    const page = template.evaluate();
    SpreadsheetApp.getUi().showModalDialog(page, "認証をしてください");

  }


  /** 
   * OAuth2ライブラリからオブジェクトを取得するメソッド
   */
  getService() {
    return OAuth2.createService('freee')
      .setAuthorizationBaseUrl('https://accounts.secure.freee.co.jp/public_api/authorize')
      .setTokenUrl('https://accounts.secure.freee.co.jp/public_api/token')
      .setClientId(this.CLIENT_ID)
      .setClientSecret(this.CLIENT_SECRET)
      .setCallbackFunction('authCallback_')
      .setPropertyStore(PropertiesService.getUserProperties())
  }


  /** 
  * アクセストークンを取得するメソッド
  */
  getMyAccessToken() {
    return this.getService().getAccessToken();
  }

}
