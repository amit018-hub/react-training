import React from "react";
import { useLocalStorage } from "usehooks-ts";
import { authService } from "../Api/auth.service";

type TContext = {
  isLogin: boolean;
  toggleLogin: () => void;
};

const LoginContext = React.createContext<TContext>({
  isLogin: false,
  toggleLogin: () => { },
});

export const LoginContextProvider: React.FC<any> = (props: any) => {
  const [isLogin, setIsLogin] = useLocalStorage("isLogin", false);
  // const [token, setIsLoginValue] = useLocalStorage("token", '');

  function toggleLogin() {
    setIsLogin((prev) => !prev);
    
  }

  // const loginValue: TContext = {
  //   token: isLogin,
  //   toggleLogin: toggleLogin,
  // };
  const tokenValue: TContext = {
    isLogin: isLogin,
    toggleLogin: toggleLogin,
  }
  return (
    <LoginContext.Provider value={tokenValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
