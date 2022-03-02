const BASE_URL = `http://i6e104.p.ssafy.io/api/group`;

export function FetchMoimGroupAPI(
  groupNo: string,
  userId: string,
  JWT: string,
  userNo: number
) {
  // const JWT = localStorage.getItem("login_token");
  if (typeof userNo !== typeof 0) {
    userNo = 0;
  }
  // console.log(typeof userNo)
  // console.log(typeof groupNo)
  return fetch(`${BASE_URL}/detail/${groupNo}/${userNo}`, {
    method: "GET",
    // headers: {
    //   jwt: `dfdfdfd`,
    //   userId: userId,
    // },
  }).then((res) => res.json());
  // .then((res) => console.log(res))
}

export function FetchHomeRecommendedMoimCard(userNo: number) {
  return fetch(`${BASE_URL}/recommend/${userNo}`).then((res) => res.json());
}

export function FetchHomeNewMoimCard() {
  return fetch(`${BASE_URL}/new`).then((res) => res.json());
}

export function FetchHomeHotMoimCard() {
  return fetch(`${BASE_URL}/hot`).then((res) => res.json());
}

export function FetchHomeEndMoimCard() {
  return fetch(`${BASE_URL}/end`).then((res) => res.json());
}

export function FetchMoimMediaAPI(mediaNo: number) {
  return fetch(`${BASE_URL}/image/${mediaNo}`).then((res) => res.json());
}

export function FetchUserInfoAPI(userNo: number, JWT: string, userId: string) {
  return fetch(`http://i6e104.p.ssafy.io/api/user/${userNo}/info`, {
    method: "GET",
    headers: {
      jwt: `${JWT}`,
      userId: userId,
    },
  }).then((res) => res.json());
}
