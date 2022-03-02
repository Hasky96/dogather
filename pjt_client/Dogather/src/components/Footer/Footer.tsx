import styled from "styled-components";

function Footer() {
  return (
    <FooterBody>
      <FooterDiv>
        <FooterImg src={process.env.PUBLIC_URL + "/img/Logo_white.png"} />
        <FooterP>Do! Gather! Buy together with Dogather!</FooterP>
      </FooterDiv>
      <FooterDiv>
        <FooterImg src={process.env.PUBLIC_URL + "/img/SpringBoot.png"} />
        <FooterImg src={process.env.PUBLIC_URL + "/img/ReactLogo.png"} />
        <FooterImg src={process.env.PUBLIC_URL + "/img/typescript.png"} />
        <FooterImg src={process.env.PUBLIC_URL + "/img/mysql.png"} />
        <FooterImg src={process.env.PUBLIC_URL + "/img/jenkins.png"} />
        <FooterImg src={process.env.PUBLIC_URL + "/img/docker.png"} />
        <FooterImg src={process.env.PUBLIC_URL + "/img/nginx.png"} />
      </FooterDiv>
      <FooterDiv>
        <FooterP2>ⓒ SSAFY BUK1 Team4 Dogather. All right reserved.</FooterP2>
      </FooterDiv>
    </FooterBody>
  );
}
const Href = styled.a`
  &:hover {
    font-size: 20px;
  }
`;

const FooterImg = styled.img.attrs({
  height: "60px",
  alt: "LOGO",
})`
  display: inline;
  margin-left:10px;
  margin-right: 10px;
`;
const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  padding: 3px;
`;

const FooterP = styled.p`
  margin-top: 2px;
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

const FooterP2 = styled.p`
  margin-top: 2px;
  font-size: 13px;
  color: white;
`;

const FooterBody = styled.div`
  text-align: center;
  height: 200px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #1e272e;
`;

export default Footer;
