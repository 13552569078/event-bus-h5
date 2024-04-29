import { requestHelper } from "@/apis/base/mapper-helper";
import { IgetListDictCustomVOsDictSpace } from './model';
import { GlobalAPI } from '@/common';
const API_DOMAIN = GlobalAPI.config.BASE_URL_WARNING;
const API_PREFIX = GlobalAPI.config.API_PREFIX_CENTRE_CONFIG;


/**
 * 数据访问，此类代码生成器生成
 */
class DictApi {
  data2Mock: boolean = false;

  // 查询字典列表|查询字典列表-DictController
  getListDictCustomVOsDict(typeCodeList: string) {
    const url = `${API_DOMAIN}${API_PREFIX}/dict/listDictCustomVOs?typeCodeList=${typeCodeList}`;
    return requestHelper.getRequestData<IgetListDictCustomVOsDictSpace.Model>(url, '5b0fecd7-bbba-4000-9067-f0fb58308748', this.data2Mock);
  }

  getListFormulaDefinedVOs() {
    const url = `${API_DOMAIN}${API_PREFIX}/formulaDefined/listFormulaDefinedVOs`;
    return requestHelper.getRequestData<IgetListDictCustomVOsDictSpace.FormulaModel>(url, '5b0fecd7-bbba-4000-9067-f0fb58308748', this.data2Mock);
  }

  getListAlarmRuleConfigVOs(useType: any) {
    let url = `${API_DOMAIN}${API_PREFIX}/alarmRuleConfig/listAlarmRuleConfigVOs`;
    if (useType) {
      url = `${API_DOMAIN}${API_PREFIX}/alarmRuleConfig/listAlarmRuleConfigVOs?useFor=${useType}`;
    }
    return requestHelper.getRequestData<IgetListDictCustomVOsDictSpace.AlarmRuleConfigModel>(url, '5b0fecd7-bbba-4000-9067-f0fb58308748', this.data2Mock);
  }

  getListAlarmCycleCornVOs() {
    const url = `${API_DOMAIN}${API_PREFIX}/alarmRuleConfig/listAlarmCycleCornVOs`;
    return requestHelper.getRequestData<IgetListDictCustomVOsDictSpace.AlarmCycleCornModel>(url, '5b0fecd7-bbba-4000-9067-f0fb5833218748', this.data2Mock);
  }

}
export const apiDictObj = new DictApi();
