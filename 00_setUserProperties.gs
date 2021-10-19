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
  const CLIENT_ID = '70feffd6db50adfe3a6e6c0bd7d4e9f03498b4230c6acf263c353ad7373e56ab';
  const CLIENT_SECRET = 'fa0162612ad0cf583066dd96793855b2a49eccb3d59c9f6c6be016804732344f';

  //userPropertiesに格納する
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('CLIENT_ID', CLIENT_ID);
  userProperties.setProperty('CLIENT_SECRET', CLIENT_SECRET);

  console.log(userProperties.getProperties());

}


const CLIENT_ID = PropertiesService.getUserProperties().getProperty('CLIENT_ID');
const CLIENT_SECRET = PropertiesService.getUserProperties().getProperty('CLIENT_SECRET');