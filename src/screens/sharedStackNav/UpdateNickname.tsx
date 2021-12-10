import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import userApi from "~/api/user";
import Tag from "~/assets/svg/myPage/name-tag-blue.svg";
import Input from "~/components/common/Input";
import MyText from "~/components/common/MyText";
import LoadingIndicator from "~/components/lottie/LoadingIndicator";
import CustomHeader from "~/components/navigator/CustomHeader";
import { textLoadingIndicatorSize } from "~/styles/constants";
import palette from "~/styles/palette";
import { UpdateNicknameScreenNavigationProp } from "~/types/navigator";

const Container = styled.View`
  flex: 1;
  padding: 0 50px;
`;

const UpdateNickname = ({
  navigation,
}: {
  navigation: UpdateNicknameScreenNavigationProp;
}) => {
  const { data } = userApi.useGetNicknameQuery();
  const [trigger, { isLoading }] = userApi.useUpdateNicknameMutation();
  const [name, setName] = useState("");

  const onNameChange = (text: string) => setName(text);

  useEffect(() => {
    if (data?.nickname) {
      setName(data.nickname);
    }
  }, [data]);

  const handleSubmit = () => {
    trigger(name);
  };

  return (
    <>
      <CustomHeader
        title="이름변경"
        navigation={navigation}
        RightButtonText={
          isLoading ? (
            <LoadingIndicator size={textLoadingIndicatorSize} />
          ) : (
            <MyText color={palette.blue_7b}>완료</MyText>
          )
        }
        onRightButtonPress={handleSubmit}
      />
      <TouchableWithoutFeedback
        style={StyleSheet.absoluteFill}
        onPress={Keyboard.dismiss}>
        <Container>
          <Tag style={{ alignSelf: "center", marginVertical: 64 }} />
          <Input
            maxLength={32}
            value={name}
            textAlign="center"
            onChangeText={onNameChange}
            style={{
              fontSize: 20,
              fontFamily: "NotoSansKR-Medium",
              paddingBottom: 10,
            }}
          />
          <MyText
            fontSize={12}
            color="rgba(0, 0, 0, 0.3)"
            style={{ textAlign: "center" }}>
            반려동물의 이름이 아닌 내 이름을 설정해주세요.
          </MyText>
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
};

export default UpdateNickname;
