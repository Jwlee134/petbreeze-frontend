import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import styled from "styled-components/native";
import palette from "~/styles/palette";
import { PostScreenNavigationProp } from "~/types/navigator";

import Calendar from "~/assets/svg/calendar.svg";
import Location from "~/assets/svg/location.svg";
import { useAppSelector } from "~/store";
import { useNavigation } from "@react-navigation/core";

interface IProps {
  data: any;
  style?: StyleProp<ViewStyle>;
}

const Container = styled.TouchableOpacity`
  width: ${Dimensions.get("screen").width / 2 - 30}px;
`;

const TextContainer = styled.View`
  margin: 9px 5px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
  align-items: center;
`;

const Name = styled.Text`
  font-size: 18px;
`;

const Status = styled.Text`
  text-transform: uppercase;
  color: ${palette.red_ff};
  margin-left: 3px;
  font-size: 12px;
`;

const IconRightText = styled.Text`
  margin-left: 10px;
  flex-shrink: 1;
`;

const DateText = styled(IconRightText)`
  font-weight: 300;
`;

const Post = ({ data, style }: IProps) => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const width = (Dimensions.get("screen").width - 60) / 2;
  const navigation = useNavigation<PostScreenNavigationProp>();

  const handlePress = () => {
    if (currentHomeTab === "LostList") {
      navigation.navigate("LostDetail", {
        id: data.id,
      });
    } else {
      navigation.navigate("WitnessedDetail", {
        id: data.id,
      });
    }
  };

  return (
    <Container activeOpacity={0.8} style={style} onPress={handlePress}>
      <Image
        source={require("~/assets/image/test.jpg")}
        style={{ width, height: width }}
      />
      <TextContainer>
        <RowContainer>
          <Name>{data.name}</Name>
          <Status>New</Status>
        </RowContainer>
        <RowContainer>
          <Calendar />
          <DateText>{data.date}</DateText>
        </RowContainer>
        <RowContainer>
          <Location />
          <IconRightText>{data.location}</IconRightText>
        </RowContainer>
      </TextContainer>
    </Container>
  );
};

export default Post;
