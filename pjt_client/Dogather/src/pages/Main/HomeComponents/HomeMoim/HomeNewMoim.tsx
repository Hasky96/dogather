import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { FetchHomeNewMoimCard } from "../../../../api/MoimDetail";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { iHomeCard } from "../../Home";
import { ImgAtom } from "../../../../atoms/HomeMoimImg";
import { useRecoilValue } from "recoil";

function HomeNewMoim() {
  const { data: newData } = useQuery<iHomeCard>("new", () =>
    FetchHomeNewMoimCard()
  );
  // console.log(newData);

  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const defaultImg = useRecoilValue(ImgAtom);
  return (
    <Container>
      <Title>
        <CardDetail>
          <TextENG>New Moim</TextENG>
          <TextKOR>새로운 모임</TextKOR>
        </CardDetail>
      </Title>

      <ProductList>
        <Grid container margin={0} display={"flex"} justifyContent={"center"}>
          {newData?.list.slice(0, 4).map((d, idx) => (
            // <li key={idx}>{d.groupNo}</li>
            <Grid item key={idx} sx={{ margin: 3 }}>
              <Alarm>{/* <Box>마감임박</Box> */}</Alarm>
              <CardActionArea>
                <Link to={`/moim/${d.groupNo}`}>
                  <Card
                    sx={{
                      minWidth: 250,
                      minHeight: 250,
                      maxWidth: 250,
                      maxHeight: 250,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "whitesmoke",
                      transition: "all .25s linear",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="auto"
                      width="100px"
                      image={
                        d.mainImage
                          ? process.env.PUBLIC_URL + "/doimage/" + d?.mainImage
                          : defaultImg
                      }
                      alt="Product Image"
                    />
                  </Card>
                </Link>
              </CardActionArea>
              <CardDetail>
                <CategoryName>{d.categoryName}</CategoryName>
                <ProductName>{d.product}</ProductName>
                <PriceDiv>
                  <Price>{makeComma(d.price)}원</Price>
                  <PriceDetail>공동구매가</PriceDetail>
                </PriceDiv>
                {/* <MaxPeople>80/{d.maxPeople}명</MaxPeople>
                <DeadLine>마감 {d.deadline}일 전</DeadLine> */}
              </CardDetail>
            </Grid>
          ))}
        </Grid>
      </ProductList>
    </Container>
  );
}

const CardImg = styled(CardMedia)``;

const animation = keyframes`
0% {
  opacity: 1;
}
10% {
  opacity: 0.9;
}
20% {
  opacity: 0.8;
}
30% {
  opacity: 0.7;
}
40% {
  opacity: 0.6;
}
50% {
  opacity: 0.5;
}
60% {
  opacity: 0.4;
}
70% {
  opacity: 0.3;
}
80% {
  opacity: 0.2;
}
90% {
  opacity: 0.1;
}
100% {
  opacity: 0;
}
`;

const PriceDiv = styled.div`
  padding-top: 7px;
`;

const Box = styled.div`
  height: 20px;
  width: 50px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  animation: ${animation} 2s infinite;
  margin-bottom: 5px;
`;

const Alarm = styled.span`
  display: flex;
  justify-content: left;
  font-size: 10px;
  font-weight: bold;
  color: white;
`;

const TextKOR = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: grey;
  text-align: center;
  margin-top: 3px;
`;

const TextENG = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  margin-top: 20px;
`;

const MaxPeople = styled.p``;

const DeadLine = styled.p``;

const PriceDetail = styled.p`
  line-height: 13px;
  font-size: 11px;
  color: rgba(34, 34, 34, 0.5);
`;

const ProductName = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
  font-size: 13px;
  font-weight: 600;
  width: 250px;
  letter-spacing: -0.05em;
`;

const Price = styled.p`
  line-height: 17px;
  font-size: 14px;
  font-weight: 700;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const CategoryName = styled.p`
  display: inline-block;
  vertical-align: top;
  font-weight: 700;
  line-height: 13px;
  font-size: 12px;
  color: #3c40c6;
`;

const CardDetail = styled.div`
  justify-content: left;
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
  /* height: 100vh; */
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-flow: wrap;
  row-gap: 20px;
  margin-bottom: 50px;
`;

const ProductList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default HomeNewMoim;
