import axios from "axios";

export const getAddress = async (
  query: string,
): Promise<{ address: string; latitude: number; longitude: number }[]> => {
  const { data } = await axios({
    url: `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`,
    method: "get",
    headers: {
      Authorization: "KakaoAK 704232ad1ac022f18910fdbe94b68a36",
    },
  });
  const format = data.documents.map((addr: any) => ({
    address: addr.address_name,
    latitude: Number(addr.y),
    longitude: Number(addr.x),
  }));
  return format;
};

export const getAddressByCoord = async (
  lat: number,
  lng: number,
): Promise<string> => {
  const { data } = await axios({
    url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
    method: "get",
    headers: {
      Authorization: "KakaoAK 704232ad1ac022f18910fdbe94b68a36",
    },
  });
  const name = data.documents[0]?.address?.address_name;
  return name || "주소 없음";
};
