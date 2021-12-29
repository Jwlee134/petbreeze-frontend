import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Share, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import deviceApi, { MissingReport } from "~/api/device";
import { IS_IOS, SERVER_IMAGE_URI } from "~/constants";
import useModal from "~/hooks/useModal";
import palette from "~/styles/palette";
import { MissingReportInfoScreenProps } from "~/types/navigator";
import { delay } from "~/utils";
import Button from "../common/Button";
import MyText from "../common/MyText";
import IosBottomModal from "../modal/IosBottomModal";
import IosBottomModalButton from "../modal/IosBottomModalButton";
import Dots from "~/assets/svg/missingReportInfo/3-dots.svg";
import ShareIcon from "~/assets/svg/missingReportInfo/share.svg";
import Divider from "../common/Divider";
import { useDispatch } from "react-redux";
import { formActions } from "~/store/form";
import {
  BOTTOM_MODAL_OUT_TIMING,
  CENTER_MODAL_OUT_TIMING,
} from "~/styles/constants";
import CommonCenterModal from "../modal/CommonCenterModal";

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  padding: 0 32px;
`;

const SettingButton = styled.TouchableOpacity`
  width: 66.5px;
  align-items: center;
  margin-right: -32px;
`;

const MissingReportInfoBottomSheet = ({ data }: { data: MissingReport }) => {
  const navigation =
    useNavigation<MissingReportInfoScreenProps["navigation"]>();
  const {
    params: { name, avatar, deviceID },
  } = useRoute<MissingReportInfoScreenProps["route"]>();

  const [deleteReport, { isLoading }] =
    deviceApi.useDeleteMissingReportMutation();
  const dispatch = useDispatch();
  const photos: string[] = Object.values(data || []).filter(
    item => typeof item === "string" && item.includes(SERVER_IMAGE_URI),
  );
  const {
    open: bottomModalOpen,
    close: bottomModalClose,
    modalProps: bottomModalProps,
  } = useModal();
  const {
    open: centerModalOpen,
    close: centerModalClose,
    modalProps: centerModalProps,
  } = useModal();

  const getTime = (lostTime: string) => {
    const date = new Date(lostTime);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "오후" : "오전";
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${ampm} ${
      ((hour + 11) % 12) + 1
    }시 ${minute ? `${minute}분` : ""}`;
  };

  const shareLink = () => {
    Share.share({
      ...(IS_IOS
        ? {
            url: `https://petbreeze.co/lost?key=${data?.emergency_key}`,
          }
        : {
            message: `https://petbreeze.co/lost?key=${data?.emergency_key}`,
          }),
    });
  };

  const onModifyPress = async () => {
    dispatch(
      formActions.setState({
        emergencyKey: data?.emergency_key,
        hasTag: data?.has_dog_tag,
        phoneNumber: data?.contact_number,
        lostPlace: data?.missing_location,
        message: data?.message,
        lostMonth: new Date(data?.missing_datetime || "").getMonth() + 1,
        lostHour: new Date(data?.missing_datetime || "").getHours(),
        lostDate: new Date(data?.missing_datetime || "").getDate(),
        lostMinute: new Date(data?.missing_datetime || "").getMinutes(),
        photos,
      }),
    );
    bottomModalClose();
    await delay(BOTTOM_MODAL_OUT_TIMING);
    navigation.navigate("MissingReportStackNav", {
      deviceID,
      name,
      avatar,
      isModify: true,
    });
  };

  const onDeletePress = async () => {
    try {
      await deleteReport(deviceID).unwrap();
      centerModalClose();
      await delay(CENTER_MODAL_OUT_TIMING);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    bottomModalClose();
    await delay(BOTTOM_MODAL_OUT_TIMING + 200);
    centerModalOpen();
  };

  return (
    <>
      <BottomSheetScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
        }}>
        <View>
          <MyText
            fontSize={18}
            fontWeight="medium"
            style={{ textAlign: "center", marginTop: 4, marginBottom: 30 }}>
            실종신고 정보
          </MyText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={photos}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <Image
                style={{ width: 150, height: 100 }}
                source={{ uri: item }}
              />
            )}
            ItemSeparatorComponent={() => (
              <View style={{ width: 11, height: 100 }} />
            )}
          />
          <TextContainer>
            <RowContainer
              style={{
                justifyContent: "space-between",
                marginTop: 24,
                marginBottom: 13,
              }}>
              <RowContainer>
                <MyText
                  style={{ marginRight: 8 }}
                  color={palette.blue_7b}
                  fontWeight="medium"
                  fontSize={20}>
                  {data.device_name}
                </MyText>
                <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
                  {data.device_species}
                </MyText>
                <Divider
                  isVertical
                  height={8}
                  style={{ marginHorizontal: 10 }}
                />
                <MyText fontSize={14} color="rgba(0, 0, 0, 0.3)">
                  인식표 {data.has_dog_tag ? "있음" : "없음"}
                </MyText>
              </RowContainer>
              <SettingButton onPress={bottomModalOpen}>
                <Dots />
              </SettingButton>
            </RowContainer>
            <MyText style={{ marginBottom: 11 }} fontWeight="medium">
              {getTime(data.missing_datetime)}
            </MyText>
            <MyText style={{ marginBottom: 11 }} fontWeight="medium">
              {data.missing_location}
            </MyText>
            <MyText style={{ marginBottom: 11 }} color="rgba(0, 0, 0, 0.5)">
              {data.contact_number.replace(
                /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                "$1-$2-$3",
              )}
            </MyText>
            <MyText style={{ marginBottom: 33 }} color="rgba(0, 0, 0, 0.5)">
              {data.message}
            </MyText>
          </TextContainer>
        </View>
        <Button useCommonMarginBottom useBottomInset onPress={shareLink}>
          <MyText color="white" fontWeight="medium">
            공유하기{"    "}
          </MyText>
          <ShareIcon />
        </Button>
      </BottomSheetScrollView>
      <IosBottomModal modalProps={bottomModalProps} close={bottomModalClose}>
        <IosBottomModalButton
          title="수정"
          color="blue"
          onPress={onModifyPress}
        />
        <IosBottomModalButton
          title="삭제"
          color="blue"
          onPress={handleDelete}
        />
        <IosBottomModalButton
          isLast
          title="찾았어요"
          color="red"
          onPress={handleDelete}
        />
      </IosBottomModal>
      <CommonCenterModal
        title="위치공유를 중단하시겠어요?"
        modalProps={centerModalProps}
        close={centerModalClose}
        rightButtonText="확인"
        onRightButtonPress={onDeletePress}
        isLoading={isLoading}
      />
    </>
  );
};

export default MissingReportInfoBottomSheet;
