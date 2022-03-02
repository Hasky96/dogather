import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Category from "./SignupComponents/Category";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CategoriesAtom } from "../../atoms/ProductCategories";

// useForm에 담길 데이터 타입
interface ISignUpForm {
  userId: string;
  userPw: string;
  checkPw: string;
  userName: string;
  userNickname: string;
  userAddr: string;
  userAddrDetail: string;
  userZip: number;
  userTel: string;
  userEmail: string;
}

function Singup() {
  const navigate = useNavigate();

  const [categories, setCategories] = useRecoilState(CategoriesAtom);

  // useForm으로 form 내용 한 번에 받음
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    watch,
  } = useForm<ISignUpForm>({ mode: "onBlur" }); // onBlur: 입력 후 input 벗어났을 때 유효성 검사

  // 중복검사 시작했는지 확인 (중복검사를 시작했을때부터 SuccessMessage 보이기 위함)
  const [startCheckId, setStartCheckId] = useState(false);
  const [startCheckNick, setStartCheckNick] = useState(false);

  const changeStartCheckId = () => {
    setStartCheckId(true);
    return true;
  };
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

  // form 제출 시 실행
  const onValid = (data: ISignUpForm) => {
    const newData = {
      ...data,
      userCategory: categories,
    };

    // 데이터 전송
    fetch("http://i6e104.p.ssafy.io:8090/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.msg === "가입완료") {
          alert(`${data.userName}님, 회원가입을 축하합니다!`);
          navigate("/login"); // 로그인 페이지로 이동
        }
      });
  };

  return (
    <Container>
      <SubContainer>
        <Title>회원가입</Title>
        <SignUpForm onSubmit={handleSubmit(onValid)}>
          <InputDiv>
            <InputTitle>아이디</InputTitle>
            <Input
              {...register("userId", {
                required: "필수 정보입니다.",
                pattern: {
                  value: /^[a-z0-9]{4,10}$/,
                  message: "4~10자의 영문 소문자, 숫자만 사용 가능합니다.",
                },
                validate: {
                  checkId: async (value) =>
                    (await fetch(
                      `http://i6e104.p.ssafy.io/api/user/idcheck?id=${value}`
                    )
                      .then((res) => res.json())
                      .then((result) => result))
                      ? startCheckId
                        ? true
                        : changeStartCheckId()
                      : "이미 사용중인 아이디 입니다.",
                },
              })}
              placeholder="영문/숫자 4~10자"
              maxLength={10}
            />
            {startCheckId && !errors?.userId?.message ? (
              <SuccessMessage>사용 가능한 아이디 입니다.</SuccessMessage>
            ) : (
              <ErrorMessage>{errors?.userId?.message}</ErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <InputTitle>비밀번호</InputTitle>
            <Input
              {...register("userPw", {
                required: "필수 정보입니다.",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                  message:
                    "8~16자의 영문 대 소문자, 숫자, 특수문자 조합만 사용 가능합니다.",
                },
              })}
              placeholder="영문/숫자/특수문자 조합 8~16자"
              type="password"
              maxLength={16}
            />
            <ErrorMessage>{errors?.userPw?.message}</ErrorMessage>
          </InputDiv>
          <InputDiv>
            <InputTitle>비밀번호 확인</InputTitle>
            <Input
              {...register("checkPw", {
                required: "필수 정보입니다.",
                validate: {
                  checkPassword: (value) => {
                    const { userPw } = getValues();
                    return userPw === value || "비밀번호가 일치하지 않습니다.";
                  },
                },
              })}
              placeholder="비밀번호와 동일하게 입력"
              type="password"
              maxLength={16}
            />
            <ErrorMessage>{errors?.checkPw?.message}</ErrorMessage>
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
                    (await fetch(
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
              // type="number"
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
            <Category />
          </CategoryDiv>
          <Button>가입하기</Button>
        </SignUpForm>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
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
  padding: 20px 0;
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

const Button = styled.button`
  margin-bottom: 150px;
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

export default Singup;
