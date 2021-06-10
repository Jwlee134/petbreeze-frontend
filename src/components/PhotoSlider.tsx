import React, { useState } from "react";
import { useWindowDimensions, FlatList, Image } from "react-native";
import styled from "styled-components/native";

const Container = styled.View``;

const IndexContainer = styled.View`
  justify-content: center;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const PhotoSlider = ({ data }: { data: any[] }) => {
  const { width } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <Container>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={e =>
          setCurrentIndex(
            Math.round((e.nativeEvent.contentOffset.x + width) / width),
          )
        }
        keyExtractor={(_, index) => `${index}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={require("~/assets/image/test.jpg")}
            style={{ width, height: width }}
          />
        )}
      />
      <IndexContainer>
        <Text>
          {currentIndex}/{data.length}
        </Text>
      </IndexContainer>
    </Container>
  );
};

export default PhotoSlider;
