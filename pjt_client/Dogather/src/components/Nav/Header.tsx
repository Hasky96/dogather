import DogatherLogo from "./Logo.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import {
  isLoginAtom,
  userIdAtom,
  userNickAtom,
  userNoAtom,
} from "../../atoms/Login";
import { CategoriesAtom } from "../../atoms/ProductCategories";
import { OptionsAtom } from "../../atoms/Options";
import { FAQsAtom } from "../../atoms/FAQs";
import { useQuery } from "react-query";
import { fetchAlarm } from "../../api/Alarm";
import { AlarmsAtom, AlarmsCountAtom, IAlarm } from "../../atoms/Alarm";

interface IForm {
  keyword: string;
}
function Header() {
  const JWT = localStorage.getItem("login_token");

  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userNo, setUserNo] = useRecoilState(userNoAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [userNick, setUserNick] = useRecoilState(userNickAtom);
  const [alarms, setAlarms] = useRecoilState(AlarmsAtom);
  const [count, setCount] = useRecoilState(AlarmsCountAtom);
  const [options, setOptions] = useRecoilState(OptionsAtom);
  const [FAQS, setFAQs] = useRecoilState(FAQsAtom);
  const [categories, setCategories] = useRecoilState(CategoriesAtom);

  // url 바뀔 때 마다 로컬 스토리지에 토큰이 있는지 확인하여 로그인 여부를 변경
  useEffect(() => {
    if (!isLogin) {
      setIsLogin(localStorage.getItem("login_token") !== null); // 로컬 스토리지에 login_token이 비어있지 않으면 isLogin을 true로 바꿈
    }
    setOptions([]); // 모임 생성의 옵션 초기화
    setFAQs([]); // 모임 생성의 FAQ 초기화
    setCategories([]); // 회원가입의 체크박스 초기화
    setSearchOpen(false); // 검색 아이콘 위치 초기화
    inputAnimation.start({ scaleX: 0 }); // 검색 input 위치 초기화
  }, [location]);

  // 검색 디자인
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

  // 검색 기능
  // useForm으로 form 내용 한 번에 받음
  const { register, handleSubmit, setValue } = useForm<IForm>();
  // form 제출 시 실행
  const onValid = (data: IForm) => {
    const keyword = data.keyword; // 아래 setValue를 위해 다른 변수에 넣어줌
    setValue("keyword", ""); // 검색 후 input에 글자 남아있는 것 초기화
    navigate(`/search/${keyword}`, { state: { option: "query" } }); // 검색 상세 페이지로 이동 (여기선 select가 없기 때문에 옵션은 모임 검색으로 지정한 후 전달)
  };

  // 알람 리스트 받아오기
  const { isLoading, data: alarmList } = useQuery<IAlarm[]>(
    [JWT, userId, userNick],
    () => fetchAlarm(JWT!, userId!, userNick!),
    {
      enabled: !!JWT && !!userId && !!userNick, // JWT, userId, userNick 값이 있어야 실행 (로그인 했을 때만 실행되도록)
      refetchInterval: 3000, // 3초 마다 useQuery 실행
    }
  );
  // 토큰 만료 시
  if (
    !!JWT &&
    !!userId &&
    !!userNick &&
    Object.keys(Object(alarmList)).includes("msg")
  ) {
    localStorage.clear(); // 로컬 스토리지 비우기
    setIsLogin(false); // 로그인 여부 초기화
    setUserNo(""); // 저장된 user pk 초기화
    setUserId(""); // 저장된 user id 초기화
    setAlarms([]); // 저장된 알람 리스트 초기화
    setCount(0); // 저장된 읽지 않은 알람 개수 초기화
    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    setTimeout(() => {
      navigate("/login");
    }, 1); // 로그인 페이지로 이동
  }
  // 읽지 않은 메세지 개수
  const Count = (alarmList: IAlarm[]) => {
    let sum = 0;
    alarmList.map((alarm) => {
      if (alarm.read === 0) {
        sum += 1;
      }
    });
    setCount(sum);
  };
  // 알람 리스트 바뀔 때 마다 AlarmsAtom 수정
  useEffect(() => {
    if (alarmList) {
      setAlarms([...alarmList]);
      Count(alarmList);
    }
  }, [alarmList]);

  // 로그아웃 클릭 시 작동
  const Logout = () => {
    localStorage.clear(); // 로컬 스토리지 비우기
    setIsLogin(false); // 로그인 여부 초기화
    setUserNo(""); // 저장된 user pk 초기화
    setUserId(""); // 저장된 user id 초기화
    setAlarms([]); // 저장된 알람 리스트 초기화
    setCount(0); // 저장된 읽지 않은 알람 개수 초기화
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <Nav>
      <UpperNav>
        <UpperCol>
          <UpperItems>
            <UpperItem>고객센터</UpperItem>
            {isLogin ? (
              <>
                <UpperItem onClick={Logout}>
                  <LogoutDiv>로그아웃</LogoutDiv>
                </UpperItem>
                <UpperItem>
                  <Link to="/user">마이페이지</Link>
                </UpperItem>
              </>
            ) : (
              <>
                <UpperItem>
                  <Link to="/login">로그인</Link>
                </UpperItem>
                <UpperItem>
                  <Link to="/signup">회원가입</Link>
                </UpperItem>
              </>
            )}
          </UpperItems>
        </UpperCol>
      </UpperNav>
      <LowerNav>
        <LowerCol>
          <Link to="/">
            <Logo src={`${DogatherLogo}`}></Logo>
          </Link>
        </LowerCol>
        <LowerCol>
          <LowerItems>
            {/* 검색 아이콘 (svg로 가져오면 CSS로 자유롭게 변경 가능 */}
            <Search onSubmit={handleSubmit(onValid)}>
              <motion.svg
                onClick={toggleSearch}
                animate={{ x: searchOpen ? -215 : 0 }}
                transition={{ type: "linear" }}
                fill="currentColor"
                viewBox="0 0 768 768"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M513.312 507.392c-1.088 0.832-2.144 1.76-3.168 2.784s-1.92 2.048-2.784 3.168c-40.256 38.816-95.008 62.656-155.36 62.656-61.856 0-117.824-25.024-158.4-65.6s-65.6-96.544-65.6-158.4 25.024-117.824 65.6-158.4 96.544-65.6 158.4-65.6 117.824 25.024 158.4 65.6 65.6 96.544 65.6 158.4c0 60.352-23.84 115.104-62.688 155.392zM694.624 649.376l-117.6-117.6c39.392-49.28 62.976-111.776 62.976-179.776 0-79.52-32.256-151.552-84.352-203.648s-124.128-84.352-203.648-84.352-151.552 32.256-203.648 84.352-84.352 124.128-84.352 203.648 32.256 151.552 84.352 203.648 124.128 84.352 203.648 84.352c68 0 130.496-23.584 179.776-62.976l117.6 117.6c12.512 12.512 32.768 12.512 45.248 0s12.512-32.768 0-45.248z"
                  clipRule="evenodd"
                ></path>
              </motion.svg>
              <Input
                {...register("keyword", { required: true })}
                animate={inputAnimation}
                initial={{ scaleX: 0 }}
                transition={{ type: "linear" }}
                placeholder="검색 내용 입력 후 엔터"
              />
            </Search>
            {isLogin ? (
              <BellDiv>
                <Link to="/alarm">
                  <FontAwesomeIcon icon={faBell} size="lg" fixedWidth />
                </Link>
                {alarms.length ? (
                  <AlarmCountDiv>
                    <span>{count}</span>
                  </AlarmCountDiv>
                ) : (
                  <></>
                )}
              </BellDiv>
            ) : (
              <></>
            )}
            <LowerItem>
              {isLogin ? (
                <Link to="/moim/create">모임 생성</Link>
              ) : (
                <Link to="/login">모임 생성</Link>
              )}
            </LowerItem>
            <LowerItem>
              <Link to="community/announcement">커뮤니티</Link>
            </LowerItem>
          </LowerItems>
        </LowerCol>
      </LowerNav>
    </Nav>
  );
}

