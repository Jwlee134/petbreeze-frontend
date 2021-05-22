import React from "react";
import { useAppSelector } from "~/store";

import LostAnimalInfo from "~/components/postAnimalInfo/LostAnimalInfo";
import WitnessedAnimalInfo from "~/components/postAnimalInfo/WitnessedAnimalInfo";

import AuthSelector from "../Shared/AuthSelector";

const PostAnimalInfo = () => {
  const { isLoggedIn } = useAppSelector(state => state.user);
  const { currentHomeTab } = useAppSelector(state => state.common);

  if (!isLoggedIn) return <AuthSelector />;

  return currentHomeTab === "Lost" ? (
    <LostAnimalInfo />
  ) : (
    <WitnessedAnimalInfo />
  );
};

export default PostAnimalInfo;
