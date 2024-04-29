<template>
  <div class="card-box-1">
    <div class="card-header">
      <span class="title">来源平台统计</span>
    </div>
    <div class="line-charts">
      <div ref="chartContainer" class="echart-container"></div>
      <!-- <no-data /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { NoData } from '@/components';
import { useEChart } from 'hongluan-hooks';
import * as echarts from 'echarts';
import { apiEventObj } from "@/apis/modules/event";
import { getDaysBetween } from '@/common/utils';

const eventTotalList = ref<any[]>([]);

const { chartContainer, setChartOption } = useEChart();

const renderChart = () => {
  const option = {
    grid: {
      top: '32',
      left: '3.5%',
      right: '5%',
      bottom: '5%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
      },
      extraCssText: 'border-radius: 0;',
      formatter: (params: any) => {
        let toolTipStr = '';
        params.forEach((e: any) => {
          console.log(e, 49999);
          toolTipStr += `
      <div style="backgroundColor:#fff;borderRaduis:0">
        ${e.marker}
        <span>${e.seriesName} <span style="font-weight: bold; margin-left: 30px">${e.value}</span></span>
      </div>
      `;
        });
        return toolTipStr;
      }
      ,
    },
    legend: {
      data: [{
        name: '本月',
        icon: 'rect',
      }, {
        name: '上月',
        icon: 'rect',
      }, {
        name: '环比增长率',
        icon: 'rect',
      }
      ],
      bottom: 0,
      itemWidth: 10,
      itemHeight: 10,
    },
    xAxis: {
      axisLabel: {
        fontSize: 12,
        color: 'rgba(107, 107, 107, 1)',
        lineHeight: 20,
        margin: 5,
        rotate: 45,
      },
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(107, 107, 107, 0.2)',
        },
      },
      nameTextStyle: {
        fontSize: 12,
        color: '#6B6B6B'
      },
      type: 'category',
      data: eventTotalList.value.map(item => { return item.name; }),
    },
    yAxis: [
      {
        name: "单位：件",
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
      {
        name: "单位：%",
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
      }
    ],
    series: [
      {
        name: '本月',
        type: 'bar',
        data: eventTotalList.value.map(item => { return item.thisMonthCount; }),
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#2572FE'
          }, {
            offset: 1, color: '#6EA1FF'
          }],
          global: false
        }
      },
      {
        name: '上月',
        type: 'bar',
        data: eventTotalList.value.map(item => { return item.lastMonthCount; }),
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#FF9C00'
          }, {
            offset: 1, color: '#FFE34A'
          }],
          global: false
        }
      },
      {
        name: '环比增长率',
        type: 'line',
        yAxisIndex: 1,
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
        data: eventTotalList.value.map(item => { return item.rate; }),
      },
    ],
  };
  setChartOption(option);
};

const getList = async () => {
  const res = await apiEventObj.getEventFactorSourePlatformStatistics();
  if (res?.data?.length) {
    eventTotalList.value = res.data;
    nextTick(() => {
      renderChart();
    });
  } else {
    eventTotalList.value = [];
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
    height: 236px;
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
