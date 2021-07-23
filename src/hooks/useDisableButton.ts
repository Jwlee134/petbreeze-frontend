import { useEffect, useState } from "react";

const useDisableButton = () => {
  const [disabled, setDisabled] = useState(false);

  const disable = () => setDisabled(true);

  useEffect(() => {
    if (disabled) {
      setTimeout(() => {
        setDisabled(false);
      }, 500);
    }
  }, [disabled]);

  return { disabled, disable };
};

export default useDisableButton;
