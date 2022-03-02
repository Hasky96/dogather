import { atom, selector, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist(); // 로컬 스토리지에 저장 (새로고침 초기화 방지)

// 로그인 여부 확인
export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 로그인 시 user pk 저장
export const userNoAtom = atom({
  key: "userNo",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// 로그인 시 user 아이디 저장 (Interceptor 정보)
export const userIdAtom = atom({
  key: "userId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 로그인 시 user 닉네임 저장 (Alarm 정보)
export const userNickAtom = atom({
  key: "userNick",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
