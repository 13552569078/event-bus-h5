<template>
  <div class="card-box-1">
    <div class="card-header">
      <span class="title">区域事件统计</span>
      <div class="date">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="date" :options="dateList" />
        </van-dropdown-menu>
      </div>
    </div>
    <van-cell title="选择日期区间" :value="date2" @click="show = true" v-if="date === 4" is-link />
    <van-calendar v-model:show="show" type="range" @confirm="onConfirm" :show-confirm="false" allow-same-day
      :min-date="new Date(2000, 1, 1)" :max-date="new Date(2099, 12, 31)" color="#1989fa" />
    <div class="area-list">
      <div class="area-item" v-for="item in areaEventTotalList" :key="item.name">
        <div class="item-top">
          <div class="area-icon"></div>
          <div class="area-name">{{ item.name }}</div>
        </div>
        <div class="item-middle">
          <div class="number border">
            <div class="label">事件总数</div>
            <div class="value">{{ item.totalCount }}</div>
          </div>
          <div class="number border" style="text-align: center;">
            <div class="label">未办结</div>
            <div class="value">{{ item.totalCount - item.downCount }}</div>
          </div>
          <div class="number" style="text-align: right;">
            <div class="label">已办结</div>
            <div class="value">{{ item.downCount }}</div>
          </div>
        </div>
        <div class="item-bottom">
          <div class="rate-bar">
            <div class="inner" :style="{ width: item.radio + '%' }"></div>
          </div>
          <div class="rate-value">{{ item.radio }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { DateUtils } from "fx-front-utils";
import { apiEventObj } from "@/apis/modules/event";
import { getDaysBetween, ToDayStr, ThisWeekStr, ThisMonthStr } from '@/common/utils';

const date = ref(1);
watch(date, () => {
  getList();
});
const dateList = [
  { text: '本月', value: 1 },
  { text: '本周', value: 2 },
  { text: '本日', value: 3 },
  { text: '自定义', value: 4 },
];

const date2 = ref('');
const customDate = ref<string[]>([]);
watch(customDate, () => {
  getList();
});
const show = ref(false);

const formatDate = (val: any) => DateUtils.formatDate(val, "yyyy-MM-dd");
const onConfirm = (values: [any, any]) => {
  const [start, end] = values;
  show.value = false;
  date2.value = `${formatDate(start)} ~ ${formatDate(end)}`;
  customDate.value = [formatDate(start) + ' 00:00:00', formatDate(end) + ' 23:59:59'];
};

const areaEventTotalList = ref([
  /* {
    name: '桥山街道',
    eventTotal: 100,
    outstandingNumber: 20,
    completedNumber: 80,
    completedRate: '80%'
  },
  {
    name: '店头镇',
    eventTotal: 100,
    outstandingNumber: 10,
    completedNumber: 90,
    completedRate: '90%'
  },
  {
    name: '隆坊镇',
    eventTotal: 100,
    outstandingNumber: 20,
    completedNumber: 80,
    completedRate: '80%'
  },
  {
    name: '田庄镇',
    eventTotal: 100,
    outstandingNumber: 20,
    completedNumber: 80,
    completedRate: '10%'
  }, */
]);

const getList = async () => {
  console.log(101, ToDayStr(), ThisWeekStr(), ThisMonthStr());
  let startTime = "";
  let endTime = "";
  if (date.value === 1) {
    startTime = ThisMonthStr().split(",")[0];
    endTime = ThisMonthStr().split(",")[1];
  } else if (date.value === 2) {
    startTime = ThisWeekStr().split(",")[0];
    endTime = ThisWeekStr().split(",")[1];
  } else if (date.value === 3) {
    startTime = ToDayStr().split(",")[0];
    endTime = ToDayStr().split(",")[1];
  } else if (date.value === 4) {
    startTime = customDate.value[0];
    endTime = customDate.value[1];
  }
  const res = await apiEventObj.getAreaEventStatistics(startTime, endTime);
  areaEventTotalList.value = res.data;
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
  .area-list {
    width: calc(100% - 32px);
    padding-left: 16px;
    padding-right: 16px;

    .area-item {
      width: calc(100% - 32px);
      height: calc(155px - 32px);
      ;
      background: url("../../../assets/images/event/area-box-bg.png") no-repeat;
      background-size: 100% 100%;
      margin-bottom: 8px;
      padding: 16px;

      .item-top {
        height: 32px;
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .area-icon {
          height: 32px;
          width: 32px;
          background: url("../../../assets/images/event/area-icon.png") no-repeat;
          background-size: 100% 100%;
          margin-right: 12px;
        }

        .area-name {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
        }
      }

      .item-middle {
        display: flex;
        height: 42px;
        justify-content: space-around;

        .number {
          flex: 1;

          .label {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #6B6B6B;
            line-height: 20px;
          }

          .value {
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #333333;
            line-height: 22px;
          }
        }

        .border {
          border-right: 1px solid rgba(151, 151, 151, 0.65);
        }
      }

      .item-bottom {
        margin-top: 12px;
        height: 20px;
        display: flex;
        align-items: center;

        .rate-bar {
          flex: 1;
          height: 5px;
          background: #E2E8ED;
          border-radius: 3px;

          .inner {
            width: 0;
            height: 5px;
            background: linear-gradient(135deg, #9CFFDD 0%, #05C490 100%);
            border-radius: 3px;
          }
        }

        .rate-value {
          width: 48px;
          text-align: right;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #6B6B6B;
          line-height: 20px;
        }
      }
    }
  }
}

:deep(.van-dropdown-menu__bar) {
  background: none;
  box-shadow: none;
}

:deep(.van-cell__value) {
  width: 100px !important;
  flex: auto !important;
}
</style>
