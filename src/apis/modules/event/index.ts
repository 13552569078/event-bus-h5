import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetEventSpace } from "./model";
import { GlobalAPI } from "@/common";
const API_DOMAIN = GlobalAPI.config.BASE_URL;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

const busPrefix = window.location.href.indexOf("113.137.24.206") > -1 ? "apibus" : "api";

/**
 * 数据访问，此类代码生成器生成
 */
class EventApi {
  data2Mock: boolean = false;

  /**
   * 繁星token置换服务Atoken
   * @returns http://100.66.100.150:5056/api/uc/fx/user/exchangeToken?accessToken=Bearer
   */
  getfxExchangeToken(token: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/api/uc/fx/user/exchangeToken?accessToken=Bearer ${token}`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ab",
      this.data2Mock
    );
  }

  // http://10.255.135.149:8580/api/bus/app/sourePlatformStatistics'
  /**
   * 来源平台统计
   * @returns
   */
  getSourePlatformStatistics() {
    const url = `${API_DOMAIN}${API_PREFIX}/${busPrefix}/bus/api/sourePlatformStatistics`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ab",
      this.data2Mock
    );
  }
  // http://10.255.135.149:8580/api/bus/app/busTrendStatistics?beginTime=2023-09-10%2000%3A00%3A00&endTime=2023-10-10%2023%3A59%3A59
  /**
   * 事件趋势统计
   * @returns
   */
  getBusTrendStatistics(beginTime: string,  endTime: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/${busPrefix}/bus/api/busTrendStatistics?beginTime=${beginTime}&endTime=${endTime}`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ac",
      this.data2Mock
    );
  }

  // http://10.255.135.149:8580/api/bus/app/areaEventStatistics?beginTime=2022-10-15%2000%3A00%3A00&endTime=2023-10-10%2023%3A59%3A59
  /**
   * 区域事件统计
   * @returns
   */
  getAreaEventStatistics(beginTime: string,  endTime: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/${busPrefix}/bus/api/areaEventStatistics?beginTime=${beginTime}&endTime=${endTime}`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ad",
      this.data2Mock
    );
  }

  // http://10.255.135.149:8580/api/bus/app/highFrequencyStatistics
  /**
   * 高频事件排名
   * @returns
   */
  getHighFrequencyStatistics() {
    const url = `${API_DOMAIN}${API_PREFIX}/${busPrefix}/bus/api/highFrequencyStatistics`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ae",
      this.data2Mock
    );
  }

  // http://10.255.135.149:8580/api/bus/event/list
  /**
   * 事件列表
   * @returns
   */
  getEventList(beginTime: string,  endTime: string, flag:string) {
    const url = `${API_DOMAIN}${API_PREFIX}/${busPrefix}/bus/api/event/list?beginTime=${beginTime}&endTime=${endTime}&flag=${flag}`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ae",
      this.data2Mock
    );
  }

  // http://10.255.135.149:8580/api/event/areaEventStatistics
  /**
   * 事要素-事件区域统计
   * @returns
   */
  getEventFactorAreaStatistics(beginTime: string, endTime: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/${busPrefix}/bus/api/event/areaEventStatistics?beginTime=${beginTime}&endTime=${endTime}`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ae",
      this.data2Mock
    );
  }

  // http://10.255.135.149:8580/api/event/sourePlatformStatistics
  /**
   *  事要素-来源平台统计
   * @returns
   */
  getEventFactorSourePlatformStatistics() {
    const url = `${API_DOMAIN}${API_PREFIX}/${busPrefix}/bus/api/event/sourePlatformStatistics`;
    return requestHelper.getRequestData(
      url,
      "4bd2a41e-fc64-4ac8-a91f-c771ec5556ae",
      this.data2Mock
    );
  }

}
export const apiEventObj = new EventApi();
