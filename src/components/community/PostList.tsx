import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import styled from "styled-components/native";
import { useAppSelector } from "~/store";
import palette from "~/styles/palette";

import Post from "~/components/community/Post";
import useFocusEvent from "~/hooks/useFocusEvent";

const Container = styled.View`
  flex: 1;
`;

const data = [
  {
    name: "코코(진도믹스)",
    createdAt: "2021-06-19T10:52:06.418Z",
    location: "서울특별시 관악구",
    id: 1,
    creator: {
      name: "재원",
      avatarUrl: require("~/assets/image/test.jpg"),
    },
    description: `ㅁㄴㅇㄹㅁㄴㅇ러나이러ㅏ닝머랴ㅐ더라ㅣㅇ느ㅏ프댜ㅐ저랴ㅐㅇ너ㅐ드라ㅇㅣㅇ느팡널냐애ㅁㅓㄹ마ㅣㅇ너랴ㅐㄱ헐ㅇ낭허ㅏㅣㅇㄹ허ㅏㄹ어ㅑㅐㄱ더ㅏ핑눞아ㅣㄴ`,
  },
  {
    name: "천둥(시바이누)",
    createdAt: "2021-06-19T09:11:01.507Z",
    location: "서울특별시 관악구",
    id: 2,
    creator: {
      name: "재원",
      avatarUrl: require("~/assets/image/test.jpg"),
    },
    description: "ㅁㅇㄴㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ",
  },
  {
    name: "코코(진도믹스)",
    createdAt: "2021-06-19T08:11:01.507Z",
    location: "서울특별시 관악구",
    id: 3,
    creator: {
      name: "재원",
      avatarUrl: require("~/assets/image/test.jpg"),
    },
    description:
      "언라어나러댜ㅐㅓ라이너랴대저퍄애느ㅝ 랴ㅐㄱ젚ㄷㄹ재ㅏㅡ래데ㅏㅈㄹ채에날 ㅡㅐㅔㅇ나",
  },
  {
    name: "천둥(시바이누)",
    createdAt: "2021-06-18T10:11:01.507Z",
    location: "서울특별시 관악구",
    id: 4,
    creator: {
      name: "재원",
      avatarUrl: require("~/assets/image/test.jpg"),
    },
    description: "ㅁㄴㅇㄹ",
  },
  {
    name: "코코(진도믹스)",
    createdAt: "2021-04-20T10:11:01.507Z",
    location: "서울특별시 관악구",
    id: 5,
    creator: {
      name: "재원",
      avatarUrl: require("~/assets/image/test.jpg"),
    },
    description:
      "ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ",
  },
];

const PostList = () => {
  useFocusEvent({ isTab: true });
  const { currentTabName } = useAppSelector(state => state.common);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [currentTabName]);

  if (loading)
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={palette.blue_6e} />
      </Container>
    );

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        console.log("end");
      }}
      initialNumToRender={10}
      keyExtractor={(_, index) => `list-${index}`}
      renderItem={({ item }) => <Post data={item} />}
    />
  );
};

export default PostList;
