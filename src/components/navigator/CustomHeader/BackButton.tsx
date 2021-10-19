import React, { useContext } from "react";
import styled from "styled-components/native";
import Dissolve from "../../common/Dissolve";
import Arrow from "~/assets/svg/arrow/arrow-left.svg";
import { DimensionsContext } from "~/context/DimensionsContext";

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
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <Dissolve
      style={{
        position: "absolute",
        left: rpWidth(5),
        width: rpWidth(32),
        height: "100%",
      }}
      isVisible={!disableBackButton}>
      <Button
        onPress={() => {
          if (onBackButtonPress) {
            onBackButtonPress();
          } else if (navigation) navigation.goBack();
        }}>
        <Arrow width={rpWidth(13)} height={rpWidth(21)} />
      </Button>
    </Dissolve>
  );
};

export default BackButton;
