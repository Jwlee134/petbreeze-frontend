import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const onKeyboardDidShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const didShow = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    const didHide = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  return { keyboardHeight };
};

export default useKeyboard;
