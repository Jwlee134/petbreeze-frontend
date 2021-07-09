import React from "react";
import { useAppSelector } from "~/store";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const RootNav = () => {
  const isInitialized = useAppSelector(
    state => state.storage.initialization.isInitialized,
  );

  return isInitialized ? <LoggedInNav /> : <LoggedOutNav />;
};

export default RootNav;
