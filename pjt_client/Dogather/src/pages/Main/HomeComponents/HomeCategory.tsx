import { Card, CardMedia, Grid, responsiveFontSizes } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdAtom } from "../../../atoms/Login";
import Category from "../../../Category";

const categoryImg = [
  "img/남성패션.png",
  "img/여성패션.png",
  "img/뷰티미용.png",
  "img/식품.png",
  "img/건강의료용품.png",
  "img/생활가전.png",
  "img/디지털기기.png",
  "img/가구.png",
  "img/생활용품.png",
  "img/도서티켓쿠폰.png",
  "img/출산유아동.png",
  "img/반려동물용품.png",
  "img/스포츠레저.png",
  "img/자동차공구.png",
  "img/악기.png",
  "img/게임놀이.png",
];

function HomeCategory() {
  const navigate = useNavigate();
  const userId = useRecoilValue(userIdAtom);
  const JWT = localStorage.getItem("login_token");

  const onClick = (idx: number) => {
    const categoryId = idx + 1;
    navigate(`/search/${categoryId}`);
  };
  // console.log(categoryData);

  return (
    <Container>
      <CategoryList>
        <Grid
          container
          spacing={2}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={"10Px"}
          marginTop={"0px"}
          marginLeft={"0px"}
        >
          {categoryImg.slice(0, 16).map((cat, idx) => (
            <div key={idx}>
              <Grid item>
                <Card
                  elevation={0}
                  onClick={() => onClick(idx)}
                  sx={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    cursor: "pointer",
                    ":hover": {
                      // boxShadow: 20, // theme.shadows[20]
                      transform: "scale3d(1.1, 1.1, 1)",
                    },
                    margin: "0px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={cat}
                    alt="Product Image"
                  />
                </Card>
              </Grid>
              <CardDetail>
                <CategoryName>{Category(idx + 1)}</CategoryName>
              </CardDetail>
            </div>
          ))}
        </Grid>
        {/* <Grid
          container
          spacing={2}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          marginTop={"0px"}
          marginLeft={"0px"}
        >
          {categoryImg.slice(0, 8).map((cat, idx) => (
            <Link key={idx} to={"/moim/1"}>
              <Grid item>
                <Card
                  elevation={0}
                  sx={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    ":hover": {
                      // boxShadow: 20, // theme.shadows[20]
                      transform: "scale3d(1.1, 1.1, 1)",
                    },
                    // objectFit: "cover",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={cat}
                    alt="Product Image"
                  />
                </Card>
                <CardDetail>
                  <CategoryName>{Category(idx + 1)}</CategoryName>
                </CardDetail>
              </Grid>
            </Link>
          ))}
          {categoryImg.slice(8, 17).map((cat, idx) => (
            <Link key={idx} to={"/moim/1"}>
              <Grid item>
                <Card
                  elevation={0}
                  sx={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    ":hover": {
                      // boxShadow: 20, // theme.shadows[20]
                      transform: "scale3d(1.1, 1.1, 1)",
                    },
                    // objectFit: "cover",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={cat}
                    alt="Product Image"
                  />
                </Card>
                <CardDetail>
                  <CategoryName>{Category(idx + 9)}</CategoryName>
                </CardDetail>
              </Grid>
            </Link>
          ))}
        </Grid> */}
      </CategoryList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

const CategoryList = styled.div`
  display: block;
  width: 100%;
`;

const CategoryName = styled.p`
  text-align: center;
  white-space: nowrap;
  font-size: 11px;
  font-weight: bold;
  color: grey;
  padding-bottom: 5px;
`;

const CardDetail = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: visible;
  width: 60px;
  height: auto;
  margin-top: 5px;
`;

export default HomeCategory;
