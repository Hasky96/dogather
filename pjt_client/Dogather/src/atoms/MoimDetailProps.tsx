import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const detailProducts = atom({
  key: "products",
  default: "[]",
});
