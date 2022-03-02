# DoGather REST API Doc

### User

* 로그인

  ```
  url : http://i6e104.p.ssafy.io:8090/user/login
  method: post
  body : 
  {
      "userId":"test",
      "userPw":"test"
  }
  ```

* 회원가입

  ```
  url : http://i6e104.p.ssafy.io:8090/user/register
  method: post
  body : 
  {
       "userId":"test",
       "userPw":"test",
       "userName":"testName",
       "userNickname":"testNickname",
       "userAddr":"testAddr",
       "userAddrDetail":"testAddrDetail",
       "userZip": 12345,
       "userTel":"testTel",
       "userEmail":"testEmail"
  }
  ```

* 회원정보수정

  ```
  url : http://i6e104.p.ssafy.io:8090/user/{userId}
  method: put
  herder : "jwt":"token"
  body : 
  {
       "userPw":"test",
       "userName":"testName",
       "userNickname":"testNickname",
       "userAddr":"testAddr",
       "userAddrDetail":"testAddrDetail",
       "userZip": 12345,
       "userTel":"testTel",
       "userEmail":"testEmail"
  }
  ```

* 회원탈퇴

  ```
  url : http://i6e104.p.ssafy.io:8090/user/{userId}
  method: delete
  herder : "jwt":"token"
  body : 
  {
  }
  ```

* ID중복확인

  ```
  url: http://i6e104.p.ssafy.io:8090/user/idcheck
  method: get
  ```

* Nickname중복확인

  ```
  url: http://i6e104.p.ssafy.io:8090/user/nickcheck
  method: get
  ```

  