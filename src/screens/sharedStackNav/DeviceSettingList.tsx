import React, { useContext, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import MyText from "~/components/common/MyText";
import CustomHeader from "~/components/navigator/CustomHeader";
import palette from "~/styles/palette";
import { DeviceSettingListScreenProps } from "~/types/navigator";
import Swipeable from "~/components/common/Swipeable";
import Bye from "~/assets/svg/myPage/bye.svg";
import ListItem from "~/components/common/ListItem";
import DeviceSettingListItem from "~/components/myPage/deviceSetting/DeviceSettingListItem";
import { DimensionsContext } from "~/context/DimensionsContext";
import SwipeableButton from "~/components/common/SwipeableButton";

const DeviceSettingList = ({
  navigation,
  route,
}: DeviceSettingListScreenProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { rpWidth } = useContext(DimensionsContext);

  return (
    <>
      <CustomHeader
        RightButton={() => (
          <TouchableOpacity onPress={() => setIsEdit(prev => !prev)}>
            <MyText color={palette.blue_7b}>{!isEdit ? "편집" : "완료"}</MyText>
          </TouchableOpacity>
        )}
        navigation={navigation}>
        기기설정
      </CustomHeader>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: rpWidth(25),
          flexGrow: 1,
        }}>
        {route.params.deviceList?.map((device, i) => (
          <Swipeable
            animate={i === 0 && isEdit}
            key={device.id}
            RenderRightActions={() => (
              <SwipeableButton backgroundColor="red" onPress={() => {}}>
                <Bye width={rpWidth(44)} height={rpWidth(38)} />
              </SwipeableButton>
            )}
            enableRightActions={isEdit}>
            <ListItem
              onPress={() =>
                navigation.navigate("DeviceSetting", {
                  deviceID: device.id,
                })
              }>
              <DeviceSettingListItem device={device} />
            </ListItem>
          </Swipeable>
        ))}
      </ScrollView>
    </>
  );
};

export default DeviceSettingList;
