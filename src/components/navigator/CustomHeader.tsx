import { StackHeaderProps } from "@react-navigation/stack";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { rpWidth } from "~/styles";
import MyText from "../common/MyText";
import Arrow from "~/assets/svg/arrow-left.svg";

interface IProps extends StackHeaderProps {
  children: ReactNode;
  useBackButton?: boolean;
}

const Container = styled.View`
  height: ${rpWidth(44)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  width: ${rpWidth(32)}px;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: ${rpWidth(5)}px;
`;

const CustomHeader = ({
  children,
  navigation,
  useBackButton = false,
}: IProps) => {
  const { top } = useSafeAreaInsets();

  return (
    <Container
      style={{
        marginTop: top,
      }}>
      {useBackButton && (
        <Button onPress={navigation.goBack}>
          <Arrow width={rpWidth(13)} height={rpWidth(21)} />
        </Button>
      )}
      <MyText fontWeight="medium" fontSize={18}>
        {children}
      </MyText>
    </Container>
  );
};

export default CustomHeader;
