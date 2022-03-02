/*
declaration file
TypeScript와 styled components theme 연결
*/

// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    buttonColor: string;

    accentColor: string;
  }
}
