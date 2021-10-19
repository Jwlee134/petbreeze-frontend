import api, { providesList } from ".";

export interface Device {
  id: number;
  name: string;
  profile_image: string;
  collection_period: number;
  battery: number;
  firmware_version: string;
  is_missed: boolean;
}

interface EmergencyMissingThumbnail {
  image1_thumbnail: string;
  image2_thumbnail: string;
  image3_thumbnail: string;
  image4_thumbnail: string;
}

interface EmergencyMissingForm {
  missing_datetime: string;
  missing_location: string;
  characteristic: string;
  message: string;
}

interface EmergencyMissing
  extends EmergencyMissingForm,
    EmergencyMissingThumbnail {
  device_name: string;
  device_species: string;
  emergency_key: string;
}

interface DeviceCoord {
  date_time: string;
  coordinate: {
    type: "Point";
    coordinates: number[];
  };
}

interface DeviceMember {
  user_id: number;
  nickname: string;
}

interface DeviceMembers {
  owner_id: number;
  members: DeviceMember[];
}

interface DeviceProfileBody {
  name: string;
  birthdate: string;
  sex: boolean;
  species: string;
  weight: number;
  characteristic: number;
}

export interface DeviceProfile extends DeviceProfileBody {
  profile_image: string;
}

interface DeviceSetting {
  Period: number;
  Area: {
    id: number;
    name: string;
    address: string;
    data: number[];
    image: string;
  }[];
  WiFi: { id: number; ssid: string; pw: string }[];
}

interface SafetyZoneThumbnail<T> {
  safety_area_0_thumbnail: T;
  safety_area_1_thumbnail: T;
  safety_area_2_thumbnail: T;
}

interface DailyWalkRecord {
  id: number;
  start_date_time: string;
  time: number;
  distance: number;
  handler__nickname: string;
  path_image: string;
}

interface MonthlyWalkRecord {
  summary: {
    total_time: string;
    total_distance: number;
    count: number;
  };
  day_count: { date: string; count: number }[];
}

interface WalkBody {
  start_date_time: string;
  time: number;
  distance: number;
  travel_path: {
    type: "MultiPoint";
    coordinates: number[][];
  };
}

