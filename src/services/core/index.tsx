import Axios from 'axios';
import { dummyData } from './dummy';

export const NetworkHandler = Axios.create({
  baseURL: 'https://www.example.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getMockData = async (url: string) =>
  await new Promise(resolve => setTimeout(() => resolve(dummyData[url]), 300));

export const NetworkHandlerMocked = {
  get: (url: string, _config?: any): any => getMockData(url),
  post: (url: string, _config?: any): any => getMockData(url),
  put: (url: string, _config?: any): any => getMockData(url),
  patch: (url: string, _config?: any): any => getMockData(url),
  delete: (url: string, _config?: any): any => getMockData(url),
};
