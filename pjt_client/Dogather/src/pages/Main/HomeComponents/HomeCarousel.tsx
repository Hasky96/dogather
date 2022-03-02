import { Button, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function HomeCarousel() {
  const navigate = useNavigate();
  const slides = [
    "img/두게더와함께.png",
    "img/할인팡팡.png",
    "img/포인트팡팡.png",
    "img/사은품.png",
    "img/봄할인.png",
    "img/화이트데이.png",
  ];
  const onClick = (idx: number) => {
    navigate(`/moim/${idx}`);
  };
  return (
    <Container>
      <Grids>
        <Slider
          autoPlay={true}
          animation={"fade"}
          navButtonsAlwaysVisible={true}
          navButtonsProps={{
            style: {
              opacity: "0.7",
            },
          }}
        >
          {slides.map((slide, idx) => (
            // <Link key={idx} to={"/moim/2"}>
            <img
              onClick={() => onClick(idx)}
              key={idx}
              style={{
                // overflow: "hidden",
                width: "100%",
                height: "500px",
                objectFit: "contain",
                cursor: "pointer",
              }}
              src={slide}
              alt="끼잉낑"
            />
            // </Link>
          ))}
        </Slider>
      </Grids>
    </Container>
  );
}

const Container = styled.div`
  height: auto;
  width: 100%;
  object-fit: contain;
`;

const Slider = styled(Carousel)`
  display: flex;
  display: -webkit-box;
  justify-content: center;
  height: auto;
  width: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const Grids = styled(Grid)`
  height: "100%";
  width: "700px";
  object-fit: contain;
`;

export default HomeCarousel;
