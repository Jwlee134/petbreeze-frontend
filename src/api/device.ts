import api, { providesList } from ".";

interface IDeviceProfile {
  id: string;
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
  id: string;
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
        interval: number;
      }
    >({
      query: ({ deviceId, interval }) => ({
        url: `/device/collection-period/${deviceId}/`,
        method: "PUT",
        body: {
          location_info_collection_period: interval,
        },
      }),
      onQueryStarted: async (
        { deviceId, interval },
        { dispatch, queryFulfilled },
      ) => {
        const putResult = dispatch(
          device.util.updateQueryData(
            "getLocationCollectionInterval",
            deviceId,
            draft => {
              draft.location_info_collection_period = interval;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();
        }
      },
    }),

    getDeviceList: builder.query<IDeviceProfile[], void>({
      query: () => "/device/device-list/",
      providesTags: result => providesList(result, "Device"),
    }),

    deleteDevice: builder.mutation<void, string>({
      query: deviceId => ({
        url: `/device/device-list/?device_id=${deviceId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (deviceId, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          device.util.updateQueryData("getDeviceList", undefined, draft => {
            draft.splice(
              draft.findIndex(device => device.id === deviceId),
              1,
            );
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
    }),

    getDeviceProfile: builder.query<IDeviceProfile, string>({
      query: deviceId => `/device/profile/${deviceId}/`,
      providesTags: (result, error, deviceId) => [
        { type: "Device", id: deviceId },
      ],
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
      onQueryStarted: async (
        { deviceId, body },
        { dispatch, queryFulfilled },
      ) => {
        const putResult = dispatch(
          device.util.updateQueryData("getDeviceProfile", deviceId, draft => {
            Object.assign(draft, body);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();
        }
      },
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
      onQueryStarted: async (
        { deviceId, avatar },
        { dispatch, queryFulfilled },
      ) => {
        const patchResult = dispatch(
          device.util.updateQueryData("getDeviceProfile", deviceId, draft => {
            Object.assign(draft, { profile_image: avatar });
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    registerDevice: builder.query<
      { detail: string; device_id: number },
      string
    >({
      query: devEUI => ({
        url: "/device/register/",
        headers: {
          devEUI: devEUI,
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
      onQueryStarted: async (
        { deviceId, body },
        { dispatch, queryFulfilled },
      ) => {
        const putResult = dispatch(
          device.util.updateQueryData("getSafetyZone", deviceId, draft => {
            Object.assign(draft, body);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();
        }
      },
    }),
  }),
});

export const {
  useUpdateDeviceProfileAvatarMutation,
  useDeleteDeviceMutation,
  useUpdateSafetyZoneMutation,
  useUpdateDeviceProfileMutation,
  useUpdateLocationCollectionIntervalMutation,
  useLazyRegisterDeviceQuery,
  useGetLocationCollectionIntervalQuery,
  useGetDeviceListQuery,
  useGetDeviceProfileQuery,
  useGetSafetyZoneQuery,
} = device;
