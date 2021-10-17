/**
 * パラメータを作成するクラス
 */
class Parameters {

  /** シート名を作るコンストラクタ */
  constructor(sheetName) {
    this.sheetName = `parameters_${sheetName}`;
  }


  /**
    * シートを掴むメソッド
    * @return {Object} sheetObject 
    */
  getSheet() {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.sheetName);
  }


  /**
    * シートから連結したクエリ文字列を返すメソッド
    * @return {string} queries - e.g 事業所ID&件数&offset 
    */
  getQueries() {
    const sheet = this.getSheet();
    const values = sheet.getDataRange().getValues();
    const noEmptyValues = values.filter(value => value[1] !== ''); //[1]はシートのB列
    const strValues = noEmptyValues.map(value => `&${value[0]}=${value[1]}`)
    const queries = strValues.join('').slice(1); //先頭の&を削除
    return queries;
  }


  /**
    * シートの指定Parameterに値を入力するメソッド
    * @param {string} property -  
    * @param {string} value -  
    */
  setParameter(property, value) {
    const sheet = this.getSheet();
    const [headers, ...records] = sheet.getDataRange().getValues();
    records.map(record => { if (record[0] === property) return record[1] = value; });
    sheet.getRange(2, 1, records.length, records[0].length).setValues(records);
  }




}

