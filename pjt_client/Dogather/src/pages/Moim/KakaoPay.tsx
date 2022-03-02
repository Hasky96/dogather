import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdAtom, userNoAtom } from "../../atoms/Login";
import { IProductContent } from "./MoimDetail";

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  notice_url?: string | string[];
  display?: Display;
}

export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}
{
  /* price prop해주는 부분에서 가격 계산 제대로 된걸로 넣기 */
}

export interface IKakaoContent {
  groupNo: string;
  products: Array<IProductContent>;
  price: number;
}

function KakaoPay({ groupNo, products, price }: IKakaoContent) {
  const navigate = useNavigate();
  const userNo = useRecoilValue(userNoAtom);
  const userId = useRecoilValue(userIdAtom);
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTimeout(() => setTime(1), 500);
  }, []);

  const handlePayment = () => {
    const { IMP } = window;
    IMP?.init("imp60712675");
    // const amount: number =
    //   priceSelections
    //     .filter((price) => price.value === order.price)
    //     .map((price) => price.amount)[0] || 0
    // if (!amount) {
    //   alert('결제 금액을 확인해주세요')
    //   return
    // }

    const data: RequestPayParams = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `${userNo}_${groupNo}`,
      name: "노르웨이 회전 의자",
      // amount부분은 수정 필요
      amount: Number(`${price}`),
      buyer_name: `${userId}`,
    };
    console.log(price);

    // const formData = new FormData();

    // formData.append(
    //   "paymentList",
    //   new Blob([JSON.stringify(paymentData)], { type: "application/json" })
    // );
    console.log(products);
    const paymentData = {
      payments: products,
    };

    const JWT = localStorage.getItem("login_token");

    const callback = (response: RequestPayResponse) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } =
        response;
      if (success) {
        console.log(paymentData);
        fetch("http://i6e104.p.ssafy.io/api/payment", {
          method: "POST",
          headers: {
            jwt: `${JWT}`,
            userId: userId,
            "Content-Type": "application/json",
          },
          // body: formData,
          body: JSON.stringify(paymentData),
        });
        alert("결제가 완료됐습니다.");
        console.log(response);
      } else {
        console.log(error_msg);
        alert("결제가 취소됐습니다.");
      }
    };

    IMP?.request_pay(data, callback);
  };
  return (
    <Container>
      <Button onClick={handlePayment}>{""}</Button>
    </Container>
  );
}

const Container = styled.div``;
const Button = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border-radius: 10px;
  font-weight: bold;
  color: white;
`;

export default KakaoPay;
