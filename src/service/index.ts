import axios from 'axios';
import { message } from 'antd';

const instance = axios.create({});

instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(response => {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
}, async (error) => {
  message.error(error?.response?.data?.data);
  return;
});

export default instance;