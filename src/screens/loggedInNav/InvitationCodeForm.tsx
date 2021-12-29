import React, { useContext, useEffect, useRef, useState } from "react";
import { InvitationCodeFormScreenNavigationProp } from "~/types/navigator";
import CustomHeader from "~/components/navigator/CustomHeader";
import MyText from "~/components/common/MyText";
import styled from "styled-components/native";
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Input from "~/components/common/Input";
import deviceApi from "~/api/device";
import { DimensionsContext } from "~/context/DimensionsContext";
import Dissolve from "~/components/common/Dissolve";
import Loading from "~/components/common/Loading";
import { useDispatch } from "react-redux";
import { formActions } from "~/store/form";
import { IS_ANDROID, IS_IOS } from "~/constants";

const TopContainer = styled.View``;

const FlexContainer = styled.View`
  flex: 1;
`;

const InputContainer = styled.View`
  flex-direction: row;
  padding: 0 37px;
  justify-content: center;
`;

const inputProps: TextInputProps = { textAlign: "center", maxLength: 1 };
const inputStyle: StyleProp<ViewStyle> = { width: 41, marginRight: 10 };
const textStyle: StyleProp<TextStyle> = { fontSize: 24, paddingBottom: 5 };

interface Form {
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
}

const InvitationCodeForm = ({
  navigation,
}: {
  navigation: InvitationCodeFormScreenNavigationProp;
}) => {
  const { rpHeight } = useContext(DimensionsContext);
  const [postDevice, { isLoading: isPostLoading }] =
    deviceApi.usePostDeviceMutation();
  const [getDeviceProfile, { data, isLoading: isProfileLoading }] =
    deviceApi.useLazyGetProfileByInvitationCodeQuery();
  const dispatch = useDispatch();

  const isLoading = isPostLoading || isProfileLoading;

  const initialState = {
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
    six: "",
  };

  const [form, setForm] = useState<Form>(initialState);
  const oneRef = useRef<TextInput>(null);
  const twoRef = useRef<TextInput>(null);
  const threeRef = useRef<TextInput>(null);
  const fourRef = useRef<TextInput>(null);
  const fiveRef = useRef<TextInput>(null);
  const sixRef = useRef<TextInput>(null);

  const formatText = (text: string) => text.replace(/[^0-9a-zA-Z]/g, "");

  useEffect(() => {
    if (data === undefined) return;
    if (data) {
      const { name, profile_image, species, sex, birthdate } = data;
      dispatch(
        formActions.setState({
          name,
          photos: [profile_image],
          species,
          sex,
          birthYear: new Date(birthdate).getFullYear(),
        }),
      );
    }
    navigation.navigate("Welcome");
  }, [data]);

  const sendRequest = async () => {
    const code = Object.values(form).join("");
    try {
      await postDevice({ invitation_code: code }).unwrap();
      getDeviceProfile(code);
    } catch {
      setForm(initialState);
      setTimeout(() => {
        oneRef.current?.focus();
      }, 200);
    }
  };

  useEffect(() => {
    if (Object.values(form).includes("")) return;
    Keyboard.dismiss();
    setTimeout(() => {
      sendRequest();
    }, 200);
  }, [form]);

  useEffect(() => {
    setTimeout(() => {
      oneRef.current?.focus();
    }, 200);
  }, []);

  const setText = (text: string, key: keyof Form) => {
    const num = formatText(text);
    if (num) {
      setForm(prev => {
        const copy = { ...prev };
        copy[key] = num;
        return copy;
      });
      switch (key) {
        case "one":
          setTimeout(() => {
            twoRef.current?.focus();
          }, 1);
          break;
        case "two":
          threeRef.current?.focus();
          break;
        case "three":
          fourRef.current?.focus();
          break;
        case "four":
          fiveRef.current?.focus();
          break;
        case "five":
          sixRef.current?.focus();
          break;
        default:
          break;
      }
    } else {
      console.log("jaha");
      setForm(prev => {
        const copy = { ...prev };
        copy[key] = "";
        return copy;
      });
    }
  };

  return (
    <>
      <Dissolve style={StyleSheet.absoluteFill} isVisible={isLoading}>
        <Loading loadingText="로딩중" />
      </Dissolve>
      <Dissolve style={StyleSheet.absoluteFill} isVisible={!isLoading}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlexContainer>
            <TopContainer
              style={{
                ...(IS_IOS && {
                  height: "50%",
                  justifyContent: "space-between",
                }),
              }}>
              <CustomHeader navigation={navigation} />
              <View style={{ marginTop: IS_ANDROID ? rpHeight(150, true) : 0 }}>
                <InputContainer>
                  <Input
                    value={form.one}
                    ref={oneRef}
                    onChangeText={text => setText(text, "one")}
                    containerStyle={inputStyle}
                    style={textStyle}
                    {...inputProps}
                  />
                  <Input
                    value={form.two}
                    ref={twoRef}
                    onChangeText={text => setText(text, "two")}
                    containerStyle={inputStyle}
                    style={textStyle}
                    {...inputProps}
                  />
                  <Input
                    value={form.three}
                    ref={threeRef}
                    onChangeText={text => setText(text, "three")}
                    containerStyle={inputStyle}
                    style={textStyle}
                    {...inputProps}
                  />
                  <Input
                    value={form.four}
                    ref={fourRef}
                    onChangeText={text => setText(text, "four")}
                    containerStyle={inputStyle}
                    style={textStyle}
                    {...inputProps}
                  />
                  <Input
                    value={form.five}
                    ref={fiveRef}
                    onChangeText={text => setText(text, "five")}
                    containerStyle={inputStyle}
                    style={textStyle}
                    {...inputProps}
                  />
                  <Input
                    value={form.six}
                    ref={sixRef}
                    onChangeText={text => setText(text, "six")}
                    containerStyle={inputStyle}
                    style={textStyle}
                    {...inputProps}
                  />
                </InputContainer>
                <MyText
                  fontSize={24}
                  style={{ textAlign: "center", marginTop: rpHeight(64) }}>
                  초대코드{"\n"}여섯 자리를 입력해주세요.
                </MyText>
              </View>
            </TopContainer>
          </FlexContainer>
        </TouchableWithoutFeedback>
      </Dissolve>
    </>
  );
};

export default InvitationCodeForm;
