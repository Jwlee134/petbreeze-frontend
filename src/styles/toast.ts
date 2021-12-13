import { BaseToastProps } from "react-native-toast-message";
import { isAndroid } from "~/utils";
import palette from "./palette";

export enum ToastType {
  Notification = "notification",
  Error = "error",
}

const toastStyle = (type: ToastType): BaseToastProps => ({
  style: {
    borderLeftColor:
      type === ToastType.Notification ? palette.blue_86 : palette.red_f0,
    borderLeftWidth: 7,
    height: "auto",
  },
  contentContainerStyle: {
    paddingLeft: 14,
    paddingVertical: 10,
    height: "auto",
  },
  text1Style: {
    ...(isAndroid && { fontWeight: "normal" }),
    fontSize: 15,
    fontFamily: "NotoSansKR-Bold",
    includeFontPadding: false,
  },
  text2Style: {
    fontSize: 15,
    fontFamily: "NotoSansKR-Regular",
    includeFontPadding: false,
  },
  text1NumberOfLines: 1,
  text2NumberOfLines: 3,
});

export default toastStyle;
