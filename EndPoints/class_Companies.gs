/**
 * 事業所に関するクラス
 * @extends {ApiRequests} 
 */
class Companies extends ApiRequests {

  /** urlを作るコンストラクタ */
  constructor() {
    super();
    this.url = `${this.baseUrl}companies`;
  }


  /**
    * 事業所idと事業所名を配列で取得するメソッド
    * @return {Array} companies [{id,name},{id,name}] 
    */
  getCompanies() {
    const allCompanies = this.fetchRequest(this.url, this.params); //{}
    const companiesArray = allCompanies.companies; //[]
    return companiesArray;
  }


  /**
    * 事業所名（部分一致）からidを返すメソッド
    * @param {string} name - 事業所名の一部
    * @return {string} id - 012345
    */
  getCompaniesId(name) {
    const companies = this.getCompanies();
    const reg = new RegExp(name);
    const filter = companies.filter(company => reg.test(company.display_name))[0];　//常に1件しかヒットしない想定
    return filter.id;
  }

}
