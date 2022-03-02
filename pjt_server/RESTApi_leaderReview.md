# DoGather REST API Doc

### User

* 리더평가

  ```
  url : http://i6e104.p.ssafy.io:8090/api/group/review
  method: post
  body : 
  {
  	"userFrom" : 1,
  	"userTo" : 2,
  	"star" : 3(3은 예시고 0~5사이 아무거나)
  	"content" : "아무내용이나"
  }
  ```
  
* 나의 평균 평가 점수

  ```
  url : http://i6e104.p.ssafy.io:8090/api/group/review/2(유저번호)
  method: get
  
  결과값이 -1이 넘어오면 평가를 받은적이 없는 것
  그 이외 결과값은 다 자신이 받은 평가 점수의 평균값임
  ```

  
