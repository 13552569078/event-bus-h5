<template>
  <div class="top-nav-bar">
    <van-nav-bar title="事要素" style="
        --van-nav-bar-title-text-color: #fff;
        --van-nav-bar-background-color: #387ef7;;
        --van-nav-bar-height: 44px;
      ">
      <template #left>
        <van-icon name="arrow-left" size="18" color="#fff" @click="onClickLeft" />
      </template>
    </van-nav-bar>
  </div>
  <div class="content" v-if="showContent">
    <areaTotal />
    <sourceTotal />
    <div class="card-box-4"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import areaTotal from "./components/areaTotal.vue";
import sourceTotal from "./components/sourceTotal.vue";

import { useUser } from "fx-front-ucenter";
import { useCookie } from "@/hooks";
import { apiEventObj } from "@/apis/modules/event";

// 客户端返回
const onClickLeft = () => {
  // if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
  //   window.nativeBridge.goBack();
  //   window.nativeBridge.close();
  // } else if (/(Android)/i.test(navigator.userAgent)) { // 判断Android
  //   window.clientJsInterface.goBack();
  //   window.clientJsInterface.close();
  // }
  window.nativeBridge.goBack();
};

const showContent = ref(true);
const { getToken, setToken } = useUser();
const { getCookie } = useCookie();

</script>

<style lang="scss" scoped>
.top-nav-bar {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.content {
  width: 100vw;
  background: #f7f7f7;
  height: auto;
  margin-top: 56px;
  padding-bottom: 12px;
}
</style>
