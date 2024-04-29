<template>
<div class="common-no-data">
  <p></p>
  <span>暂无数据</span>
</div>
</template>
<script setup lang="ts">
import noDataImg from "@/assets/images/common/no-data.png";
</script>
<style lang="scss" scoped>
.common-no-data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0;
  p {
    width: 168px;
    height: 125px;
    background: url("../assets/images/common/no-data.png") no-repeat;
    background-size: 100% 100%;
  }
  span {
    margin-top: 16px;
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
}
</style>
