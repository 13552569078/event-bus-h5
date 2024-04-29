<template>
  <div class="card-box-1">
    <div class="title">来源平台统计</div>
    <div class="pie-charts">
      <div ref="chartContainer" class="echart-container"></div>
    </div>
    <div class="pie-charts-legend">
      <div class="legend-item" v-for="(item, index) in eventTotalList" :key="item.name">
        <div class="point" :style="{ background: richColor[index].colorStart }"></div>
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.count }}</div>
        <!-- <div class="value">{{ item.radio }}%</div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useEChart } from 'hongluan-hooks';
import * as echarts from 'echarts';
import { apiEventObj } from "@/apis/modules/event";

const eventTotalList = ref<any>([]);
const eventTotal = computed(() => {
  let total = 0;
  eventTotalList.value.forEach((item: any) => {
    total += item.count;
  });
  return total;
});
const { chartContainer, setChartOption } = useEChart();
const richColor = [
  {
    colorStart: 'rgba(167, 124, 255, 1)',
    colorEnd: 'rgba(196, 156, 253, 1)'
  },
  {
    colorStart: 'rgba(72, 122, 255, 1)',
    colorEnd: 'rgba(99, 134, 255, 1)'
  },
  {
    colorStart: 'rgba(75, 176, 255, 1)',
    colorEnd: 'rgba(92, 191, 255, 1)'
  },
  {
    colorStart: 'rgba(85, 215, 252, 1)',
    colorEnd: 'rgba(146, 231, 248, 1)'
  },
  {
    colorStart: 'rgba(62, 201, 162, 1)',
    colorEnd: 'rgba(93, 215, 140, 1)'
  },
  {
    colorStart: 'rgba(140, 224, 110, 1)',
    colorEnd: 'rgba(191, 237, 137, 1)'
  },
  {
    colorStart: 'rgba(255, 220, 85, 1)',
    colorEnd: 'rgba(255, 235, 132, 1)'
  },
  {
    colorStart: 'rgba(255, 167, 90, 1)',
    colorEnd: 'rgba(255, 191, 94, 1)'
  },
  {
    colorStart: 'rgba(255, 103, 114, 1)',
    colorEnd: 'rgba(255, 141, 142, 1)'
  },
];

const renderChart = () => {
  const option = {
    title: {
      text: eventTotal.value,
      subtext: '事件总量(件)',
      top: '38%',
      left: 'center',
      textStyle: {
        color: '#333333',
        fontSize: 20,
        fontWeight: '600'
      },
      subtextStyle: {
        color: '#404040',
        fontSize: 14,
        fontWeight: '600'
      },
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
    },
    series: [{
      name: '事件总量',
      type: 'pie',
      radius: ['68%', '90%'],
      center: ['50%', '50%'],
      z: 2,
      label: {
        show: false,
      },
      itemStyle: {
        normal: {
          color: (list: any) => {
            return new echarts.graphic.LinearGradient(1, 0, 0, 1, [{ // 左、下、右、上
              offset: 0,
              color: richColor[list.dataIndex].colorStart
            }, {
              offset: 1,
              color: richColor[list.dataIndex].colorEnd
            }]);
          }
        }
      },
      data: eventTotalList.value.map((item: { value: any; count: any; }) => {
        item.value = item.count;
        return item;
      }),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    {
      name: '总量',
      type: 'pie',
      radius: ['58%', '100%'],
      center: ['50%', '50%'],
      z: 1,
      label: {
        show: false,
      },
      emptyCircleStyle: {
        color: '#F1F8FF'
      },
      data: [
        // { value: 1, name: 'a', itemStyle: { color: '#F1F8FF' } },
      ],
    },
    ],
  };
  setChartOption(option);
};

onMounted(async () => {
  const res = await apiEventObj.getSourePlatformStatistics();
  console.log(174, res.data);
  eventTotalList.value = res.data;
  renderChart();
});
</script>

<style lang="scss" scoped>
div[class^="card-box"] {
  width: calc(100% - 24px);
  height: auto;
  background: #FFFFFF;
  border-radius: 6px;
  margin: 12px 12px 0 12px;

  .title {
    height: 45px;
    margin-left: 16px;
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 45px;
  }
}

.card-box-1 {
  .pie-charts {
    width: 100%;
    height: 180px;

    .echart-container {
      width: 100%;
      height: 100%;
    }
  }

  .pie-charts-legend {
    padding-right: 27px;
    height: auto;
    display: flex;
    flex-flow: wrap;
    margin-top: 10px;
    padding-bottom: 10px;

    .legend-item {
      width: 50%;
      display: flex;
      height: 22px;
      margin-bottom: 10px;
      align-items: center;
      position: relative;

      .point {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        margin-left: 27px;
      }

      .name {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6B6B6B;
        line-height: 22px;
        margin-left: 5px;
        max-width: 70px;
        width: 70px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .value {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        line-height: 22px;
        float: right;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
