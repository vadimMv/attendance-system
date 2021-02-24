export default (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        login: action.payload.login,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        },
      };
    case "START":
      return {
        ...state,
        reports: {
          end: false,
          exit: false,
          start: true,
        },
      };
    case "END":
      return {
        ...state,
        reports: {
          start: false,
          exit: false,
          end: true,
        },
      };
    case "EXIT":
      return {
        ...state,
        login: false,
        user: {
          name: "",
          email: "",
        },
        reports: {
          start :false,
          end:false,
          exit: true,
        },
      };

    default:
      return state;
  }
};
