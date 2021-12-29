import { BaseToastProps } from "react-native-toast-message";
import { IS_ANDROID, TOAST_TYPE } from "~/constants";
import palette from "./palette";

const toastStyle = (type: TOAST_TYPE): BaseToastProps => ({
  style: {
    borderLeftColor:
      type === TOAST_TYPE.NOTIFICATION ? palette.blue_86 : palette.red_f0,
    borderLeftWidth: 7,
    height: "auto",
  },
  contentContainerStyle: {
    paddingLeft: 14,
    paddingVertical: 10,
    height: "auto",
  },
  text1Style: {
    ...(IS_ANDROID && { fontWeight: "normal" }),
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
