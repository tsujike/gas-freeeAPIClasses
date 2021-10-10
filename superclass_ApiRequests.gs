/**
 * ApiRequestに関するクラス
 */
class ApiRequests {
  constructor() {
    this.accessToken = new AccessToken().getMyAccessToken();
    this.baseUrl = 'https://api.freee.co.jp/api/1/';

    this.params = {
      heaer: { Autholization: `Bearer ${this.accessToken}` },
      method: 'get'
    }
  }

  // case 'companies' : this.url = 'https://api.freee.co.jp/api/1/companies'; break;
  // case 'deals' : this.url = 'https://api.freee.co.jp/api/1/deals?'; break;

}








