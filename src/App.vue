<template>
  <div class="app-container" :class="$route.name">
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useUser } from "fx-front-ucenter";
import { useCookie } from "@/hooks";
import { apiEventObj } from "@/apis/modules/event";

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
// };
// handleToken();
</script>
<style lang="scss" scoped>
</style>
