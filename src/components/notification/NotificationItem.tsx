import React, { memo, useContext } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";
import { DimensionsContext, RpWidth } from "~/context/DimensionsContext";
import palette from "~/styles/palette";
import { formatCreatedAt } from "~/utils";
import MyText from "../common/MyText";
import Arrow from "~/assets/svg/arrow/arrow-right-blue.svg";
import { Notification } from "~/api/user";

const Container = styled.TouchableOpacity<{ rpWidth: RpWidth }>`
  padding: ${({ rpWidth }) => `0 ${rpWidth(32)}px`};
  margin-bottom: ${({ rpWidth }) => rpWidth(20)}px;
  flex-direction: row;
  align-items: center;
`;

const Image = styled.Image<{ rpWidth: RpWidth }>`
  ${({ rpWidth }) => css`
    width: ${rpWidth(50)}px;
    height: ${rpWidth(50)}px;
    border-radius: ${rpWidth(25)}px;
    margin-right: ${rpWidth(17)}px;
  `}
`;

const TextContainer = styled.View<{ rpWidth: RpWidth }>`
  padding-right: ${({ rpWidth }) => rpWidth(32)}px;
  flex: 1;
`;

const NotificationItem = ({ data }: { data: Notification }) => {
  const { rpWidth } = useContext(DimensionsContext);
  /*  const showArrow = !data.body.title.includes("배터리"); */

  return (
    <Container rpWidth={rpWidth}>
      {/* <Image rpWidth={rpWidth} source={require("~/assets/image/test.jpg")} />
      <TextContainer rpWidth={rpWidth}>
        <MyText
          fontSize={14}
          color={data.title.includes("안심존") ? palette.red_f0 : undefined}>
          {data.title}
          {"    "}
          <View>
            <MyText
              style={{
                marginTop: rpWidth(3),
                marginBottom: -rpWidth(2, true),
              }}
              fontSize={12}
              color="rgba(0, 0, 0, 0.3)">
              {formatCreatedAt(data.sentTime)}
            </MyText>
          </View>
        </MyText>
      </TextContainer>
      {showArrow ? (
        <Arrow
          width={rpWidth(7)}
          height={rpWidth(12)}
          style={{ marginTop: rpWidth(3) }}
        />
      ) : null} */}
    </Container>
  );
};

export default memo(NotificationItem);
