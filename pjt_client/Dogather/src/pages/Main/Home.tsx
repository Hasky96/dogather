import { useEffect, useState } from "react";
import styled from "styled-components";
import HomeCarousel from "./HomeComponents/HomeCarousel";
import HomeCategory from "./HomeComponents/HomeCategory";
import HomeRecommendedMoim from "./HomeComponents/HomeMoim/HomeRecommendedMoim";
import HomeHotMoim from "./HomeComponents/HomeMoim/HomeHotMoim";
import HomeNewMoim from "./HomeComponents/HomeMoim/HomeNewMoim";

// const today = new Date();

// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const date = today.getDate();
// const hour = today.getHours();
// const minute = today.getMinutes();
// const second = today.getSeconds();

// console.log(today);
// console.log(year + "-" + month + "-" + date);
// console.log(hour + ":" + minute + ":" + second);
interface Ilist {
  categoryName: string;
  categoryNo: number;
  deadline: string;
  groupLeader: number;
  groupNo: number;
  maxPeople: number;
  price: number;
  product: string;
  status: string;
  view: number;
  mainImage: string;
}

export interface iHomeCard {
  list: Array<Ilist>;
}

function Home() {
  return (
    <Container>
      <HomeCarousel />
      <HomeCategory />
      <HomeRecommendedMoim />
      <HomeHotMoim />
      <HomeNewMoim />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
  row-gap: 20px;
  padding-bottom: 200px;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 40px;
`;

export default Home;
