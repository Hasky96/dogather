import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  isLoginAtom,
  userIdAtom,
  userNickAtom,
  userNoAtom,
} from "../../atoms/Login";

// useForm에 담길 데이터 타입
interface ILoginForm {
  userId: string;
  userPw: string;
}

function Login() {
  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState(isLoginAtom);
  const setUserNo = useSetRecoilState(userNoAtom);
  const setUserId = useSetRecoilState(userIdAtom);
  const setUserNick = useSetRecoilState(userNickAtom);

  // useForm으로 form 내용 한 번에 받음
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  // form 제출 시 실행
  const onValid = (data: ILoginForm) => {
    fetch("http://i6e104.p.ssafy.io:8090/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.msg === "success") {
          localStorage.setItem("login_token", result.jwt);
          setIsLogin(true);
          setUserNo(result.userInfo.userNo);
          setUserId(result.userInfo.userId);
          setUserNick(result.userInfo.userNickname);
          navigate("/");
        } else if (result.msg === "wrongPw") {
          alert("비밀번호가 잘못 입력 되었습니다.");
        } else {
          alert("아이디가 잘못 입력 되었습니다.");
        }
      });
  };

  return (
    <Container>
      <SubContainer>
        <Title>로그인</Title>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <InputDiv>
            <InputTitle>아이디</InputTitle>
            <Input
              {...register("userId", {
                required: "아이디를 입력해 주세요.",
              })}
            />
            <ErrorMessage>{errors?.userId?.message}</ErrorMessage>
          </InputDiv>
          <InputDiv>
            <InputTitle>비밀번호</InputTitle>
            <Input
              {...register("userPw", {
                required: "비밀번호를 입력해 주세요.",
              })}
              type="password"
            />
            <ErrorMessage>{errors?.userPw?.message}</ErrorMessage>
          </InputDiv>
          <LoginButton>로그인</LoginButton>
          <KakaoLoginButton src="https://user-images.githubusercontent.com/70811550/126318637-aaa3db8c-bc8d-4b5d-b378-663d5f3cb51a.png" />
        </LoginForm>
      </SubContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
  padding-bottom: 150px; // footer와 Container 사이 공간 제거
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputDiv = styled.div`
  width: 100%;
  padding: 0 0 20px 0;
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
`;

const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 12px;
  color: #ff5e57;
`;

const LoginButton = styled.button`
  margin-top: 35px;
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

const KakaoLoginButton = styled.img`
  margin-top: 5px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 55px;
  cursor: pointer;
`;

export default Login;
