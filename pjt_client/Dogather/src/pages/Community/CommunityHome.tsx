import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userIdAtom } from "../../atoms/Login";

interface IForm {
  boardTitle: string;
  boardContent: string;
}

function CommunityHome() {
  const userId = useRecoilValue(userIdAtom);
  const [fileList, setFileList] = useState<FileList | undefined>();
  console.log(fileList);
  const [fileName, setFileName] =
    useState<string>("이미지 파일을 업로드 해주세요");
  console.log(fileName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    // console.log(event);
    // console.log(files);
    // Array.from(files).forEach(file => console.log(file))
    if (files != null) {
      // console.log(files[0].name);

      setFileList(files);
      setFileName(files[0].name);
    }
  };

  const onVaild = (data: IForm) => {
    console.log(data);
    const JWT = localStorage.getItem("login_token");

    const newData = {
      ...data,
      writerNo: 1,
    };

    const formData = new FormData();
    console.log(fileList);

    formData.append(
      "BoardDto",
      new Blob([JSON.stringify(newData)], { type: "application/json" })
    );

    if (fileList != null) {
      Array.from(fileList).forEach((file) => formData.append("file", file));
    }

    fetch("http://i6e104.p.ssafy.io:8090/board", {
      method: "POST",
      headers: {
        jwt: `${JWT}`,
        userId: userId,
      },
      body: formData,
    })
      // .then((response) => response.json())
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  return (
    <>
      <H1>CommunityHome</H1>
      <H1>CommunityHome</H1>
      <H1>CommunityHome</H1>
      <form onSubmit={handleSubmit(onVaild)}>
        <label htmlFor="image">{fileName}</label>
        <input {...register("boardTitle")} />
        <input {...register("boardContent")} />
        <input id="image" type="file" multiple onChange={onChange} />
        <button>작성</button>
      </form>
    </>
  );
}

const H1 = styled.h1`
  font-size: 48px;
  font-weight: bold;
`;

export default CommunityHome;
