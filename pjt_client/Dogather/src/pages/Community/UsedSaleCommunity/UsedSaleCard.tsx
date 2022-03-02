import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";

function UsedSaleCard({
  image,
  avatar,
  name,
  content,
  subheader,
}: {
  image: any;
  avatar: string;
  name: string;
  content: string;
  subheader: string;
}) {
  return (
    <CustomFrame>
      <Card sx={{ minWidth: "17.5vw", maxWidth: "17.5vw" }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={avatar} />}
          title={name}
          subheader={subheader}
        />
        <CardMedia component="img" height="194" image={image} alt="Error" />
        <CardContent>{content}</CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <img
              style={{ width: "2vw", height: "auto" }}
              src={process.env.PUBLIC_URL + "/img/like5.png"}
              alt="error"
            />
          </IconButton>
          <IconButton aria-label="Like">
            <img
              style={{ width: "2.5vw", height: "auto" }}
              src={process.env.PUBLIC_URL + "/img/comment5.png"}
              alt="error"
            />
          </IconButton>
        </CardActions>
      </Card>
    </CustomFrame>
  );
}

export default UsedSaleCard;

const CustomFrame = styled.div`
  margin: 1.5vw 1.5vw;
`;
