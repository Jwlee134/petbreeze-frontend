import api from ".";
import { DeviceCoord } from "./device";

const emergencyApi = api.injectEndpoints({
  endpoints: builder => ({
    getLocation: builder.query<DeviceCoord, string>({
      query: key => ({
        url: `/emergency/location/?emergency-key=${key}`,
        method: "GET",
      }),
    }),
  }),
});

export default emergencyApi;
