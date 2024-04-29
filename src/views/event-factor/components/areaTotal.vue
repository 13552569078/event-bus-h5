<template>
  <div class="card-box-1">
    <div class="card-header">
      <span class="title">事件区域统计</span>
      <div class="date">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="date" :options="dateList" />
        </van-dropdown-menu>
      </div>
    </div>
    <table class="area-table" v-if="tableData&&tableData.length > 0">
      <tr class="area-header">
        <th v-for="item in cols" :key="item.prop">{{ item.title }}</th>
      </tr>
      <tr class="area-body" v-for="(item, index) in tableData" :key="index">
        <td>{{item.name}}</td>
        <td>{{item.num}}</td>
        <td>{{item.rate}}%</td>
      </tr>
    </table>
    <no-data v-else/>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { NoData } from '@/components';
import { useEChart } from 'hongluan-hooks';
import * as echarts from 'echarts';
import { apiEventObj } from "@/apis/modules/event";
import { ToDayStr, ThisMonthStr, ThisYearStr } from '@/common/utils';

const date = ref('day');
const dateList = [
  { text: '今日', value: 'day' },
  { text: '本月', value: 'month' },
  { text: '本年', value: 'year' },
];
watch(date, () => {
  getList();
});
const cols = ref([
  { title: '乡镇街道', prop: 'name' },
  { title: '数量（件）', prop: 'num' },
  { title: '占比', prop: 'rate' },
]);
const tableData = ref<any[]>([]);

const getList = async () => {
  let beginTime = ''; let endTime = '';
  switch (date.value) {
    case 'day':
      [beginTime, endTime] = ToDayStr().split(',');
      break;
    case 'month':
      [beginTime, endTime] = ThisMonthStr().split(',');
      break;
    case 'year':
      [beginTime, endTime] = ThisYearStr().split(',');
      break;
    default:
      break;
  }
  const res = await apiEventObj.getEventFactorAreaStatistics(beginTime, endTime);
  if (res?.data?.length) {
    tableData.value = res.data;
  } else {
    tableData.value = [];
  }
};

onMounted(async () => {
  await getList();
});
</script>

<style lang="scss" scoped>
div[class^="card-box"] {
  width: calc(100% - 24px);
  height: auto;
  background: #FFFFFF;
  border-radius: 6px;
  margin: 12px 12px 0 12px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      display: inline-block;
      height: 45px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 45px;
    }

    .date {
      width: 80px;
    }
  }
}

.card-box-1 {
  padding: 0 16px 20px 16px;
  box-sizing: border-box;
}

:deep(.van-dropdown-menu__bar) {
  background: none;
  box-shadow: none;
}

.area-table {
  width: 100%;
  border: 2px solid #F4F4F4;
  text-align: left;
  color: #333333;
 .area-header {
    width: 100%;
    height: 40px;
    height: 32px;
    border: 2px solid #F4F4F4;
    font-size: 14px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    background: rgb(250, 250, 250);
  }
  .area-body {
    width: 100%;
    td {
      border-bottom: 2px solid #F4F4F4;
    }
    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }
}
</style>
