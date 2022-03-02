import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { CardMedia, Input, Stack } from "@mui/material";
import { FetchMoimGroupAPI, FetchMoimMediaAPI } from "../../api/MoimDetail";
// import { Audio, Hearts } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Product from "./MoimDetailComponent/MoimTabs/MoimProduct";
import FAQ from "./MoimDetailComponent/MoimTabs/MoimFAQ";
import Review from "./MoimDetailComponent/MoimTabs/MoimReview";
import Refund from "./MoimDetailComponent/MoimTabs/MoimRefund";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAtom, userIdAtom, userNoAtom } from "../../atoms/Login";
import Hoodie from "../../img/Hoodie.png";
import MoimDetailImg from "./MoimDetailComponent/MoimDetailImg";
import KakaoPay from "./KakaoPay";
import MoimPayment from "./MoimDetailComponent/MoimPayment";
import { detailProducts } from "../../atoms/MoimDetailProps";
import MoimProduct from "./MoimDetailComponent/MoimTabs/MoimProduct";
import MoimFAQ from "./MoimDetailComponent/MoimTabs/MoimFAQ";
import MoimReview from "./MoimDetailComponent/MoimTabs/MoimReview";
import MoimRefund from "./MoimDetailComponent/MoimTabs/MoimRefund";
import { ImgAtom } from "../../atoms/HomeMoimImg";
import Swal from "sweetalert2";
import { AlarmsAtom, AlarmsCountAtom } from "../../atoms/Alarm";

interface RouteState {
  state: {
    name: string;
  };
}

interface IProductData {
  group: number;
  products: object;
}

export interface IOptionsData {
  optionNo: string;
  optionName: string;
  optionPrice: number;
}

export interface IFAQData {
  categoryNo: number;
  faqAnswer: string;
  faqNo: number;
  faqQuestion: string;
  groupNo: number;
}

export interface IGroupData {
  groupNo: number;
  groupLeader: number;
  categoryNo: number;
  deadline: string;
  created: string;
  maxPeople: number;
  view: number;
  status: string;
  product: string; // 상품이름
  detail: string; // 상품상세정보
  link: string; // 상품링크
  originPrice: number; // 출시가
  price: number; // 공구가
  mainImage: string;
  options: Array<IOptionsData>;
  mediaList: Array<string>;
  faqList: Array<IFAQData>;
  categoryName: string;
  leaderName: string;
  isliked: number;
}

export interface IProductContent {
  userNo: number;
  groupNo: string;
  optionName: string;
  optionNo: string;
  amount: number;
  price: number;
  // priceByOption: number;
}

interface IInterestData {
  userNo: number;
  groupNo: string;
}

