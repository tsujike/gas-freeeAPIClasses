/**
 * freeeの便利ツールの静的クラス
 */
class F {
  //Fクラスの静的メソッド設定
​
  /**********
   * 日付をFREEE形式に変換して返す
   * @param {date} date 対象の日付(Dateオブジェクト)
   * @param {number} daysAfter [OPTION]dateの何日後を指定
   * @param {number} daysBefore [OPTION]dateの何日前を指定
   * @return {string} yyyy-mm-dd
   */
  static date(date, daysAfter = 0, daysBefore = 0) {
    date.setDate(date.getDate() + daysAfter - daysBefore);
    return Utilities.formatDate(date, "Asia/Tokyo", "yyyy-MM-dd");
  }
​
  /**********
   * FREEE形式の日付をDateオブジェクトに変換して返す
   * @param {date} date 対象の日付(Freee形式)
   * @return {Date}
   */
  static revDate(date) {    
    const dateStr = date.replace(/-/g,'/');
    return new Date(dateStr);
  }
​
  /**********
   * 金額を￥#,###に変換して文字列で返す
   * @param {number} amount 文字列変換する金額
   * @return {string} ￥#,###
   */
  static yen(amount) {
    return amount.toLocaleString();
  }
​
  /**********
   * [id, name, ...]の配列から、名称←→IDの変換を行う
   * @param {string or number} query 検索するもの（IDの場合はID）
   * @param {ReadSpreadsheet} table ReadSpreadsheetクラスのインスタンス
   * @param {string} type 'partners' 'account_items' 'items' 'sections' 'tags'
   * @return {any}
   */
  static conv(query, table, type) {
    let search, answer;
    switch (typeof query) {
      case 'string' : search = 1; answer = 0; break;
      case 'number' : search = 0; answer = 1; break;
    }
    for(const arr of table[type]) {
      if(arr[search] == query) {
        return arr[answer];
      }
    }
  }
​
  /**********
   * 取引先の名称←→IDの変換を行う　※第2引数指定しないと毎回スプレッドシート読むので注意
   * @param {number or string} query 検索するもの（IDの場合はID）
   * @param {ReadSpreadsheet} table ReadSpreadsheetクラスのインスタンス
   * @return {number or string}
   */
  static partner(query, table=new ReadSpreadsheet()) {
    return F.conv(query,table,'partners');
  }
​
  /**********
   * 勘定科目の名称←→IDの変換を行う　※第2引数指定しないと毎回スプレッドシート読むので注意
   * @param {number or string} query 検索するもの（IDの場合はID）
   * @param {ReadSpreadsheet} table ReadSpreadsheetクラスのインスタンス
   * @return {number or string}
   */
  static accItem(query, table=new ReadSpreadsheet()) {
    return F.conv(query,table,'account_items');
  }
​
  /**********
   * 品目の名称←→IDの変換を行う　※第2引数指定しないと毎回スプレッドシート読むので注意
   * @param {number or string} query 検索するもの（IDの場合はID）
   * @param {ReadSpreadsheet} table ReadSpreadsheetクラスのインスタンス
   * @return {number or string}
   */
  static item(query, table=new ReadSpreadsheet()) {
    return F.conv(query,table,'items');
  }
​
  /**********
   * 部門の名称←→IDの変換を行う　※第2引数指定しないと毎回スプレッドシート読むので注意
   * @param {number or string} query 検索するもの（IDの場合はID）
   * @param {ReadSpreadsheet} table ReadSpreadsheetクラスのインスタンス
   * @return {number or string}
   */
  static section(query, table=new ReadSpreadsheet()) {
    return F.conv(query,table,'sections');
  }
​
  /**********
   * メモタグの名称←→IDの変換を行う　※第2引数指定しないと毎回スプレッドシート読むので注意
   * @param {number or string} query 検索するもの（IDの場合はID）
   * @param {ReadSpreadsheet} table ReadSpreadsheetクラスのインスタンス
   * @return {number or string}
   */
  static tag(query, table=new ReadSpreadsheet()) {
    return F.conv(query,table,'tags');
  }
​
  /**********
   * 自事業所の名称←→IDの変換を行う
   * @param {number or string} query 検索するもの（IDの場合はID）
   * @param {ReadSpreadsheet} table ReadSpreadsheetクラスのインスタンス
   * @return {number or string}
   */
  static company(query) {
    const table = { companies : F.companies };
    return F.conv(query, table,'companies');
  }  
}
​
F.dataMaxPartners = 3000;
F.dataMaxAccount_items = 3000;
F.dataMaxItems    = 10000;
F.dataMaxSections = 100;
F.dataMaxTags     = 50000;
F.dataColPartners = 1;
F.dataColAccount_items = 4;
F.dataColItems    = 7;
F.dataColSections = 10;
F.dataColTags     = 13;
F.companies       = [
                      [452906,'三国産業株式会社'],
                      [452991, '株式会社ファンテック'],
                      [2830286,	'三国ホールディングス'],
                      [3169161,	'開発用テスト事業所']
                    ];
​
/**
 * ReqestUrl リクエストURLを整形するクラス
 */
