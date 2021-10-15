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

  getJson(url, params) {
    const response = UrlFetchApp.fetch(url, params).getContentText();
    return JSON.parse(response);
  }



}