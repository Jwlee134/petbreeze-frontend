import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import userApi from "~/api/user";
import Tag from "~/assets/svg/myPage/name-tag-blue.svg";
import Input from "~/components/common/Input";
import MyText from "~/components/common/MyText";
import useDebounce from "~/hooks/useDebounce";

const Container = styled.View`
  flex: 1;
  padding: 0 50px;
`;

const UpdateNickname = () => {
  const { data } = userApi.useGetNicknameQuery();
  const [trigger] = userApi.useUpdateNicknameMutation();

  const [name, setName] = useState("");

  const value = useDebounce(name, 500);

  useEffect(() => {
    if (data?.nickname) {
      setName(data.nickname);
    }
  }, [data]);

  useEffect(() => {
    if (value) {
      trigger(value);
    }
  }, [value]);

  return (
    <TouchableWithoutFeedback
      style={StyleSheet.absoluteFill}
      onPress={Keyboard.dismiss}>
      <Container>
        <Tag
          width={83}
          height={87}
          style={{ alignSelf: "center", marginVertical: 64 }}
        />
        <Input
          maxLength={32}
          value={name}
          textAlign="center"
          onChangeText={text => setName(text)}
        />
        <MyText
          fontSize={12}
          color="rgba(0, 0, 0, 0.3)"
          style={{ textAlign: "center" }}>
          반려동물의 이름이 아닌 내 이름을 설정해주세요.
        </MyText>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default UpdateNickname;
