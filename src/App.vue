<script setup lang="ts">
import { ref } from "vue";
import {
  mdiEraserVariant,
  mdiKnifeMilitary,
  mdiCandelabra,
  mdiPistol,
  mdiJumpRope,
  mdiPipe,
  mdiWrench,
  mdiSofa,
  mdiDanceBallroom,
  mdiTableTennis,
  mdiBookshelf,
  mdiFlowerTulip,
  mdiSilverwareForkKnife,
  mdiStove,
  mdiChandelier,
  mdiBookOpenVariant,
  mdiGithub,
  mdiTranslate,
} from "@mdi/js";
import SvgIcon from "./components/SvgIcon.vue";
import StatusMarker from "./components/StatusMarker.vue";
import { Status, StatusDisplayMap } from "./types/statusTypes";
import {
  detectLocalLocale,
  initLocale,
  LocaleActor,
  LOCALE_DATA,
  switchLocale,
} from "./services/localeService";

const suspects = [
  { code: "mustard", color: "text-yellow-600" },
  { code: "plum", color: "text-purple-500" },
  { code: "green", color: "text-green-600" },
  { code: "peacock", color: "text-blue-600" },
  { code: "scarlett", color: "text-red-700" },
  { code: "orchid", color: "text-pink-600" },
  { code: "white", color: "text-gray-500" },
];

const weapons = [
  { code: "dagger", icon: mdiKnifeMilitary },
  { code: "candlestick", icon: mdiCandelabra },
  { code: "revolver", icon: mdiPistol },
  { code: "rope", icon: mdiJumpRope },
  { code: "leadPipe", icon: mdiPipe },
  { code: "wrench", icon: mdiWrench },
];

const rooms = [
  { code: "hall", icon: mdiChandelier },
  { code: "lounge", icon: mdiSofa },
  { code: "diningRoom", icon: mdiSilverwareForkKnife },
  { code: "kitchen", icon: mdiStove },
  { code: "ballroom", icon: mdiDanceBallroom },
  { code: "conservatory", icon: mdiFlowerTulip },
  { code: "billiardRoom", icon: mdiTableTennis },
  { code: "library", icon: mdiBookshelf },
  { code: "study", icon: mdiBookOpenVariant },
];

const statuBtns: Status[] = [
  Status.Noticed,
  Status.Unknown,
  Status.Excluded,
  Status.Confirmed,
  Status.Blank,
];

type MarkerType = InstanceType<typeof StatusMarker>;

const currentStatus = ref<Status>(Status.Excluded);
const markerRefMap = ref<Record<string, MarkerType>>({});
const currentLocale = ref<string>(detectLocalLocale());
initLocale(currentLocale.value);
const la = new LocaleActor(currentLocale.value);
const urlQuery = new URLSearchParams(window.location.search);
const isSuspectColShown = ref(urlQuery.get("sc"));

function storeMarkerRef(el: MarkerType | null, markerIndex: string): void {
  if (el) {
    markerRefMap.value[markerIndex] = el;
  }
}
function buildIndex(type: string, i: number, j: number): string {
  return `${type}_${i}_${j}`;
}
function onStatusMarkerClicked(markerIndex: string, event: Event): void {
  markerRefMap.value[markerIndex].changeStatus(currentStatus.value);
  event.stopPropagation();
}
function markerBtnStyle(btnStatus: Status): string {
  if (currentStatus.value === Status.Blank) {
    return "text-gray-300";
  }
  if (currentStatus.value === btnStatus) {
    return StatusDisplayMap[btnStatus].color;
  }
  return "text-gray-300";
}
function markerBtnIcon(btnStatus: Status): string {
  if (btnStatus === Status.Blank) {
    return mdiEraserVariant;
  } else {
    return StatusDisplayMap[btnStatus].icon;
  }
}
function onLocaleBtnClicked(): void {
  if (currentLocale.value === "zh-TW") {
    currentLocale.value = "en";
  } else {
    currentLocale.value = "zh-TW";
  }
  switchLocale(currentLocale.value);
}
</script>

