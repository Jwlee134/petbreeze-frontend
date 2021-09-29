import React from "react";
import { Linking, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import MyText from "../common/MyText";

const RowContainer = styled.View`
  flex-direction: row;
`;

const Policies = () => {
  return (
    <>
      <RowContainer>
        <MyText fontSize={12} color="rgba(255, 255, 255, 0.8)">
          시작하면 어디개의{" "}
        </MyText>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL("https://petbreeze.co/terms-and-conditions")
          }>
          <MyText
            fontSize={12}
            color="rgba(255, 255, 255, 0.8)"
            fontWeight="medium">
            서비스 이용약관,{" "}
          </MyText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL("https://petbreeze.co/privacy-policy")
          }>
          <MyText
            fontSize={12}
            color="rgba(255, 255, 255, 0.8)"
            fontWeight="medium">
            개인정보
          </MyText>
        </TouchableWithoutFeedback>
      </RowContainer>
      <RowContainer>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL("https://petbreeze.co/privacy-policy")
          }>
          <MyText
            fontSize={12}
            color="rgba(255, 255, 255, 0.8)"
            fontWeight="medium">
            취급방침,{" "}
          </MyText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() =>
            Linking.openURL("https://petbreeze.co/location-policy")
          }>
          <MyText
            fontSize={12}
            color="rgba(255, 255, 255, 0.8)"
            fontWeight="medium">
            위치정보 활용약관
          </MyText>
        </TouchableWithoutFeedback>
        <MyText fontSize={12} color="rgba(255, 255, 255, 0.8)">
          에 동의하게 됩니다.
        </MyText>
      </RowContainer>
    </>
  );
};

export default Policies;
