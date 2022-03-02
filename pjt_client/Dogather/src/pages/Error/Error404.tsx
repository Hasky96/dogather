import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Error404() {
    return(
        <ErrContainer>
            
            <ErrorCode>
                4
            </ErrorCode>
            <Img src="/img/error.gif" alt="" />
            <ErrorCode>
                4
            </ErrorCode>
            <ErrorMsg1>
                죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.
            </ErrorMsg1>
            <ErrorMsg2>존재하지 않는 주소를 입력하셨거나,</ErrorMsg2>
            <ErrorMsg2>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</ErrorMsg2>
            <br/>
            <ErrorMsg2>궁금한 점이 있으시면 언제든 고객센터를 통해 문의해 주시기 바랍니다.</ErrorMsg2>
            <br/>
            <Link to="/"><Btn>메인으로</Btn></Link>
        </ErrContainer>
    ); 
}
const ErrorMsg1 = styled.p`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
    margin-top: 60px;
`;
const ErrorMsg2 = styled.p`
    margin: 10px auto;
`;

const Btn = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 10px;
    color: white;
    background-color: #3458eb;;
    border: #3458eb 1px solid;
    font-size: 17px;
`;

const ErrorCode = styled.div`
    display: inline;
    font-size: 200px;
    color: #3458eb;
`;

const Img = styled.img`
    display: inline;
    height: 150px;
    border-radius: 50%;
    border: 15px solid #3458eb;
    /* border-top-left-radius:100px;
    border-end-end-radius:200px;
    border-start-end-radius: 200px;
    border-end-start-radius: 50px; */
`;

const ErrContainer = styled.div`
    text-align: center;
    margin: 200px auto;
    height: 500px;
    width: 1000px;
    /* border : 1px red dashed; */
`;



export default Error404;