import ImagePicker from "react-native-image-crop-picker";
import { serverImageUri } from "~/constants";
import { store } from "~/store";
import { formActions } from "~/store/form";
import palette from "~/styles/palette";
import { isIos } from ".";
import permissionCheck from "./permissionCheck";

interface WithID {
  data: string;
  id: number;
}

const hasID = (uri: string | WithID): uri is WithID =>
  (uri as WithID).id !== undefined;

export default {
  openCircleCropper: () =>
    permissionCheck.library().then(() => {
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
        store.dispatch(formActions.setState({ photos: [image.path] }));
      });
    }),

  openThreeTwoRatioCropper: (
    photos: string[],
    index?: number,
    callback?: () => void,
  ) =>
    permissionCheck.library().then(() => {
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
          store.dispatch(formActions.setState({ photos: copy }));
        } else {
          store.dispatch(
            formActions.setState({ photos: [...photos, image.path] }),
          );
        }
        if (callback) {
          callback();
        }
      });
    }),

  handleFormData: (
    uri: string | string[] | { data: string; id: number }[],
    key: string | ((i: number) => string),
  ) => {
    const formData = new FormData();
    if (Array.isArray(uri) && typeof key === "function") {
      uri.forEach((uri, i) => {
        const imageUri = hasID(uri) ? uri.data : uri;
        if (imageUri.includes(serverImageUri)) return;
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
