<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: 16,
  },
  rotate: {
    type: Number,
    default: 0,
  },
  flip: {
    type: String,
    validator(value: string) {
      return ["h", "v", "hv", "none"].includes(value);
    },
    default: "none",
  },
  viewBox: {
    type: String,
    default: "0 0 24 24",
  },
});

const svgStyle = computed(() => {
  return {
    "--sx": ["h", "hv"].includes(props.flip) ? "-1" : "1",
    "--sy": ["v", "hv"].includes(props.flip) ? "-1" : "1",
    "--r": isNaN(props.rotate) ? props.rotate : props.rotate + "deg",
  };
});
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    :viewBox="props.viewBox"
    :style="svgStyle"
  >
    <path :d="props.path" />
  </svg>
</template>

<style scoped>
svg {
  transform: rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1));
}
path {
  fill: currentColor;
}
</style>
