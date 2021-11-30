import React from "react";
import styled from "styled-components/native";
import Dissolve from "../../common/Dissolve";
import Arrow from "~/assets/svg/arrow/arrow-left.svg";

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackButton = ({
  disableBackButton,
  onBackButtonPress,
  navigation,
}: {
  disableBackButton?: boolean;
  onBackButtonPress?: () => void;
  navigation: any;
}) => {
  const onPress = () => {
    if (onBackButtonPress) {
      onBackButtonPress();
    } else if (navigation) navigation.goBack();
  };

  return (
    <Dissolve
      style={{
        position: "absolute",
        left: 5,
        width: 32,
        height: "100%",
      }}
      isVisible={!disableBackButton}>
      <Button onPress={onPress}>
        <Arrow width={13} height={21} />
      </Button>
    </Dissolve>
  );
};

export default BackButton;
