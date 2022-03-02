import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "./atoms/Login";

import Header from "./components/Nav/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Main/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateMoim from "./pages/Moim/CreateMoim";
import MoimDetail from "./pages/Moim/MoimDetail";
import MoimProduct from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimProduct";
import MoimFAQ from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimFAQ";
import MoimRefund from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimRefund";
import MoimReview from "./pages/Moim/MoimDetailComponent/MoimTabs/MoimReview";
import CommunityHome from "./pages/Community/CommunityHome";
import MyPage from "./pages/MyPage/MyPage";
import AnnouncementCommunity from "./pages/Community/AnnouncementCommunity/AnnouncementCommunity";
import InfoShareCommunity from "./pages/Community/InfoShareCommunity/InfoShareCommunity";
import FreeCommunity from "./pages/Community/FreeCommunity/FreeCommunity";
import UsedSaleCommunity from "./pages/Community/UsedSaleCommunity/UsedSaleCommunity";
import ReviewCommunity from "./pages/Community/ReviewCommunity/ReviewCommunity";
import Error404 from "./pages/Error/Error404";
import MoimChatbot from "./components/Chat/MoimChatbot";
import SearchDetail from "./pages/Main/SearchDetail";
import MoimPayment from "./pages/Moim/MoimDetailComponent/MoimPayment";
import UserUpdate from "./pages/Signup/UserUpdate";
import Alarm from "./pages/Main/Alarm";
import MoimUpdate from "./pages/Moim/MoimUpdate";
import ReviewCardDetail from "./pages/Community/ReviewCommunity/ReviewCardDetail";
import SearchCategory from "./pages/Main/SearchCategory";
import CreateMoimReview from "./pages/Moim/CreateMoimReview";

function Router() {
  const isLogin = useRecoilValue(isLoginAtom);

  return (
    // <Navigate replace to="/" /> : url 직접 접근 방지
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 로그인 안했을 때만 url 직접 접근 가능 */}
        <Route
          path="/login"
          element={isLogin ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLogin ? <Navigate replace to="/" /> : <Signup />}
        />

        {/* 로그인 했을 때만 url 직접 접근 가능 */}
        <Route
          path="/user/update"
          element={isLogin ? <UserUpdate /> : <Navigate replace to="/" />}
        />
        <Route
          path="/user"
          element={isLogin ? <MyPage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/moim/create"
          element={isLogin ? <CreateMoim /> : <Navigate replace to="/" />}
        />
        <Route
          path="/moim/update/:groupNo/*"
          element={isLogin ? <MoimUpdate /> : <Navigate replace to="/" />}
        />
        <Route
          path="/moim/review/:leaderName/*"
          element={isLogin ? <CreateMoimReview /> : <Navigate replace to="/" />}
        />
        <Route
          path="/alarm"
          element={isLogin ? <Alarm /> : <Navigate replace to="/" />}
        />

        {/* 로그인과 상관없이 url 직접 접근 가능 */}
        <Route path="/moim/:groupNo/*" element={<MoimDetail />}>
          <Route path="" element={<MoimProduct detailImage={[]} />} />
          <Route path="faq" element={<MoimFAQ />} />
          <Route path="review" element={<MoimReview />} />
          <Route path="refund" element={<MoimRefund />} />
        </Route>

        <Route path="/moim/:groupNo/payment" element={<MoimPayment />} />

        <Route path="/community" element={<CommunityHome />} />

        <Route
          path="/community/announcement/"
          element={<AnnouncementCommunity />}
        />
        <Route path="/community/infoshare/" element={<InfoShareCommunity />} />
        <Route path="/community/free/" element={<FreeCommunity />} />
        <Route path="/community/usedsale/" element={<UsedSaleCommunity />} />
        <Route path="/community/review/" element={<ReviewCommunity />} />
        <Route path="/community/review/1" element={<ReviewCardDetail />} />

        <Route path="/chat" element={<MoimChatbot />} />

        {/* error */}
        <Route path="/error404" element={<Error404 />} />

        <Route path="/search/:categoryId/*" element={<SearchCategory />} />
        <Route path="/search/:keyword/*" element={<SearchDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
