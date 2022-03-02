const BASE_URL = "http://i6e104.p.ssafy.io/api";

// 알람 리스트
export async function fetchAlarm(
  JWT: string,
  userId: string,
  userNick: string
) {
  return fetch(`${BASE_URL}/alarm/${userNick}`, {
    method: "GET",
    headers: {
      jwt: `${JWT}`,
      userId: userId,
    },
  }).then((response) => response.json());
}
