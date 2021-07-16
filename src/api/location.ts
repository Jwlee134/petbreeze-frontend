import api from ".";

const location = api.injectEndpoints({
  endpoints: builder => ({
    getDeviceLocation: builder.query<void, string>({
      query: deviceId => `/location/${deviceId}/`,
    }),
  }),
});

export const { useLazyGetDeviceLocationQuery } = location;
