import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { height } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

// function MoimReview() {
//   return (
//     <div>
//       <CustomRating>
//         <Rating
//           name="half-rating-read"
//           defaultValue={4.4}
//           precision={0.1}
//           readOnly
//           size="large"
//         />
//         <h1> 9.2 리뷰 : 30</h1>
//       </CustomRating>
//     </div>
//   );
// }

// axios({
//   method: "post",
//   url: "//i6e104.p.ssafy.io:8090/api/group/review",
//   data: {
//     userFrom: "userFrom",
//     userTo: "userTo",
//     star: "star",
//     content: "content",
//   },
// })
//   .then((response) => {
//     console.log(response.data);
//     console.log("ASDASD");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function MoimReview() {
  const value = 4.5;
  const value2 = 4.5;
  return (
    <div>
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Rating
          name="text-feedback"
          size="large"
          value={value}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2, fontSize: 30 }}>{labels[value]}</Box>
        <H1>2</H1>
      </Box>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Inline>
            <Avatar src={process.env.PUBLIC_URL + "/img/insta6.jpg"} />
          </Inline>
          <Inline>
            <Typography
              sx={{ fontSize: 23, ml: 1 }}
              color="text.secondary"
              gutterBottom
            >
              김수아
            </Typography>
          </Inline>
          <Typography variant="h5" component="div">
            <Rating
              name="text-feedback"
              size="medium"
              value={value2}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Typography>
          <Button size="small">Ray Wind Parka Black</Button>
          <Typography
            sx={{ mb: 1, fontSize: 15, ml: 0.5 }}
            color="text.secondary"
          >
            2022-02-16
          </Typography>
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            공동구매 제품 너무 잘 받았습니다~!
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Inline>
            <Avatar src={process.env.PUBLIC_URL + "/img/insta5.jpg"} />
          </Inline>
          <Inline>
            <Typography
              sx={{ fontSize: 23, ml: 1 }}
              color="text.secondary"
              gutterBottom
            >
              이지혜
            </Typography>
          </Inline>
          <Typography variant="h5" component="div">
            <Rating
              name="text-feedback"
              size="medium"
              value={value2}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </Typography>
          <Button size="small">Ray Wind Parka Black</Button>
          <Typography
            sx={{ mb: 1, fontSize: 15, ml: 0.5 }}
            color="text.secondary"
          >
            2022-02-15
          </Typography>
          <Typography variant="body2" sx={{ ml: 0.5 }}>
            감사합니다
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

const CustomRating = styled.div`
  display: flex;
  font-size: 2vw;
`;

const H1 = styled.h1`
  font-size: 30px;
  margin-left: 1vw;
`;

const Inline = styled.div`
  display: inline-block;
`;

export default MoimReview;
