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
} from "@mdi/js";
import SvgIcon from "./components/SvgIcon.vue";
import StatusMarker from "./components/StatusMarker.vue";
import { Status, StatusDisplayMap } from "./types/statusTypes";

const suspects = [
  {
    name: "黃上校",
    nameEn: "Colonel Mustard",
    short: "黃",
    color: "text-yellow-600",
  },
  {
    name: "梅教授",
    nameEn: "Professor Plum",
    short: "梅",
    color: "text-purple-500",
  },
  {
    name: "綠先生",
    nameEn: "Rev Green",
    short: "綠",
    color: "text-green-600",
  },
  {
    name: "藍夫人",
    nameEn: "Mrs. Peacock",
    short: "藍",
    color: "text-blue-600",
  },
  {
    name: "紅小姐",
    nameEn: "Miss Scarlett",
    short: "紅",
    color: "text-red-700",
  },
  {
    name: "花博士",
    nameEn: "Dr Orchid",
    short: "花",
    color: "text-pink-600",
  },
  {
    name: "白太太",
    nameEn: "Mrs. White",
    short: "白",
    color: "text-gray-500",
  },
];

const weapons = [
  { name: "匕首", nameEn: "Dagger", icon: mdiKnifeMilitary },
  { name: "燭台", nameEn: "Candlestick", icon: mdiCandelabra },
  { name: "手槍", nameEn: "Revolver", icon: mdiPistol },
  { name: "繩索", nameEn: "Rope", icon: mdiJumpRope },
  { name: "鉛管", nameEn: "Lead Pipe", icon: mdiPipe },
  { name: "螺絲鉗", nameEn: "Wrench", icon: mdiWrench },
];

const rooms = [
  { name: "大廳", nameEn: "Hall", icon: mdiChandelier },
  { name: "客廳", nameEn: "Lounge", icon: mdiSofa },
  { name: "飯廳", nameEn: "Dining Room", icon: mdiSilverwareForkKnife },
  { name: "廚房", nameEn: "Kitchen", icon: mdiStove },
  { name: "宴會廳", nameEn: "Ballroom", icon: mdiDanceBallroom },
  { name: "溫室", nameEn: "Conservatory", icon: mdiFlowerTulip },
  { name: "桌球室", nameEn: "Billiard Room", icon: mdiTableTennis },
  { name: "圖書室", nameEn: "Library", icon: mdiBookshelf },
  { name: "書房", nameEn: "Study", icon: mdiBookOpenVariant },
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
</script>

<template>
  <div class="absolute inset-0 flex flex-col justify-between items-center">
    <div class="grow min-h-0 overflow-y-auto">
      <div class="p-2 flex justify-between items-center">
        <div class="grow text-2xl">妙探尋兇 Cluedo</div>
        <a href="https://github.com/sibevin/cluedo-sheet" target="_blank">
          <SvgIcon class="text-gray-600" :path="mdiGithub" :size="20"></SvgIcon>
        </a>
      </div>
      <table class="w-full">
        <tr>
          <td class="title">誰殺的 Who ?</td>
          <td
            v-for="(suspect, index) in suspects"
            :key="index"
            class="header p-1 bg-black"
            :class="suspect.color"
          >
            {{ suspect.short }}
          </td>
        </tr>
        <tr v-for="(suspect, i) in suspects" :key="i" class="hover:bg-gray-200">
          <td class="header" :class="suspect.color">
            {{ suspect.name }}
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
          <td class="title">用什麼殺的 What ?</td>
          <td
            v-for="(suspect, index) in suspects"
            :key="index"
            class="header p-1 bg-black"
            :class="suspect.color"
          >
            {{ suspect.short }}
          </td>
        </tr>
        <tr v-for="(weapon, i) in weapons" :key="i" class="hover:bg-gray-200">
          <td class="header">
            <SvgIcon class="inline-block m-1" :path="weapon.icon"></SvgIcon>
            {{ weapon.name }}
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
          <td class="title">在哪殺的 Where ?</td>
          <td
            v-for="(suspect, index) in suspects"
            :key="index"
            class="header p-1 bg-black"
            :class="suspect.color"
          >
            {{ suspect.short }}
          </td>
        </tr>
        <tr v-for="(room, i) in rooms" :key="i" class="hover:bg-gray-200">
          <td class="header">
            <SvgIcon class="inline-block m-1" :path="room.icon"></SvgIcon>
            {{ room.name }}
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
