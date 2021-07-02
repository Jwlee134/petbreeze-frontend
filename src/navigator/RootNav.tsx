import React from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const RootNav = () => {
  const isLoggedIn = useAppSelector(state => state.storage.user.isLoggedIn);

  return isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />;
};

export default RootNav;
