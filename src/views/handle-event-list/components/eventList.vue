<template>
  <div class="card-box-1">
    <ul>
      <li class="event-item" v-for="(item) in eventList" :key="item.name">
        <div class="event-header">
          <div class="event-code">
            事件编号： {{item.eventCode}}
          </div>
          <span class="event-status">{{item.status}}</span>
        </div>
        <div class="event-content">
          <img class="event-img" :src="item.imageUrl" alt="">
          <div class="event-info">
            <p class="event-long-text">{{item.eventTypeName}}</p>
            <p>{{item.eventTime}}</p>
            <p class="event-long-text">{{item.eventAddress}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { apiEventObj } from "@/apis/modules/event";
import noDataImg from "@/assets/images/common/no-data.png";

const eventList = ref<any[]>([]);

const params = ref({
  flag: '',
  beginTime: '',
  endTime: ''
});

const searchParams = new URLSearchParams(window.location.search); // H5模式
if (searchParams) {
  params.value.beginTime = searchParams.get('beginTime') || '';
  params.value.endTime = searchParams.get('endTime') || '';
  params.value.flag = searchParams.get('flag') || '';
}

watch(params, () => {
  getList();
});

onMounted(() => {
  getList();
});

const getList = () => {
  const { beginTime, endTime, flag } = params.value;
  apiEventObj.getEventList(beginTime, endTime, flag)
    .then(res => {
      eventList.value = res.data.map((e: any) => {
        return {
          ...e,
          imageUrl: e.imageUrl ? e.imageUrl : noDataImg
        };
      });
    });
};
</script>

<style lang="scss" scoped>
div[class^="card-box"] {
  width: calc(100% - 24px);
  height: auto;
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
  }

  ul {
    width: 100%;

    li {
      display: flex;
      padding: 6px 12px;
      justify-items: center;
      align-items: center;
      flex-direction: column;
      background: #FFFFFF;
      margin-bottom: 12px;
      padding: 12px 16px;
      .event-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      .event-code {
        font-size: 16px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .event-status {
        width: 70px;
        height: 20px;
        background: rgba(54,164,255,0.16);
        border-radius: 2px;
        font-size: 12px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #36A4FF;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .event-content {
        display: flex;
        width: 100%;
      }
      .event-img {
        width: 90px;
        height: 90px;
        margin-right: 12px;
      }
      .event-info {
        font-size: 14px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        color: #6B6B6B;
        line-height: 20px;
        p {
          margin-bottom: 10px;
        }
        .event-long-text {
          text-wrap: wrap;
        }
      }

    }
  }
}
</style>
