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

function createData(
  postno: number,
  title: string,
  writer: string,
  view: number,
  created: string,
  like: number
) {
  return { postno, title, writer, view, created, like };
}

// 데이터
const rows = [
  createData(1, "안녕하세요!!", "GWan", 159, "02-16", 10),
  createData(2, "안녕하세요", "Jibum", 178, "02-15", 13),
  createData(3, "반갑습니다", "sehen", 746, "02-15", 11),
  createData(4, "공동구매", "Buksss", 153, "02-14", 7),
  createData(5, "공구진행", "Buksss", 356, "02-14", 6),
  createData(6, "질문", "doget", 347, "02-14", 6),
  createData(7, "반가워요!", "wonr", 384, "02-13", 8),
  createData(8, "반갑습니다", "djong", 246, "02-12", 10),
  createData(9, "안녕하세요~", "wonjong", 244, "02-10", 14),
  createData(10, "안녕하세요", "jspj", 780, "02-10", 15),
];

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
function AnnounceTable() {
  //정렬
  const _rows = [...rows];
  const [postList, setPostList] = useState(_rows);
  const sortDate = () => {
    postList.sort((a, b) => a.postno - b.postno);
    const _postList = [...postList];
    setPostList(_postList);
    console.log(postList);
    setTabValue(0);
  };
  const sortView = () => {
    postList.sort((a, b) => b.view - a.view);
    const _postList = [...postList];
    setPostList(_postList);
    setTabValue(1);
  };
  const sortLike = () => {
    postList.sort((a, b) => b.like - a.like);
    const _postList = [...postList];
    setPostList(_postList);
    console.log(postList);
    setTabValue(2);
  };
  const [tabValue, setTabValue] = useState(0);
  return (
    <Container>
      <Top>
        <CustomTabs>
          <Tabs
            value={tabValue}
            textColor="inherit"
            indicatorColor="primary"
            sx={{ mb: 0.5 }}
          >
            <Tab label="최신글" onClick={sortDate} />
            <Tab label="조회수" onClick={sortView} />
            <Tab label="랭킹순" onClick={sortLike} />
          </Tabs>
        </CustomTabs>
      </Top>
      <Mid>
        <CustomStack>
          <H1>자유게시판</H1>
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
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/review"}>후기게시판</Link>
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/usedsale"}>중고판매게시판</Link>
              </Button>
              <Button
                variant="contained"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/free"}>
                  <Fontw>자유게시판</Fontw>
                </Link>
              </Button>
            </ThemeProvider>
          </Stack>
        </CustomStack>
        <CustomTable>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: "#1E272E" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>
                    <Fontw>#</Fontw>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    <Fontw>제목</Fontw>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    <Fontw>작성자</Fontw>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    <Fontw>조회수</Fontw>
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    <Fontw>생성시간</Fontw>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postList.map((row) => (
                  <TableRow
                    key={row.postno}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.postno}
                    </TableCell>
                    <TableCell align="left">
                      {row.title}
                      <Imo>
                        <img
                          style={{ width: "15px", height: "auto" }}
                          src={process.env.PUBLIC_URL + "/img/like.png"}
                        />
                      </Imo>
                      <H3>{row.like}</H3>
                      <Imo>
                        <img
                          style={{ width: "15px", height: "auto" }}
                          src={process.env.PUBLIC_URL + "/img/comment.png"}
                        />
                      </Imo>
                      <H3>1</H3>
                    </TableCell>
                    <TableCell align="right">{row.writer}</TableCell>
                    <TableCell align="right">
                      <Imo style={{ margin: "0px" }}>
                        <img
                          style={{ width: "20px", height: "auto" }}
                          src={process.env.PUBLIC_URL + "/img/view.png"}
                        />
                      </Imo>
                      {row.view}
                    </TableCell>
                    <TableCell align="right">{row.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTable>
      </Mid>
      <Bottom>
        <Input type="text" />
        <Btn>
          <img src={process.env.PUBLIC_URL + "/img/search.png"} />
        </Btn>
        <CustomWrite>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral">
              <Fontw>글쓰기</Fontw>
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

const Btn2 = styled.button`
  width: 8vw;
  color: white;
  background-color: white;
  border: 0;
`;

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

const CustomTabs = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 6vw;
`;

const CustomStack = styled.div`
  display: inline-block;
  margin-left: 4vw;
  width: 9vw;
`;

const CustomTable = styled.div`
  dispaly: inline-block;
  width: 75vw;
  margin-left: 5vw;
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
  padding-top: 15px;
`;

const Input = styled.input`
  width: 20vw;
  height: 4vh;
  border-radius: 7px;
  margin-left: 44vw;
`;

const CustomWrite = styled.div`
  display: inline-flex;
  margin-left: 22vw;
`;

const CustomPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-left: 10vw;
`;

const Bottom = styled.div`
  margin-top: 2.5vw;
  padding-bottom: 2.5vw;
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

const Fontw = styled.h1`
  font-weight: 900;
`;
export default AnnounceTable;
