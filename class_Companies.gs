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
  getIdAndCompaniesName() {
    const allCompanies = this.getJson(this.url, this.params); //{}
    const companiesArray = allCompanies.companies; //[]
    const companies = companiesArray.map(company => {
      const obj = {};
      obj.id = company.id;
      obj.display_name = company.display_name;
      return obj;
    }
    );
    return companies;
  }


  /**
    * 事業所名（部分一致）からidを返すメソッド
    * @return {string} id - 012345
    */
  getCompaniesId(name) {
    const companies = this.getIdAndCompaniesName();
    const reg = new RegExp(name);
    const filter = companies.filter(company => reg.test(company.display_name))[0];　//常に1件しかヒットしない想定
    return filter.id;
  }

}
