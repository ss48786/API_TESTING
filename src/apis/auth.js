// import {apiDelete, apiGet, apiPost, apiPut} from '../../utils/utils';
import { LOGIN, SIGNUP } from '../config/urls';
import { apiDelete, apiGet, apiPost, apiPut, setUserData } from '../utils/utils';




export function login(data = {}) {
   

  return apiPost(LOGIN, data);

}

export function signup(data = {}) {
    // console.log(data)
   return new Promise((resolve,reject) => {
     apiPost(SIGNUP,data).then(res=>{
       setUserData(res.data);
       resolve(res);

     }).catch(error=>{
       reject(error);
     })
   })
  }

