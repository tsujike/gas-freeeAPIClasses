/**
 * 取引（収入／収支）に関するクラス
 * @extends {ApiRequests} 
 */
class Deals extends ApiRequests {

  /** urlを作るコンストラクタ */
  constructor() {
    super();
    this.url = `${this.baseUrl}deals?`;
  }

  /**
    * 取引（収入／収支）JSONを取得するメソッド
    * @return {Object} json 
    */
  getDeals() {
    const p = new Parameters('deals');
    const queries = p.getQueries();
    const url = this.url + queries;
    const json = this.getJson(url, this.params); //getJson()とparamsはsuperclassから
    return json;
  }


  /**
    * 取引（収入／収支）Valuesを取得するメソッド
    * @return {Object} json 
    */
  getDealValues() {
    const deals = this.getDeals().deals;
    const values = deals.map(deal => this.getFullArray_(deal)).flat();

    //見出しを先頭に追加
    const upperPropertyKeys = Object.keys(deals[0]);

    const detailPropertyKeys = Object.keys(deals[0]['details'][0]);
    const detailKeys = detailPropertyKeys.map(detailPropertyKey => 'details_' + detailPropertyKey);

    const paymentPropertyKeys = Object.keys(deals[0]['payments'][0]);
    const paymentKeys = paymentPropertyKeys.map(paymentPropertyKey => 'payments_' + paymentPropertyKey);

    const headers = [...upperPropertyKeys, ...detailKeys, ...paymentKeys];
    values.unshift(headers);

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
    try {
      const paymentsArray = payments.map(payment => Object.values(payment)).flat();
    } catch{
      upperProperties.push(''); //配列の要素数を合わせる為
      const paymentsArray = ["id", "date", "from_walletable_type", "from_walletable_id", "amount"];//freeeでプロパティの増減仕様変更があると動かなくなる
    }

    //detailsプロパティを基点に、fullArrayを整形
    const fullArray = detailsArray.map(detail => {
      return [...upperProperties, ...detail, ...paymentsArray];
    }
    );

    return fullArray;
  }


  /** 明細行の分割までは実装できていない。やる必要あるのか？検索条件で絞るもの？ */

}
