/* eslint-disable @typescript-eslint/no-namespace */

/**
 * 查询字典列表-Model类库
 */
export namespace IgetListDictCustomVOsDictSpace {
  export class RequestParams {
    typeCodeList?: string;
    constructor() {
      this.typeCodeList = "";
    }
  }

  export interface Data {
    typeCode: string;
    dictCode: string;
    dictName: string;
    selected: boolean;
  }

  export interface FormulaModel {
    code: number;
    desc: string;
    tips: string;
    data: Array<{
      formulaCode: string;
      formulaName: string;
    }>;
  }

  export interface AlarmRuleConfigModel {
    code: number;
    desc: string;
    tips: string;
    data: Array<{
      ruleCode: string;
      ruleName: string;
      ruleDesc: string;
      ruleValue: string;
    }>;
  }

  export interface AlarmCycleCornModel {
    code: number;
    desc: string;
    tips: string;
    data: Array<{
      name: string;
      value: string;
    }>;
  }



  export interface Model {
    code: number;
    desc: string;
    tips: string;
    data: Data[];
  }
}
