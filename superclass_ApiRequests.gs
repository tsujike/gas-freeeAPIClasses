/**
 * ApiRequestに関するクラス
 */
class ApiRequests {
  constructor() {
    this.accessToken = new AccessToken().getMyAccessToken();
    this.baseUrl = 'https://api.freee.co.jp/api/1/';

    this.params = {
      headers: { Authorization: `Bearer ${this.accessToken}` },
      method: 'get'
    }

  }


  /** 会計freeeAPIリファレンスを取得するメソッド */
  getReference() {
    return 'https://developer.freee.co.jp/docs/accounting/reference';
  }


  /**
   * レスポンスのJSONをオブジェクトで返すメソッド
   * @param {string} url
   * @param {string} params
   * @return {Objext} JSONオブジェクト 
   */
  getJson(url, params) {
    const response = UrlFetchApp.fetch(url, params).getContentText();
    return JSON.parse(response);
  }


}