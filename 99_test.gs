

/**
  * TEST用関数
  */
function testAccountItems() {

  const a = new AccountItems();

  const p = new Parameters('account_items');
  const queries = p.getQueries();

  const url = a.url + queries;
  console.log(url); //https://api.freee.co.jp/api/1/account_items?company_id=3293428


  return

  //全件検索
  console.log(a.getAccountItems());


  //あいまい検索
  console.log(a.getAccountItemsByFilter('売上高'));

  //完全一致
  console.log(a.getAccountItemId('売上高'));


}



/** TEST用関数 */
function testCompanies() {

  const c = new Companies();

  console.log(c.getCompanies());

  console.log(c.getCompaniesId('開発'));

}




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



/**
 *  * TEST用関数
 * */
function testPertners() {


  //ザックリ検索
  const p = new Partners();
  console.log(p.getPartners('テスト'));

  //完全一致
  // console.log(p.getPartnerId('株式会社フリー')); //39343903

}




/**
 *  * TEST用関数
 * */
function testWalletables() {

  const w = new Walletables();
  console.log(w.getWalletables());

}




