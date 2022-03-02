- 게시판 생성

  Method : post

  url : http://i6e104.p.ssafy.io:8090/board

  보내는 법 : form-data

  ​	key : value, content type 명시! 안에 있는 값은 예시임

  ​	BoardDto :  {"boardTitle":"4", "boardContent":"4", "writerNo":2} => applications/json, 

  ​	file : 파일

  ![스크린샷 2022-02-06 오후 10.03.33](/Users/jamiehong/Desktop/스크린샷 2022-02-06 오후 10.03.33.png)



- 게시판 조회(전체 목록)

  Method : get

  url : http://i6e104.p.ssafy.io:8090/board

  

  ![스크린샷 2022-02-06 오후 10.09.19](/Users/jamiehong/Library/Application Support/typora-user-images/스크린샷 2022-02-06 오후 10.09.19.png)

- 게시판 미디어 조회

  Method: get

  url : http://i6e104.p.ssafy.io:8090/image/{mediaNo}/

  - 미디어를 조회하려면 게시판 조회로 해당 게시판에 존재하는 mediaNo를 읽은 후 한 번 더 미디어 조회를 요청해야함



- 게시판, 미디어 수정

  Method : put

  url : http://i6e104.p.ssafy.io:8090/board/{postNo}

  보내는 법 : form-data

  ​	key : value, content type 명시! 안에 있는 값은 예시임

  ​	BoardDto :  {"boardTitle":"4", "boardContent":"4", "writerNo":2} => applications/json, 

  ​	file : 파일

  - 파일은 새로 넣으면 자동으로 DB에서 갱신되고, 첨부파일을 안넣으면 자동으로 DB에서 삭제

  

  

