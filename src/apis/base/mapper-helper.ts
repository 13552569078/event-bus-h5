import { axiosRequestSingle, EmptyResponseData, ResponseData } from '@/apis/base/request';

// 是否自动过滤 get 请求中的空参数值
const isFilterEmptyParams = true;

// 过滤 get 请求中的空参数
const filterUrlParams = (url: string) => {
  if (!isFilterEmptyParams) return url;
  const splitArr = url.split('?');
  if (splitArr.length) {
    const apiUrl = splitArr[0];
    const paramsObj = new URLSearchParams(splitArr[1]);
    const deleteArr = [];
    for (const p of paramsObj) {
      if (p[1] === 'undefined' || p[1] === '') {
        deleteArr.push(p[0]);
      }
    }
    deleteArr.forEach(paramName => {
      paramsObj.delete(paramName);
    });
    return `${apiUrl}?${paramsObj.toString()}`;
  } else {
    return url;
  }
};

const getRequestData = <T extends ResponseData | EmptyResponseData>(
  url: string,
  mapperApiId: string,
  data2mock: boolean = false
): Promise<T> => {
  const mockUrl = `http://172.15.34.231:7001/api/mapper_api/api/getApiJson/${mapperApiId}/2`;
  return new Promise((resolve, reject) => {
    const apiUrl = data2mock ? mockUrl : filterUrlParams(url);
    return axiosRequestSingle
      .get(apiUrl)
      .then(resp => resolve(resp as T))
      .catch(err => {
        reject(err);
      });
  });
};
const postRequestData = <T extends ResponseData | EmptyResponseData>(
  url: string,
  mapperApiId: string,
  data2mock: boolean = true,
  data?: { [x: string]: any }
): Promise<T> => {
  const mockUrl = `http://172.15.34.231:7001/api/mapper_api/api/getApiJson/${mapperApiId}/2`;
  if (data2mock) {
    return getRequestData(url, mapperApiId, true);
  }
  return new Promise((resolve, reject) => {
    const apiUrl = data2mock ? mockUrl : url;
    return axiosRequestSingle
      .post(apiUrl, data)
      .then(resp => resolve(resp as T))
      .catch(err => {
        reject(err);
      });
  });
};
const putRequestData = <T extends ResponseData | EmptyResponseData>(
  url: string,
  mapperApiId: string,
  data2mock: boolean = true,
  data?: { [x: string]: any }
): Promise<T> => {
  const mockUrl = `http://172.15.34.231:7001/api/mapper_api/api/getApiJson/${mapperApiId}/2`;
  if (data2mock) {
    return getRequestData(url, mapperApiId, true);
  }
  return new Promise((resolve, reject) => {
    const apiUrl = data2mock ? mockUrl : url;
    return axiosRequestSingle
      .put(apiUrl, data)
      .then(resp => resolve(resp as T))
      .catch(err => {
        reject(err);
      });
  });
};
const deleteRequestData = <T extends ResponseData | EmptyResponseData>(
  url: string,
  mapperApiId: string,
  data2mock: boolean = false
): Promise<T> => {
  const mockUrl = `http://172.15.34.231:7001/api/mapper_api/api/getApiJson/${mapperApiId}/2`;
  if (data2mock) {
    return getRequestData(url, mapperApiId, true);
  }
  return new Promise((resolve, reject) => {
    const apiUrl = data2mock ? mockUrl : url;
    return axiosRequestSingle
      .delete(apiUrl)
      .then(resp => resolve(resp as T))
      .catch(err => {
        reject(err);
      });
  });
};
/**
 *
 * @param params 请求参数中发现字段值处理
 */
const queryPramsDeal = (params: any) =>
  new Proxy(params, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return '';
    },
  });

const setDeepObj = (options: any, key: string, value: any) => {
  const keys = key.split('.');
  // eslint-disable-next-line no-return-assign
  keys.reduce(
    (acc, cur, i) => (acc[cur] = i === keys.length - 1 ? value : acc[cur] || []),
    options
  );
};

export const requestHelper = {
  getRequestData,
  postRequestData,
  putRequestData,
  deleteRequestData,
  queryPramsDeal,
  setDeepObj,
};
