import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  //  user: {
  //    _id: { $oid: "6154895dd029eb32f7dd4529" },
  //    userName: "sapir",
  //    email: "sapir@gmail.com",
  //    password: "$2b$10$sXDGt6mj4OSfgfbKsYq3ZesNodsu35byeTGo3QX7NYCKSSIRsgBQe",
  //    profilePicture: "person/8.jpeg",
  //    followers: [],
  //    followings: ["61548956d029eb32f7dd4527"],
  //    desc: "helloooo",
  //    createdAt: { $date: "2021-09-29T15:42:21.479Z" },
  //    updatedAt: { $date: "2021-09-29T18:11:51.361Z" },
  //    __v: 0,
  //    city: "Karkur, Israel",
  //  },

  //user: JSON.parse(localStorage.getItem("user")) || null,
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //useEffect(() => {
  //    localStorage.setItem("user", JSON.stringify(state.user));
  //}, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
