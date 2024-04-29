<template>
  <div class="card-box-1">
    <div class="card-header">
      <span class="title">事件趋势统计</span>
      <div class="date">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="date" :options="dateList" />
        </van-dropdown-menu>
      </div>
    </div>
    <div class="line-charts">
      <div ref="chartContainer" class="echart-container"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useEChart } from 'hongluan-hooks';
import * as echarts from 'echarts';
import { apiEventObj } from "@/apis/modules/event";
import { getDaysBetween } from '@/common/utils';

const date = ref(365);
const dateList = [
  { text: '近1年', value: 365 },
  { text: '近30天', value: 30 },
  { text: '近1周', value: 7 },
];
watch(date, () => {
  getList();
});

const eventTotalList = ref<any[]>([]);

const { chartContainer, setChartOption } = useEChart();

const renderChart = () => {
  const option = {
    grid: {
      top: '32',
      left: '3.5%',
      right: '5%',
      bottom: '0%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: any) => `
      <div style="backgroundColor:#fff;borderRaduis:0">
        ${params[0].marker}
        <span>${params[0].axisValue} <span style="font-weight: bold; margin-left: 30px">${params[0].value}</span></span>
      </div>
      `,
    },
    xAxis: {
      axisLabel: {
        fontSize: 12,
        color: 'rgba(107, 107, 107, 1)',
        lineHeight: 20,
        margin: 5,
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(107, 107, 107, 0.2)',
        },
      },
      type: 'category',
      data: eventTotalList.value.map(item => { return item.day; }),
    },
    yAxis: {
      name: "事件量：件",
      splitNumber: 3,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(128, 128, 160, 0.15)',
        },
      },
      axisLabel: {
        fontSize: 12,
        color: 'rgba(107, 107, 107, 1)',
        lineHeight: 20,
      },
      type: 'value',
    },
    series: [
      {
        itemStyle: {
          color: 'rgba(47, 213, 166, 1)',
        },
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          width: 2,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(113, 248, 252, 0.24)' },
            { offset: 1, color: 'rgba(113, 248, 252, 0)' },
          ]),
        },
        data: eventTotalList.value.map(item => { return item.reportCount; }),
        type: 'line',
      },
    ],
  };
  setChartOption(option);
};

const getList = async () => {
  const { startTime, endTime } = getDaysBetween(date.value);
  const res = await apiEventObj.getBusTrendStatistics(startTime, endTime);
  console.log(174, res.data);
  eventTotalList.value = res.data;
  renderChart();
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
      margin-left: 16px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 45px;
    }

    .date {
      width: 80px;
      margin-right: 16px;
    }
  }
}

.card-box-1 {
  .line-charts {
    width: calc(100% - 32px);
    height: 196px;
    padding: 0 16px 20px 16px;

    .echart-container {
      width: 100%;
      height: 100%;
    }
  }
}

:deep(.van-dropdown-menu__bar) {
  background: none;
  box-shadow: none;
}</style>
