import React from "react";
import styled from "styled-components/native";
import Switch from "~/components/common/Switch";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

import Heart from "~/assets/svg/heart-pink.svg";
import My from "~/assets/svg/my.svg";
import Alert from "~/assets/svg/alert.svg";
import { useAppSelector } from "~/store";
import { useDispatch } from "react-redux";
import { storageActions } from "~/store/storage";
import { ScrollView } from "react-native";

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.View`
  margin-right: 25px;
`;

const Text = styled.Text`
  font-size: 16px;
`;

const NotificationSetting = () => {
  const { savedPost, myPost, mySurrounding } = useAppSelector(
    state => state.storage.notifications,
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <SidePaddingContainer>
        <Container style={{ marginTop: 16 }}>
          <LeftContainer>
            <IconContainer>
              <Heart />
            </IconContainer>
            <Text>저장한 게시물 업데이트</Text>
          </LeftContainer>
          <Switch
            isOn={savedPost}
            onToggle={() => dispatch(storageActions.setSavedPost(!savedPost))}
          />
        </Container>
        <Container>
          <LeftContainer>
            <IconContainer>
              <My />
            </IconContainer>
            <Text>작성한 게시물 업데이트</Text>
          </LeftContainer>
          <Switch
            isOn={myPost}
            onToggle={() => dispatch(storageActions.setMyPost(!myPost))}
          />
        </Container>
        <Container>
          <LeftContainer>
            <IconContainer>
              <Alert />
            </IconContainer>
            <Text>내 주위의 실종신고 업데이트</Text>
          </LeftContainer>
          <Switch
            isOn={mySurrounding}
            onToggle={() =>
              dispatch(storageActions.setMySurrounding(!mySurrounding))
            }
          />
        </Container>
      </SidePaddingContainer>
    </ScrollView>
  );
};

export default NotificationSetting;