import {apiDelete, apiGet, apiPost, apiPut} from '../../utils/utils';
import {LOGIN, SIGNUP} from '../config/urls';

export function getUserProfile(query) {
  return apiGet(LOGIN + query);
}