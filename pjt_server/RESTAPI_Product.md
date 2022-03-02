# DoGather REST API Doc

### Product

* Group 넘버로 상품 불러오기

  ```
   url : http://i6e104.p.ssafy.io:8090/product/{groupNo}
   method: get
  
  ```

* Product 등록

  ```
   url : http://i6e104.p.ssafy.io:8090/product/{groupNo}
   method: post
   body:
  {
      "groupNo": 1,
      "productOriginalPrice": "1010",
      "productDetail": "test detail",
      "productLink": "test link",
      "productName": "test",
      "productPrice": "500",
  }
  
  ```

* Product 수정

  ```
   url : http://i6e104.p.ssafy.io:8090/product/{productNo}
   method: put
   body:
   {
      "productNo": "1",
      "productOriginalPrice": "1010",
      "productDetail": "test detail",
      "productLink": "test link3",
      "productName": "test",
      "productPrice": "500"
  }
  
  ```

* Product 삭제

  ```
   url : http://i6e104.p.ssafy.io:8090/product/{productNo}
   method: delete
   body:
   {
      "productNo": "1",
      "productOriginalPrice": "1010",
      "productDetail": "test detail",
      "productLink": "test link3",
      "productName": "test",
      "productPrice": "500"
  }
  ```

  