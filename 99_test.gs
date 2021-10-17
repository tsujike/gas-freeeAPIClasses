function testCompanies() {

  const c = new Companies();
  const url = c.url;
  const params = c.params;

  const obj = c.getJson(url, params);

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
 *  * TEST用関数
 * */
function testDeals() {

  const d = new Deals();
  // console.log(d.getDeals());
  // console.log(d.getDealValues());

  const values = d.getDealValues();
  const sheet = SpreadsheetApp.openById('1uIind-5VSSAfFYNi3t500nCCrw5pbctpzGoHelKJTEY').getSheetByName('シート7');
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

}



/**
 *  * TEST用関数
 * */
function testPertners() {


//ザックリ検索
  const p = new Partners();
  console.log(p.getPartners('フリー'));

  //完全一致
  console.log(p.getPartnerId('株式会社フリー')); //39343903

}




/**
 *  * TEST用関数
 * */
function myFunction_20211017_114945() {

  const array = [['name', 'tsujike'], ['id', 101], ['address', 'hoge']];

  array.map(record => {
    if (record[0] === 'name') return record[1] = 'Takahashi';
  }

  )

  console.log(array); //[ [ 'name', 'Takahashi' ], [ 'id', 101 ], [ 'address', 'hoge' ] ]
}

