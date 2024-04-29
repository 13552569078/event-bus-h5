import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import * as qs from 'qs';
import { Toast } from 'vant';
import { useUser, UserApi } from 'fx-front-ucenter';
import { GlobalAPI } from '@/common';
import { noLoadingUrls, arrayBufferUrls, formDataUrls } from './http-config';

const pending = new Map(); // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const { getToken } = useUser();

const setHeaderToFormData = (config: AxiosRequestConfig, axiosConfig: CAxiosConfig) => {
  // 设置content-type特殊方式
  const formDataFlag = (axiosConfig.formDataUrls || []).some(
    (url: any) => config.url?.indexOf(url) !== -1
  );
  if (formDataFlag) {
    if (config.headers) config.headers['Content-Type'] = 'multipart/form-data';
  }
};

// 下载文件配置
const setResponseTypeToBuffer = (config: AxiosRequestConfig, axiosConfig: CAxiosConfig) => {
  const flag = (axiosConfig.arrayBufferUrls || []).some(item => config.url?.indexOf(item) !== -1);
  if (flag) {
    config.responseType = 'arraybuffer';
  }
};

const setFavicon = (url: string) => {
  if (url) {
    const favicon = (document.querySelector('link[rel*=\'icon\']') || document.createElement('link')) as HTMLLinkElement;
    favicon.type = 'image/x-icon';
    favicon.rel = 'shortcut icon';
    favicon.href = url;
    document.getElementsByTagName('head')[0].appendChild(favicon);
  }
};

interface CAxiosConfig extends AxiosRequestConfig {
  noLoadingUrls?: string[];
  arrayBufferUrls?: string[];
  formDataUrls?: string[];
  removeRepeatedUrl?: boolean;
  serverConfig?: { [x: string]: any };
  axiosConfig?: any[];
}

class CAxios {
  service: AxiosInstance;
  constructor(axiosConfig = { timeout: 100000 } as CAxiosConfig) {
    /* if (axiosConfig.serverConfig && typeof axiosConfig.serverConfig === 'object') {
      const xhr = new XMLHttpRequest();
      xhr.open('get', `${document.location.origin}/swan-gateway-warning/serverconfig/swanwarning`, false);
      xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
          const responseJson = JSON.parse(xhr.responseText);
          setFavicon(responseJson.LOGO);
          // document.title = responseJson.TITLE;
          // axiosConfig.baseURL = JSON.parse(xhr.responseText).BASE_URL;
          Object.assign(axiosConfig.serverConfig!, responseJson);
        }
      };
      xhr.send();
    } */
    this.service = axios.create(axiosConfig);
    // 设置 post、put 默认 Content-Type
    this.service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    this.service.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';

    const noLoadingString = (axiosConfig.noLoadingUrls || []).join('|').replace(/\//g, '\\/');
    this.service.interceptors.request.use(
      config => {
        if (!config.url?.match(noLoadingString)) {
          Toast.loading({
            duration: 0,
            loadingType: 'spinner',
            forbidClick: true
          });
        }
        setResponseTypeToBuffer(config, axiosConfig);
        setHeaderToFormData(config, axiosConfig);
        const url = [
          config.method,
          config.url,
          qs.stringify(config.params),
          qs.stringify(config.data),
        ].join('&');
        config.cancelToken =
          config.cancelToken ||
          new axios.CancelToken(cancel => {
            if (!pending.has(url)) {
              // 如果 pending 中不存在当前请求，则添加进去
              pending.set(url, cancel);
            }
          });
        this.handleRequestConfig(config, url);
        return config;
      },
      error => {
        Toast.clear();
        console.error(error); // for debug
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      response => {
        if (!response.config.url?.match(noLoadingString)) {
          Toast.clear();
        }
        // removeRepeatUrl(response.config, axiosConfig); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
        if (response.data instanceof ArrayBuffer) {
          return response;
        }
        const responseCode = response.data.code;
        if (String(responseCode) !== '200' && String(responseCode) !== '200010000' && String(responseCode) !== '0') {
          // 约定只要responseCode不等于0，就是异常状态
          Toast.fail(response.data.message || response.data.msg || '系统异常');
          console.log(`响应信息:${response.data.message}`);
        }
        /* switch (String(responseCode)) {
          case '3A0311':
          case '1A0101':
            if (window.parent !== window) {
              window.parent.postMessage({ method: 'logout' }, '*');
            } else {
              this.handleTokenExpired();
            }
            break;
        } */
        return response;
      },
      error => {
        console.error(error.response); // for debug
        Toast.clear();
        // 可以根据后端返回的状态码进行不同的操作
        if (error.response) {
          const errorCode = error.response.status;
          switch (errorCode) {
            case 400:
              Toast.fail('请求出现错误');
              break;
            case 401:
              Toast.fail('Token过期，请重新登录');
              // this.handleTokenExpired(error.response);
              break;
            case 403:
              Toast.fail('权限认证失效，请重新登录');
              // this.handleAuthFailed(error.response);
              break;
            case 404:
              Toast.fail('网络请求不存在');
              break;
            case 500:
              Toast.fail('系统异常');
              break;
            case 501:
              Toast.fail('请求还没有被实现');
              break;
            case 502:
              Toast.fail('网关错误');
              break;
            case 503:
              Toast.fail('服务暂时不可用');
              break;
            case 505:
              Toast.fail('请求的 HTTP 版本不支持');
              break;
            default:
              break;
          }
        }
        return Promise.reject(error);
      }
    );
  }
  handleRequestConfig(config: AxiosRequestConfig, url: string) {
    const token = getToken();
    // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkIjoxNjk2ODM5ODE1NzQzLCJyb2xlcyI6WyI0NDciLCI0NDkiLCI0NTEiLCI0NTAiXSwiaXNBZG1pbiI6MSwidGVuYW50Q29kZSI6Ijg4QzQ3Njg5MzJGODQ3Q0FBMkFCOUI5QUFBODYyMUJFIiwidXNlcklkIjoyMDAwNTAzLCJleHAiOjE2OTc0NDQ2MTU3NDMsInVzZXJuYW1lIjoiMTMzMTIzNDU2NzgifQ.Wv8XRrffdtR5rqrqeGpLPlFVNrH3j5Y_8DlosJLtJtY';
    // if (window.location.href.indexOf('localhost') === -1) {
    //   token = localStorage.getItem('token') || '';
    // }
    if (token) {
      if (config.headers) {
        // config.headers.authorization = 'Bearer ' + token;
        config.headers.Authorization = token;
      }
    }
    // 退出接口header加token加cookie
    if (url.includes('/sso/logout')) {
      config.withCredentials = true;
      if (config.headers && token) config.headers.token = token;
    }
  }
  handleTokenExpired() {
    const loginUrl = encodeURIComponent(`${window.location.origin}/${GlobalAPI.config.PROD_PREFIX}`);
    const url = UserApi.getUserCenterUrl(loginUrl);

    window.setTimeout(() => {
      // 退出到总集登录页
      window.location.href = url;
    }, 10);
  }
  handleAuthFailed(response: AxiosResponse) {
    console.log(response);

    window.setTimeout(() => {
      window.location.hash = '#/login';
    }, 10);
  }
}

const HongLingAxios = new CAxios({
  // baseURL: GlobalAPI.config.BASE_URL,
  noLoadingUrls,
  arrayBufferUrls,
  formDataUrls,
  serverConfig: process.env.NODE_ENV === 'production' ? GlobalAPI.config : undefined,
}).service;

export default HongLingAxios;
