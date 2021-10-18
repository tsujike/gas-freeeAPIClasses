

/**
 *  * TEST用関数
 * */
function testAccountItems() {

  const a = new AccountItems();

  //全件検索
  console.log(a.getAccountItems());

  //あいまい検索
  console.log(a.getAccountItemsByFilter('売上高'));

  //完全一致
  console.log(a.getAccountItemId('売上高'));


}



/**
 *  * TEST用関数
 * */
function testCompanies() {

  const c = new Companies();
  const url = c.url;
  const params = c.params;

  const obj = c.fetchRequest(url, params);

  console.log(c.getCompanies());

  console.log(c.getCompaniesId('開発'));
  /*
[ { id: 2606452,
    name: null,
    name_kana: null,
    display_name: '株式会社TG　GLOBAL',
    role: 'admin' },
  { id: 3195480,
    name: '',
    name_kana: '',
    display_name: '開発用テスト事業所（ミニマム・プラン）',
    role: 'admin' },
  { id: 3293428,
    name: '',
    name_kana: '',
    display_name: '開発用テスト事業所（法人・ベーシック）',
    role: 'admin' } ]
  */

}




/**
 * TEST用関数
 */
function testDeals() {

  const d = new Deals();
  // const values = d.getDealValues();
  // const sheet = SpreadsheetApp.openById('1v40ooyVLGFH3wT3K4mhKb3p8FdH6B-X0qVlVwz9fekM').getSheetByName('テスト');
  // sheet.getRange(2, 1, values.length, values[0].length).setValues(values);


  console.log(d.getHeaders());

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




