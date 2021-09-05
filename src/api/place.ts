import axios from "axios";

export const getAddress = async (
  query: string,
): Promise<{ addr: string; latitude: number; longitude: number }[]> => {
  const { data } = await axios({
    url: `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`,
    method: "get",
    headers: {
      Authorization: "KakaoAK 704232ad1ac022f18910fdbe94b68a36",
    },
  });
  const format = data.documents.map((addr: any) => ({
    addr: addr.address_name,
    latitude: Number(addr.y),
    longitude: Number(addr.x),
  }));
  return format;
};

export const getPlaceByKeyword = async (query: string) => {
  const { data } = await axios.get(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
  );
};
