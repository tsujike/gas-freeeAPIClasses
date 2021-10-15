function myFunction99() {

  const c = new Companies();
  const url = c.url;
  const params = c.params;

  const obj = c.getJson(url, params);

  console.log(c.getIdAndCompaniesName());

  console.log(c.getCompaniesId('開発'));
  /*
	[ { id: 2606452, display_name: '株式会社TG　GLOBAL' },
  { id: 3195480, display_name: '開発用テスト事業所（ミニマム・プラン）' },
  { id: 3293428, display_name: '開発用テスト事業所（法人・ベーシック）' } ]
  */

}




/**
 *  * TEST用関数
 * */
 function myFunction_20211015_155334() {

 const array = 	[ { id: 2606452, display_name: '株式会社TG　GLOBAL' },
  { id: 3195480, display_name: '開発用テスト事業所（ミニマム・プラン）' },
  { id: 3293428, display_name: '開発用テスト事業所（法人・ベーシック）' } ];

    const obj = { id: 2606452, display_name: '株式会社TG　GLOBAL' };

    const name = obj.display_name;

    const word = 'GLOBAL';

    // const reg = /word/;

    const reg = /株/;

    console.log(reg.test(name)); //true


 }
 