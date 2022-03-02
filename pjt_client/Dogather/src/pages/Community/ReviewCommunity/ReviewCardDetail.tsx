import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
function ReviewCardDetail() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "25%" }}>
        <Top>
          <Inline>
            <Avatar src={process.env.PUBLIC_URL + "/img/insta1.jpg"} sx={{}} />
          </Inline>
          <Inline>
            <Inline>
              <Typography>
                <Inline style={{ fontSize: 25 }}>z00__Daa</Inline>
              </Typography>
            </Inline>
            <Inline>
              <Typography sx={{ ml: 1 }} color="text.secondary">
                2022-02-16
              </Typography>
            </Inline>
          </Inline>
        </Top>
        <Ml>
          <Img>
            <img
              src={process.env.PUBLIC_URL + "/img/review1.jpg"}
              alt="error"
            />
          </Img>
          <Typography style={{ fontFamily: "맑은 고딕" }}>
            벼르고 벼르다가 샀는데 진심 겁날 정도로 마음에 듭니다. 바스락바스락
            거리는 재질이지만 싸구려 비닐 느낌은 아니고 약간 레더처럼 쫀득함
            재질이라서 손으로 비벼보면 마찰감이 있어요. 근데 빛에 비추면
            은은하게 반짝거려서 개예쁨… 재봉라인 따라서 하얀색 스티치 촘촘하게
            수놓여있는 것도 독특해서 진짜 마음에 들어요. 그리고 허리 아랫단
            시보리는 없지만 끈 잡아당겨 조일 수 있는데, 자기 체형에 맞게
            적절하게 조절하면 약간 폭닥거리는 오버핏 느낌 나고 개예뿜요… 고민은
            배송만 늦출 뿐이라는 말이 ㄹㅇ이고요 이거 한 번 눈에 들어오면 다른거
            못 사니까 웬만하면 걍 사세요!
          </Typography>

          <A>
            #데일리룩 #꾸안꾸 #일상 #여자코디 #오오티디 #미니멀룩 #스트릿룩
            #아메카지 #유니섹스룩 #데일리 #셀피 #ootd #패션 #좋아요 #코디
            #유니섹스 #dailylook #겨울룩코디 #가을룩코디 인스타
          </A>
        </Ml>
        <Inline>
          <img src={process.env.PUBLIC_URL + "/img/like5.png"} alt="error" />
        </Inline>
        <Inline style={{ fontSize: 20 }}>
          <span>좋아요 2</span>
        </Inline>
        <Inline>
          <img src={process.env.PUBLIC_URL + "/img/comment5.png"} alt="error" />
        </Inline>
        <Inline style={{ fontSize: 20 }}>
          <span>댓글 1</span>
        </Inline>
        <H1>댓글</H1>
        <Inline>
          <Avatar src={process.env.PUBLIC_URL + "/img/insta4.jpg"} />
        </Inline>
        <Inline style={{ fontSize: 18 }}>Da_sol</Inline>
        <Inline>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            2022-02-17
          </Typography>
        </Inline>
        <H2>너무 예쁘네요!!</H2>
      </div>
    </div>
  );
}

export default ReviewCardDetail;
const H2 = styled.h2`
  margin-left: 3.5vw;
  font-size: 15px;
  margin-bottom: 3vw;
`;
const H1 = styled.h1`
  margin-top: 1.5vw;
  margin-bottom: 1vw;
  margin-left: 0.5vw;
  font-size: 20px;
`;

const Img = styled.div`
  margin-bottom: 1vw;
`;

const Top = styled.div`
  margin-top: 1vw;
`;
const Inline = styled.div`
  display: inline-block;
  margin-left: 0.5vw;
`;

const Ml = styled.div`
  margin-left: 1vw;
  margin-top: 1vw;
  margin-bottom: 1.5vw;
`;

const A = styled.a`
  color: blue;
`;
