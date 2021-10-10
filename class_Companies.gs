/**
 * 事業所に関するクラス
 * @extends {ApiRequests} 
 */
class Companies extends ApiRequests {
  constructor() {
    super();
    // this.url = this.baseUrl + 'companies';
    this.url = `${this.baseUrl}companies`;


  }




}


//  case 'companies' : this.url = 'https://api.freee.co.jp/api/1/companies'; break;

/*

{
  "companies": [
    {
      "id": 1,
      "name": "freee事務所",
      "name_kana": "フリージムショ",
      "display_name": "freee事務所",
      "role": "admin"
    }
  ]
}

*/