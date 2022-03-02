# Project Git Convention

```
Commit 남길때 Commit 내용 뒤에 자기 이름 적기!
ex) $ git commit -m "upload feat_login_fe_Yoon GWan"
```

### 1. Master에 push하지 않는다!

* Setting에서 push 못하도록 해두었습니다.

### 2. git-flow

```
master - 제품으로 출시될 수 있는 브랜치

develop - 다음 출시 버전을 개발하는 브랜치

feature - 기능을 개발하는 브랜치
	* !남기자! (교육용 프로젝트라 학습을 위해 브랜치를 살렸다.)
	* dev-"fe or be"-"기능"-"개발자이니셜"
	
hotfix - 출시버전에 발생한 버그를 수정하는 브랜치 ( 급한거 )
	* hotfix-"fe or be"-"기능"-"개발자이니셜"
	
release - 이번 출시 버전을 준비하는 브랜치
	* !남기자!
	* release-v"버전번호"

```

### 3. commit convention

```
"뭐하는지 - 이름"
```

### 4. merge request

```
한국어로 자세하게 뭐했는지 쓰면 될거 같아
```

------------------------



