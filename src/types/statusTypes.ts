import {
  mdiSquare,
  mdiCheckCircleOutline,
  mdiClose,
  mdiHelpRhombusOutline,
  mdiAlertOctagramOutline,
} from "@mdi/js";

export enum Status {
  Blank,
  Confirmed,
  Excluded,
  Unknown,
  Noticed,
}

export interface StatusDisplay {
  icon: string;
  color: string;
}

export const StatusDisplayMap: Record<Status, StatusDisplay> = {
  [Status.Blank]: { icon: mdiSquare, color: "text-white" },
  [Status.Confirmed]: { icon: mdiCheckCircleOutline, color: "text-cyan-600" },
  [Status.Excluded]: { icon: mdiClose, color: "text-gray-800" },
  [Status.Unknown]: { icon: mdiHelpRhombusOutline, color: "text-indigo-700" },
  [Status.Noticed]: { icon: mdiAlertOctagramOutline, color: "text-orange-600" },
};
