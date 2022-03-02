# DoGather REST API Doc

### User

* 팔로우하기

  ```
  url : http://i6e104.p.ssafy.io:8090/follow
  method: post
  body : 
  {
      "userFrom":1,
      "userTo":2
  }
  ```

* 언팔로우하기

  ```
  url : http://i6e104.p.ssafy.io:8090/follow
  method: delete
  body : 
  {
      "userFrom":1,
      "userTo":2
  }
  ```

* 팔로워, 팔로잉 리스트 가져오기

  ```
  url : http://i6e104.p.ssafy.io:8090/follow/2
  method: get
  ```

  
