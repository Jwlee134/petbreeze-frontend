import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import AddCircleButton from "~/components/common/button/AddCircleButton";
import ConfirmButton from "~/components/common/button/ConfirmButton";
import KeyboardAwareScrollContainer from "~/components/common/container/KeyboardAwareScrollContainer";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";
import ShadowInput from "~/components/common/input/ShadowInput";
import { useAppSelector } from "~/store";
import { settingsActions } from "~/store/settings";

const InputContainer = styled.View`
  margin: 22px 0px;
`;

const Container = styled(InputContainer)`
  align-items: center;
`;

const Text = styled.Text`
  margin-top: 50px;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
`;

const ButtonContainer = styled.View`
  align-items: center;
  margin-bottom: 22px;
`;

const WifiSSID = () => {
  const [inputArr, setInputArr] = useState([{ id: "", password: "" }]);
  const wifiSSID = useAppSelector(state => state.settings.wifiSSID);
  const dispatch = useDispatch();

  const filteredEmpty = useCallback(() => {
    const filtered = inputArr.filter(item => {
      if (!item.id || !item.password) return false;
      return true;
    });
    return filtered;
  }, [inputArr]);

  const handleSave = () => {
    Alert.alert("저장되었습니다.");
    dispatch(settingsActions.setWifiSSID(filteredEmpty()));
  };

  useLayoutEffect(() => {
    if (wifiSSID.length > 0) {
      setInputArr(wifiSSID);
    }
  }, [wifiSSID]);

  return (
    <>
      <KeyboardAwareScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
        <SidePaddingContainer>
          <Text>
            원활한 디바이스 펌웨어 업데이트를 위하여 {"\n"}WIFI 아이디와
            패스워드를 저장해주세요.
          </Text>
          {inputArr.map((item, index) => (
            <InputContainer key={index}>
              <ShadowInput
                value={item.id}
                placeholder="ID"
                style={{ marginTop: 0 }}
                autoCapitalize="none"
                onChangeText={text => {
                  const items = [...inputArr];
                  items[index].id = text;
                  setInputArr(items);
                }}
              />
              <ShadowInput
                value={item.password}
                placeholder="PW"
                autoCapitalize="none"
                onChangeText={text => {
                  const items = [...inputArr];
                  items[index].password = text;
                  setInputArr(items);
                }}
              />
            </InputContainer>
          ))}
          <ButtonContainer>
            <AddCircleButton
              onPress={() =>
                setInputArr([...inputArr, { id: "", password: "" }])
              }
              size={50}
            />
          </ButtonContainer>
        </SidePaddingContainer>
        <Container>
          <ConfirmButton
            disabled={filteredEmpty().length === 0}
            onPress={handleSave}>
            저장
          </ConfirmButton>
        </Container>
      </KeyboardAwareScrollContainer>
    </>
  );
};

export default WifiSSID;
