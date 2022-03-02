import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchMyPage } from "../../api/UserInfo";
import { userIdAtom, userNoAtom, isLoginAtom } from "../../atoms/Login";
import LikeGroup from "./MyPageComponents/LikeGroup";
import PaymentGroup from "./MyPageComponents/PaymentGroup";
import { myPageImgAtom } from "../../atoms/HomeMoimImg";
import { AlarmsAtom, AlarmsCountAtom } from "../../atoms/Alarm";

export interface IPay {
  amount: number;
  amountOfPrice: number;
  optionName: string;
}

export interface IGroup {
  groupNo: number; // 그룹 pk
  groupLeader: number; // 그룹 대표
  leaderName: string; // 그룹 대표 닉네임
  product: string; // 제목
  detail: string; // 상세 설명
  categoryNo: number; // 카테고리 pk
  categoryName: string; // 카테고리 이름
  link: string;
  mainImage: string;
  maxPeople: number;
  originPrice: number;
  price: number;
  status: string;
  view: number;
  amount: number; // 구매 수량
  deadline: string; // 마감 일시
  created: string;
  updated: string;
  resultPaymentDtos: IPay[];
  count: number;
}

interface IUserInfo {
  // likeBoards: IBoard[]; // 마이페이지에서 사용 안함
  likeGroups: IGroup[];
  paymentGroup: IGroup[];
  saleGroup: IGroup[];
  userAddr: string;
  userAddrDetail: string;
  userEmail: string;
  userId: string;
  userName: string;
  userNickname: string;
  userNo: number;
  userTel: string;
  userZip: number;
  msg: string;
}

