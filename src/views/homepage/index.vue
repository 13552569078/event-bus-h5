<template>
  <van-nav-bar left-text="" left-arrow @click-left="onClickLeft" title="监测预警"
    style="--van-nav-bar-icon-color: var(--van-text-regular)" />
  <div class="grid-wrap">
    <div class="item" v-for="(i, index) in list" :key="index" @click="handleGridClick(i)">
      <img class="icon" :src="i.icon" />
      <div class="title">{{ i.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import report from "@/assets/images/homepage/report.png";
import task from "@/assets/images/homepage/task.png";
import { useUser } from "fx-front-ucenter";
import { useRouter } from "vue-router";
import { useCookie } from "@/hooks";

const { getToken, setToken } = useUser();
const { getCookie } = useCookie();

const onClickLeft = () => {
  window.clientJsInterface.goBack();
  window.clientJsInterface.close();
};

interface menu {
  icon: any;
  title: string;
  routerName: string;
}

const router = useRouter();

const list = [
  {
    icon: report,
    title: "实时预警",
    routerName: "RealtimeWarningList",
  },
  {
    icon: task,
    title: "历史预警",
    routerName: "HisyoryWarningList",
  },
];
const handleGridClick = (item: menu) => {
  router.push({ name: item.routerName });
};
/* // app测试写死token、演示的时候url获取token
const handleAppTest = () => {
  const searchParams = new URLSearchParams(window.location.search); // H5模式
  const token = searchParams.get("token");
  if (token) {
    localStorage.setItem("$UCENTER_TOKEN", token);
  } else {
    document.addEventListener("UniAppJSBridgeReady", () => {
      uni.getEnv((res: { plus: any }) => {
        if (res?.plus && !getToken()) {
          localStorage.setItem(
            "$UCENTER_TOKEN",
            "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTgxMDA5OTk5OSIsIk5PIjoiNjFDQjE2NUVBNEQyNDhEMUE0MDUxMDI5QTU3NkIwRTEiLCJpc3MiOiJodHRwOlwvXC8xMC4yNTUuMTM1LjE3MTo5MTEwXC9wZXJtaXNzaW9uIiwiVVNFUl9JRCI6IjE1ODEwMDk5OTk5IiwiVVNFUl9OQU1FIjoiMTU4MTAwOTk5OTkiLCJhdWQiOiIybTJubzlneTEyNDVmMjUiLCJPUEVSQVRPUl9JRCI6IjZEMURCNjUxMjI4QzQ4Mzc5OEFDOEM2QUNGRUQxRjYwIiwibmJmIjoxNjY5Nzc0NzM5LCJzY29wZSI6WyJvcGVuaWQiXSwiVEVOQU5UX0lEIjoiNzczM0VFNjkzNUQ5NDI1MjlEQUZDQkU2MzZCNUM3QTEiLCJleHAiOjE2Njk4MTc5MzksIlJFR0lTVEVSRURfQ0xJRU5UX0lEIjoiMm0ybm85Z3kxMjQ1ZjI1IiwiaWF0IjoxNjY5Nzc0NzM5LCJQRVJNSVNTSU9OX0xFVkVMX0NPREUiOiI3NzMzZWU2OTM1ZDk0MjUyOWRhZmNiZTYzNmI1YzdhMTAxX3piZnowMiJ9.vrkSH-Ye3oTqp4K6V_8OmxKBRVAbUWoAjXhGr6b_dLEMo8UmVLPHA6KcysrtZrP7p0pMA1rPNcCrg2yWbP3hYZqGsqiYd4AIRZfFINOu-CqVeAKA-r2Z8jZhqvgCPvREdXbV8VZZAUgJJWIPRQIELLissL97nUVIrbIOX3TsmZr5VBmwEUEnKwF1jZBXDU1XbPndr7tfn6_fg8I5R4gC3Zk-jeZbQW5IIDBDXF5rW3pX7sr2f5FQRoxglKavzFPzfbAHDe3UeT-wXZlk6VQICAC2peo3IQ6oxBhsIcwVEYXs-xg9U2vqBiSOOmXJKmlRrpvhksOzVtI-ikFdagtWgg"
          );
        }
      });
    });
  }
};
handleAppTest(); */

// 磁县环境，cookie获取fxtoken
/* const fxtoken = getCookie("fxtoken") as string;
fxtoken && setToken(fxtoken); */
// const handleToken = () => {
//   const searchParams = new URLSearchParams(window.location.search); // H5模式
//   const urlToken = searchParams.get('token');
//   const token = getCookie('token') as string;
//   const cookieToken = getCookie('fxtoken') as string;
//   console.log('token', token);
//   console.log('fxtoken', cookieToken);
//   // 默认是对接驾驶舱使用cookie的token，其他环境走urltoken
//   if (cookieToken) {
//     localStorage.setItem('$UCENTER_TOKEN', cookieToken);
//     setToken(cookieToken);
//   } else if (urlToken) {
//     localStorage.setItem('$UCENTER_TOKEN', urlToken);
//     setToken(urlToken);
//   }
// };
// handleToken();
</script>
<style lang="scss" scoped>
.grid-wrap {
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  margin: 16px;
  gap: 24px;
  background: #ffffff;

  .item {
    .icon {
      width: 48px;
      height: 48px;
    }

    .title {
      font-size: 12px;
      line-height: 20px;
    }
  }
}
</style>
