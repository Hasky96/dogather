# DoGather REST API Doc

### User

* 카테고리 클릭시 공구 리스트 가져오기

  ```
  url : http://i6e104.p.ssafy.io:8090/api/group/csearch/2
  method: get
  ```
  
* 단어 검색

  ```
  url : http://i6e104.p.ssafy.io:8090/api/group/wsearch
  method: post
  body : 
  {
      "word" : "단어"
  }
  ```

* 닉네임 검색

  ```
  url : http://i6e104.p.ssafy.io:8090/api/group/psearch
  method: post
  body:
  {
      "person" : "검색한 닉네임"
  }
  ```

  
