<template>
  <div class="top-nav-bar">
    <van-nav-bar title="事件总数" style="
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
    <sourceTotal />
    <trendTotal />
    <areaTotal />
    <frequencyEventRank />
    <div class="card-box-4"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import sourceTotal from "./components/sourceTotal.vue";
import trendTotal from "./components/trendTotal.vue";
import areaTotal from "./components/areaTotal.vue";
import frequencyEventRank from "./components/frequencyEventRank.vue";

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

// const handleToken = async () => {
//   const searchParams = new URLSearchParams(window.location.search); // H5模式
//   const urlToken = searchParams.get("token");
//   const token = getCookie("token") as string;
//   const cookieToken = getCookie("fxtoken") as string;
//   console.log("token", token);
//   console.log("fxtoken", cookieToken);

//   // token 替换成服务A的token
//   // 默认是对接驾驶舱使用cookie的token，其他环境走urltoken
//   if (urlToken) {
//     localStorage.setItem("$UCENTER_TOKEN", urlToken);
//     setToken(urlToken);
//   } else {
//     const res = await apiEventObj.getfxExchangeToken(cookieToken);
//     console.log("res", res.data.token);
//     localStorage.setItem("$UCENTER_TOKEN", res.data.token);
//     setToken(res.data.token);
//   }
//   showContent.value = true;
// };
// handleToken();
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
