import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import WitnessedDetail from "~/screens/Shared/WitnessedDetail";
import Notification from "~/screens/Notification";
import AuthSelector from "~/screens/Shared/AuthSelector";
import Walk from "~/screens/Walk";
import LostDetail from "~/screens/Shared/LostDetail";
import { headerStyle, mainTabHeaderStyle } from "~/styles/navigator";
import HeaderBackButton from "~/components/common/button/HeaderBackButton";
import UpdateWitnessedList from "~/screens/Shared/UpdateWitnessedList";
import Home from "~/screens/Home";
import PostAnimalInfo from "~/screens/Shared/PostAnimalInfo";
import { useAppSelector } from "~/store";
import Community from "~/screens/Community";
import Map from "~/screens/Shared/Map";
import MyPage from "~/screens/MyPage";
import MyPost from "~/screens/MyPage/MyPost";
import SavedPost from "~/screens/MyPage/SavedPost";
import PetProfile from "~/screens/MyPage/PetProfile";
import PassManagement from "~/screens/MyPage/PassManagement";
import ServiceCenter from "~/screens/MyPage/ServiceCenter";
import NotificationSetting from "~/screens/MyPage/NotificationSetting";
import DeleteAccount from "~/screens/MyPage/DeleteAccount";
import DeviceSetting from "~/screens/MyPage/DeviceSetting";
import DeviceList from "~/screens/MyPage/DeviceList";
import LocationCollectInterval from "~/screens/MyPage/LocationCollectInterval";
import SafetyZoneSetting from "~/screens/MyPage/SafetyZoneSetting";
import SafetyZoneMap from "~/screens/MyPage/SafetyZoneMap";

const Stack = createStackNavigator();

const SharedStack = ({ screenName }: { screenName: string }) => {
  const { isLoggedIn } = useAppSelector(state => state.user);

  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{
        headerBackImage: () => <HeaderBackButton />,
        ...mainTabHeaderStyle,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      {screenName === "Home" && (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "홈",
          }}
        />
      )}
      {screenName === "Walk" && (
        <Stack.Screen
          name="Walk"
          component={Walk}
          options={{ headerShown: isLoggedIn ? true : false, title: "산책" }}
        />
      )}
      {screenName === "Community" && (
        <Stack.Screen
          name="Community"
          component={Community}
          options={{
            title: "실종/목격",
          }}
        />
      )}
      {screenName === "Notification" && (
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: isLoggedIn ? true : false, title: "알림" }}
        />
      )}
      {screenName === "MyPage" && (
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{
            headerShown: isLoggedIn ? true : false,
            title: "마이페이지",
          }}
        />
      )}
      <Stack.Screen
        name="AuthSelector"
        component={AuthSelector}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="PostAnimalInfo"
        component={PostAnimalInfo}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="LostDetail"
        component={LostDetail}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="WitnessedDetail"
        component={WitnessedDetail}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="UpdateWitnessedList"
        component={UpdateWitnessedList}
        options={{ title: "" }}
      />
      <Stack.Screen name="Map" component={Map} options={{ title: "" }} />
      <Stack.Screen
        name="MyPost"
        component={MyPost}
        options={{
          headerTitle: "내가 쓴 게시물",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="SavedPost"
        component={SavedPost}
        options={{
          headerTitle: "저장한 게시물",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="PetProfile"
        component={PetProfile}
        options={{
          headerTitle: "반려동물 프로필",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="PassManagement"
        component={PassManagement}
        options={{
          headerTitle: "이용권 관리",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="ServiceCenter"
        component={ServiceCenter}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={{
          headerTitle: "알림 설정",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerTitle: "탈퇴하기",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="DeviceSetting"
        component={DeviceSetting}
        options={{
          title: "환경설정",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="DeviceList"
        component={DeviceList}
        options={{
          title: "기기 목록",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="LocationCollectInterval"
        component={LocationCollectInterval}
        options={{
          title: "위치정보 수집주기",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="SafetyZoneSetting"
        component={SafetyZoneSetting}
        options={{
          title: "안심존 설정",
          ...headerStyle,
        }}
      />
      <Stack.Screen
        name="SafetyZoneMap"
        component={SafetyZoneMap}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default SharedStack;