class Request {
 /**
  * @constructor
  * @param {string} type 共通エンドポイントの後のURL
  */
  constructor(type) {
    this.type  = type;
    this.underConstruction  = 'https://api.freee.co.jp/api/1/' + type;
    this.path  = '';
    this.query = '';
    this.isFinalized = false;
    this.limit = '';
    this.offset= '';
    this.token = getService().getAccessToken();
  }
​
  //urlをゲット
  get url() {
    return this.finalize();
  }
​
  //pageをゲット
  get page() {
    let url = this.url + this.offset + this.limit;
    if(!url.match(/\?/)) {
      //urlに？が含まれていない場合
      url = url.replace(/\&/,'?');
    }
    return url;
  }
​
  /**
   * finalizeメソッドにアクセスすると、urlを確定して返す
   */
  finalize() { 
    if(!this.isFinalized) {
      //初めてGETされる時点でURLを完成させる
      this.isFinalized = true;
      //URLの最後が/じゃないのに、pathが追加されているなら、/を追加する
      if(this.underConstruction.slice(-1) != '/' && this.path) { this.underConstruction += '/' }
      this.underConstruction += this.path + this.query;
    }
    return this.underConstruction;
  }
​
 /**
  * addParam URLにパラメータを追加する
  * @param {string} title パラメータ名　&title=value　のtitle
  * @param {string} value セットする値　&title=value　のvalue
  * @return this
  */
  addParam (title, value) {
​
    if(this.isFinalized) { throw 'URLは既に完成されています。'; }
    
    if(!this.query.match(/\?/)) {
      //まだ何のパラメータも追加されてないなら
      this.query += '?';
    } else {
      //既にパラメータ追加済みなら
      this.query += '&';
    }
    this.query += title + '=' + value;
    return this;
  }
​
 /**
  * addPath URLにPathを追加する
  * @param {string} path 共通エンドポイントの後のPath
  * @return this
  */
  addPath (path) {
​
    if(this.isFinalized) { throw 'URLは既に完成されています。'; }
    
    if(!this.path) {
      //まだ何のパスも追加されてないなら
      this.path += path;
    } else {
      //既にパス追加済みなら
      this.path += '/' + path;
    }
    return this;
  }
​
 /**
  * changeParam 発行済のURLを未発行に戻し、パラメータを更新する
  * @param {string} title パラメータ名　&title=value　のtitle
  * @param {string} value セットする値　&title=value　のvalue
  * @return this
  */
  changeParam (title, value) {
    
    //URL設定を初期化
    this.isFinalized = false;
    this.limit = '';
    this.offset= '';
    this.underConstruction  = 'https://api.freee.co.jp/api/1/' + this.type;
    
    const regParam = new RegExp(`${title}=.*?[&|\$]`);
    const regTitle = new RegExp(title);
​
    if(this.query.match(regTitle)) {
      //今回追加するパラメーターが追加済みなら新規valueと置換する
      this.query = this.query.replace(regParam,`${title}=${value}&`);
      if(this.query.slice(-1) == '&') this.query = this.query.slice(0,-1);
      console.log(`this.queryを置換しました。`);
    } else {
      //パラメータが存在しない場合、通常通り新規追加
      console.log(`this.queryに追加しました。`);
      this.addParam(title,value);
    }
  }  
​
 /**
  * addPage ファイナライズ後のURLにLimitとOffsetを追加・変更する
  * @param {number} limit limit
  * @param {number} offset offset
  * @return this
  */
  addPage (limit, offset) {
    
    if(limit) this.limit = '&limit='+limit;
    else this.limit = '';
    if(offset) this.offset= '&offset='+offset;
    else this.offset = '';
    return this;
  }
​
  /**
   * freeeにGETリクエストを送信する
   * @param {string} url リスエストURL
   * @return {object} レスポンス（オブジェクト）
   */
  requestGet(url=this.url) {
    const params = {
      headers: { 'Authorization': 'Bearer ' + this.token },
      method: 'get'
    }
    console.log(`リクエスト実施　URL=${url} params=${params}`);
    const response = UrlFetchApp.fetch(url, params).getContentText();
    return JSON.parse(response);
  }
​
  /**
   * freeeにPOSTリクエストを送信する
   * @param {string} url リクエストURL
   * @param {Object} json ポストするJSONデータ(オブジェクト状態)
   * @return {object} レスポンス（オブジェクト）
   */
  requestPost(url=this.url, json) {
    json = JSON.stringify(json);
    const params = {
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + this.token },
      method: 'post',
      payload: json,
      muteHttpExceptions: true
    }
    console.log(`リクエスト実施　URL=${url} params=${params}`);
    const response = UrlFetchApp.fetch(url, params).getContentText();
    return JSON.parse(response);
  }
​
  /**
   * freeeにPUTリクエストを送信する
   * @
   */
  requestPut() {
    //TODO:
  }

  /**
   * freeeにGETリクエストをPAGE機能を使用して送信する
   * @param {string} prop レスポンスオブジェクトのトップレベルプロパティ
   * @return {Array} datas レスポンス（オブジェクトの配列）
   */
  pageRequest (prop, limit=100) {

    //リクエスト用の変数を準備
    let res_num = limit;
    let offset  = 0;
    const datas = [];

    console.log(`${prop}取得開始(limit:${limit})`);

    while (res_num == limit) {
      this.addPage(limit,offset);
      const response = this.requestGet(this.page)[prop];
      datas.push(...response);
      res_num = response.length;
      offset += res_num;

      Utilities.sleep(300); //0.3秒ストップ
    }

    console.log(prop+'取得完了');
    return datas;

  }
}
