import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import ReviewCard from "./ReviewCard";

// neutral 색깔
const theme = createTheme({
  palette: {
    neutral: {
      main: "#1E272E",
      // #2d2c2e
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

//메인
function ReviewTable() {
  return (
    <Container>
      <Top>
        <div></div>
      </Top>
      <Mid>
        <CustomStack>
          <H1>후기게시판</H1>
          <Stack spacing={2} direction="column">
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/announcement"}>공지사항</Link>
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/infoshare"}>정보공유게시판</Link>
              </Button>
              <Button
                variant="contained"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/review"}>
                  <Fontw>후기게시판</Fontw>
                </Link>
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/usedsale"}>중고판매게시판</Link>
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/free"}>자유게시판</Link>
              </Button>
            </ThemeProvider>
          </Stack>
        </CustomStack>
        <div>
          <CustomCard>
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review1.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta1.jpg"}
              name="z00__Daa"
              content="너무 좋아요!!"
              subheader="02-13"
            />
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review2.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta2.jpg"}
              name="balckgar"
              content="빠른 배송"
              subheader="02-14"
            />
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review3.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta3.jpg"}
              name="haseok"
              content="만족합니다"
              subheader="02-12"
            />
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review4.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta4.jpg"}
              name="wonjong"
              content="감사합니다~"
              subheader="02-12"
            />
          </CustomCard>
          <div></div>
          <CustomCard>
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review5.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta5.jpg"}
              name="sehen"
              content="ootd"
              subheader="02-10"
            />
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review6.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta6.jpg"}
              name="jibum"
              content="잘 신을게요!!"
              subheader="01-31"
            />
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review7.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta7.jpg"}
              name="jinseong"
              content="감사합니다 후기!"
              subheader="01-30"
            />
            <ReviewCard
              image={process.env.PUBLIC_URL + "/img/review8.jpg"}
              avatar={process.env.PUBLIC_URL + "/img/insta8.jpg"}
              name="Guan"
              content="너무 마음에 들어요~!"
              subheader="01-28"
            />
          </CustomCard>
        </div>
      </Mid>
      <Bottom>
        <Input type="text" />
        <Btn>
          <img src={process.env.PUBLIC_URL + "/img/search.png"} />
        </Btn>
        <CustomWrite>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral">
              글쓰기
            </Button>
          </ThemeProvider>
        </CustomWrite>
        <CustomPage>
          <Pagination count={5} variant="text" shape="rounded" />
        </CustomPage>
      </Bottom>
    </Container>
  );
}

const Container = styled.div``;

const Mid = styled.span`
  display: flex;
`;

const H1 = styled.h1`
  display: inline-block;
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 3vw;
  color: #1e272e;
  white-space: nowrap;
  overflow: visible;
`;

const CustomStack = styled.div`
  display: inline-block;
  margin-top: 3vw;
  margin-left: 4vw;
  width: 9vw;
`;

const Hr = styled.hr`
  display: flex;
  width: 79vw;
  height: 3px;
  border: none;
  background-color: black;
  margin-left: 14vw;
  margin-bottom: 50px;
`;

const Top = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 20vw;
  height: 4vh;
  border-radius: 7px;
  margin-left: 45vw;
`;

const CustomWrite = styled.div`
  display: inline-flex;
  margin-left: 23vw;
`;

const CustomPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-left: 12vw;
`;

const Bottom = styled.div`
  margin-top: 2.5vw;
  margin-bottom: 2.5vw;
`;

const H3 = styled.h3`
  display: inline;
  font-size: 15px;
`;

const Imo = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`;

const Btn = styled.button`
  border: 0;
  outline: 0;
  background-color: white;
  cursor: pointer;
`;

const CustomCard = styled.div`
  display: flex;
  margin-left: 3vw;
`;

const Fontw = styled.h1`
  font-weight: 900;
`;
export default ReviewTable;
