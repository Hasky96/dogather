/*
index.html의 body에서 id="root"를 가진 div와 연결
*/

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={LightTheme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