function MyPage() {
  const JWT = localStorage.getItem("login_token");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userNo, setUserNo] = useRecoilState(userNoAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [alarms, setAlarms] = useRecoilState(AlarmsAtom);
  const [count, setCount] = useRecoilState(AlarmsCountAtom);
  const defaultImg = useRecoilValue(myPageImgAtom);

  const { isLoading, data } = useQuery<IUserInfo>([JWT, userId], () =>
    fetchMyPage(JWT!, userId!)
  );

  // console.log(data);

  // 토큰 만료 시
  if (data?.msg && data?.msg === "relogin") {
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

  // 더보기 toggle
  const [morePaymentGroups, setMorePaymentGroups] = useState(3);
  const [moreSaleGroups, setMoreSaleGroups] = useState(3);
  const [moreLikeGroups, setMoreLikeGroups] = useState(3);
  const togglePG = () => {
    if (morePaymentGroups === 3) {
      setMorePaymentGroups(Number(data?.paymentGroup.length));
    } else {
      setMorePaymentGroups(3);
    }
  };
  const toggleSG = () => {
    if (moreSaleGroups === 3) {
      setMoreSaleGroups(Number(data?.saleGroup.length));
    } else {
      setMoreSaleGroups(3);
    }
  };
  const toggleLG = () => {
    if (moreLikeGroups === 3) {
      setMoreLikeGroups(Number(data?.likeGroups.length));
    } else {
      setMoreLikeGroups(3);
    }
  };

  return (
    <Container>
      <LeftSide>
        <Title>
          <span>마이 페이지</span>
        </Title>
        <nav>
          <div>
            <SubTitle>모임 정보</SubTitle>
            <ul>
              <List>내가 참여하는 모임</List>
              <List>내가 관리하는 모임</List>
              <List>관심 모임</List>
            </ul>
          </div>
          <BottomListArea>
            <SubTitle>내 정보</SubTitle>
            <ul>
              <List>프로필 정보</List>
              <List>주소록</List>
              <List>결제 정보</List>
              <List>판매 정산 계좌</List>
              <List>포인트</List>
            </ul>
          </BottomListArea>
        </nav>
      </LeftSide>
      <RightSide>
        <div>
          <Membership>
            <Profile>
              <ProfileImg>
                <Img src={defaultImg} alt="이미지" />
              </ProfileImg>
              <ProfileInfo>
                <div>
                  <Nickname>{data?.userNickname}</Nickname>
                  <Link to="/user/update">
                    <ProfileButton>회원정보 수정</ProfileButton>
                  </Link>
                  <ProfileButton>내 프로필</ProfileButton>
                </div>
              </ProfileInfo>
            </Profile>
            <LevelDiv>
              <LevelSubDiv>
                <Level>일반 회원</Level>
                <LevelTitle>회원 등급</LevelTitle>
              </LevelSubDiv>
              <LevelSubDiv>
                <Point>0P</Point>
                <PointTitle>포인트</PointTitle>
              </LevelSubDiv>
            </LevelDiv>
          </Membership>
          <ListTitleDiv>
            <ListTitle>내가 참여하는 모임</ListTitle>
            <SeeMore>
              {Number(data?.paymentGroup?.length) > 3 ? (
                <SeeMoreBtn onClick={togglePG}>더보기 〉</SeeMoreBtn>
              ) : (
                <div></div>
              )}
            </SeeMore>
          </ListTitleDiv>
          {data?.paymentGroup?.length ? (
            <div>
              {data?.paymentGroup?.slice(0, morePaymentGroups).map((group) => (
                <PaymentGroup key={group.groupNo} {...group} />
              ))}
            </div>
          ) : (
            <div>
              <Wrapper>
                <p>표시할 모임이 없습니다.</p>
              </Wrapper>
            </div>
          )}
          <ListTitleDiv>
            <ListTitle>내가 관리하는 모임</ListTitle>
            <SeeMore>
              {Number(data?.saleGroup?.length) > 3 ? (
                <SeeMoreBtn onClick={toggleSG}>더보기 〉</SeeMoreBtn>
              ) : (
                <div></div>
              )}
            </SeeMore>
          </ListTitleDiv>
          {data?.saleGroup?.length ? (
            <div>
              {data?.saleGroup?.slice(0, moreSaleGroups).map((group) => (
                <LikeGroup key={group.groupNo} {...group} />
              ))}
            </div>
          ) : (
            <div>
              <Wrapper>
                <p>표시할 모임이 없습니다.</p>
              </Wrapper>
            </div>
          )}
          <ListTitleDiv>
            <ListTitle>관심 모임</ListTitle>
            <SeeMore>
              {Number(data?.likeGroups?.length) > 3 ? (
                <SeeMoreBtn onClick={toggleLG}>더보기 〉</SeeMoreBtn>
              ) : (
                <div></div>
              )}
            </SeeMore>
          </ListTitleDiv>
          {data?.likeGroups?.length ? (
            <div>
              {data?.likeGroups?.slice(0, moreLikeGroups).map((group) => (
                <LikeGroup key={group.groupNo} {...group} />
              ))}
            </div>
          ) : (
            <div>
              <Wrapper>
                <p>표시할 모임이 없습니다.</p>
              </Wrapper>
            </div>
          )}
        </div>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 40px 160px;
`;

const LeftSide = styled.div`
  float: left;
  width: 180px;
  margin-right: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 30px;
  line-height: 29px;
  letter-spacing: -0.15px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.27px;
  /* display: inline-block;
  vertical-align: top; */
`;

const List = styled.div`
  color: rgba(34, 34, 34, 0.5);
  font-size: 15px;
  margin-top: 12px;
  line-height: 18px;
  letter-spacing: -0.15px;
  cursor: pointer;
`;

const BottomListArea = styled.div`
  margin-top: 40px;
`;

const RightSide = styled.div`
  overflow: hidden;
  min-height: 380px;
`;

const Membership = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background-color: #fff;
`;

const Profile = styled.div`
  display: flex;
  padding: 30px 32px 22px;
`;

const ProfileImg = styled.div`
  position: relative;
  margin-right: 12px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Nickname = styled.p`
  font-size: 18px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.05px;
  margin-bottom: 12px;
`;

const ProfileButton = styled.button`
  height: 34px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-right: 7px;
  line-height: 32px;
`;

const LevelDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 0; */
  width: 100%;
  height: 77px;
  border-top: 1px solid #f4f4f4;
`;

const LevelSubDiv = styled.div`
  width: 50%;
  text-align: center;
`;

const Level = styled.div`
  line-height: 19px;
  font-size: 16px;
  letter-spacing: -0.16px;
  font-weight: 700;
  border-right: 1px solid #ebebeb;
`;

const LevelTitle = styled.div`
  line-height: 19px;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
  border-right: 1px solid #ebebeb;
`;

const Point = styled.div`
  line-height: 19px;
  font-size: 16px;
  letter-spacing: -0.16px;
  font-weight: 700;
`;

const PointTitle = styled.div`
  line-height: 19px;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
`;

const ListTitleDiv = styled.div`
  margin-top: 42px;
  padding-bottom: 16px;
  display: flex;
  max-width: 100%;
`;

const ListTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.27px;
`;

const SeeMore = styled.div`
  margin-top: 3px;
  margin-left: auto;
  padding-top: 3px;
  padding-left: 5px;
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
`;

const SeeMoreBtn = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 12px;
  margin: 0 10px;
  padding: 80px 0;
  text-align: center;
  font-size: 14px;
  letter-spacing: -0.21px;
  color: rgba(34, 34, 34, 0.5);
`;

export default MyPage;
