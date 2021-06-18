import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import CategoryTitle from "~/components/common/CategoryTitle";
import {
  LostDetailScreenNavigationProp,
  LostDetailScreenRouteProp,
} from "~/types/navigator";

import data from "~/assets/lostDetail.json";
import SidePaddingContainer from "~/components/common/container/SidePaddingContainer";

import Share from "~/assets/svg/share.svg";
import More from "~/assets/svg/more.svg";
import HeartRed from "~/assets/svg/heart-red.svg";
import HeartPink from "~/assets/svg/heart-pink.svg";
import palette from "~/styles/palette";
import { insertPointToString, insertDashToString } from "~/utils";

import Modal from "react-native-modal";
import useModal from "~/hooks/useModal";
import ShareModal from "~/components/modal/PostDetailModal/ShareModal";
import SavedModal from "~/components/modal/PostDetailModal/SavedModal";
import ManageModal from "~/components/modal/PostDetailModal/ManageModal";
import ConfirmButton from "~/components/common/button/ConfirmButton";

import { ModalType, ModalHeader } from "~/types";
import PhotoSlider from "~/components/community/PhotoSlider";

const TitleContainer = styled.View`
  margin: 17px 0px;
`;

const BigText = styled.Text`
  font-size: 24px;
  text-align: center;
`;

const Title = styled(BigText)`
  font-weight: bold;
`;

const IconButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background-color: ${palette.gray_e5};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

const IconContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DetailTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const DetailTitle = styled.Text`
  font-size: 17px;
  color: rgba(17, 17, 17, 0.48);
  width: 25%;
`;

const DetailContent = styled.Text`
  font-size: 15px;
  color: rgba(17, 17, 17, 0.48);
  flex-shrink: 1;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const LostDetail = () => {
  const navigation = useNavigation<LostDetailScreenNavigationProp>();
  const route = useRoute<LostDetailScreenRouteProp>();
  const { width, height } = useWindowDimensions();
  console.log(route.params.id);

  const [modalType, setModalType] = useState<ModalType>("share");
  const [modalHeader, setModalHeader] = useState<ModalHeader>("공유하기");

  const { open, close, modalProps, CenterModalComponent } = useModal({
    type: "center",
    handleCancel: () =>
      setTimeout(() => {
        setModalHeader("공유하기");
      }, 300),
  });

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
    open();
  };

  useEffect(() => {
    setModalHeader(
      modalType === "share"
        ? "공유하기"
        : modalType === "saved"
        ? "게시물 저장"
        : modalType === "manage"
        ? "게시물 관리"
        : "",
    );
  }, [modalType]);

  return (
    <>
      <ScrollView>
        <CategoryTitle>실종 동물 정보</CategoryTitle>
        <PhotoSlider data={data.photos} />
        <SidePaddingContainer>
          <TitleContainer>
            <Title>{data.name}</Title>
            <BigText style={{ margin: 10 }}>
              {data.species}, {data.gender}, {data.age}세
            </BigText>
            <IconContainer>
              <IconButton
                style={{ marginLeft: 0 }}
                onPress={() => handleOpenModal("share")}
                activeOpacity={0.7}>
                <Share style={{ marginRight: 2, marginTop: 1 }} />
              </IconButton>
              <IconButton
                onPress={() => handleOpenModal("saved")}
                activeOpacity={0.7}>
                {data.liked ? (
                  <HeartRed style={{ marginTop: 2 }} />
                ) : (
                  <HeartPink style={{ marginTop: 2 }} />
                )}
              </IconButton>
              <IconButton
                onPress={() => handleOpenModal("manage")}
                activeOpacity={0.7}>
                <More />
              </IconButton>
            </IconContainer>
          </TitleContainer>
          <DetailTextContainer>
            <DetailTitle>실종 일자</DetailTitle>
            <DetailContent>{insertPointToString(data.lostDate)}</DetailContent>
          </DetailTextContainer>
          <DetailTextContainer>
            <DetailTitle>실종 장소</DetailTitle>
            <DetailContent>{data.lostPlace}</DetailContent>
          </DetailTextContainer>
          <DetailTextContainer>
            <DetailTitle>특징</DetailTitle>
            <DetailContent>{data.characteristic}</DetailContent>
          </DetailTextContainer>
          <DetailTextContainer>
            <DetailTitle>연락처</DetailTitle>
            <DetailContent>
              {insertDashToString(data.phoneNumber)}
            </DetailContent>
          </DetailTextContainer>
          {data.any && (
            <DetailTextContainer>
              <DetailTitle>기타</DetailTitle>
              <DetailContent>{data.any}</DetailContent>
            </DetailTextContainer>
          )}
        </SidePaddingContainer>
        <ButtonContainer>
          <ConfirmButton
            style={{ marginRight: 3, width: width / 2 - 10 }}
            onPress={() => navigation.navigate("UpdateWitnessedList")}>
            제보 업데이트
          </ConfirmButton>
          <ConfirmButton
            style={{ width: width / 2 - 10 }}
            onPress={() => navigation.navigate("CommentList")}>
            댓글
          </ConfirmButton>
        </ButtonContainer>
      </ScrollView>
      <Modal {...modalProps}>
        <CenterModalComponent
          useContentPadding={
            modalType === "saved" || modalHeader === "전단지 이미지로 저장"
          }
          headerTitle={modalHeader}>
          {modalType === "share" && (
            <ShareModal
              modalHeader={modalHeader}
              setModalHeader={setModalHeader}
            />
          )}
          {modalType === "saved" && <SavedModal />}
          {modalType === "manage" && <ManageModal close={close} />}
        </CenterModalComponent>
      </Modal>
    </>
  );
};

export default LostDetail;
