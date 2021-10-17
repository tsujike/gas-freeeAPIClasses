//スプレッドシートに関するクラスを作る時の注意は、実務（シート構成、スプレッドシート構成）によって変わるってことだもんな。
//だから、あまりスプレッドシートのクラスを抽象化することに時間を掛けるのはナンセンス。それにDWSはクラス群なんだから、書いていけば、DWSに寄ることはわかっている。
//まずは、実行用関数で、いつも通り、シートに貼り付けしていいのだ。社内、自分のなかでシート管理に関する方向性が固まればクラス化すればいいだけの話。

/**
 * スプレッドシートに関するクラス
 * @extends {ApiRequests} 
 */
class CustomSpreadsheet {

  /** SSオブジェクトのコンストラクタ */
  constructor(sheetId) {
    this.url = SpreadsheetApp.openById(sheetId);
  }


  /**
   * valuesを渡すと、スプレッドシートに貼り付ける関数
   * @param {Array} values 貼り付ける2次元配列
   * @param {string} sheetName 貼り付ける先のシート名
  */
  setValuesToSS_(values, sheetName) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    sheet.getRange(2, 1, values.length, values[0].length).setValues(values);
  }


}