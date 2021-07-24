import api, { providesList } from ".";

interface IDevice {
  id: string;
  name: string;
  profile_image: string;
  location_info_collection_period: number;
  battery: number;
  firmware_version: string;
}

interface ISharedDevice {
  key: string;
  device_id: string;
  expiry_time: string;
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
  profile_image: string;
}

const device = api.injectEndpoints({
  endpoints: builder => ({
    getDeviceList: builder.query<IDevice[], void>({
      query: () => "/device/",
      providesTags: result => providesList(result, "Device"),
    }),

    postDevice: builder.mutation<{ detail: string; device_id: number }, string>(
      {
        query: devEUI => ({
          url: "/device/",
          method: "POST",
          headers: {
            devEUI,
          },
        }),
        invalidatesTags: (result, error) =>
          !error ? [{ type: "Device", id: "LIST" }] : [],
      },
    ),

    postDeviceSharingPermission: builder.mutation<
      ISharedDevice,
      { device_id: string; duration: number }
    >({
      query: ({ device_id, duration }) => ({
        url: `/device/share/${device_id}/?expire-hours=${duration}`,
        method: "POST",
      }),
    }),

    getSharedDeviceList: builder.query<IDevice[], void>({
      query: () => "/device/shared/",
      providesTags: result => providesList(result, "SharedDevice"),
    }),

    postSharedDevice: builder.mutation<void, string>({
      query: sharing_key => ({
        url: "/device/shared/",
        method: "POST",
        header: {
          "sharing-key": sharing_key,
        },
      }),
      invalidatesTags: (result, error) =>
        !error ? [{ type: "SharedDevice", id: "LIST" }] : [],
    }),

    deleteDevice: builder.mutation<void, string>({
      query: deviceId => ({
        url: `/device/${deviceId}/`,
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

    getLocationCollectionInterval: builder.query<
      {
        location_info_collection_period: number;
      },
      string
    >({
      query: deviceId => `/device/${deviceId}/collection-period/`,
    }),

    updateLocationCollectionInterval: builder.mutation<
      {
        location_info_collection_period: number;
      },
      {
        deviceId: string;
        interval: number;
      }
    >({
      query: ({ deviceId, interval }) => ({
        url: `/device/${deviceId}/collection-period/`,
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

    getDeviceProfile: builder.query<IDeviceProfile, string>({
      query: deviceId => `/device/${deviceId}/profile/`,
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
        url: `/device/${deviceId}/profile/`,
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
        url: `/device/profile/`,
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

    getSafetyZone: builder.query<ISafetyZone, string>({
      query: deviceId => `/device/${deviceId}/safety-zone/`,
    }),

    updateSafetyZone: builder.mutation<
      ISafetyZone,
      {
        deviceId: string;
        body: ISafetyZone;
      }
    >({
      query: ({ deviceId, body }) => ({
        url: `/device/${deviceId}/safety-zone/`,
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
  useGetDeviceListQuery,
  usePostDeviceMutation,
  usePostDeviceSharingPermissionMutation,
  useGetSharedDeviceListQuery,
  usePostSharedDeviceMutation,
  useDeleteDeviceMutation,
  useGetLocationCollectionIntervalQuery,
  useUpdateLocationCollectionIntervalMutation,
  useGetDeviceProfileQuery,
  useUpdateDeviceProfileMutation,
  useUpdateDeviceProfileAvatarMutation,
  useGetSafetyZoneQuery,
  useUpdateSafetyZoneMutation,
} = device;
