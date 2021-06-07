import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

import data from "~/assets/data.json";
import Post from "~/components/Post";
import useFocusEvent from "~/hooks/useFocusEvent";

const Container = styled.View`
  flex: 1;
  margin-top: 65px;
`;

const List = styled.FlatList`
  margin-top: 70px;
`;

const PostList = () => {
  useFocusEvent({ isHomeTab: true });
  const { currentHomeTab } = useAppSelector(state => state.common);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [currentHomeTab]);

  if (loading)
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={palette.blue_6e} />
      </Container>
    );

  return (
    <List
      data={data}
      keyExtractor={(_, index) => `list-${index}`}
      renderItem={({ item, index }) => (
        <Post data={item} style={{ marginRight: index % 2 === 0 ? 10 : 0 }} />
      )}
      numColumns={2}
      key={2}
      contentContainerStyle={{
        paddingHorizontal: 25,
      }}
    />
  );
};

export default PostList;
