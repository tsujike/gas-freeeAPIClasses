/**
 * 口座に関するクラス
 * @extends {ApiRequests} 
 */
class Walletables extends ApiRequests {

  /** urlを作るコンストラクタ */
  constructor() {
    super();
    this.url = `${this.baseUrl}walletables?`;
  }


  /**
    * すべての口座を返すメソッド
    * @return {Array} items 
    */
  getWalletables() {
    const p = new Parameters('walletables');
    const queries = p.getQueries();
    const url = this.url + queries;
    const json = this.fetchRequest(url, this.params); //fetchRequest()とparamsはsuperclassから
    const walletables = json.walletables;
    return walletables;
  }


}








/**
 *  * TEST用関数
 * */
function testWalletables() {

  const w = new Walletables();
  console.log(w.getWalletables());

}



