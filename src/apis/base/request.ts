import { AxiosInstance, AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import { Toast } from 'vant';
import { CommonUtils, Indexable, EmptyUtils } from 'fx-front-utils';
import axios from './caxios';
import { showMsgUrls, arrayBufferUrls, notTranslateEmpty } from './http-config';

/**
 * 返回类型基础类
 */

export interface EmptyResponseData {
  [key: string]: any;
}

export interface ResponseData {
  code: number | string;
  desc?: string;
  tips?: string;
  data: unknown;
}

export interface MockResponseData {
  code?: number | string;
  data: ResponseData;
  message: string;
  meta: any;
  success: boolean;
}

export interface TableList {
  list: Indexable<any>[]
}
/**
 * api 调用辅助类
 */
class RequestAxios {
  private serverObj: AxiosInstance;
  constructor() {
    this.serverObj = axios;
  }

  post(url: string, data: unknown = null) {
    return this.http(url, data, 'POST');
  }
  put(url: string, data: unknown = null) {
    return this.http(url, data, 'PUT');
  }
  get(url: string) {
    return this.http(url, null, 'GET');
  }
  delete(url: string) {
    return this.http(url, null, 'DELETE');
  }

  http(url: string, data: unknown, method: Method) {
    return new Promise<ResponseData>((resolve, reject) => {
      const config: AxiosRequestConfig = {
        url,
        method,
        // baseURL: "",
        data,
      };
      const showDownloading = arrayBufferUrls.some(item => config.url?.indexOf(item) !== -1);
      const tableNotTranslateEmpty = notTranslateEmpty.some(item => config.url?.indexOf(item) !== -1);
      let loadingInstance: any = null;
      if (showDownloading) {
        loadingInstance = Toast.loading({
          duration: 0,
          loadingType: 'spinner',
          forbidClick: true,
          message: '下载中'
        });
      }
      this.serverObj.request(config).then(
        (response: AxiosResponse) => {
          const respDataWrapper: ResponseData | MockResponseData = response.data;
          if (respDataWrapper instanceof ArrayBuffer) {
            CommonUtils.handleFileBuffer(response);
            loadingInstance && Toast.clear();
            resolve({ code: 0, data: true, desc: '下载成功' });
          } else {
            const respData = 'success' in respDataWrapper ? respDataWrapper.data || respDataWrapper : respDataWrapper;
            const isInShowMsgUrls = showMsgUrls.some(item => config.url?.indexOf(item) !== -1);
            if (isInShowMsgUrls && (+respData.code === 0 || +respData.code === 200)) {
              Toast.fail(respData.desc || '操作成功');
              resolve(respData);
            } else {
              if ((+respData.code === 0 || +respData.code === 200) && respData.data && (respData.data as TableList)?.list && !tableNotTranslateEmpty) {
                (respData.data as TableList).list = EmptyUtils.formatArray((respData.data as TableList).list);
              }
              (+respData.code === 0 || +respData.code === 200) ? resolve(respData) : reject(respData);
            }
          }
        },
        (err: unknown) => {
          loadingInstance && Toast.clear();
          reject(err);
        }
      );
    });
  }

  private static singleObj: RequestAxios;
  static getInstance() {
    if (!this.singleObj) {
      this.singleObj = new RequestAxios();
    }
    return this.singleObj;
  }
}
export const axiosRequestSingle = RequestAxios.getInstance();
