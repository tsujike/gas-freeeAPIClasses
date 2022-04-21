/**
 * 取引（収入／収支）に関するクラス
 * @extends {ApiRequests} 
 */
class Deals extends ApiRequests {

  /** urlを作るコンストラクタ */
  constructor() {
    super();
    this.url = `${this.baseUrl}deals?`;
    this.postParams.payload = this.getRequestBody();
  }

  /**
    * 取引（収入／収支）JSONを取得するメソッド
    * @return {Object} json 
    */
  getDeals() {
    const p = new Parameters('deals');
    const queries = p.getQueries();
    const url = this.url + queries;
    const json = this.fetchRequest(url, this.params); //fetchRequest()とparamsはsuperclassから
    const deals = json.deals;
    return deals;
  }


  /**
    * 取引（収入／収支）を登録するメソッド
    * renews, receiptsには非対応 
    * @return {Object} json 
    */
  getRequestBody() {
    const p = new Parameters('deals');
    const values = p.getRequestBodyValues();

    //最終的なリクエストボディオブジェクトを作るための初期化
    const requestBody = {};

    //details、paymentsの中身オブジェクトを作るための初期化
    const detailsObj = {};
    const paymentsObj = {};

    //requestBodyを作る処理
    values.map(value => {

      //空白セルの排除
      if (value[1] === '') return;

      //value[0]にキーワードが入ってるかどうか
      const isDetails_ = value[0].includes('details_');
      const isPayments_ = value[0].includes('payments_');

      /** detailsを整形 */
      if (isDetails_) {
        const property = value[0].replace('details_', '');
        detailsObj[property] = value[1];
        requestBody['details'] = [detailsObj];
      }

      /** paymentsを整形 */
      if (isPayments_) {
        const property = value[0].replace('payments_', '');
        paymentsObj[property] = value[1];
        requestBody['payments'] = [paymentsObj];
      }

      /** それ以外を整形 */
      if (!(isDetails_) && !(isPayments_)) requestBody[value[0]] = value[1];

    });

    const json = JSON.stringify(requestBody);
    return json;
  }


  /**
    * 取引（収入／収支）を登録するメソッド
    * @return {Object} json 
    */
  postDeal() {
    const json = this.fetchRequest(this.url, this.postParams); //fetchRequest()とpostParamsはsuperclassから
    return json;
  }


  /**
    * 取引（収入／収支）Valuesをすべて取得するメソッド
    * @return {Object} values
    */
  getDealValues() {
    const deals = this.getDeals();
    const values = deals.map(deal => this.getFullArray_(deal)).flat();
    return values;
  }


  /**
    * 単体dealを、2次元配列に変換するサブメソッド
    * @param {Object} 単体deal
    * @return {Array} dealの2次元配列化
    */
  getFullArray_(deal) {

    //最上層のプロパティを格納
    const upperProperties = Object.values(deal);

    //detailsプロパティを格納
    const details = deal['details'];
    const detailsArray = details.map(detail => Object.values(detail));

    //paymentプロパティを格納
    const payments = deal['payments'];

    //deal['payments']プロパティが無い場合、paymentsArrayを作る
    let paymentsArray; //let宣言が必要
    try {
      paymentsArray = payments.map(payment => Object.values(payment)).flat();
    } catch{
      upperProperties.push(''); //配列の要素数を合わせる為
      paymentsArray = ["id", "date", "from_walletable_type", "from_walletable_id", "amount"];//freeeでプロパティの増減仕様変更があると動かなくなる
    }

    //detailsプロパティを基点に、fullArrayを整形
    const fullArray = detailsArray.map(detail => {
      return [...upperProperties, ...detail, ...paymentsArray];
    }
    );

    return fullArray;
  }


}
  /** 明細行の分割までは実装できていない。やる必要あるのか？検索条件で絞るもの？ */




/**
 * 税区分コード
'税区分名':'税区分コード'
'課税売上10%:129'
'課税売上8%:101'
'課税売上8%（軽）:156'
'課税売上:21'
'課対仕入10%:136'
'課対仕入8%（軽）:163'
'課対仕入8%:108'
'課対仕入:34'
'対象外:2'
'不課税:20'
'非課売上:23'
'非課仕入:37'
*/



/**
 * TEST用関数
 */
function testDeals() {

  const d = new Deals();
  const values = d.getDealValues();
  const sheet = SpreadsheetApp.openById('1v40ooyVLGFH3wT3K4mhKb3p8FdH6B-X0qVlVwz9fekM').getSheetByName('テスト');
  sheet.getRange(40, 1, values.length, values[0].length).setValues(values);


}




/**
 * TEST用関数
 */
function testPostDeal() {

  const d = new Deals();
  console.log(d.postDeal());

}