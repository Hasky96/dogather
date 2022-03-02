import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ImgAtom } from "../../../atoms/HomeMoimImg";
import { IGroup } from "../MyPage";

function PaymentGroup(group: IGroup) {
  const navigate = useNavigate();

  const defaultImg = useRecoilValue(ImgAtom);

  const moveToDetail = () => {
    navigate(`/moim/${group.groupNo}`);
  };

  const totalPriceCal = () => {
    let price = group.price;
    let tot = 0;
    group.resultPaymentDtos.map(
      (option) => (tot += (price + option.amountOfPrice) * option.amount)
    );
    // console.log(tot);
    return tot.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const totalPrice = totalPriceCal();

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

          <Option>
            {group.count} / {group.maxPeople}
          </Option>
          <ProductInfo>{group.deadline}</ProductInfo>
        </ProductDiv>
      </LeftSide>
      <MidSide>
        {group.resultPaymentDtos.map((option) => (
          <Option key={option.optionName}>
            {option.optionName} : {option.amount}
          </Option>
        ))}
      </MidSide>
      <RightSide>
        <PriceDiv>
          <Price>{totalPrice}</Price>
        </PriceDiv>
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
  min-width: 400px;
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

const ProductInfo = styled.p`
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
  margin-left: auto;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

const Option = styled.p`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

export default PaymentGroup;
