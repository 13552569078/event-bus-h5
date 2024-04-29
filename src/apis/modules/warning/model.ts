/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 查询预警列表(实时、预警)-Model类库
 */
export namespace IgetFindAlarmLogPageSpace {
  export class RequestParams {
    currentPage?: number;
    pageSize?: number;
    alarmLevels?: [];
    eventTypeCodes?: [];
    startTime?: string;
    endTime?: string;
    handleStatus?: number;
    alarmTitle?: string;
    constructor() {
      this.currentPage = 0;
      this.pageSize = 0;
      this.eventTypeCodes = [];
      this.alarmLevels = [];
      this.startTime = "";
      this.endTime = "";
      this.handleStatus = 0;
      this.alarmTitle = "";
    }
  }

  export interface List {
    id: number;
    regionName: string;
    monitorUnitName: string;
    monitorUnitId: number;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevelCode: string;
    alarmLevelName: string;
    alarmTitle: string;
    alarmAddress: string;
    startTime: string;
    endTime: string;
    alarmState: number;
    judgeStatus: number;
    judgeStatusName: string;
    judgeResult: number;
    judgeResultName: string;
    judgeType: number;
    judgeTypeName: string;
    handleStatus: number;
    handleStatusName: string;
    judgeTime: string;
    alarmOriginName: string;
    handleOptionName: string;
    attachmentNum: number;
  }

  export interface Data {
    totalRow: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    list: List[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
/**
 * 查询预警附件-Model类库
 */
export namespace IgetListAlarmAttachmentsSpace {
  export class RequestParams {
    alarmId?: number;
    constructor() {
      this.alarmId = 0;
    }
  }

  export interface Data {
    fileId: string;
    attachmentType: string;
    originalName: string;
    url: string;
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/**
            * 获取风险分类树列表-Model类库
            */
export namespace IgetListEventTreeVOsEventTypeSpace {

  export class RequestParams {

    constructor() {

    }
  }

  export interface Children {
    leafNode: number;
  }

  export interface Children {
    parentEventTypeCode: string;
    parentFullSystemCode: string;
    fullSystemCode: string;
    systemCode: string;
    eventTypeCode: string;
    eventTypeName: string;
    childrens: Children[];
    leafNode: number;
  }

  export interface Data {
    parentEventTypeCode: string;
    parentFullSystemCode: string;
    fullSystemCode: string;
    systemCode: string;
    eventTypeCode: string;
    eventTypeName: string;
    childrens: Children[];
    leafNode: number;
    [propname: string]: any;
  }

  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/**
* 查询详情里的指标数据-Model类库
*/
export namespace IgetFindAlarmTargetDataListSpace {

  export interface DataList {
    collectTime: string;
    dataValue: string;
    measureUnitName: string;
  }

  export interface Data {
    targetDataName: string;
    dataList: DataList[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data[];
  }
}

/**
 * 查询报警详情-Model类库
 */
 export namespace IgetAlarmSpace {

  export class RequestParams {
    id?: number;

    constructor() {
      this.id = 0;
    }
  }

  export interface Data {
    id: number;
    alarmTitle: string;
    eventTypeCode: string;
    eventTypeName: string;
    alarmLevel: string;
    alarmLevelName: string;
    regionName: string;
    monitorUnit: string;
    areaCode: string;
    areaCodeName: string;
    alarmAddress: string;
    startTime: string;
    endTime: string;
    alarmState: string;
    alarmDesc: string;
    attachments: any[]
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    data: Data;
  }
}