<template>
  <div class="fixed inset-0 flex flex-col justify-between items-stretch">
    <div class="grow min-h-0 w-full overflow-y-auto">
      <div class="m-auto p-2 max-w-md flex justify-between items-center">
        <div class="grow text-2xl">
          {{ la.t("gameName") }}
        </div>
        <div
          class="text-gray-600 cursor-pointer mx-3"
          @click="onLocaleBtnClicked"
        >
          <SvgIcon
            class="inline-block"
            :path="mdiTranslate"
            :size="20"
          ></SvgIcon>
          <span class="pl-1 text-sm">
            {{ LOCALE_DATA[currentLocale] }}
          </span>
        </div>
        <a href="https://github.com/sibevin/cluedo-sheet" target="_blank">
          <SvgIcon class="text-gray-600" :path="mdiGithub" :size="20"></SvgIcon>
        </a>
      </div>
      <table class="w-full m-auto">
        <tr>
          <td class="title">
            {{ la.t("title.who") }}
          </td>
          <td
            v-for="(suspect, index) in suspects"
            :key="index"
            class="header p-1 bg-black"
            :class="isSuspectColShown ? suspect.color : 'text-black'"
          >
            {{ la.t(`suspect.${suspect.code}.short`) }}
          </td>
        </tr>
        <tr v-for="(suspect, i) in suspects" :key="i" class="hover:bg-gray-200">
          <td class="header" :class="suspect.color">
            {{ la.t(`suspect.${suspect.code}.name`) }}
          </td>
          <td v-for="(_v, j) in suspects" :key="buildIndex('suspect', i, j)">
            <StatusMarker
              :ref="
                (el) => {
                  storeMarkerRef(el as MarkerType, buildIndex('suspect', i, j));
                }
              "
              @click="
                onStatusMarkerClicked(buildIndex('suspect', i, j), $event)
              "
            ></StatusMarker>
          </td>
        </tr>
        <tr>
          <td class="title">
            {{ la.t("title.what") }}
          </td>
          <td
            v-for="(suspect, index) in suspects"
            :key="index"
            class="header p-1 bg-black"
            :class="isSuspectColShown ? suspect.color : 'text-black'"
          >
            {{ la.t(`suspect.${suspect.code}.short`) }}
          </td>
        </tr>
        <tr v-for="(weapon, i) in weapons" :key="i" class="hover:bg-gray-200">
          <td class="header">
            <SvgIcon class="inline-block m-1" :path="weapon.icon"></SvgIcon>
            {{ la.t(`weapon.${weapon.code}`) }}
          </td>
          <td v-for="(_v, j) in suspects" :key="buildIndex('weapon', i, j)">
            <StatusMarker
              :ref="
                (el) => {
                  storeMarkerRef(el as MarkerType, buildIndex('weapon',i,j));
                }
              "
              @click="onStatusMarkerClicked(buildIndex('weapon', i, j), $event)"
            ></StatusMarker>
          </td>
        </tr>
        <tr>
          <td class="title">
            {{ la.t("title.where") }}
          </td>
          <td
            v-for="(suspect, index) in suspects"
            :key="index"
            class="header p-1 bg-black"
            :class="isSuspectColShown ? suspect.color : 'text-black'"
          >
            {{ la.t(`suspect.${suspect.code}.short`) }}
          </td>
        </tr>
        <tr v-for="(room, i) in rooms" :key="i" class="hover:bg-gray-200">
          <td class="header">
            <SvgIcon class="inline-block m-1" :path="room.icon"></SvgIcon>
            {{ la.t(`room.${room.code}`) }}
          </td>
          <td v-for="(_v, j) in suspects" :key="buildIndex('room', i, j)">
            <StatusMarker
              :ref="
                (el) => {
                  storeMarkerRef(el as MarkerType, buildIndex('room',i,j));
                }
              "
              @click="onStatusMarkerClicked(buildIndex('room', i, j), $event)"
            ></StatusMarker>
          </td>
        </tr>
      </table>
    </div>
    <div class="flex-none w-full flex justify-center items-center">
      <div
        v-for="(status, index) in statuBtns"
        :key="index"
        @click="currentStatus = status"
      >
        <SvgIcon
          class="m-3"
          :class="markerBtnStyle(status)"
          :path="markerBtnIcon(status)"
          size="48"
        ></SvgIcon>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
