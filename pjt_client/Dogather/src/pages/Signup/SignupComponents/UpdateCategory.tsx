import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faBabyCarriage,
  faBaseballBall,
  faBook,
  faCarSide,
  faCouch,
  faGamepad,
  faGuitar,
  faPaw,
  faPills,
  faPizzaSlice,
  faTabletAlt,
  faTshirt,
  faTv,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import {
  CategoriesAtom,
  ProductCategories,
} from "../../../atoms/ProductCategories";
import { useRecoilState } from "recoil";

function UpdateCategory() {
  const [categories, setCategories] = useRecoilState(CategoriesAtom);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked, value },
    } = event;

    if (checked) {
      setCategories([...categories, Number(value)]);
    } else {
      setCategories(categories.filter((el: number) => el !== Number(value)));
    }
  };

  return (
    <>
      <Row>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.남성패션}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories.남성패션) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faTshirt} size="lg" fixedWidth />
            <span> 남성패션</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.여성패션}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories.여성패션) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faTshirt} size="lg" fixedWidth />
            <span> 여성패션</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["뷰티/미용"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["뷰티/미용"]) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faAirFreshener} size="lg" fixedWidth />
            <span> 뷰티/미용</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.식품}
            onChange={onChange}
            checked={categories.includes(ProductCategories.식품) ? true : false}
          />
          <Text>
            <FontAwesomeIcon icon={faPizzaSlice} size="lg" fixedWidth />
            <span> 식품</span>
          </Text>
        </Element>
      </Row>
      <Row>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["건강/의료용품"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["건강/의료용품"])
                ? true
                : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faPills} size="lg" fixedWidth />
            <span> 건강/의료</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.생활가전}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories.생활가전) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faTv} size="lg" fixedWidth />
            <span> 생활가전</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.디지털기기}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories.디지털기기) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faTabletAlt} size="lg" fixedWidth />
            <span> 디지털 기기</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["가구/인테리어"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["가구/인테리어"])
                ? true
                : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faCouch} size="lg" fixedWidth />
            <span> 가구/인테리어</span>
          </Text>
        </Element>
      </Row>
      <Row>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.생활용품}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories.생활용품) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faUtensils} size="lg" fixedWidth />
            <span> 생활용품</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["도서/티켓/E쿠폰"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["도서/티켓/E쿠폰"])
                ? true
                : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faBook} size="lg" fixedWidth />
            <span> 도서/티켓</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["출산/유아동"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["출산/유아동"])
                ? true
                : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faBabyCarriage} size="lg" fixedWidth />
            <span> 출산/유아동</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.반려동물용품}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories.반려동물용품) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faPaw} size="lg" fixedWidth />
            <span> 반려동물용품</span>
          </Text>
        </Element>
      </Row>
      <Row>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["스포츠/레저"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["스포츠/레저"])
                ? true
                : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faBaseballBall} size="lg" fixedWidth />
            <span> 스포츠/레저</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["자동차/공구"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["자동차/공구"])
                ? true
                : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faCarSide} size="lg" fixedWidth />
            <span> 자동차/공구</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories.악기}
            onChange={onChange}
            checked={categories.includes(ProductCategories.악기) ? true : false}
          />
          <Text>
            <FontAwesomeIcon icon={faGuitar} size="lg" fixedWidth />
            <span> 악기</span>
          </Text>
        </Element>
        <Element>
          <CheckBox
            type="checkbox"
            value={ProductCategories["게임/놀이"]}
            onChange={onChange}
            checked={
              categories.includes(ProductCategories["게임/놀이"]) ? true : false
            }
          />
          <Text>
            <FontAwesomeIcon icon={faGamepad} size="lg" fixedWidth />
            <span> 게임/놀이</span>
          </Text>
        </Element>
      </Row>
    </>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Element = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CheckBox = styled.input`
  margin: 0;
  height: 1rem;
  width: 2rem;
`;

const Text = styled.div`
  font-size: 10.6px;
  height: 100%;
  width: 100%;
`;

export default UpdateCategory;
