<template>
  <div class="card-box-1">
    <div class="card-header">
      <span class="title">高频事件排名</span>
    </div>
    <ul>
      <li v-for="(item, index) in eventList" :key="item.name">
        <div :class="['rank-no-icon', 'rank-' + (index + 1)]" v-if="[0, 1, 2].includes(index)"></div>
        <div class="rank-no" v-else>{{ index + 1 }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="number">{{ item.count }}件</div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apiEventObj } from "@/apis/modules/event";

const eventList = ref<any[]>([]);

onMounted(() => {
  apiEventObj.getHighFrequencyStatistics()
    .then(res => {
      eventList.value = res.data;
    });
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
  }

  ul {
    width: calc(100% - 32px);
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;

    li:nth-of-type(odd) {
      background: #F6FAFF;
    }

    li {
      display: flex;
      padding: 6px 12px;
      justify-items: center;
      align-items: center;

      .rank-no-icon {
        width: 20px;
        height: 28px;
        margin-right: 18px;
      }

      .rank-1 {
        background: url("../../../assets/images/event/rank-1.png") no-repeat;
        background-size: 100% 100%;
      }

      .rank-2 {
        background: url("../../../assets/images/event/rank-2.png") no-repeat;
        background-size: 100% 100%;
      }

      .rank-3 {
        background: url("../../../assets/images/event/rank-3.png") no-repeat;
        background-size: 100% 100%;
      }

      .rank-no {
        text-align: center;
        width: 20px;
        // height: 28px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        margin-right: 18px;
      }

      .name {
        flex: 1;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        max-width: 180px;
        width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .number {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        text-align: right;
        width: 80px;
      }
    }
  }
}
</style>
