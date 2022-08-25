<script setup lang="ts">
import { ref, computed, defineExpose } from "vue";
import SvgIcon from "./SvgIcon.vue";
import type { StatusDisplay } from "../types/statusTypes";
import { Status, StatusDisplayMap } from "../types/statusTypes";

const currentStatus = ref<Status>(Status.Blank);

function changeStatus(status: Status) {
  if (currentStatus.value === status) {
    currentStatus.value = Status.Blank;
  } else {
    currentStatus.value = status;
  }
}
defineExpose({ changeStatus });

const statusDisplay = computed<StatusDisplay>(() => {
  return StatusDisplayMap[currentStatus.value];
});
</script>

<template>
  <SvgIcon
    class="p-1"
    size="30"
    :path="statusDisplay.icon"
    :class="statusDisplay.color"
  ></SvgIcon>
</template>
