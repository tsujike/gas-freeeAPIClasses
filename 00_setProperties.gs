'use strict'
/** 【注意】このスクリプトファイルはPUSH/PULLしない！ */

/** マイアプリのコールバックURL */
//https://script.google.com/macros/d/スクリプトID/usercallback

/** プロパティストアに格納 */
function setClientIdAndSecret() {

  //プロパティストアを空にしておく
  PropertiesService.getScriptProperties().deleteAllProperties();
  PropertiesService.getUserProperties().deleteAllProperties();
  PropertiesService.getDocumentProperties().deleteAllProperties();

  //マイアプリ情報
  const CLIENT_ID = '';
  const CLIENT_SECRET = '';

  //userPropertiesに格納する
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('CLIENT_ID', CLIENT_ID);
  userProperties.setProperty('CLIENT_SECRET', CLIENT_SECRET);

  console.log(userProperties.getProperties());

}


const CLIENT_ID = PropertiesService.getUserProperties().getProperty('CLIENT_ID');
const CLIENT_SECRET = PropertiesService.getUserProperties().getProperty('CLIENT_SECRET');