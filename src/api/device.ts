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

interface EmergencyMissingForm {
  missing_datetime: string;
  missing_location: string;
  message: string;
  contact_number: string;
  has_dog_tag: boolean;
}

interface EmergencyMissing extends EmergencyMissingForm {
  device_name: string;
  device_species: string;
  emergency_key: string;
  image1_thumbnail: string;
  image2_thumbnail: string;
  image3_thumbnail: string;
  image4_thumbnail: string;
  contact_number: string;
  has_dog_tag: boolean;
}

interface DeviceCoord {
  date_time: string;
  coordinate: {
    type: "Point";
    coordinates: number[];
  };
}

interface DeviceMember {
  id: number;
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
}

export interface DeviceProfile extends DeviceProfileBody {
  profile_image: string;
}

interface Area {
  id: number;
  name: string;
  address: string;
  data: number[];
}

interface DeviceSetting<A> {
  Period: number;
  Area: A[];
  WiFi: { id: number; ssid: string; pw: string }[];
}

interface DailyWalkRecord {
  id: number;
  start_date_time: string;
  time: number;
  distance: number;
  handler_name: string;
  path_image: string;
}

interface MonthlyWalkRecord {
  summary: {
    total_time: number;
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
      query: () => "/device/",
      providesTags: result => providesList(result, "Device"),
    }),

    postDevice: builder.mutation<
      { status: number; data: { device_id: number } },
      string
    >({
      query: IMEInumber => ({
        url: "/device/",
        method: "POST",
        body: {
          IMEInumber,
        },
        responseHandler: async res => {
          const data: { device_id: number } = await res.json();
          return { status: res.status, data };
        },
      }),
      invalidatesTags: res => {
        if (res && (res.status === 200 || res.status === 201)) {
          return [{ type: "Device", id: "LIST" }];
        }
        return [];
      },
    }),

    deleteDevice: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/`,
        method: "DELETE",
      }),
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
      invalidatesTags: (result, error, deviceID) => [
        { type: "Device", id: deviceID },
      ],
    }),

    getEmergencyMissing: builder.query<EmergencyMissing, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/emergency/`,
        method: "GET",
      }),
      onQueryStarted: async (deviceID, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
          );
        }
      },
    }),

    postEmergencyMissing: builder.mutation<
      { emergency_key: string },
      { deviceID: number; body: EmergencyMissingForm }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/emergency/`,
        method: "POST",
        body,
      }),
      onQueryStarted: async ({ deviceID }, { dispatch, queryFulfilled }) => {
        const postResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft => {
            draft[draft.findIndex(device => device.id === deviceID)].is_missed =
              true;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          postResult.undo();
        }
      },
      invalidatesTags: (result, error, { deviceID }) => [
        { type: "Device", id: deviceID },
      ],
    }),

    updateEmergencyMissing: builder.mutation<
      void,
      { deviceID: number; body: EmergencyMissingForm }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/emergency/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { deviceID }) => [
        { type: "Device", id: deviceID },
      ],
    }),

    updateEmergencyMissingThumbnail: builder.mutation<
      void,
      { deviceID: number; body: FormData }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/emergency/`,
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        body,
      }),
      invalidatesTags: (result, error, { deviceID }) => {
        if (error) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    deleteEmergencyMissing: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/emergency/`,
        method: "DELETE",
      }),
      onQueryStarted: async (deviceID, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft => {
            draft[draft.findIndex(device => device.id === deviceID)].is_missed =
              false;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
      invalidatesTags: (result, error, deviceID) => [
        { type: "Device", id: deviceID },
      ],
    }),

    getDeviceCoord: builder.query<DeviceCoord, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/location/`,
        method: "GET",
      }),
      onQueryStarted: async (deviceID, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
          );
        }
      },
    }),

    getDeviceMembers: builder.query<DeviceMembers, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/member/`,
        method: "GET",
      }),
      providesTags: result => providesList(result?.members, "Member"),
    }),

    deleteDeviceMember: builder.mutation<
      { members: DeviceMember[] },
      { deviceID: number; userID: number }
    >({
      query: ({ deviceID, userID }) => ({
        url: `/device/${deviceID}/member/${userID}`,
        method: "DELETE",
      }),
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
                member => member.id !== userID,
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
      invalidatesTags: (result, error, { userID, deviceID }) => {
        if (error?.data.detail === "Device id does not exist.") {
          return [{ type: "Device", id: deviceID }];
        }
        return [{ type: "Member", id: userID }];
      },
    }),

    updateDeviceOwner: builder.mutation<
      { current_owner: number },
      { deviceID: number; userID: number }
    >({
      query: ({ deviceID, userID }) => ({
        url: `/device/${deviceID}/owner/`,
        method: "PUT",
        body: {
          user_id: userID,
        },
      }),
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
      invalidatesTags: (result, error, { userID, deviceID }) => {
        if (error?.data.detail === "Device id does not exist.") {
          return [{ type: "Device", id: deviceID }];
        }
        return [{ type: "Member", id: userID }];
      },
    }),

    getDeviceProfile: builder.query<DeviceProfile, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/profile/`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Device", id: "PROFILE" }],
    }),

    updateDeviceProfile: builder.mutation<
      void,
      {
        deviceID: number;
        body: DeviceProfileBody;
      }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/profile/`,
        method: "PUT",
        body,
      }),
      onQueryStarted: async (
        { deviceID, body },
        { dispatch, queryFulfilled },
      ) => {
        const putResult = dispatch(
          deviceApi.util.updateQueryData(
            "getDeviceProfile",
            deviceID,
            draft => ({ ...draft, ...body }),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();
        }
      },
      invalidatesTags: (result, error, { deviceID }) => [
        { type: "Device", id: "PROFILE" },
        { type: "Device", id: deviceID },
      ],
    }),

    updateDeviceProfileAvatar: builder.mutation<
      { profile_image: string },
      { deviceID: number; body: FormData }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/profile/`,
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        body,
      }),
      onQueryStarted: async ({ deviceID }, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: { profile_image },
          } = await queryFulfilled;
          dispatch(
            deviceApi.util.updateQueryData(
              "getDeviceProfile",
              deviceID,
              draft => {
                draft.profile_image = profile_image;
              },
            ),
          );
        } catch {
          dispatch(
            deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
          );
        }
      },
    }),

    getDeviceSetting: builder.query<
      DeviceSetting<Area & { image: string }>,
      number
    >({
      query: deviceID => ({
        url: `/device/${deviceID}/setting/`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Device", id: "SETTING" }],
      onQueryStarted: async (deviceID, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
          );
        }
      },
    }),

    updateDeviceSetting: builder.mutation<
      void,
      { deviceID: number; body: DeviceSetting<Area> }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/setting/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: () => [{ type: "Device", id: "SETTING" }],
    }),

    updateSafetyZoneThumbnail: builder.mutation<
      void,
      { deviceID: number; body: FormData }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/setting/`,
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        body,
      }),
      invalidatesTags: (result, error, { deviceID }) => {
        if (error) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    getDailyWalkRecord: builder.query<
      DailyWalkRecord[],
      { deviceID: number; date: string }
    >({
      query: ({ deviceID, date }) => ({
        url: `/device/${deviceID}/walk/?date=${date}`,
        method: "GET",
        responseHandler: async (res: Response) => {
          const data: DailyWalkRecord[] = await res.json();
          return data.reverse();
        },
      }),
      providesTags: result => providesList(result, "Walk"),
      onQueryStarted: async ({ deviceID }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
          );
        }
      },
    }),

    getMonthlyWalkRecord: builder.query<
      MonthlyWalkRecord,
      { deviceID: number; year: number; month: number }
    >({
      query: ({ deviceID, year, month }) => ({
        url: `/device/${deviceID}/walk/summary/?year=${year}&month=${month}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Walk", id: "MONTHLY" }],
      onQueryStarted: async ({ deviceID }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch {
          dispatch(
            deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
          );
        }
      },
    }),

    startWalking: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/walk/start/`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: (result, error, deviceID) => {
        if (error?.status === 403 || error?.status === 404) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    postWalk: builder.mutation<
      WalkBody & { id: number },
      { deviceID: number; body: WalkBody }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/walk/`,
        method: "POST",
        body,
      }),
    }),

    patchWalkThumbnail: builder.mutation<
      void,
      { body: FormData; walkID: number; deviceID: number }
    >({
      query: ({ body, walkID, deviceID }) => ({
        url: `/device/${deviceID}/walk/${walkID}/`,
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        body,
      }),
    }),

    deleteWalkRecord: builder.mutation<
      void,
      { deviceID: number; walkID: number; date: string }
    >({
      query: ({ deviceID, walkID }) => ({
        url: `/device/${deviceID}/walk/${walkID}/`,
        method: "DELETE",
      }),
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
      invalidatesTags: (result, error, { walkID, deviceID }) => {
        if (error?.status === 403 || error?.status === 404) {
          return [{ type: "Device", id: deviceID }];
        }
        return [
          { type: "Walk", id: walkID },
          { type: "Walk", id: "MONTHLY" },
        ];
      },
    }),
  }),
});

export default deviceApi;
