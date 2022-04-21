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
  const CLIENT_ID = 'f912d3e5f09fed06e554039c03516a44501f8e6e30e8be6ab626f3777c735c36';
  const CLIENT_SECRET = 'f042c2123a97c4292e720e8e4a4ff460aa4e5e4c8d6b82cb47ba927edf269566';

  //userPropertiesに格納する
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('CLIENT_ID', CLIENT_ID);
  userProperties.setProperty('CLIENT_SECRET', CLIENT_SECRET);

  console.log(userProperties.getProperties());

}


const CLIENT_ID = PropertiesService.getUserProperties().getProperty('CLIENT_ID');
const CLIENT_SECRET = PropertiesService.getUserProperties().getProperty('CLIENT_SECRET');
