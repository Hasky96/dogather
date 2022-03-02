import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isLoginAtom, userIdAtom, userNoAtom } from "../../atoms/Login";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import CreateOption from "./CreateMoimComponents/Option/CreateOption";
import { OptionsAtom } from "../../atoms/Options";
import Option from "./CreateMoimComponents/Option/Option";
import CreateFAQ from "./CreateMoimComponents/FAQ/CreateFAQ";
import { FAQsAtom } from "../../atoms/FAQs";
import FAQ from "./CreateMoimComponents/FAQ/FAQ";
import { useState } from "react";
import { ProductCategories } from "../../atoms/ProductCategories";

// useForm에 담길 데이터 타입
export interface IMoimForm {
  groupLeader: number; // 모임 대표
  categoryNo: number; // 카테고리 pk
  deadline: string; // *공구 마감 날짜
  maxPeople: number; // 인원 수
  status: string; // *공구 진행 상태
  product: string; // 모임 제목 (상품명)
  detail: string; // 모임 상세설명 (상품 상세설명)
  link: string; // 제품 url
  originPrice: number; // 출시 가격
  price: number; // 공구 가격
}

function CreateMoimReview() {
  const navigate = useNavigate(); // 페이지 이동

  const { leaderName } = useParams();

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userNo, setUserNo] = useRecoilState(userNoAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [options, setOptions] = useRecoilState(OptionsAtom);
  const [FAQs, setFAQs] = useRecoilState(FAQsAtom);

  // useForm으로 form 내용 한 번에 받음
  const {
    register, // 지정된 form 내부 입력값들을 받아와서 저장
    handleSubmit, // validation 담당
    formState: { errors }, // formState: form 상태 정보, errors: 입력값들의 에러 정보
    setError, // 특정한 에러 발생 생성
    watch, // 입력값들의 변화 관찰
    getValues, // 입력값들을 읽음
    setValue, // 입력값들을 설정
  } = useForm<IMoimForm>({ mode: "onBlur" }); // onBlur: 입력 후 input 벗어났을 때 유효성 검사

  const goToHome = () => {
    navigate("/user");
  };

  // form 제출 시 실행
  const onValid = (data: IMoimForm) => {
    const JWT = localStorage.getItem("login_token"); // 토큰 가져오기 (Interceptor 정보)

    // // 데이터 전송
    // fetch("http://i6e104.p.ssafy.io/api/group/register", {
    //   method: "POST",
    //   headers: {
    //     // Interceptor
    //     jwt: `${JWT}`,
    //     userId: userId,
    //   },
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     if (result.msg) {
    //       if (result.msg === "relogin") {
    //         // 토큰 만료 시
    //         localStorage.clear(); // 로컬 스토리지 비우기
    //         setIsLogin(false); // 로그인 여부 초기화
    //         setUserNo(""); // 저장된 user pk 초기화
    //         setUserId(""); // 저장된 user id 초기화
    //         alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    //         setTimeout(() => {
    //           // 1ms (0.001초) 후 navigate 실행 (미세한 차이로 isLogin이 false 되는 것 보다 navigate가 빨라 isLogin이 true라고 판단하여 로그인 페이지에서 메인 페이지로 튕김)
    //           navigate("/login"); // 로그인 페이지로 이동
    //         }, 1);
    //       } else {
    //         // 토큰 만료 아닐 시
    //         const ObjectToString = JSON.stringify(result); // 반환값이 object이므로 string으로 변환 (navigate시 url 깨지는 현상 해결)
    //         navigate(`/moim/${ObjectToString}`); // 모임 상세 페이지로 이동
    //       }
    //     }
    //   });
  };

  return (
    <Container>
      <FormContainer>
        <Block>
          <FormTitle>
            <span>{leaderName}님에 대한 평가</span>
          </FormTitle>
        </Block>
        <Block>
          <InputTitle>
            <span>별점</span>
            <Required>*</Required>
          </InputTitle>
          <InputDiv>
            <Select
              {...register("categoryNo", {
                required: "필수 정보입니다.",
              })}
            >
              <option value="">별점</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Select>
            <ErrorMessage>{errors?.categoryNo?.message}</ErrorMessage>
          </InputDiv>
          <ExpDiv>
            <Exp>
              상품과 맞지 않는 카테고리를 등록할 경우 강제 이동되거나 중지 및
              금지 될 수 있습니다.
            </Exp>
          </ExpDiv>
        </Block>
        <Block>
          <InputTitle>
            <span>제목</span>
          </InputTitle>
          <InputDiv>
            <Input
              {...register("product", {
                required: "필수 정보입니다.",
              })}
              placeholder="최대 50자 입력"
              maxLength={50}
            />
            <ErrorMessage>{errors?.product?.message}</ErrorMessage>
          </InputDiv>
          <ExpDiv>
            <Exp>
              판매 상품과 직접 관련이 없는 다른 상품명, 스팸성 키워드 입력 시
              관리자에 의해 판매 금지될 수 있습니다.
              <br />
              유명 상품 유사문구를 무단으로 도용하여 ~스타일, ~st 등과 같이
              기재하는 경우 별도 고지 없이 제재될 수 있습니다.
              <br />
              상품명을 잘 맞게 입력하면 검색 노출에 도움이 될 수 있습니다.
            </Exp>
          </ExpDiv>
        </Block>
        <Block>
          <InputTitle>
            <span>상세 후기</span>
            <Required>*</Required>
          </InputTitle>
          <InputDiv>
            <TextArea
              {...register("detail", {
                required: "필수 정보입니다.",
              })}
            />
            <ErrorMessage>{errors?.detail?.message}</ErrorMessage>
          </InputDiv>
          <ExpDiv>
            <Exp>
              외부링크를 통한 개인정보(휴대폰 번호, 이메일 주소) 수집은
              금지되므로 등록시 노출이 제재될 수 있습니다.
              <br />
              상품명과 직접적 관련 없는 상세설명, 외부 링크 입력 시 관리자에
              의해 판매 금지 될 수 있습니다.
            </Exp>
          </ExpDiv>
        </Block>
        <Button onClick={goToHome}>평가하기</Button>
      </FormContainer>
    </Container>
  );
}

// 페이지 전체
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
`;

// useForm + 다른 form 모두 포함
const FormContainer = styled.div`
  width: 1280px;
  margin-top: 68px;
`;

// form 항목
const Block = styled.div`
  background-color: white;
  min-height: 50px;
  margin: 1rem;
`;

// form 제목
const FormTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;
`;

const InputTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 1rem;
  border-bottom: 1px solid whitesmoke;
`;

// 필수 항목 (*)
const Required = styled.span`
  font-size: 16px;
  color: #ff5e57;
  margin-left: 5px;
`;

const ImgDiv = styled.div`
  display: flex;
  padding: 1rem;
`;

const Img = styled.div`
  margin-left: 1rem;
`;

const ImgList = styled.p`
  color: #575fcf;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

const InputDiv = styled.div`
  padding: 1rem;
`;

// 항목의 하위 항목
export const SubInputTopDiv = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;
export const SubInputMiddleDiv = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;
export const SubInputBottomDiv = styled.div`
  display: flex;
  padding: 1rem 0 0 0;
`;
export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;
  width: 100%;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Select = styled.select`
  width: 250px;
  height: 30px;
`;

export const MiniInput = styled.input`
  width: 250px;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// 상세설명
const TextArea = styled.textarea`
  resize: none; // 크기 고정
  margin-bottom: 2px;
  width: 100%;
  height: 200px;
`;

// 에러 메시지
export const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 11px;
  color: #ff5e57;
`;

// 참고
export const ExpDiv = styled.div`
  padding: 0 1rem 1rem 1rem; // 상우하좌
`;
export const Exp = styled.span`
  font-size: 11px;
  color: #808e9b;
`;

// 상품 상세 이미지
const Files = styled.input`
  display: none;
`;
const ImgBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 2px dotted #808e9b;
  cursor: pointer;
`;
const ImgBoxInside = styled.div`
  color: #808e9b;
  font-size: 70px;
`;

// 테이블
const Table = styled.div`
  min-height: 60px;
  width: 100%;
  border: 1px solid #d2dae2;
`;
const TableTitleDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  height: 30px;
`;
const TableTitle = styled.div`
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

// 최종 제출 버튼
const Button = styled.button`
  margin-top: 35px;
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

export default CreateMoimReview;
