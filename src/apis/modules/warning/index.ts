import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetFindAlarmLogPageSpace, IgetListAlarmAttachmentsSpace, IgetListEventTreeVOsEventTypeSpace, IgetAlarmSpace, IgetFindAlarmTargetDataListSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;

/**
 * 数据访问，此类代码生成器生成
 */
class WarningApi {
  data2Mock: boolean = false;

  // 查询预警列表(实时、预警)|查询预警列表(实时、预警)-app预警管理
  getFindAlarmLogPage(params: IgetFindAlarmLogPageSpace.RequestParams) {
    const { currentPage, pageSize, alarmLevels, eventTypeCodes, startTime, endTime, handleStatus, alarmTitle } = params;
    const url = `${API_DOMAIN}${API_PREFIX}/app/alarm/findAlarmLogPage?currentPage=${currentPage}&pageSize=${pageSize}&alarmLevels=${alarmLevels}&eventTypeCodes=${eventTypeCodes}&startTime=${startTime}&endTime=${endTime}&handleStatus=${handleStatus}&alarmTitle=${alarmTitle}`;
    return requestHelper.getRequestData<IgetFindAlarmLogPageSpace.Model>(url, 'b12cb836-2ac4-4285-b749-ac184bad29af', this.data2Mock);
  }
  // 查询预警附件|查询预警附件-app预警管理
  getListAlarmAttachments(alarmId: number|string) {
    const url = `${API_DOMAIN}${API_PREFIX}/app/alarm/listAlarmAttachments?alarmId=${alarmId}`;
    return requestHelper.getRequestData<IgetListAlarmAttachmentsSpace.Model>(url, 'feba5302-8868-43cd-b771-e82b5bab0b87', this.data2Mock);
  }

  // 获取风险分类树列表|获取风险分类树列表-EventTypeController
  getListEventTreeVOsEventType() {
    const url = `${API_DOMAIN}${API_PREFIX}/eventType/listEventTreeVOs?useFor=1`;
    return requestHelper.getRequestData<IgetListEventTreeVOsEventTypeSpace.Model>(url, 'adc7023f-d545-40a0-a88e-122da3b3a469', this.data2Mock);
  }

  // 查询报警详情|查询报警详情-报警管理-报警记录
  getAlarm(id: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/${id}`;
    return requestHelper.getRequestData<IgetAlarmSpace.Model>(url, 'ceaf13dc-e822-4cab-ad1a-100e5001c400', this.data2Mock);
  }

  // 查询详情里的指标数据|查询详情里的指标数据-报警管理-报警记录
  getFindAlarmTargetDataList(alarmLogId: string, startTime?: string, endTime?: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/alarm/findAlarmTargetDataList?alarmLogId=${alarmLogId}&startTime=${startTime}&endTime=${endTime}`;
    return requestHelper.getRequestData<IgetFindAlarmTargetDataListSpace.Model>(url, '690b71f9-c3de-46f9-bb4f-991fab11a44d', this.data2Mock);
  }
}
export const apiWarningObj = new WarningApi();
