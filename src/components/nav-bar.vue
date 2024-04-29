<template>
  <van-nav-bar
    :title="title"
    left-arrow
    fixed
    safe-area-inset-top
    :right-text="rightText"
    @click-right="$emit('right-click')"
  >
    <template #left>
      <slot name="left">
        <van-icon
          v-if="showBack"
          name="arrow-left"
          size="18"
          color="var(--van-text-regular)"
          @click="back"
        />
      </slot>
    </template>
    <template v-if="$slots.right" #right>
      <slot name="right" />
    </template>
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
  </van-nav-bar>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  title: String,
  showBack: {
    type: Boolean,
    default: true,
  },
  rightText: String,
  customBack: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['back']);
const back = () => {
  if (props.customBack) {
    emit('back');
  } else {
    router.go(-1);
  }
};
</script>
