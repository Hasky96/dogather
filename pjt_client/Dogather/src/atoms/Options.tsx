// 옵션 리스트

import { atom } from "recoil";

export interface IOption {
  id: number;
  optionName: string;
  optionPrice: number;
}

export const OptionsAtom = atom<IOption[]>({
  key: "Options",
  default: [],
});
