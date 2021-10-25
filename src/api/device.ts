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
  handler_nickname: string;
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
      query: () => "/devices/",
      providesTags: result => providesList(result, "Device"),
    }),

    postDevice: builder.mutation<
      { status: number; data: { device_id: number } },
      string
    >({
      query: IMEInumber => ({
        url: "/devices/",
        method: "POST",
        body: {
          IMEInumber,
        },
        responseHandler: async (res: Response) => {
          const data = await res.json();
          return { status: res.status, data };
        },
      }),
      invalidatesTags: () => [{ type: "Device", id: "LIST" }],
    }),

    deleteDevice: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/`,
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
        url: `/devices/${deviceID}/emergency/`,
        method: "GET",
      }),
    }),

    postEmergencyMissing: builder.mutation<
      { emergency_key: string },
      { deviceID: number; body: EmergencyMissingForm }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/emergency/`,
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
        url: `/devices/${deviceID}/emergency/`,
        method: "PUT",
        body,
      }),
    }),

    updateEmergencyMissingThumbnail: builder.mutation<
      void,
      { deviceID: number; body: FormData }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/emergency/`,
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        body,
      }),
    }),

    deleteEmergencyMissing: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/emergency/`,
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
        url: `/devices/${deviceID}/location/`,
        method: "GET",
      }),
    }),

    getDeviceMembers: builder.query<DeviceMembers, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/members/`,
        method: "GET",
      }),
      providesTags: result => providesList(result?.members, "Member"),
    }),

    deleteDeviceMember: builder.mutation<
      { members: DeviceMember[] },
      { deviceID: number; userID: number }
    >({
      query: ({ deviceID, userID }) => ({
        url: `/devices/${deviceID}/members/${userID}`,
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
      invalidatesTags: (result, error, { userID }) => [
        { type: "Member", id: userID },
      ],
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
      invalidatesTags: (result, error, { userID }) => [
        { type: "Member", id: userID },
      ],
    }),

    getDeviceProfile: builder.query<DeviceProfile, number>({
      query: deviceID => ({
        url: `/devices/${deviceID}/profile/`,
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
        url: `/devices/${deviceID}/profile/`,
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
        url: `/devices/${deviceID}/profile/`,
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
        body,
      }),
    }),

    getDeviceSetting: builder.query<
      DeviceSetting<Area & { image: string }>,
      number
    >({
      query: deviceID => ({
        url: `/devices/${deviceID}/setting/`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Device", id: "SETTING" }],
    }),

    updateDeviceSetting: builder.mutation<
      void,
      { deviceID: number; body: DeviceSetting<Area> }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/setting/`,
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
        url: `/devices/${deviceID}/setting/`,
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data;",
        },
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
      providesTags: () => [{ type: "Walk", id: "MONTHLY" }],
    }),

    postWalk: builder.mutation<
      WalkBody & { id: number },
      { deviceID: number; body: WalkBody }
    >({
      query: ({ deviceID, body }) => ({
        url: `/devices/${deviceID}/walks/`,
        method: "POST",
        body,
      }),
    }),

    patchWalkThumbnail: builder.mutation<
      void,
      { body: FormData; walkID: number; deviceID: number }
    >({
      query: ({ body, walkID, deviceID }) => ({
        url: `/devices/${deviceID}/walks/${walkID}/`,
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
        url: `/devices/${deviceID}/walks/${walkID}/`,
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
      invalidatesTags: (result, error, { walkID }) => [
        { type: "Walk", id: walkID },
        { type: "Walk", id: "MONTHLY" },
      ],
    }),
  }),
});

export default deviceApi;
