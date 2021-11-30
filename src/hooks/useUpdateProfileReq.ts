import { Keyboard } from "react-native";
import deviceApi from "~/api/device";
import { serverImageUri } from "~/constants";
import { useAppSelector } from "~/store";
import imageHandler from "~/utils/imageHandler";

const useUpdateProfileReq = (deviceID: number) => {
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
  const [triggerProfile, { isLoading: loadingProfile }] =
    deviceApi.useUpdateDeviceProfileMutation();
  const [triggerAvatar, { isLoading: loadingAvatar }] =
    deviceApi.useUpdateDeviceProfileAvatarMutation();

  const isLoading = loadingProfile || loadingAvatar;

  const updateProfileReq = async () => {
    if (isLoading) return;
    Keyboard.dismiss();
    if (photos[0] && !photos[0].includes(serverImageUri)) {
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
    } catch {
      return;
    }
  };

  return { updateProfileReq, isLoading };
};

export default useUpdateProfileReq;
