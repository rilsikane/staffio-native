import axios from 'axios';




//dev

//const endpoint = "http://172.20.14.212/api_mobile/api/";


//TFS
//const endpoint = "http://45.116.216.94/Staffio_API/api/";

//G-Able
//const endpoint = "https://staffio.g-able.com/Staffio_gable_api/api/";

const endpoints ={"DEV":"http://172.20.14.212/api_mobile/api/","PAN":"https://staffio.g-able.com/STAFFIO_DEMO_API/api/"
,"TFS":"https://staffio.g-able.com/Staffio_API/api/","G-ABLE":"https://staffio.g-able.com/Staffio_gable_api/api/"
,"DEMO":"https://staffio.g-able.com/STAFFIO_DEMO_API/api/","OMS":"https://staffio.g-able.com/Staffio_gable_api/api/"}
//const endpoints ={"OMS":"http://172.20.14.212/api_mobile/api/"}
// ,"TFS":"https://staffio.g-able.com/Staffio_API/api/","G-ABLE":"https://staffio.g-able.com/Staffio_gable_api/api/",
// "G-ABLE":"https://staffio.g-able.com/Staffio_gable_api/api/","OMS":"https://staffio.g-able.com/Staffio_gable_api/api/"}



import store from 'react-native-simple-store';
import {
    Alert,Linking
} from 'react-native';
async function getEndpointService(param){
  try{
      const response = await  axios.post("https://staffio.g-able.com/STAFFIO_DEMO_API/api/SecurityService/GetEndpointMobile", param);
      console.log(response);
      if(response.status=='200' && response.data.Success){
        return response.data;
      }else{
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
async function getEndpoint(param){
  let endpointtmp = "";
  let endpoint = await store.get("endpointNew");
  if(endpoint && endpoint!=null){
    console.log(endpoint);
    endpointtmp = endpoint;
  }else{
     endpoint  = await getEndpointService(param);
     endpointtmp = endpoint.endPoint;
     if(endpointtmp && endpointtmp!= ''){
      await store.save("endpointNew",endpointtmp);
     }else{
      await store.save("endpointNew",undefined);  
     }
  }
   return endpointtmp;
}

export async function authen(path,param){
  console.log("authen-----"+param);
  const endpoint = await getEndpoint(param);
  const orgTmp = param.user_name.split("@");
  if(orgTmp.length>1){
    let endTmp = param.user_name.split("@")[1];
    if(endTmp=='DEV'){
      param.user_name =  `${param.user_name.split("@")[0]}@OMS`;
    }
  }
  let requestURL = `${endpoint}SecurityService/${path}`;
  console.log("requestURL-----"+requestURL);
      try{
          let response = await  axios.post(requestURL, param);
          console.log(response);
          if(response.status=='200' && response.data.Success){
            if(response.data.userProfile){
              let roleId = response.data.userProfile.ROLE_ID;
              let menuResponse = await  axios.post(`${endpoint}SecurityService/getMenu?module=7&roleID=${roleId}`);
              let menus = menuResponse.data.objData[0].SubMenu;
              
                for(let i=0;i<menus.length;i++){
                  if(menus[i].PageMenuCode=='ES002'){
                    response.data.userProfile.canLeave = true;
                  }
                  if(menus[i].PageMenuCode=='ES007'){
                    response.data.userProfile.canTime = true;
                  }
                }
                console.log("menuResponse",menuResponse.data.objData[0].SubMenu);
            }
            
           
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
        await store.delete("endpointNew"); 
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
  let lang = await store.get("locale");
  let requestURL = `${endpoint}${path}`;
      try{
          const response = await  axios.post(requestURL, param,{headers: {token:userData.token,lang:lang}});
          if(response.status=='200' && (response.data.Success || response.data.Complete)){
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
export async function get(path,param){
  console.log("param: "+JSON.stringify(param));
  const userData = await store.get("USER");
  const endpoint = await getEndpoint();
  let requestURL = `${endpoint}${path}`;
      try{
          const response = await  axios.get(requestURL,{params:param},{headers: {token:userData.token}});
          if(response.status=='200' && (response.data.Success || response.data.Complete)){
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

