import { useState } from "react";
import { Alert } from "react-native";
import { reverseGeocodingAPI } from "~/api/postAnimalInfo";
import { formatGeocodingAddr } from "~/utils";

const useReverseGeocoding = () => {
  const [loading, setLoading] = useState(false);

  const getAddress = async (latitude: number, longitude: number) => {
    const { data } = await reverseGeocodingAPI({ latitude, longitude });
    if (data.status.code === 3) {
      setLoading(false);
      return Alert.alert("해당 지역의 주소를 불러올 수 없습니다.");
    }
    const address = formatGeocodingAddr(data);
    return address[0];
  };

  return { loading, setLoading, getAddress };
};

export default useReverseGeocoding;
