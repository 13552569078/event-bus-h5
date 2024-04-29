<template>
  <div class="layout-container" :class="$route.name">
    <router-view v-slot="{ Component }">
      <KeepAlive :include="['RealtimeWarningList', 'HisyoryWarningList']">
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>
