function myFunction() {

  const c = new Companies();
  const url = c.url;
  const params = c.params;
  // const response = UrlFetchApp.fetch(url,params).getContentText();
  // const obj = JSON.parse(response);
  const obj = c.getJson(url,params);

  console.log(obj);
  
}
