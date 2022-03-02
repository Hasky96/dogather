const BASE_URL = "http://i6e104.p.ssafy.io/api";

// 마이페이지 들어갈 때
export async function fetchMyPage(JWT: string, userId: string) {
  return fetch(`${BASE_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      jwt: `${JWT}`,
      userId: userId,
    },
  }).then((response) => response.json());
}

// 회원정보수정 들어갈 때
export async function fetchUserUpdate(
  JWT: string,
  userNo: number,
  userId: string
) {
  return fetch(`${BASE_URL}/user/${userNo}/info`, {
    method: "GET",
    headers: {
      jwt: `${JWT}`,
      userId: userId,
    },
  }).then((response) => response.json());
}
