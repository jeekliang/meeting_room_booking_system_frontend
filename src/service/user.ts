import axios from './index';

export const login = (params: any) => {
  return axios.post('/v2/user/login', { ...params });
}

export const getCaptcha = (params: any) => {
  return axios.get('/v2/email/register-captcha', { params });
}

export const register = (params: any) => {
  return axios.post('/v2/user/register', { ...params });
}