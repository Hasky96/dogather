- 그룹 생성

  method : post

  url : 	

  {

    "groupLeader" : 1,

    "deadline" : "2022-01-29 22:00:00",

    "maxPeople" : 100,

    "status" : "공구진행중",

  }

- 그룹 수정

  method : put

  url : http://i6e104.p.ssafy.io:8090/group/그룹번호

  {

    "groupLeader" : 1,

    "deadline" : "2022-01-29 22:00:00",

    "maxPeople" : 100,

    "status" : "공구진행중",

  }

- 그룹 불러오기

  method : get

  url : http://i6e104.p.ssafy.io:8090/group/그룹번호

- 그룹 삭제

  method : delete

  url : http://i6e104.p.ssafy.io:8090/group/그룹번호

- 그룹에 들어가기(공구 참여)

  method : post

  url : http://i6e104.p.ssafy.io:8090/group/enter

  body

  {

    "userNo" : 1,

    "groupNo" : 1,

    "groupLeader" : 1,

    "productNo" : 1

  }

- 그룹에서 나가기(공구에서 나가기)

  method : delete

  url : http://i6e104.p.ssafy.io:8090/group/out

  body

  {

    "userNo" : 1,

    "groupNo" : 1,

    "groupLeader" : 1,

    "productNo" : 1

  }