// const Icon = styled(FontAwesomeIcon)`
//   color: #e1b12c;
// `;

const AlarmCountDiv = styled.span`
  position: absolute;
  padding: 3px;
  top: -9px;
  right: -7px;
  min-width: 16px;
  min-height: 16px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  background: #ec2c54;
  color: #fff;
  border: 0.5px solid #fff;
  border-radius: 50%;
`;

const Nav = styled.nav`
  position: sticky; // 위치 고정
  top: 0; // 페이지 제일 위에 붙임
  width: 100%; // 가로 폭
  z-index: 2;
`;

const UpperNav = styled.nav`
  display: flex;
  align-items: center; // 수직 가운데 정렬
  height: 32px; // 세로 폭
  background-color: white;
`;

const UpperCol = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  padding-right: 61px;
`;

const UpperItems = styled.ul`
  display: flex;
  align-items: center;
`;

const UpperItem = styled.li`
  margin-left: 10px;
  margin-right: 10px;
  font-size: 12px;
  color: #485460;
`;

const LogoutDiv = styled.div`
  cursor: pointer;
`;

const LowerNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 50px;
  padding-left: 50px;
  height: 68px;
  background-color: white;
  border-bottom: solid;
  border-top: solid;
  border-width: 1px;
  border-color: #d2dae2;
`;

const LowerCol = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 100%;
`;

const LowerItems = styled.ul`
  display: flex;
  align-items: center;
`;

const BellDiv = styled.li`
  position: relative;
  top: auto;
  transform: none;
  margin: 0 20px;
`;

const LowerItem = styled.li`
  font-size: 15px;
  font-weight: 600;
  margin: 0 20px;
`;

// 검색
const Search = styled.form`
  margin: 0 20px;
  display: flex;
  align-items: center;
  color: black;
  position: relative;
  svg {
    height: 20px;
    z-index: 3;
    cursor: pointer;
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: 2;
  font-size: 16px;
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 5px;
  height: 45px;
`;

export default Header;
