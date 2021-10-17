/**
 * 取引先に関するクラス
 * @extends {ApiRequests} 
 */
class Partners extends ApiRequests {

  /** urlを作るコンストラクタ */
  constructor() {
    super();
    this.url = `${this.baseUrl}partners?`;
  }


  /**
    * 取引先配列を取得するメソッド
    * @param {string} value - 取引先名（部分一致可）
    * @return {Array} partnersArray
    */
  getPartners(value) {
    //Parameterシートに取引先検索ワードを入力する
    const p = new Parameters('partners');
    p.setParameter('keyword', value);

    //取引先検索ワードの結果を配列で返す
    const queries = p.getQueries();
    const url = this.url + queries;
    const allPartners = this.getJson(url, this.params); //{}
    const partnersArray = allPartners.partners; //[]
    return partnersArray;
  }


  /**
    * 取引先名（完全一致）からidを返すメソッド
    * @param {string} name - 取引先名
    * @return {string} id - 012345
    */
  getPartnerId(name) {
    const partners = this.getPartners();
    const filter = partners.filter(partner => partner.name === name)[0];　//常に1件しかヒットしない想定
    return filter.id;
  }


}