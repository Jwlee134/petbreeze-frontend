import api from ".";

const locationApi = api.injectEndpoints({
  endpoints: builder => ({
    getDeviceLocation: builder.query<void, string>({
      query: deviceId => `/location/${deviceId}/`,
    }),
  }),
});

export default locationApi;
