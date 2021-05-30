import React from "react";
import { Dimensions, Image, StyleProp, ViewStyle } from "react-native";
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

const Container = styled.TouchableOpacity``;

const TextContainer = styled.View`
  margin: 9px 5px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
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
`;

const DateText = styled(IconRightText)`
  font-weight: 300;
`;

const Post = ({ data, style }: IProps) => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const width = (Dimensions.get("window").width - 60) / 2;
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
    <Container activeOpacity={0.9} style={style} onPress={handlePress}>
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
