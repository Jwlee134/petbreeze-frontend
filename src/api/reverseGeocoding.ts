import axios from "axios";
import { IReverseGeocoding } from "~/types/api";

export const reverseGeocodingAPI = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) =>
  axios.get<IReverseGeocoding>(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&orders=addr,admcode&output=json`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "vhu5sjamw3",
        "X-NCP-APIGW-API-KEY": "LzrtmHQuyxucZfFjp9ulOMMm0NR8ZG7Fi7cxx0BZ",
      },
    },
  );
