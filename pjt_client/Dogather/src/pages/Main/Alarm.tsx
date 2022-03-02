import { useRecoilState } from "recoil";
import styled from "styled-components";

import { AlarmsAtom } from "../../atoms/Alarm";
import AlarmElement from "./AlarmComponents/AlarmElement";

function Alarm() {
  const [alarms, setAlarms] = useRecoilState(AlarmsAtom);

  return (
    <Container>
      <SubContainer>
        <div>
          <TitleDivBorder>
            <TitleDiv>
              <Title>알림함</Title>
            </TitleDiv>
          </TitleDivBorder>
          <Boards>
            {alarms.map((alarm) => (
              <AlarmElement key={alarm.msgNo} {...alarm} />
            ))}
          </Boards>
        </div>
      </SubContainer>
    </Container>
  );
}

const Boards = styled.ul`
  margin-top: 30px;
  border-top: 2px solid ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 40px 160px;
`;

const SubContainer = styled.div`
  min-height: 380px;
`;

const TitleDivBorder = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 10px;
  background-color: #fff;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 22px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export default Alarm;
