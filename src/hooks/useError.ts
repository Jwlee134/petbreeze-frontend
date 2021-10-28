import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const useError = ({
  error,
  type,
  callback = () => {},
}: {
  error: FetchBaseQueryError | SerializedError | undefined;
  type: "Device" | "Auth";
  callback?: () => void;
}) => {
  useEffect(() => {
    if (!error) return;

    if ("originalStatus" in error && error.originalStatus === 500) {
      Toast.show({ type: "error", text1: "서버에 연결할 수 없습니다." });
      return;
    }

    if (!("status" in error)) return;

    if (error.status === 401) return;

    if (type === "Device") {
      if (error.status === 400) {
        if (error.data.detail.includes("already in emergency")) {
          Toast.show({ type: "error", text1: "이미 긴급실종 상태입니다." });
        }
        if (error.data.detail.includes("not in emergency")) {
          Toast.show({ type: "error", text1: "긴급실종 상태가 아닙니다." });
        }
      }

      if (error.status === 403) {
        Toast.show({ type: "error", text1: "디바이스의 멤버가 아닙니다." });
      }

      if (error.status === 404) {
        if (error.data.detail === "Device id does not exist.") {
          Toast.show({ type: "error", text1: "디바이스가 존재하지 않습니다." });
        }
        if (error.data.detail.includes("not in emergency")) {
          Toast.show({ type: "error", text1: "긴급실종 상태가 아닙니다." });
        }
        if (error.data.detail === "Walk id does not exist.") {
          Toast.show({
            type: "error",
            text1: "산책 기록이 존재하지 않습니다.",
          });
        }
        if (error.data.detail === "User id does not exist.") {
          Toast.show({ type: "error", text1: "사용자가 존재하지 않습니다." });
        }
      }
    }

    if (type === "Auth") {
      if (error.status === 409) {
        Toast.show({
          type: "error",
          text1: "이미 다른 소셜 계정으로 가입된 이메일입니다.",
        });
      }
    }

    callback();
  }, [error, type]);
};

export default useError;
