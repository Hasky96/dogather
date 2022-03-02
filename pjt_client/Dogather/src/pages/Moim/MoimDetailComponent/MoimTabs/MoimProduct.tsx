import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface IData {
  detailImage: Array<string>;
}

// interface RouteState {
//   state: {
//     detail: string;
//     // detailImage: Array<string>;
//   };
// }

function MoimProduct({ detailImage }: IData) {
  // const { state } = useLocation() as RouteState;
  // console.log(state);
  return (
    <Container>
      <ImgWrapper>
        {detailImage
          ? detailImage.map((d, idx) => (
              <Img
                key={idx}
                src={process.env.PUBLIC_URL + "/doimage/" + d}
                alt={process.env.PUBLIC_URL + "/doimage/" + d}
              />
            ))
          : null}
      </ImgWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
`;

const ImgWrapper = styled.div`
  /* background-color: whitesmoke; */
`;

const Img = styled.img``;

export default MoimProduct;
