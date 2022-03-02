import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchSearch } from "../../api/Search";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import { ImgAtom } from "../../atoms/HomeMoimImg";
import Pagination from "@mui/material/Pagination";

interface IOption {
  state: {
    option: string;
  };
}

interface IGroup {
  amount: number;
  categoryName: string;
  categoryNo: number;
  count: number;
  created: string;
  deadline: string;
  detail: string;
  groupLeader: number;
  groupNo: number;
  leaderName: string;
  link: string;
  mainImage: string;
  maxPeople: number;
  originPrice: number;
  price: number;
  product: string;
  status: string;
  updated: string;
  view: number;
}

interface IGroups {
  list: IGroup[];
}

interface IForm {
  keyword: string;
  option: string;
}

function SearchDetail() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const defaultImg = useRecoilValue(ImgAtom);
  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const { keyword } = useParams();
  // console.log(keyword);
  setValue("keyword", `${keyword}`);
  const { state } = useLocation() as IOption;
  // console.log(state.option);

  const { isLoading, data } = useQuery<IGroups>([keyword, state.option], () =>
    fetchSearch(keyword!, state.option!)
  );
  // console.log(data);

  const onValid = (formData: IForm) => {
    // console.log(formData);
    const keyword = formData.keyword;
    setValue("keyword", "");
    navigate(`/search/${keyword}`, { state: { option: formData.option } });
  };

  return (
    <Container>
      <SearchContainer>
        <SearchSub>
          <form onSubmit={handleSubmit(onValid)}>
            <SearchDiv>
              <Select
                {...register("option", {
                  required: "필수 정보입니다.",
                })}
              >
                <Option value="query">모임</Option>
                <Option value="nickname">닉네임</Option>
              </Select>
              <InputDiv>
                <Input {...register("keyword", { required: true })} autoFocus />
              </InputDiv>
            </SearchDiv>
          </form>
        </SearchSub>
      </SearchContainer>
      <ProductContainer>
        <ProductSub>
          <ProductList>
            <Grid
              container
              margin={0}
              display={"flex"}
              justifyContent={"center"}
            >
              {data?.list.map((d) => (
                <Grid item key={d.groupNo} sx={{ margin: 3 }}>
                  {/* <Alarm>
                    <Box>마감임박</Box>
                  </Alarm> */}
                  <CardActionArea>
                    <Link to={`/moim/${d.groupNo}`}>
                      <Card
                        sx={{
                          minWidth: 250,
                          minHeight: 250,
                          maxWidth: 250,
                          maxHeight: 250,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "whitesmoke",
                          transition: "all .25s linear",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="auto"
                          width="100px"
                          image={
                            d.mainImage
                              ? process.env.PUBLIC_URL +
                                "/doimage/" +
                                d?.mainImage
                              : defaultImg
                          }
                          alt="Product Image"
                        />
                      </Card>
                    </Link>
                  </CardActionArea>
                  <CardDetail>
                    <CategoryName>{d.categoryName}</CategoryName>
                    <ProductName>{d.product}</ProductName>
                    <PriceDiv>
                      <Price>{makeComma(d.price)}원</Price>
                      <PriceDetail>공동구매가</PriceDetail>
                    </PriceDiv>
                    {/* <MaxPeople>80/{d.maxPeople}명</MaxPeople>
                <DeadLine>마감 {d.deadline}일 전</DeadLine> */}
                  </CardDetail>
                </Grid>
              ))}
            </Grid>
          </ProductList>
        </ProductSub>
        <CustomPage>
          <Pagination count={5} variant="text" shape="rounded" />
        </CustomPage>
      </ProductContainer>
      <CustomPage>
        <Pagination count={5} variant="text" shape="rounded" />
      </CustomPage>
    </Container>
  );
}

const animation = keyframes`
0% {
  opacity: 1;
}
10% {
  opacity: 0.9;
}
20% {
  opacity: 0.8;
}
30% {
  opacity: 0.7;
}
40% {
  opacity: 0.6;
}
50% {
  opacity: 0.5;
}
60% {
  opacity: 0.4;
}
70% {
  opacity: 0.3;
}
80% {
  opacity: 0.2;
}
90% {
  opacity: 0.1;
}
100% {
  opacity: 0;
}
`;

const CustomPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const PriceDiv = styled.div`
  padding-top: 7px;
`;

const PriceDetail = styled.p`
  line-height: 13px;
  font-size: 11px;
  color: rgba(34, 34, 34, 0.5);
`;

const ProductName = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 16px;
  font-size: 13px;
  font-weight: 600;
  width: 250px;
  letter-spacing: -0.05em;
`;

const Price = styled.p`
  line-height: 17px;
  font-size: 14px;
  font-weight: 700;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const CategoryName = styled.p`
  display: inline-block;
  vertical-align: top;
  font-weight: 700;
  line-height: 13px;
  font-size: 12px;
  color: #3c40c6;
`;

const CardDetail = styled.div`
  width: 100%;
  justify-content: left;
  margin-top: 5px;
`;

const Box = styled.div`
  height: 20px;
  width: 50px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  animation: ${animation} 2s infinite;
  margin-bottom: 5px;
`;

const Alarm = styled.span`
  display: flex;
  justify-content: left;
  font-size: 10px;
  font-weight: bold;
  color: white;
`;

const ProductList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ProductSub = styled.div`
  padding: 30px 30px 0;
`;

const ProductContainer = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 0 200px;
`;

const Option = styled.option`
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
`;

const Select = styled.select`
  width: 100px;
  height: 30px;
  margin-right: 1rem;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: whitesmoke;
  font-size: 14px;
  font-weight: 700;
  line-height: 17px;
  border: none;
  outline: none;
`;

const Input = styled.input`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  padding: 0 13px 0 1px;
  width: 468px;
  letter-spacing: -0.015em;
  border: none;
  outline: none;
`;
const InputDiv = styled.div`
  width: 500px;
  margin: 0 8px;
  /* flex: none; */
  /* flex-grow: 1; */
  padding-bottom: 8px;
  border-bottom: 3px solid ${(props) => props.theme.textColor};
`;
const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10% 24px;
  position: relative;
`;
const SearchSub = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;
const SearchContainer = styled.div`
  padding: 40px 40px 0;
`;

const Container = styled.div``;

export default SearchDetail;
