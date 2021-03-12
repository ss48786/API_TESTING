import { UPLOAD_IMAGE } from '../config/urls';
import { apiDelete, apiGet, apiPost, apiPut, setUserData } from '../utils/utils';


export function uploadImage(data={}){
    const headers = {'Content-Type': 'multipart/form-data'};
    return apiPost(UPLOAD_IMAGE,data);
 }
 