function MoimDetail() {
  // useEffect(() => {
  //   (async () => {
  //     const productData = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/product/78`)
  //     ).json();
  //     const data = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/group/78`)
  //     ).json();
  //     const groupList = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/group/list`)
  //     ).json();
  //     console.log(productData, data);
  //     console.log(groupList);
  //   })();
  // }, []);

  // groupNo에 따라 페이지가 변경되므로 그룹No가 넘어갈 수 있도록 해야함.
  const { groupNo } = useParams();
  const navigate = useNavigate();
  // console.log(typeof groupNo);
  const [detailProduct, setDetailProduct] = useRecoilState(detailProducts);
  // const { state } = useLocation() as RouteState;
  const productMatch = useMatch("/moim/:groupNo");
  const faqMatch = useMatch("/moim/:groupNo/faq");
  const reviewMatch = useMatch("/moim/:groupNo/review");
  const refundMatch = useMatch("/moim/:groupNo/refund");

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userNo, setUserNo] = useRecoilState(userNoAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [alarms, setAlarms] = useRecoilState(AlarmsAtom);
  const [count, setCount] = useRecoilState(AlarmsCountAtom);
  const JWT = localStorage.getItem("login_token");

  const { isLoading: groupLoading, data: groupData } = useQuery<IGroupData>(
    ["group", groupNo, userId, JWT, userNo],
    () => FetchMoimGroupAPI(groupNo!, userId!, JWT!, userNo)
  );
  // console.log(groupData);

  // console.log(groupData?.groupLeader);
  // console.log(userNo);
  // console.log(groupLoading);
  // console.log(groupData?.mediaList[0]);

  // const loading = productLoading || isLoading;
  const [loading, setLoading] = useState(true);

  const [hidden, setHidden] = useState(true);
  const [moimPrice, setMoimPrice] = useState(groupData?.originPrice!);
  useEffect(() => {
    // console.log(groupData);
    setTimeout(() => {
      setLoading(false);
      setHidden(false);
    }, 100);
  }, []);

  const basePrice = groupData?.price!;
  // console.log(basePrice);
  const [optionIdx, setOptionIdx] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isHidden, setIsHidden] = useState(true);

  const [price, setPrice] = useState(0);
  const [product, setProduct] = useState<Array<IProductContent>>([]);
  const [products, setProducts] = useState<Array<IProductContent>>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [priceByOption, setPriceByOption] = useState(0);
  const [totalPriceByOption, setTotalPriceByOption] = useState(0);
  const [payment, setPayment] = useState("");

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // console.log(typeof value);
    const splitValueOption = value.split("/")[0];
    const splitValuePrice = value.split("/")[1];
    const splitValueOptionNo = value.split("/")[2];
    console.log(totalPriceByOption);
    console.log(quantity);
    product.splice(product.length, 0, {
      userNo: userNo,
      groupNo: groupNo!,
      optionName: splitValueOption,
      optionNo: splitValueOptionNo,
      amount: quantity,
      price: Number(splitValuePrice),
      // priceByOption: totalPriceByOption,
      // price: totalPriceByOption,
    });
    // setProducts(newObject);

    const newObject = [...product];
    const newPrice = priceByOption;
    setIsHidden(false);
    setOptionIdx(Number(value));
    setProducts(newObject);
    setTotalPriceByOption(newPrice);
  };
  // console.log(products);

  // const sweetAlertSucc = (title, contents, icon, confirmButtonText) => {
  //   Swal.fire({
  //     title: title,
  //     text: contents,
  //     icon: icon,
  //     confirmButtonText: confirmButtonText,
  //   });
  // };

  const onInterest = () => {
    const interestData: IInterestData = {
      userNo: userNo,
      groupNo: groupNo!,
    };
    if (!groupData?.isliked) {
      fetch("http://i6e104.p.ssafy.io/api/group/interest", {
        method: "POST",
        headers: {
          jwt: `${JWT}`,
          userId: userId,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interestData),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.msg);
          if (result.msg === "relogin") {
            // 토큰 만료 시
            localStorage.clear(); // 로컬 스토리지 비우기
            setIsLogin(false); // 로그인 여부 초기화
            setUserNo(""); // 저장된 user pk 초기화
            setUserId(""); // 저장된 user id 초기화
            setAlarms([]); // 저장된 알람 리스트 초기화
            setCount(0); // 저장된 읽지 않은 알람 개수 초기화
            alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            setTimeout(() => {
              // 1ms (0.001초) 후 navigate 실행 (미세한 차이로 isLogin이 false 되는 것 보다 navigate가 빨라 isLogin이 true라고 판단하여 로그인 페이지에서 메인 페이지로 튕김)
              navigate("/login"); // 로그인 페이지로 이동
            }, 1);
          } else if (result.error) {
            alert(result.status + " " + result.error);
          } else {
            // 토큰 만료 아닐 시
            if (
              window.confirm(
                "관심등록에 성공했습니다. 마이페이지로 이동하시겠습니까?"
              ) == true
            ) {
              navigate(`/user`); // 마이페이지로 이동
            }
          }
        });
    } else {
      alert("이미 관심등록된 모임입니다.");
    }
  };

  // const onApply = (event: React.ChangeEvent<HTMLButtonElement>) => {};

  //처음 랜더링되고 유저에게 보이는 수량의 값이 0일 필요가 없기 때문에 초기값으로 1로 주었다.

  // const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   console.log(value);
  //   // console.log(typeof value);
  //   const splitValueOption = value.split("/")[0];
  //   const splitValuePrice = value.split("/")[1];
  //   console.log(splitValueOption);
  //   // console.log(typeof splitValuePrice);
  //   options.map((option, idx) => {
  //     if (options.length != groupData?.options.length!) {
  //       console.log(splitValueOption);
  //       if (option !== splitValueOption) {
  //         console.log(splitValueOption);
  //         setOption([...options, splitValueOption]);
  //       }
  //     }
  //   });
  //   // const _price : string[] = optionPrice.map((price, idx))
  //   setIsHidden(false);
  // };
  // console.log(options);
  // console.log(optionPrice)

  const increaseQuantity = (o: IProductContent, idx: number) => {
    const sum = o.price + basePrice;
    setPrice(price + sum);
    o.amount += 1;
    setTotalAmount(totalAmount + 1);
    setPriceByOption(sum * o.amount);
  };

  const decreaseQuantity = (o: IProductContent, idx: number) => {
    const sum = o.price + basePrice;
    setPrice(price - sum);
    o.amount -= 1;
    setTotalAmount(totalAmount - 1);
    setPriceByOption(sum * o.amount);
  };

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(Number(value));
    setTotalPriceByOption(priceByOption);
    // console.log(value);
  };

  // const onApply = () => {
  //   console.log(products.length, price);
  //   console.log(payment);
  //   if (!products.length) {
  //     alert("옵션을 선택해주세요");
  //     setTimeout(() => navigate(`/moim/${groupNo}`), 1);
  //   } else {
  //     if (!price) {
  //       alert("물품 수량을 선택해주세요");
  //       setTimeout(() => navigate(`/moim/${groupNo}`), 1);
  //     } else {
  //       if (price < basePrice * totalAmount) {
  //         alert("옵션별 수량을 모두 선택해주세요.");
  //         setTimeout(() => navigate(`/moim/${groupNo}`), 1);
  //       }
  //     }
  //   }
  // };

  const mainImgAddress =
    process.env.PUBLIC_URL + "/doimage/" + groupData?.mainImage;
  // const mainImgAddress = process.env.PUBLIC_URL + "/img/Hoodie.png";
  // console.log(groupData?.mainImage);
  const detailImgAddress =
    process.env.PUBLIC_URL + "/doimage/" + groupData?.mediaList;
  // console.log(mainImgAddress, detailImgAddress);

  const time = Date.now();
  // console.log(time);

  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const defaultImg = useRecoilValue(ImgAtom);

  const goToInfoUpdate = () => {
    navigate(`/moim/update/${groupNo}`);
  };

  return (
    <Container>
      <MoimWrapper>
        {/* {loading ? null : (
          <> */}
        <Overview>
          <ImgWrapper>
            {/* <Img
                  src={process.env.PUBLIC_URL + "/img/Hoodie.png"}
                  alt={"메인 이미지"}
                /> */}
            <Img
              src={
                groupData?.mainImage
                  ? process.env.PUBLIC_URL + "/doimage/" + groupData?.mainImage
                  : defaultImg
              }
              alt={mainImgAddress}
            />
            {/* <Img src={detailImgAddress} alt={detailImgAddress} /> */}
            {/* <MoimDetailImg /> */}
          </ImgWrapper>
          <OverviewItem>
            <CategoryName>{groupData?.categoryName}</CategoryName>
            <LeaderName>{groupData?.leaderName}</LeaderName>

            <ProductTitle>{groupData?.product}</ProductTitle>
            {/* <ProductDetail>{groupData?.detail}</ProductDetail> */}
            <ProductPrice>
              <ProductOriginalPrice>
                {groupData?.originPrice! + "원"}
              </ProductOriginalPrice>
              <ProductMoimPrice>{basePrice + "원"}</ProductMoimPrice>
            </ProductPrice>

            {/* {groupData?.options.map((option, idx) => (
                  <MoimSelect
                    optionName={option.optionName}
                    optionPrice={option.optionPrice}
                  />
                ))} */}
            {groupData?.groupLeader === userNo ? (
              <ButtonDiv>
                <UpdateButton onClick={goToInfoUpdate}>
                  모임 정보 수정
                </UpdateButton>
                <UpdateButton>모임 이미지 수정</UpdateButton>
                <UpdateButton>모임 옵션 수정</UpdateButton>
                <UpdateButton>모임 FAQ 수정</UpdateButton>
              </ButtonDiv>
            ) : (
              <>
                <Option>{"옵션선택"}</Option>
                <SelectContainer>
                  <SelectWrapper>
                    <SelectContent>
                      <SelectSelect
                        onChange={onSelect}
                        placeholder="옵션을 선택해주세요."
                      >
                        <SelectOption value="0">
                          옵션을 선택해주세요.
                        </SelectOption>
                        {groupData?.options?.map((option, idx) => (
                          <SelectOption
                            key={idx}
                            // onChange={}
                            value={
                              option.optionName +
                              "/" +
                              option.optionPrice +
                              "/" +
                              option.optionNo
                            }
                          >
                            {option.optionName +
                              " / " +
                              "+" +
                              option.optionPrice +
                              "원"}
                          </SelectOption>
                        ))}
                      </SelectSelect>
                    </SelectContent>
                    {products &&
                      products.map((o, idx) => {
                        return (
                          <>
                            <OptionWrapper key={idx}>
                              <CartOption>
                                <SelectContentItem>
                                  <OptionName>
                                    옵션명 :{" "}
                                    {o.optionName + "(+" + o.price + ")"}
                                  </OptionName>
                                </SelectContentItem>
                                <SelectContentItem>
                                  <QuantityButton
                                    className="purchaseButton"
                                    onClick={() => decreaseQuantity(o, idx)} //onClick이 되면 카운팅이 감소되는 함수실행
                                    disabled={o.amount < 1}
                                  >
                                    {"-"}
                                  </QuantityButton>
                                  <SelectInput
                                    className="productQuantity"
                                    type="text"
                                    onChange={handleValue} //onChange될때마다 값을 얻음
                                    value={o.amount} //값은 count의 state를 담는다.
                                  />
                                  <QuantityButton
                                    className="purchaseButton"
                                    onClick={() => increaseQuantity(o, idx)}
                                    disabled={o.amount < 0}
                                  >
                                    {"+"}
                                  </QuantityButton>
                                </SelectContentItem>
                              </CartOption>
                            </OptionWrapper>
                          </>
                        );
                      })}
                    <OptionWrapper>
                      <CartOption>
                        <PriceWrapper>
                          <ProductQuantity>
                            {"총 " + totalAmount + "개"}
                          </ProductQuantity>
                          <FinalPrice>{price + "원"}</FinalPrice>
                        </PriceWrapper>
                      </CartOption>
                    </OptionWrapper>
                    <SelectContent>
                      <Button
                        onClick={() => onInterest()}
                        style={{
                          backgroundColor: "tomato",
                          borderColor: "black",
                        }}
                      >
                        관심등록
                      </Button>
                      <Link
                        // onClick={() => onApply()}
                        style={{ width: "100%" }}
                        to={`/moim/${groupNo}/payment`}
                        state={{
                          products: products,
                          groupNo: groupNo!,
                          price: price,
                          img: mainImgAddress,
                          leaderName: groupData?.leaderName!,
                          productName: groupData?.product!,
                          ProductDetail: groupData?.detail!,
                          categoryName: groupData?.categoryName!,
                          basePrice: basePrice,
                        }}
                      >
                        <Button style={{ backgroundColor: "#6fbd63" }}>
                          모임신청
                        </Button>
                      </Link>
                    </SelectContent>
                  </SelectWrapper>
                </SelectContainer>
              </>
            )}
            {/* <span>단돈 {groupData?.price}원</span>
                <span>
                  모임 인원 : 현재신청인원 / {groupData?.maxPeople} (여기는%)
                </span>
                <span>마감 기한 : {groupData?.deadline}</span> */}
          </OverviewItem>
        </Overview>
        <Tabs>
          <Tab isActive={productMatch !== null}>
            <Link to={`/moim/${groupNo}`}>상품상세</Link>
          </Tab>
          <Tab isActive={faqMatch !== null}>
            <Link
              to={`/moim/${groupNo}/faq`}
              state={{
                faqs: groupData?.faqList,
              }}
            >
              FAQ
            </Link>
          </Tab>
          <Tab isActive={reviewMatch !== null}>
            <Link to={`/moim/${groupNo}/review`}>모임평</Link>
          </Tab>
          <Tab isActive={refundMatch !== null}>
            <Link to={`/moim/${groupNo}/refund`}>교환/환불</Link>
          </Tab>
        </Tabs>
        <Routes>
          <Route
            path=""
            element={<MoimProduct detailImage={groupData?.mediaList!} />}
          />
          <Route path="faq" element={<MoimFAQ />} />
          <Route path="review" element={<MoimReview />} />
          <Route path="refund" element={<MoimRefund />} />
        </Routes>
        {/* </> */}
        {/* )} */}
      </MoimWrapper>
    </Container>
  );
}
const LeaderName = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const CategoryName = styled.p`
  display: flex;
  align-items: center;
  color: grey;
  font-size: 14px;
  margin-bottom: 5px;
`;
const ProductTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const ProductDetail = styled.p`
  margin-bottom: 10px;
  word-spacing: 2px;
  line-height: 20px;
`;

