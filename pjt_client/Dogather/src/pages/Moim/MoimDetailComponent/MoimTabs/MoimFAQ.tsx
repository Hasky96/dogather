import { useLocation } from "react-router-dom";
import { IFAQData } from "../../MoimDetail";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface RouteState {
  state: {
    faqs: IFAQData;
  };
}

function MoimFAQ() {
  const { state } = useLocation();
  // console.log(state);

  const [selectVal, setSelectVal] = React.useState("10");

  const handleBox = (event: SelectChangeEvent) => {
    setSelectVal(event.target.value + "");
  };

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // console.log(selectVal);
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">FAQ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectVal}
            label="selectVal"
            onChange={handleBox}
          >
            <MenuItem value={10}>배송</MenuItem>
            <MenuItem value={20}>주문/결제</MenuItem>
            <MenuItem value={30}>회원/기타</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <CustomAccordion
        style={{ display: selectVal === "10" ? "block" : "none" }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>배송</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              언제 배송 되나요?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              상품 혹은 브랜드마다 출고에 필요한 시간이 다를 수 있으며, 상품이
              준비되면 [주문내역]에서 배송예정일을 확인하실 수 있습니다. 예정된
              출고예정일이 지났는데 주문상태가 '배송중'으로 변경되지 않았다면
              1:1 문의하기나 고객센터를 찾아 주세요. 안내된 일정은 수도권 지역
              평균 배송일로, 지역에 따라 다를 수 있습니다.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>배송</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              배송예정일이 지났는데 왜 아직도 안 오나요?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              상품의 생산, 유통 과정중의 판매자 사정으로 배송이 지연될 수
              있으며, 배송이 지연되는 주문은 안내를 드리고 있습니다. 지연 안내를
              받지 못하셨다면, 1:1 문의하기나 고객센터를 찾아 주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>배송</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              배송지를 변경하고 싶어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [입금대기] 혹은 [결제완료] 상태일 경우 주문내역에서 직접 변경이
              가능합니다. [상품준비] 상태일 경우 배송을 준비하는 단계이기 때문에
              업체 확인이 필요합니다. 이 경우 주소지 변경이 불가능하거나 변경 시
              배송비가 발생할 수 있습니다.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>배송</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              선택한 옵션을 변경하고 싶어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              [입금대기] 혹은 [결제완료] 상태일 경우 직접 주문을 취소하고 새로
              주문 하시거나, 고객센터로 연락 주시면 변경이 가능합니다.
              [상품준비] 상태일 경우 배송을 준비하는 단계이기 때문에 업체 확인이
              필요하고, 즉시 변경이 어려울 수 있습니다.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>배송</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              배송중 상태인데 배송 조회가 안 돼요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              배송이 시작되었다는 안내를 받았는데 위치를 조회할 수 없거나
              송장조회가 되지 않는다면, 시스템오류이거나 택배가 분실되었을 수
              있으니 1:1 문의하기나 고객센터를 찾아 주세요. 또한 해당
              택배사(예:CJ대한통운) 홈페이지나 네이버에서 송장번호로 정확한
              택배위치를 확인해 보실 수 있습니다.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CustomAccordion>

      <CustomAccordion
        style={{ display: selectVal === "20" ? "block" : "none" }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              주문/결제
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              입금이 잘 됐는지 어떻게 확인하나요?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              입금이 확인되면 '카카오 알림톡'으로 입금확인 메세지가 발송됩니다.
              간혹 서비스 지연이 있을 수 있으니 잠시 기다려 보시거나, 또는
              '마이페이지' 상단의 [주문내역]버튼을 눌러 주문상태를 확인해
              주세요. 주문상태가 [결제완료] 로 변경되지 않았다면 잠시 후 다시
              확인해 주시고, 계속 [입금대기] 상태라면 1:1 문의하기나 고객센터를
              찾아 주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              주문/결제
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              금액을 잘못 입금했어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              입금해야 할 금액보다 적은 금액을 입금한 경우, 차액을 추가 입금 후
              1:1 문의하기나 고객센터에 문의해주세요. 입금해야 할 금액보다 많은
              금액을 입금한 경우, 추가입금된 금액은 단추로 자동 적립됩니다.
              단추로 자동 적립된 금액의 환불을 원하시는 경우 1:1 문의하기나
              고객센터를 찾아 주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              주문/결제
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              현금 영수증을 신청하고 싶어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              현금 구매 상품은 주문서 작성 시 '현금영수증' 신청이 가능합니다.
              만약 신청하지 못하고 주문이 완료되었다면 고객센터를 찾아 주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              주문/결제
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              택배 픽업하지 않았는데 배송완료 상태에요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              편의점에서 택배를 보관하고 있는 상태일 수 있습니다. 선택하신 CU
              편의점을 방문하여 택배 보관 여부를 확인해 주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CustomAccordion>

      <CustomAccordion
        style={{ display: selectVal === "30" ? "block" : "none" }}
      >
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              회원/기타
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              아이디/비밀번호를 분실했어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              아이디를 잊으셨나요? 로그인 페이지 [ID가 기억나지 않으세요?]를
              이용해주세요. 가입했을 때 기재된 메일과 일치해야만 아이디를 확인할
              수 있습니다. 비밀번호를 잊으셨나요? 로그인 페이지 [비밀번호를
              잊으셨나요?]를 이용해주세요. 아이디가 정확해야만 비밀번호 초기화
              방법에 대해서 안내 받을 수 있습니다. 가입했을 때 기재된 메일로
              초기화 방법에 대한 안내를 보내드리고 있으니 참고해주세요. 가입했을
              때 이메일을 잊어버리신 경우, 1:1 문의하기나 고객센터를 찾아
              주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              회원/기타
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              회원 정보를 변경하고 싶어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              회원 정보는 마이페이지 설정 프로필 수정 에서 변경이 가능합니다.
              주문 관련 정보를 변경을 하고 싶으신가요? 배송, 교환, 반품 안내를
              참고해 주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              회원/기타
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              상품과 관련된 문의하고 싶어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              상품과 관련된 문의는 각 상품 상세 페이지 내 상품 문의를 이용해
              주세요.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              회원/기타
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              선택한 옵션을 변경하고 싶어요.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              회원정보에 등록되어 있는 연락처 혹은 이메일 주소로 연락을 드리고
              있지만, 간혹 다른 고객님께서 실수로 연락처 혹은 이메일 주소를 잘못
              입력하여 연락을 받으시는 경우가 있습니다. 연락 받아보신 분의
              연락처 혹은 이메일 주소와 함께 1:1 문의하기를 남겨주시면, 신속히
              처리해 드리겠습니다.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CustomAccordion>
    </div>
  );
}

export default MoimFAQ;

const CustomAccordion = styled.div`
  margin-top: 1vw;
  margin-bottom: 2vw;
`;
