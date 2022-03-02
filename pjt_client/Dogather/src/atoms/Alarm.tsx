// Alarm 리스트
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface IAlarm {
  msgNo: number;
  userNick: string;
  msg: string;
  read: number;
}

export const AlarmsAtom = atom<IAlarm[]>({
  key: "Alarms",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const AlarmsCountAtom = atom<number>({
  key: "AlarmsCount",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
