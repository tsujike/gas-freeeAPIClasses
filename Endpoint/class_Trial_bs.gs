class TrialBs extends ApiRequests {
  constructor() {
    super();
    this.url = `${this.baseUrl}trial_bs`;
  }

  /**
    * 事業所idと事業所名を配列で取得するメソッド
    * @return {Array} bs [{id,name},{id,name}] 
    */
  getBs() {
    const companiesId = '3292996';
    const allBs = this.fetchRequest(this.url, this.params); //{}
    const bsArray = allbs.trial_bs; //[]
    return bsArray;
  }
}
