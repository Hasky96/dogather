// FAQ 리스트

import { atom } from "recoil";

export interface IFAQ {
  id: number;
  categoryNo: number;
  faqQuestion: string;
  faqAnswer: string;
}

export const FAQsAtom = atom<IFAQ[]>({
  key: "FAQs",
  default: [],
});
