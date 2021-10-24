import ImagePicker from "react-native-image-crop-picker";
import { store } from "~/store";
import { deviceSettingActions } from "~/store/deviceSetting";
import palette from "~/styles/palette";
import { isIos } from ".";

interface WithID {
  data: string;
  id: number;
}

const hasID = (uri: string | WithID): uri is WithID =>
  (uri as WithID).id !== undefined;

export default {
  openCircleCropper: () =>
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 640,
      height: 640,
      cropping: true,
      cropperCircleOverlay: true,
      cropperActiveWidgetColor: palette.blue_7b,
      showCropFrame: false,
      showCropGuidelines: false,
    }).then(image => {
      if (!image) return;
      store.dispatch(deviceSettingActions.setProfile({ photos: [image.path] }));
    }),
  openThreeTwoRatioCropper: (photos: string[], index?: number) =>
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 1080,
      height: 720,
      cropping: true,
      cropperActiveWidgetColor: palette.blue_7b,
      showCropFrame: false,
      showCropGuidelines: false,
    }).then(image => {
      if (!image) return;
      if (index !== undefined) {
        const copy = [...photos];
        copy[index] = image.path;
        store.dispatch(deviceSettingActions.setProfile({ photos: copy }));
      } else {
        store.dispatch(
          deviceSettingActions.setProfile({ photos: [...photos, image.path] }),
        );
      }
    }),
  handleFormData: (
    uri: string | string[] | { data: string; id: number }[],
    key: string | ((i: number) => string),
  ) => {
    const formData = new FormData();
    if (Array.isArray(uri) && typeof key === "function") {
      uri.forEach((uri, i) => {
        const imageUri = hasID(uri) ? uri.data : uri;
        formData.append(key(hasID(uri) ? uri.id : i + 1), {
          name: imageUri.substring(imageUri.lastIndexOf("/") + 1),
          type: "image/jpeg",
          uri: isIos ? `file://${imageUri}` : imageUri,
        });
      });
    }
    if (typeof uri === "string" && typeof key === "string") {
      formData.append(key, {
        name: uri.substring(uri.lastIndexOf("/") + 1),
        type: "image/jpeg",
        uri: isIos ? `file://${uri}` : uri,
      });
    }
    return formData;
  },
};
