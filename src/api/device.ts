import api from ".";

interface IDevice {
  id: number;
  devEUI: string;
  name: string;
  profile_image: string;
  location_info_collection_period: number;
  battery: number;
  firmware_version: string;
}

interface ISafetyZone {
  safety_zone_1_name?: string;
  safety_zone_1_cordinate?: {
    type: "point";
    coordinates: number[];
  };
  safety_zone_1_radius?: number;
  safety_zone_2_name?: string;
  safety_zone_2_cordinate?: {
    type: "point";
    coordinates: number[];
  };
  safety_zone_2_radius?: number;
  safety_zone_3_name?: string;
  safety_zone_3_cordinate?: {
    type: "point";
    coordinates?: number[];
  };
  safety_zone_3_radius?: number;
}

interface IDeviceProfileBody {
  name: string;
  age: number;
  variety: string;
  weight: number;
  contact_number1: string;
  contact_number2: string;
  precaution: string;
}

interface IDeviceProfile extends IDeviceProfileBody {
  id: number;
  devEUI: string;
  profile_image: string;
}

interface ILocationCollectionInterval {
  location_info_collection_period: number;
}

const device = api.injectEndpoints({
  endpoints: builder => ({
    getLocationCollectionInterval: builder.query<
      ILocationCollectionInterval,
      string
    >({
      query: deviceId => `/device/collection-period/${deviceId}/`,
    }),

    updateLocationCollectionInterval: builder.mutation<
      ILocationCollectionInterval,
      {
        deviceId: string;
        location_info_collection_period: number;
      }
    >({
      query: ({ deviceId, location_info_collection_period }) => ({
        url: `/device/collection-period/${deviceId}/`,
        method: "PUT",
        body: {
          location_info_collection_period,
        },
      }),
    }),

    getDeviceList: builder.query<IDevice[], void>({
      query: () => "/device/device-list/",
    }),

    deleteDevice: builder.mutation<void, string>({
      query: deviceId => ({
        url: `/device/device-list/?device_id=${deviceId}`,
        method: "DELETE",
      }),
    }),

    getDevice: builder.query<IDevice, string>({
      query: deviceId => `/device/profile/${deviceId}/`,
    }),

    updateDeviceProfile: builder.mutation<
      IDeviceProfile,
      {
        deviceId: string;
        body: IDeviceProfileBody;
      }
    >({
      query: ({ deviceId, body }) => ({
        url: `/device/profile/${deviceId}/`,
        method: "PUT",
        body,
      }),
    }),

    updateDeviceProfileAvatar: builder.mutation<
      void,
      {
        deviceId: string;
        avatar: FormData;
      }
    >({
      query: ({ deviceId, avatar }) => ({
        url: `/device/profile/${deviceId}/`,
        method: "PATCH",
        body: {
          profile_image: avatar,
        },
      }),
    }),

    registerDevice: builder.query<void, string>({
      query: devEUI => ({
        url: "/device/register/",
        headers: {
          devEUI,
        },
      }),
    }),

    getSafetyZone: builder.query<ISafetyZone, string>({
      query: deviceId => `/device/safety-zone/${deviceId}/`,
    }),

    updateSafetyZone: builder.mutation<
      ISafetyZone,
      {
        deviceId: string;
        body: ISafetyZone;
      }
    >({
      query: ({ deviceId, body }) => ({
        url: `/device/safety-zone/${deviceId}/`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useLazyRegisterDeviceQuery, useUpdateSafetyZoneMutation } =
  device;
