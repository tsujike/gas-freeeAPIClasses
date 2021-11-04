class TrialBs extends ApiRequests {
  constructor() {
    super();
    this.url = `${this.baseUrl}reports/trial_bs`;
  }

  /**
    * 事業所idと事業所名を配列で取得するメソッド
    * @return {Array} bs [{id,name},{id,name}] 
    */
  getBs() {
    const companiesId = '3292996';
    const url = `${this.url}?company_id=${companiesId}`;
    const allBs = this.fetchRequest(url, this.params); //{}
    const bsJson = allBs.trial_bs; //[]
    return bsJson;
  }

  /*
  {
    "trial_bs": {
      "company_id": 1,
      "fiscal_year": 2019,
      "start_month": 1,
      "end_month": 12,
      "start_date": "2019-12-17",
      "end_date": "2019-12-17",
      "account_item_display_type": "account_
  */


  /*
  //https://api.freee.co.jp/api/1/reports/trial_bs?company_id=3292996&
  fiscal_year=2021&
  start_month=1&
  end_month=12&
  breakdown_display_type=item&
  adjustment=without&
  approval_flow_status=all
  */

  getBsItems(startMonth, endMonth, adjustment='without') {
    const companiesId = '3292996';
    const year = 'fiscal_year=2013';

    const url = `${this.url}?company_id=${companiesId}&breakdown_display_type=item&${year}&start_month=${startMonth}&end_month=${endMonth}&adjustment=${adjustment}`;

    const allBsItems = this.fetchRequest(url, this.params); //{}
    return allBsItems;
  }




}
