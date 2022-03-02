/* 옵션 Form */

import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { OptionsAtom } from "../../../../atoms/Options";
import { ErrorMessage, SubTitle } from "../../CreateMoim";

interface IOptionForm {
  optionName: string;
  optionPrice: string; // 입력 받을 때는 string으로 받음 (setValue 깔끔하게 하기 위함)
}

function CreateOption() {
  const [options, setOptions] = useRecoilState(OptionsAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IOptionForm>();

  const onValid = ({ optionName, optionPrice }: IOptionForm) => {
    setOptions((prev) => [
      ...prev,
      {
        id: Date.now(),
        optionName: optionName,
        optionPrice: Number(optionPrice), // Atom에 추가할 때 number로 변경
      },
    ]);
    setValue("optionName", "");
    setValue("optionPrice", "");
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <SubDiv>
        <SubTitle>
          <span>옵션 조합</span>
        </SubTitle>
        <SubInputDiv>
          <FaqInput
            {...register("optionName", { required: "필수 정보입니다." })}
            placeholder="ex) 블랙 / 260 / 기타"
          />
          <ErrorMessage>{errors?.optionName?.message}</ErrorMessage>
        </SubInputDiv>
      </SubDiv>
      <SubDiv>
        <SubTitle>
          <span>추가 가격</span>
        </SubTitle>
        <SubInputDiv>
          <FaqInput
            {...register("optionPrice", { required: "필수 정보입니다." })}
            type="number"
            placeholder="ex) 1000"
          />
          <ErrorMessage>{errors?.optionPrice?.message}</ErrorMessage>
        </SubInputDiv>
      </SubDiv>
      <SubDiv>
        <SubTitle></SubTitle>
        <Button>옵션 추가</Button>
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

export default CreateOption;
