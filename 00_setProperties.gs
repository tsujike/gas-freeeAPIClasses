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
  const CLIENT_ID = '09f5d080771dada392ea919be7126232e1c94a3127f6a809d5eca86bf4f1d527';
  const CLIENT_SECRET = '2a473cddbb6e0deea20b9784f95850d361072ab985edea9430f0e8b070963496';

  //userPropertiesに格納する
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('CLIENT_ID', CLIENT_ID);
  userProperties.setProperty('CLIENT_SECRET', CLIENT_SECRET);

  console.log(userProperties.getProperties());

}


const CLIENT_ID = PropertiesService.getUserProperties().getProperty('CLIENT_ID');
const CLIENT_SECRET = PropertiesService.getUserProperties().getProperty('CLIENT_SECRET');