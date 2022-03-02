const BASE_URL = "http://i6e104.p.ssafy.io/api";

// 검색 데이터
export async function fetchSearch(keyword: string, option: string) {
  return fetch(`${BASE_URL}/group/search?page=1&${option}=${keyword}`).then(
    (response) => response.json()
  );
}

// 카테고리 데이터
export async function fetchSearchCategory(key: string) {
  return fetch(`${BASE_URL}/group/category?category=${key}&page=1`).then(
    (response) => response.json()
  );
}
