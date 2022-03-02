import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { AlarmsAtom, IAlarm } from "../../../atoms/Alarm";
import { myPageImgAtom } from "../../../atoms/HomeMoimImg";
import { userIdAtom } from "../../../atoms/Login";

function AlarmElement(alarm: IAlarm) {
  const JWT = localStorage.getItem("login_token");

  const defaultImg = useRecoilValue(myPageImgAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [alarms, setAlarms] = useRecoilState(AlarmsAtom);

  const onRead = () => {
    const newData = {
      userNick: alarm.userNick,
      msg: alarm.msg,
    };

    fetch(`http://i6e104.p.ssafy.io/api//alarm?msgNo=${alarm.msgNo}`, {
      method: "PUT",
      body: JSON.stringify(newData),
    })
      .then((response) => response)
      .then((result) => {
        if (result.status === 200) {
          setAlarms((prev) => {
            const targetIndex = prev.findIndex((a) => a.msgNo === alarm.msgNo);
            return [
              ...prev.slice(0, targetIndex),
              { ...alarm, read: 1 },
              ...prev.slice(targetIndex + 1),
            ];
          });
        }
      });
  };

  return (
    <Container onClick={onRead}>
      <LeftSide>
        <ImgDiv>
          <ImgRadius>
            <Img src={defaultImg} />
          </ImgRadius>
        </ImgDiv>
        <ProductDiv>
          <Name>{alarm.userNick}</Name>
        </ProductDiv>
      </LeftSide>
      <MidSide>{alarm.msg}</MidSide>
      <RightSide>
        <PriceDiv>
          {alarm.read === 1 ? (
            <Icon icon={faCheckCircle} size="sm" fixedWidth />
          ) : (
            <></>
          )}
        </PriceDiv>
      </RightSide>
    </Container>
  );
}

const Icon = styled(FontAwesomeIcon)`
  color: #3c40c6;
`;

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 12px;
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
`;

const LeftSide = styled.div`
  display: flex;
  min-width: 200px;
`;

const ImgDiv = styled.div`
  position: relative;
  flex: none;
  width: 60px;
  height: 60px;
`;

const ImgRadius = styled.div`
  background-color: rgb(242, 242, 242);
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  padding-top: 100%;
`;

const Img = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: auto;
  transform: translate(-50%, -50%);
`;

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 16px;
`;

const Name = styled.span`
  color: rgba(34, 34, 34, 0.5);
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  min-width: 100px;
`;

const PriceDiv = styled.div`
  margin-left: 10px;
  width: 134px;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.21px;
`;

const MidSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.5px;
`;

export default AlarmElement;