const deviceApi = api.injectEndpoints({
  endpoints: builder => ({
    getDeviceList: builder.query<Device[], void>({
      query: () => "/devices/",
      providesTags: result => providesList(result, "Device"),
    }),

    postDevice: builder.mutation<{ detail: string; device_id: number }, string>(
      {
        query: IMEInumber => ({
          url: "/device/",
          method: "POST",
          body: {
            IMEInumber,
          },
        }),
        invalidatesTags: () => [{ type: "Device", id: "LIST" }],
      },
    ),

    deleteDevice: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Device", id: "LIST" }],
      onQueryStarted: async (deviceID, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft =>
            draft.filter(device => device.id !== deviceID),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
    }),

    getEmergencyMissing: builder.query<EmergencyMissing, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/emergency/`,
        method: "GET",
      }),
    }),

    postEmergencyMissing: builder.mutation<
      EmergencyMissing,
      { deviceID: number; body: EmergencyMissingForm }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/emergency/`,
        method: "POST",
        body,
      }),
    }),

    updateEmergencyMissing: builder.mutation<
      EmergencyMissing,
      { deviceID: number; body: EmergencyMissing }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/emergency/`,
        method: "PUT",
        body,
      }),
    }),

    patchEmergencyMissingPhoto: builder.mutation<
      EmergencyMissingThumbnail,
      { deviceID: number; body: EmergencyMissingThumbnail }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/emergency/`,
        headers: {
          "content-type": "multipart/form-data",
        },
        method: "PATCH",
        body,
      }),
    }),

    deleteEmergencyMissing: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/emergency/`,
        method: "DELETE",
      }),
    }),

    getDeviceCoord: builder.query<DeviceCoord, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/location/`,
        method: "GET",
      }),
    }),

    getDeviceMembers: builder.query<DeviceMembers, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/members/`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Device", id: "MEMBER" }],
    }),

    deleteDeviceMember: builder.mutation<
      { members: DeviceMember[] },
      { deviceID: number; userID: number }
    >({
      query: ({ deviceID, userID }) => ({
        url: `/devices/${deviceID}/members/${userID}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Device", id: "MEMBER" }],
      onQueryStarted: async (
        { deviceID, userID },
        { dispatch, queryFulfilled },
      ) => {
        const deleteResult = dispatch(
          deviceApi.util.updateQueryData(
            "getDeviceMembers",
            deviceID,
            draft => {
              draft.members = draft.members.filter(
                member => member.user_id !== userID,
              );
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          deleteResult.undo();
        }
      },
    }),

    updateDeviceOwner: builder.mutation<
      { current_owner: number },
      { deviceID: number; userID: number }
    >({
      query: ({ deviceID, userID }) => ({
        url: `/devices/${deviceID}/owner/`,
        method: "PUT",
        body: {
          user_id: userID,
        },
      }),
      invalidatesTags: () => [{ type: "Device", id: "MEMBER" }],
      onQueryStarted: async (
        { deviceID, userID },
        { dispatch, queryFulfilled },
      ) => {
        const putResult = dispatch(
          deviceApi.util.updateQueryData(
            "getDeviceMembers",
            deviceID,
            draft => {
              draft.owner_id = userID;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          putResult.undo();
        }
      },
    }),

    getDeviceProfile: builder.query<DeviceProfile, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/profile/`,
        method: "GET",
      }),
    }),

    updateDeviceProfile: builder.mutation<
      void,
      {
        deviceID: number;
        body: DeviceProfileBody;
      }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/profile/`,
        method: "PUT",
        body,
      }),
    }),

    updateDeviceProfileAvatar: builder.mutation<
      { profile_image: string },
      {
        deviceID: number;
        avatar: FormData;
      }
    >({
      query: ({ deviceID, avatar }) => ({
        url: `/device/${deviceID}/profile/`,
        method: "PATCH",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: {
          profile_image: avatar,
        },
      }),
    }),

    getDeviceSetting: builder.query<DeviceSetting, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/setting/`,
        method: "GET",
      }),
    }),

    updateDeviceSetting: builder.mutation<DeviceSetting, DeviceSetting>({
      query: deviceID => ({
        url: `/devices/${deviceID}/setting/`,
        method: "PUT",
      }),
    }),

    updateSafetyZoneThumbnail: builder.mutation<
      SafetyZoneThumbnail<string>,
      { deviceID: number; body: SafetyZoneThumbnail<FormData> }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/setting/`,
        method: "PATCH",
        body,
      }),
    }),

    getDailyWalkRecord: builder.query<
      DailyWalkRecord[],
      { deviceID: number; date: string }
    >({
      query: ({ deviceID, date }) => ({
        url: `/devices/${deviceID}/walks/?date=${date}`,
        method: "GET",
      }),
      providesTags: result => providesList(result, "Walk"),
    }),

    getMonthlyWalkRecord: builder.query<
      MonthlyWalkRecord,
      { deviceID: number; year: number; month: number }
    >({
      query: ({ deviceID, year, month }) => ({
        url: `/devices/${deviceID}/walks/summary/?year=${year}&month=${month}`,
        method: "GET",
      }),
    }),

    postWalk: builder.mutation<void, { deviceID: string; body: WalkBody }>({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/walks/`,
        method: "POST",
        body,
      }),
    }),

    patchWalkThumbnail: builder.mutation<
      { path_image: string },
      { path_image: FormData; walkID: number; deviceID: number }
    >({
      query: ({ path_image, walkID, deviceID }) => ({
        url: `/devices/${deviceID}/walks/${walkID}/`,
        method: "PATCH",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: {
          path_image,
        },
      }),
    }),

    deleteWalkRecord: builder.mutation<
      void,
      { deviceID: number; walkID: number; date: string }
    >({
      query: ({ deviceID, walkID }) => ({
        url: `/devices/${deviceID}/walks/${walkID}/`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Walk", id: "LIST" }],
      onQueryStarted: async (
        { deviceID, walkID, date },
        { dispatch, queryFulfilled },
      ) => {
        const deleteResult = dispatch(
          deviceApi.util.updateQueryData(
            "getDailyWalkRecord",
            { deviceID, date },
            draft => draft.filter(walk => walk.id !== walkID),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export default deviceApi;
