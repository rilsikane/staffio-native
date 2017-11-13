import axios from 'axios';

//dev

//const endpoint = "http://172.20.14.212/api_mobile/api/";


//TFS
//const endpoint = "http://45.116.216.94/Staffio_API/api/";

//G-Able
//const endpoint = "http://45.116.216.94/Staffio_gable_api/api/";

const endpoints ={"DEV":"http://172.20.14.212/api_mobile/api/"
,"TFS":"http://45.116.216.94/Staffio_API/api/","G-ABLE":"http://45.116.216.94/Staffio_gable_api/api/",
"G-ABLE":"http://45.116.216.94/Staffio_gable_api/api/","OMS":"http://45.116.216.94/Staffio_gable_api/api/"}

import store from 'react-native-simple-store';
import {
    Alert,Linking
} from 'react-native';

async function getEndpoint(){
  const endpoint = await store.get("endpoint");
  console.log(endpoint);
  return endpoints[`${endpoint}`];
}

export async function authen(path,param){
  console.log("authen-----"+param);
  const endpoint = await getEndpoint();
  let requestURL = `${endpoint}SecurityService/${path}`;
  console.log("requestURL-----"+requestURL);
      try{
          const response = await  axios.post(requestURL, param);
          if(response.status=='200' && response.data.Success){
            return response;
          }else{
              if(response.data.UrlDL && ""!=response.data.UrlDL){
                Alert.alert(
                  'เกิดข้อผิดพลาด',
                  response.data.Msg,
                  [
                  {text: 'กดเพื่อทำการอัพเดท', onPress: () => Linking.openURL(response.data.UrlDL)},
                  ]
                )
              }else{
                Alert.alert(
                  'เกิดข้อผิดพลาด',
                  response.data.Msg,
                  [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                  ]
                )
              }
              return false;
          }
      }catch(e){
          console.error(e);
            Alert.alert(
            'เกิดข้อผิดพลาด',
            'ไม่สามารถเชื่อมต่อระบบได้',
            [
            {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
            )
          return false;
      }
}
export async function post(path,param){
  console.log("param: "+JSON.stringify(param));
  const userData = await store.get("USER");
  const endpoint = await getEndpoint();
  let requestURL = `${endpoint}${path}`;
      try{
          const response = await  axios.post(requestURL, param,{headers: {token:userData.token}});
          if(response.status=='200' && response.data.Success){
            console.log("postService"+JSON.stringify(response));
            return response.data;
          }else{
              console.log(response.data.Msg);
              Alert.alert(
                  'เกิดข้อผิดพลาด',
                  response.data.Msg,
                  [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                  ]
              )
              return false;
          }
      }catch(e){
    console.log(e);
     console.error(e);
     Alert.alert(
      'เกิดข้อผิดพลาด',
      'ไม่สามารถเชื่อมต่อระบบได้',
      [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    )
          return e;
      }
}
