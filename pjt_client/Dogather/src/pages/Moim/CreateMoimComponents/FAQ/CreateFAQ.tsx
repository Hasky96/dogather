/* FAQ Form */

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { FAQsAtom } from "../../../../atoms/FAQs";
import { ErrorMessage, SubTitle } from "../../CreateMoim";

interface IFAQForm {
  faqQuestion: string;
  faqAnswer: string;
}

function CreateFAQ() {
  const [FAQs, setFAQs] = useRecoilState(FAQsAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFAQForm>();

  const onValid = ({ faqQuestion, faqAnswer }: IFAQForm) => {
    // console.log(option_name, option_price);
    setFAQs((prev) => [
      ...prev,
      {
        id: Date.now(),
        categoryNo: 1,
        faqQuestion: faqQuestion,
        faqAnswer: faqAnswer,
      },
    ]);
    setValue("faqQuestion", "");
    setValue("faqAnswer", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <SubDiv>
        <SubTitle>
          <span>질문</span>
        </SubTitle>
        <SubInputDiv>
          <FaqInput
            {...register("faqQuestion", { required: "필수 정보입니다." })}
            maxLength={1000}
          />
          <ErrorMessage>{errors?.faqQuestion?.message}</ErrorMessage>
        </SubInputDiv>
      </SubDiv>
      <SubDiv>
        <SubTitle>
          <span>답변</span>
        </SubTitle>
        <SubInputDiv>
          <FaqInput
            {...register("faqAnswer", { required: "필수 정보입니다." })}
          />
          <ErrorMessage>{errors?.faqAnswer?.message}</ErrorMessage>
        </SubInputDiv>
      </SubDiv>
      <SubDiv>
        <SubTitle></SubTitle>
        <Button>FAQ 추가</Button>
      </SubDiv>
    </form>
  );
}

const SubDiv = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
`;

const SubInputDiv = styled.div`
  width: 100%;
`;

const FaqInput = styled.input`
  width: 100%;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  max-width: 400px;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export default CreateFAQ;
