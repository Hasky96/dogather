import { atom } from "recoil";

// 상품 카테고리
export enum ProductCategories {
  "-", // 0
  "남성패션",
  "여성패션",
  "뷰티/미용",
  "식품",
  "건강/의료용품",
  "생활가전",
  "디지털기기",
  "가구/인테리어",
  "생활용품",
  "도서/티켓/E쿠폰",
  "출산/유아동",
  "반려동물용품",
  "스포츠/레저",
  "자동차/공구",
  "악기",
  "게임/놀이",
}

// 회원 가입에서 체크한 카테고리들을 담을 곳
export const CategoriesAtom = atom<Array<number>>({
  key: "category",
  default: [],
});
