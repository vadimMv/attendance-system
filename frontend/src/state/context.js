import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import { login, report } from "./api";

const initState = {
  login: false,
  user: {
    name: "",
    email: "",
  },
  reports: {
    start: false,
    end: false,
    exit: false,
  },
};

export const AppContext = createContext(initState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const createLogin = async (data) => {
    const user = await login(data);
    console.log(user);
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: {
          login: true,
          user: {
            name: user.name,
            email: user.email,
          },
        },
      });
    }
  };
  const createReport = async (data) => {
    const result = await report(data);
    let type = result?.type;
    dispatch({
      type,
    });
  };
  const CurrentUser = () => {
    let user = null;
    try {
      user = localStorage.getItem("user");
      if (user) {
        dispatch({
          type: "LOGIN",
          payload: {
            login: true,
            user,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: "LOGIN",
        payload: {
          login: false,
          user: {
            name: "",
            email: "",
          },
        },
      });
    }
  };
  useEffect(() => {
    CurrentUser();
  }, []);
  return (
    <AppContext.Provider
      value={{
        state,
        createLogin,
        createReport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
