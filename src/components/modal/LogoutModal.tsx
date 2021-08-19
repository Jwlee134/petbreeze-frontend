import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { storageActions } from "~/store/storage";
import { rpWidth } from "~/styles";
import palette from "~/styles/palette";
import ShadowContainer from "../common/container/ShadowContainer";
import MyText from "../common/MyText";

const Container = styled.View`
  overflow: hidden;
  background-color: white;
  border-radius: 20px;
`;

const DividerContainer = styled.View`
  width: 100%;
  padding: 0px ${rpWidth(16)}px;
`;

const Divider = styled.View`
  height: ${StyleSheet.hairlineWidth}px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  width: 50%;
  justify-content: center;
  align-items: center;
  padding: ${rpWidth(21)}px 0px;
`;

const LogoutModal = ({ close }: { close: () => void }) => {
  const dispatch = useDispatch();

  return (
    <ShadowContainer
      style={{
        width: "100%",
      }}
      shadowOpacity={0.15}
      shadowRadius={10}>
      <Container>
        <MyText
          style={{
            marginVertical: rpWidth(32),
            textAlign: "center",
          }}>
          로그아웃 하시겠습니까?
        </MyText>
        <DividerContainer>
          <Divider />
        </DividerContainer>
        <RowContainer>
          <Button onPress={close}>
            <MyText color="rgba(0, 0, 0, 0.3)">취소</MyText>
          </Button>
          <Button onPress={() => dispatch(storageActions.logout())}>
            <MyText fontWeight="medium" color={palette.blue_7b}>
              로그아웃하기
            </MyText>
          </Button>
        </RowContainer>
      </Container>
    </ShadowContainer>
  );
};

export default LogoutModal;
