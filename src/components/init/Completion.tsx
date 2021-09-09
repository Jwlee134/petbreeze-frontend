import React from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { commonActions } from "~/store/common";
import MyText from "../common/MyText";
import { SafeAreaView } from "react-native";
import SafeAreaContainer from "../common/container/SafeAreaContainer";
import { rpWidth } from "~/styles";
import { useAppSelector } from "~/store";
import { Image as ImageType } from "react-native-image-crop-picker";

const Image = styled.Image`
  width: ${rpWidth(120)}px;
  height: ${rpWidth(120)}px;
  border-radius: ${rpWidth(60)}px;
  margin: ${rpWidth(53)}px auto 0px auto;
`;

const Completion = () => {
  const { avatar, name, breed, birthYear, gender } = useAppSelector(
    state => state.form,
  );
  const dispatch = useDispatch();

  return (
    <SafeAreaContainer>
      <MyText
        style={{ textAlign: "center", marginTop: rpWidth(89) }}
        fontWeight="medium"
        fontSize={24}>
        모든 단계를{"\n"}완료했습니다!
      </MyText>
    </SafeAreaContainer>
  );
};

export default Completion;
