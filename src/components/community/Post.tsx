import React from "react";
import { Dimensions, Image } from "react-native";
import styled from "styled-components/native";
import { PostScreenNavigationProp } from "~/types/navigator";

import { useAppSelector } from "~/store";
import { useNavigation } from "@react-navigation/core";
import { formatCreatedAt } from "~/utils";
import { useState } from "react";

interface IProps {
  data: {
    name: string;
    createdAt: string;
    location: string;
    id: number;
    creator: {
      name: string;
      avatarUrl: any;
    };
    description: string;
  };
}

const width = Dimensions.get("screen").width;

const Container = styled.View``;

const TextContainer = styled.View`
  padding: 10px 15px;
`;

const CreatorAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 15px;
`;

const SpaceBetweenContainer = styled.View`
  justify-content: space-between;
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const TextRowContainer = styled(RowContainer)`
  align-items: center;
  flex-wrap: wrap;
`;

const ImageContainer = styled.View``;

const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const BelowName = styled.Text`
  opacity: 0.5;
`;

const Description = styled.Text`
  font-size: 14px;
  line-height: 20px;
`;

const Toggle = styled.TouchableOpacity``;

const Post = ({ data }: IProps) => {
  const { currentHomeTab } = useAppSelector(state => state.common);
  const navigation = useNavigation<PostScreenNavigationProp>();

  const [showMore, setShowMore] = useState(false);
  const [isMoreThanOneLine, setIsMoreThanOneLine] = useState(false);

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
    <Container>
      <TextContainer>
        <RowContainer>
          <RowContainer>
            <CreatorAvatar source={data.creator.avatarUrl} />
            <SpaceBetweenContainer>
              <Name>{data.creator.name}</Name>
              <BelowName>
                {data.location}, {formatCreatedAt(data.createdAt)}
              </BelowName>
            </SpaceBetweenContainer>
          </RowContainer>
        </RowContainer>
      </TextContainer>
      <ImageContainer>
        <Image
          source={require("~/assets/image/test.jpg")}
          style={{ width, height: width }}
        />
      </ImageContainer>
      <TextContainer>
        <TextRowContainer>
          <Description
            numberOfLines={isMoreThanOneLine && !showMore ? 1 : undefined}
            onTextLayout={e => {
              if (e.nativeEvent.lines.length > 1) {
                setIsMoreThanOneLine(true);
              }
            }}>
            {data.description}
          </Description>
          {isMoreThanOneLine && !showMore && (
            <Toggle onPress={() => setShowMore(true)}>
              <BelowName>더보기</BelowName>
            </Toggle>
          )}
        </TextRowContainer>
      </TextContainer>
    </Container>
  );
};

export default React.memo(Post);
