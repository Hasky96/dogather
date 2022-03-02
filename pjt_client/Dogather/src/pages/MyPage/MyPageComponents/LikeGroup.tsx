import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ImgAtom } from "../../../atoms/HomeMoimImg";
import { IGroup } from "../MyPage";

function LikeGroup(group: IGroup) {
  const navigate = useNavigate();

  const defaultImg = useRecoilValue(ImgAtom);

  const moveToDetail = () => {
    navigate(`/moim/${group.groupNo}`);
  };

  return (
    <Container onClick={moveToDetail}>
      <LeftSide>
        <ImgDiv>
          <ImgRadius>
            <Img
              src={
                group.mainImage
                  ? process.env.PUBLIC_URL + "/doimage/" + group?.mainImage
                  : defaultImg
              }
            />
          </ImgRadius>
        </ImgDiv>
        <ProductDiv>
          <ProductTitle>{group.product}</ProductTitle>
          <ProductPeople>
            {group.count} / {group.maxPeople}
          </ProductPeople>
          <ProductDeadline>{group.deadline}</ProductDeadline>
        </ProductDiv>
      </LeftSide>
      <RightSide>
        <StatusDiv>
          {group.status === "마감" ? (
            <StatusOff>{group.status}</StatusOff>
          ) : (
            <StatusOn>{group.status}</StatusOn>
          )}
        </StatusDiv>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 12px;
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
`;

const LeftSide = styled.div`
  display: flex;
  width: 100%;
`;

const ImgDiv = styled.div`
  position: relative;
  /* -webkit-box-flex: 0; */
  flex: none;
  width: 80px;
  height: 80px;
`;

const ImgRadius = styled.div`
  background-color: rgb(242, 242, 242);
  border-radius: 12px;
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

const ProductTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
`;

const ProductPeople = styled.p`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

const ProductDeadline = styled.p`
  color: rgba(34, 34, 34, 0.5);
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  /* margin-left: auto; */
  width: 100px;
`;

const StatusDiv = styled.div`
  margin-left: 10px;
  width: 134px;
`;

const StatusOn = styled.div`
  color: #05c46b;
  font-size: 14px;
  letter-spacing: -0.21px;
`;

const StatusOff = styled.div`
  color: #c23616;
  font-size: 14px;
  letter-spacing: -0.21px;
`;

export default LikeGroup;
