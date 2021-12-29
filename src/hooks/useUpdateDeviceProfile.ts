import { Keyboard } from "react-native";
import deviceApi from "~/api/device";
import { SERVER_IMAGE_URI } from "~/constants";
import { useAppSelector } from "~/store";
import imageHandler from "~/utils/imageHandler";

const useUpdateDeviceProfile = (deviceID: number) => {
  const {
    name,
    birthYear,
    birthMonth,
    birthDay,
    species,
    sex,
    weight,
    photos,
  } = useAppSelector(state => state.form);
  const [
    triggerProfile,
    { isLoading: loadingProfile, isSuccess: profileSuccess },
  ] = deviceApi.useUpdateDeviceProfileMutation();
  const [
    triggerAvatar,
    { isLoading: loadingAvatar, isSuccess: avatarSuccess },
  ] = deviceApi.useUpdateDeviceProfileAvatarMutation();

  const isLoading = loadingProfile || loadingAvatar;
  const isSuccess = profileSuccess || avatarSuccess;

  const updateProfileReq = async () => {
    if (isLoading) return;
    Keyboard.dismiss();
    if (photos[0] && !photos[0].includes(SERVER_IMAGE_URI)) {
      try {
        await triggerAvatar({
          deviceID,
          body: imageHandler.handleFormData(photos[0], "profile_image"),
        }).unwrap();
      } catch {
        return;
      }
    }
    try {
      await triggerProfile({
        deviceID,
        body: {
          name,
          sex,
          weight: parseInt(weight, 10),
          species,
          birthdate: `${birthYear}-${birthMonth}-${birthDay}`,
        },
      }).unwrap();
    } catch {}
  };

  return { updateProfileReq, isLoading, isSuccess };
};

export default useUpdateDeviceProfile;
