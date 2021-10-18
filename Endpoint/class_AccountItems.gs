/**
 * 勘定科目に関するクラス
 * @extends {ApiRequests} 
 */
class AccountItems extends ApiRequests {

  /** urlを作るコンストラクタ */
  constructor() {
    super();
    this.url = `${this.baseUrl}account_items?`;
  }


  /**
    * すべての勘定科目を返すメソッド
    * @return {Array} items 
    */
  getAccountItems() {
    const p = new Parameters('account_items');
    const queries = p.getQueries();
    const url = this.url + queries;
    const json = this.fetchRequest(url, this.params); //fetchRequest()とparamsはsuperclassから
    const items = json.account_items;
    return items;
  }


  /**
    * 勘定科目名のあいまい検索をするメソッド
    * @param {string} name - 勘定科目名
    * @return {Array} 勘定科目名リスト 
    */
  getAccountItemsByFilter(name) {
    const items = this.getAccountItems();
    const reg = new RegExp(name);
    const filtered = items.filter(item => reg.test(item.name));
    return filtered;
  }



  /**
    * 勘定科目名からidを返すメソッド
    * @param {string} name - 勘定科目名
    * @return {string} id 
    */
  getAccountItemId(name) {
    const items = this.getAccountItems();
    const filter = items.filter(item => item.name === name)[0];　//常に1件しかヒットしない想定
    return filter.id;
  }


}