import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { fetchUserUpdate } from "../../api/UserInfo";
import { isLoginAtom, userIdAtom, userNoAtom } from "../../atoms/Login";
import { CategoriesAtom } from "../../atoms/ProductCategories";
import UpdateCategory from "./SignupComponents/UpdateCategory";
import { AlarmsAtom, AlarmsCountAtom } from "../../atoms/Alarm";

// useForm에 담길 데이터 타입
interface IForm {
  userId: string;
  userName: string;
  userNickname: string;
  userAddr: string;
  userAddrDetail: string;
  userZip: number;
  userTel: number;
  userEmail: string;
}

// useQuery에 담길 타입
interface IUserInfo {
  msg: string;
  userAddr: string;
  userAddrDetail: string;
  userCategory: number[];
  userEmail: string;
  userId: string;
  userName: string;
  userNickname: string;
  userNo: number;
  userPw: string;
  userTel: string;
  userZip: number;
}

function UserUpdate() {
  const JWT = localStorage.getItem("login_token");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userNo, setUserNo] = useRecoilState(userNoAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [categories, setCategories] = useRecoilState(CategoriesAtom);
  const [alarms, setAlarms] = useRecoilState(AlarmsAtom);
  const [count, setCount] = useRecoilState(AlarmsCountAtom);

  const { isLoading, data } = useQuery<IUserInfo>([JWT, userNo, userId], () =>
    fetchUserUpdate(JWT!, userNo!, userId!)
  );

  // 토큰 만료 시
  if (data?.msg === "relogin") {
    localStorage.clear(); // 로컬 스토리지 비우기
    setIsLogin(false); // 로그인 여부 초기화
    setUserNo(""); // 저장된 user pk 초기화
    setUserId(""); // 저장된 user id 초기화
    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    setTimeout(() => {
      navigate("/login");
    }, 1); // 로그인 페이지로 이동
  }

  const originNickname = data?.userNickname; // 기존 닉네임 중복 확인 방지

  // useForm으로 form 내용 한 번에 받음
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    watch,
  } = useForm<IForm>({ mode: "onBlur" }); // onBlur: 입력 후 input 벗어났을 때 유효성 검사

  // form 제출 시 실행
  const onValid = (formData: IForm) => {
    const newData = {
      ...formData,
      userCategory: categories,
    };

    if (window.confirm("변경 사항을 적용하시겠습니까?") == true) {
      // 데이터 전송
      fetch(`http://i6e104.p.ssafy.io/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwt: `${JWT}`,
          userId: userId,
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          if (result.msg === "relogin") {
            // 토큰 만료 시
            localStorage.clear(); // 로컬 스토리지 비우기
            setIsLogin(false); // 로그인 여부 초기화
            setUserNo(""); // 저장된 user pk 초기화
            setUserId(""); // 저장된 user id 초기화
            setAlarms([]); // 저장된 알람 리스트 초기화
            setCount(0); // 저장된 읽지 않은 알람 개수 초기화
            alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            setTimeout(() => {
              // 1ms (0.001초) 후 navigate 실행 (미세한 차이로 isLogin이 false 되는 것 보다 navigate가 빨라 isLogin이 true라고 판단하여 로그인 페이지에서 메인 페이지로 튕김)
              navigate("/login"); // 로그인 페이지로 이동
            }, 1);
          } else if (result.error) {
            alert(result.status + " " + result.error);
          } else {
            // 토큰 만료 아닐 시
            alert("회원 정보를 수정하였습니다.");
            navigate(`/user`); // 마이페이지로 이동
          }
        });
    }
  };

  // useQuery로 받아온 데이터를 useForm에 넣어 놓기 (useEffect로 data 변경 마다 실행)
  useEffect(() => {
    // undefind 보이는 것 방지하기 위해 Loading이 끝난 후 setValue
    if (!isLoading) {
      setValue("userId", `${data?.userId}`);
      setValue("userName", `${data?.userName}`);
      setValue("userNickname", `${data?.userNickname}`);
      setValue("userZip", Number(data?.userZip));
      setValue("userAddr", `${data?.userAddr}`);
      setValue("userAddrDetail", `${data?.userAddrDetail}`);
      setValue("userTel", Number(data?.userTel));
      setValue("userEmail", `${data?.userEmail}`);
    }
    if (data?.userCategory) {
      setCategories([...data?.userCategory]); // 가져온 카테고리 배열 Atom에 복사
    }
  }, [data]);

  // 중복검사 시작했는지 확인 (중복검사를 시작했을때부터 SuccessMessage 보이기 위함)
  const [startCheckNick, setStartCheckNick] = useState(false);

  const changeStartCheckNick = () => {
    setStartCheckNick(true);
    return true;
  };

  // 주소 찾기 API
  const findAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setValue("userZip", data.zonecode);
        setValue("userAddr", data.address);
      },
    }).open();
  };

  // 회원 탈퇴
  const deleteUser = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?") == true) {
      // 데이터 전송
      fetch(`http://i6e104.p.ssafy.io/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          jwt: `${JWT}`,
          userId: userId,
        },
      })
        .then((response) => response.text())
        .then((result) => {
          // console.log(result);
          if (result === `{"msg": "relogin"}`) {
            // 토큰 만료 시
            localStorage.clear(); // 로컬 스토리지 비우기
            setIsLogin(false); // 로그인 여부 초기화
            setUserNo(""); // 저장된 user pk 초기화
            setUserId(""); // 저장된 user id 초기화
            alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            setTimeout(() => {
              // 1ms (0.001초) 후 navigate 실행 (미세한 차이로 isLogin이 false 되는 것 보다 navigate가 빨라 isLogin이 true라고 판단하여 로그인 페이지에서 메인 페이지로 튕김)
              navigate("/login"); // 로그인 페이지로 이동
            }, 1);
          } else {
            // 토큰 만료 아닐 시
            localStorage.clear(); // 로컬 스토리지 비우기
            setIsLogin(false); // 로그인 여부 초기화
            setUserNo(""); // 저장된 user pk 초기화
            setUserId(""); // 저장된 user id 초기화
            alert("탈퇴 되었습니다.");
            setTimeout(() => {
              // 1ms (0.001초) 후 navigate 실행 (미세한 차이로 isLogin이 false 되는 것 보다 navigate가 빨라 isLogin이 true라고 판단하여 로그인 페이지에서 메인 페이지로 튕김)
              navigate("/"); // 메인 페이지로 이동
            }, 1);
          }
        });
    }
  };

  return (
    <Container>
      <SubContainer>
        <Title>회원 정보 수정</Title>
        <SignUpForm onSubmit={handleSubmit(onValid)}>
          <InputDiv>
            <InputTitle>아이디</InputTitle>
            <InputDis {...register("userId")} disabled />
          </InputDiv>
          <InputDiv>
            <InputTitle>이름</InputTitle>
            <Input
              {...register("userName", {
                required: "필수 정보입니다.",
                pattern: {
                  value: /^[가-힣]*$/,
                  message: "한글만 사용 가능합니다.",
                },
              })}
              placeholder="한글만 입력"
            />
            <ErrorMessage>{errors?.userName?.message}</ErrorMessage>
          </InputDiv>
          <InputDiv>
            <InputTitle>닉네임</InputTitle>
            <Input
              {...register("userNickname", {
                required: "필수 정보입니다.",
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]{2,10}$/,
                  message:
                    "2~10자의 한글, 영문 대 소문자, 숫자만 사용 가능합니다.",
                },
                validate: {
                  checkNickname: async (value) =>
                    originNickname === value
                      ? true
                      : (await fetch(
                          `http://i6e104.p.ssafy.io/api/user/nickcheck?nick=${value}`
                        )
                          .then((res) => res.json())
                          .then((result) => result))
                      ? startCheckNick
                        ? true
                        : changeStartCheckNick()
                      : "이미 사용중인 닉네임 입니다.",
                },
              })}
              placeholder="한글/영문/숫자 2~10자"
              maxLength={10}
            />
            {startCheckNick && !errors?.userNickname?.message ? (
              <SuccessMessage>사용 가능한 닉네임 입니다.</SuccessMessage>
            ) : (
              <ErrorMessage>{errors?.userNickname?.message}</ErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <InputTitle>우편번호</InputTitle>
            <InputWithButtonDiv>
              <SmallInput
                {...register("userZip", {
                  required: "필수 정보입니다.",
                })}
                disabled // input 값 수정 못하도록 설정
              />
              <SmallButton type="button" onClick={findAddress}>
                주소 검색
              </SmallButton>
            </InputWithButtonDiv>
            <ErrorMessage>{errors?.userZip?.message}</ErrorMessage>
          </InputDiv>
          <InputDiv>
            <InputTitle>주소</InputTitle>
            <Input
              {...register("userAddr", { required: "필수 정보입니다." })}
              disabled
            />
            <ErrorMessage>{errors?.userAddr?.message}</ErrorMessage>
          </InputDiv>
          <InputDiv>
            <InputTitle>상세 주소</InputTitle>
            <Input
              {...register("userAddrDetail", { required: "필수 정보입니다." })}
            />
            <ErrorMessage>{errors?.userAddrDetail?.message}</ErrorMessage>
          </InputDiv>
          <InputDiv>
            <InputTitle>전화번호</InputTitle>
            <Input
              {...register("userTel", {
                required: "필수 정보입니다.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "전화번호 양식을 지켜주세요.",
                },
              })}
              placeholder="숫자만 입력   ex) 01012345678"
              maxLength={12}
            />
            <ErrorMessage>{errors?.userTel?.message}</ErrorMessage>
          </InputDiv>
          <InputDiv>
            <InputTitle>이메일</InputTitle>
            <Input
              {...register("userEmail", {
                required: "필수 정보입니다.",
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "이메일 양식을 지켜주세요.",
                },
              })}
              placeholder="ex) dogather@email.com"
            />
            <ErrorMessage>{errors?.userEmail?.message}</ErrorMessage>
          </InputDiv>
          <CategoryDiv>
            <InputTitle>관심 카테고리</InputTitle>
            <UpdateCategory />
          </CategoryDiv>

          <Button>수정</Button>
        </SignUpForm>
        <Withdraw onClick={deleteUser}>회원탈퇴</Withdraw>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
  padding-bottom: 200px;
`;

const SubContainer = styled.div`
  width: 460px;
  margin-top: 100px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 50px;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputDiv = styled.div`
  width: 100%;
  padding: 0 0 20px 0;
`;

const CategoryDiv = styled.div`
  width: 100%;
  border-top: 1px solid #d2dae2;
  border-bottom: 1px solid #d2dae2;
  padding-top: 20px;
`;

const InputWithButtonDiv = styled.div`
  display: flex;
`;

const SmallInput = styled.input`
  width: 230px;
  height: 45px;
  border: 1px solid #d2dae2;
  background: white;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SmallButton = styled.button`
  width: 230px;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

const InputTitle = styled.div`
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #d2dae2;
  background: white;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputDis = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #d2dae2;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  margin-bottom: 3px;
`;

const SuccessMessage = styled.p`
  margin-top: 3px;
  font-size: 12px;
  color: #05c46b;
`;

const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 12px;
  color: #ff5e57;
`;

const Withdraw = styled.div`
  margin-top: 30px;
  display: inline-block;
  padding: 5px 0;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
  cursor: pointer;
`;

const Button = styled.button`
  /* margin-bottom: 150px; */
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 55px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  cursor: pointer;
`;

export default UserUpdate;
