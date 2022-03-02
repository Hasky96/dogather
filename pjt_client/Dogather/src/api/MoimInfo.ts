const BASE_URL = "http://i6e104.p.ssafy.io/api";

// 모임수정 들어갈 때
export async function fetchMoimUpdate(userNo: number, groupNo: string) {
  return fetch(`${BASE_URL}/group/detail/${groupNo}/${userNo}`).then(
    (response) => response.json()
  );
}