const Option = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductPrice = styled.div`
  margin-bottom: 20px;
`;
const ProductOriginalPrice = styled.p`
  color: grey;
  font-size: 16px;
  /* margin-bottom: 2px; */

  text-decoration: line-through;
`;
const ProductMoimPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
  padding-bottom: 200px;
`;

const MoimWrapper = styled.div`
  width: 70%;
  margin-top: 65px;
`;

const Title = styled.p`
  font-size: 48px;
  padding-top: 500px;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 20px;
`;

const Img = styled.img`
  height: 500px;
  width: 500px;
  object-fit: contain;
  overflow: hidden;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  padding: 10px 20px;

  /* box-shadow: 3px 3px 10px 3px lightgrey; */
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 600px;
  height: auto;
  span {
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 25px 0px;
  gap: 20px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  background-color: white;
  padding: 7px 0px;
  border-radius: 20px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const SelectContainer = styled.div`
  display: block;
`;

const OptionWrapper = styled.div`
  border-color: grey;
  border-width: 1px;
`;

const ButtonDiv = styled.div`
  font-size: 20px;
`;

const SelectContent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  width: 100%;
`;
const SelectContentItem = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
`;

const SelectCart = styled.button`
  display: block;
  justify-content: center;
  font-size: 20px;
`;

const SelectWrapper = styled.div``;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border-width: 1px;
  border-color: grey;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;

  :hover {
    background-color: #f3f3f3;
    opacity: 0.5;
  }
`;

const SelectInput = styled.input`
  font-size: 16px;
  color: grey;
  width: 50px;
  height: 30px;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 5px;
  /* border-radius: 5px; */
  border-color: black;
  border-width: 1px;
  :hover {
    outline: auto;
  }
  ::-webkit-inner-spin-button {
    width: 50px;
    height: 20px;
    -webkit-appearance: "Always Show Up/Down Arrows";
  }
`;

const SelectSelect = styled.select`
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: grey;
  margin-bottom: 10px;
  border-radius: 5px;
  border-color: black;
  border-width: 2px;
  :hover {
    outline: auto;
  }
`;

const SelectOption = styled.option`
  font-size: 14px;
`;

const CartOption = styled.div`
  border-color: grey;
`;

const OptionName = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductQuantity = styled.p`
  font-size: 14px;
`;
const FinalPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

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
  :hover {
    cursor: pointer;
  }
`;

const UpdateButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin: 3px 0;
`;

export default MoimDetail;
