function myFunction() {

  const c = new Companies();
  const url = c.url;
  const params = c.params;

  const obj = c.getJson(url,params);

  console.log(c.getIdAndCompaniesName());

  /*
	[ { id: 2606452, display_name: '株式会社TG　GLOBAL' },
  { id: 3195480, display_name: '開発用テスト事業所（ミニマム・プラン）' },
  { id: 3293428, display_name: '開発用テスト事業所（法人・ベーシック）' } ]
  */
}
