import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import userApi from "~/api/user";
import { WalkContext } from "~/context/WalkContext";
import palette from "~/styles/palette";
import MyText from "../common/MyText";

const Container = styled.View`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  align-items: flex-end;
  flex-direction: row;
`;

const ItemContainer = styled.View`
  height: 52px;
  justify-content: center;
  width: 95px;
`;

const OnlyOneAvatar = styled.Image`
  width: 41px;
  height: 41px;
  border-radius: 20.5px;
  margin-left: 37px;
  margin-right: 17px;
`;

const MultiAvatarContainer = styled.View`
  width: 57px;
  height: 38px;
  margin-right: 11px;
  margin-left: 32px;
  justify-content: center;
`;

const MultiAvatar = styled.Image`
  width: 34px;
  height: 34px;
  border-radius: 17px;
`;

const AvatarBackground = styled.View`
  background-color: white;
  width: 38px;
  height: 38px;
  border-radius: 19px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
`;

const MultiAvatarOverlay = styled.View`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: ${palette.blue_7b_50};
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  bottom: 2px;
`;

const WalkMapHeader = () => {
  const { width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const { deviceList } = useContext(WalkContext);
  const { data } = userApi.useGetNicknameQuery();

  const deviceNames = deviceList.map(device => device.name).join(" & ");

  return (
    <Container style={{ width, height: top + 52 }}>
      <ItemContainer>
        {deviceList.length === 1 && (
          <OnlyOneAvatar source={{ uri: deviceList[0].profile_image }} />
        )}
        {deviceList.length > 1 && (
          <MultiAvatarContainer>
            <MultiAvatar source={{ uri: deviceList[0].profile_image }} />
            <AvatarBackground>
              <MultiAvatar source={{ uri: deviceList[1].profile_image }} />
              {deviceList.length > 2 && (
                <MultiAvatarOverlay>
                  <MyText color="white" fontSize={12} fontWeight="medium">
                    +{deviceList.length - 2}
                  </MyText>
                </MultiAvatarOverlay>
              )}
            </AvatarBackground>
          </MultiAvatarContainer>
        )}
      </ItemContainer>
      <ItemContainer style={{ width: "auto" }}>
        <MyText fontSize={14} fontWeight="medium">
          {deviceNames}
        </MyText>
        <MyText color="rgba(0, 0, 0, 0.5)" fontSize={12}>
          {data?.nickname || "익명"}
        </MyText>
      </ItemContainer>
    </Container>
  );
};

export default WalkMapHeader;
