/* eslint-disable @typescript-eslint/no-namespace */


/**
* 根据事件id查询事件详情-Model类库
*/
export namespace IgetEventSpace {

  export class RequestParams {
    id?: string;
    constructor() {
      this.id = "";
    }
  }

  export interface AddressList {
    longitude: string;
    latitude: string;
    address: string;
    isMain: boolean;
  }

  export interface DetailedAttachmentInfo {
    name: string;
    id: string;
    url: string;
    sourceType?: number;
  }

  export interface Data {
    id: number;
    name: string;
    eventTypeCode: string;
    eventLevelCode: string;
    happenTime: string;
    desc: string;
    drill: number;
    personDeadNum: number;
    personInjuredNum: number;
    personSeriousInjuredNum: number;
    personPoisonedNum: number;
    personTrappedNum: number;
    personTransferNum: number;
    personMissingNum: number;
    personAffectedNum: number;
    ecoLossDirect: number;
    ecoLossIndirect: number;
    ecoLossHouseCollapse: number;
    ecoLossAffectedFarmland: number;
    ecoLossAffectedPasture: number;
    ecoLossDisasterForest: number;
    ecoLossHouseDamaged: number;
    ecoLossStatTime: string;
    infrastructureBridgeBreakDuration: number;
    infrastructureWaterBreakDuration: number;
    infrastructureCommunicationBreakDuration: number;
    otherReceiveReason: string;
    otherTakenMeasure: string;
    otherResourceRequest: string;
    reportInfoSource: string;
    reportTime: string;
    mainGeo: string;
    mainAddress: string;
    mainAreaCode: string;
    otherAddressText: string;
    eventState: string;
    eventStateName: string;
    eventTypeName: string;
    eventLevelName: string;
    responseLevel: string;
    responseLevelName: string;
    responseStatus: string;
    responseStatusName: string;
    strategyInfoId: number;
    strategyInfoName: string;
    addressList: AddressList[];
    detailedAttachmentInfo: DetailedAttachmentInfo[];
  }

  export interface Model {
    code: string;
    desc: string;
    tips: string;
    httpStatusCode: number;
    data: Data;
  }
}
