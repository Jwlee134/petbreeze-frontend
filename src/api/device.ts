import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import api, { providesList } from ".";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export enum GeoJsonType {
  Point = "Point",
  LineString = "LineString",
}

export interface Device {
  id: number;
  name: string;
  profile_image: string;
  collection_period: number;
  battery: number;
  firmware_version: string;
  is_missed: boolean;
  last_walk: string;
}

interface PostDeviceBody {
  SIM_serial_number?: string;
  invitation_code?: string;
}

interface InvitationCode {
  code: string;
  expire_datetime: string;
}

interface MissingReportForm {
  missing_datetime: string;
  missing_location: string;
  message: string;
  contact_number: string;
  has_dog_tag: boolean;
}

export interface MissingReport extends MissingReportForm {
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

export interface DeviceCoord {
  date_time: string;
  coordinate: {
    type: GeoJsonType.Point;
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

export interface WiFiResponse {
  wifi_number: number;
  ssid: string;
  password: string;
}

export interface AreaResponse {
  safety_area_number: number;
  name: string;
  address: string;
  thumbnail: string;
  coordinate: {
    type: GeoJsonType.Point;
    coordinates: number[];
  };
  radius: number;
  wifis: WiFiResponse[];
}

interface DeviceSetting<A> {
  collection_period: number;
  safety_areas: A[];
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
  path: {
    type: GeoJsonType.LineString;
    coordinates: number[][];
  };
}

const shouldInvalidateDeviceList = (error: FetchBaseQueryError | undefined) => {
  const code = error?.data?.error_code;
  return code === "D003" || code === "permission_denied";
};

const shouldInvalidateUserList = (error: FetchBaseQueryError | undefined) =>
  error?.data?.detail?.includes("user") ||
  error?.data?.detail?.includes("User");

const deviceApi = api.injectEndpoints({
  endpoints: builder => ({
    getDeviceList: builder.query<Device[], void>({
      query: () => "/device/",
      providesTags: result => providesList(result, "Device"),
    }),

    postDevice: builder.mutation<{ device_id: number }, PostDeviceBody>({
      query: body => ({
        url: "/device/",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => {
        if (!error) {
          return [{ type: "Device", id: "LIST" }];
        }
        return [];
      },
    }),

    getProfileByInvitationCode: builder.query<DeviceProfile, string>({
      query: code => ({
        url: `/device/profile/?invitation_code=${code}`,
        method: "GET",
      }),
    }),

    deleteDevice: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/`,
        method: "DELETE",
      }),
      onQueryStarted: (deviceID, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft =>
            draft.filter(device => device.id !== deviceID),
          ),
        );
        queryFulfilled.catch(deleteResult.undo);
      },
      invalidatesTags: (result, error, deviceID) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    getInvitationCode: builder.query<InvitationCode, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/invitation-code/`,
        method: "GET",
      }),
    }),

    getMissingReport: builder.query<MissingReport, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/emergency/`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Device", id: "MISSING" }],
      onQueryStarted: async (deviceID, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error: any) {
          if (
            error?.data?.detail.includes("not in emergency") ||
            shouldInvalidateDeviceList(error)
          ) {
            dispatch(
              deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
            );
          }
        }
      },
    }),

    postMissingReport: builder.mutation<
      { emergency_key: string },
      { deviceID: number; body: MissingReportForm }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/emergency/`,
        method: "POST",
        body,
      }),
      onQueryStarted: ({ deviceID }, { dispatch, queryFulfilled }) => {
        const postResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft => {
            draft[draft.findIndex(device => device.id === deviceID)].is_missed =
              true;
          }),
        );
        queryFulfilled.catch(postResult.undo);
      },
      invalidatesTags: (result, error, { deviceID }) => {
        if (error?.status === 400 || shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    updateMissingReport: builder.mutation<
      void,
      { deviceID: number; body: MissingReportForm }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/emergency/`,
        method: "PUT",
        body,
      }),
      onQueryStarted: async (
        { deviceID, body },
        { dispatch, queryFulfilled },
      ) => {
        const putResult = dispatch(
          deviceApi.util.updateQueryData(
            "getMissingReport",
            deviceID,
            draft => {
              Object.assign(draft, body);
            },
          ),
        );
        queryFulfilled.catch(putResult.undo);
      },
      invalidatesTags: (result, error, { deviceID }) => {
        if (error?.status === 400 || shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    updateMissingReportThumbnail: builder.mutation<
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
        if (error?.status === 400 || shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [{ type: "Device", id: "MISSING" }];
      },
    }),

    deleteMissingReport: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/emergency/`,
        method: "DELETE",
      }),
      onQueryStarted: (deviceID, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft => {
            draft[draft.findIndex(device => device.id === deviceID)].is_missed =
              false;
          }),
        );
        queryFulfilled.catch(deleteResult.undo);
      },
      invalidatesTags: (result, error, deviceID) => {
        if (error?.status === 400 || shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    getDeviceCoord: builder.query<DeviceCoord, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/location/`,
        method: "GET",
      }),
      onQueryStarted: async (deviceID, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error: any) {
          if (shouldInvalidateDeviceList(error)) {
            dispatch(
              deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
            );
          }
        }
      },
    }),

    getDeviceMembers: builder.query<DeviceMembers, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/member/`,
        method: "GET",
        responseHandler: async res => {
          const data: DeviceMembers = await res.json();
          if (data.members.length) {
            const ownerIndex = data.members.findIndex(
              member => member.id === data.owner_id,
            );
            return {
              ...data,
              members: [
                data.members[ownerIndex],
                ...data.members.filter((member, i) => i !== ownerIndex),
              ],
            };
          }
        },
      }),
      providesTags: result => providesList(result?.members, "Member"),
    }),

    deleteDeviceMember: builder.mutation<
      { members: DeviceMember[] },
      { deviceID: number; userID: number }
    >({
      query: ({ deviceID, userID }) => ({
        url: `/device/${deviceID}/member/${userID}/`,
        method: "DELETE",
      }),
      onQueryStarted: ({ deviceID, userID }, { dispatch, queryFulfilled }) => {
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
        queryFulfilled.catch(deleteResult.undo);
      },
      invalidatesTags: (result, error, { deviceID, userID }) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        if (shouldInvalidateUserList(error)) {
          return [{ type: "Member", id: userID }];
        }
        return [];
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
      onQueryStarted: ({ deviceID, userID }, { dispatch, queryFulfilled }) => {
        const putResult = dispatch(
          deviceApi.util.updateQueryData(
            "getDeviceMembers",
            deviceID,
            draft => {
              draft.owner_id = userID;
            },
          ),
        );
        queryFulfilled.catch(putResult.undo);
      },
      invalidatesTags: (result, error, { deviceID, userID }) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        if (shouldInvalidateUserList(error)) {
          return [{ type: "Member", id: userID }];
        }
        return [];
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
      onQueryStarted: ({ deviceID, body }, { dispatch, queryFulfilled }) => {
        const profilePutResult = dispatch(
          deviceApi.util.updateQueryData(
            "getDeviceProfile",
            deviceID,
            draft => {
              Object.assign(draft, body);
            },
          ),
        );
        const listPutResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft => {
            draft[draft.findIndex(({ id }) => id === deviceID)].name =
              body.name;
          }),
        );
        queryFulfilled.catch(profilePutResult.undo);
        queryFulfilled.catch(listPutResult.undo);
      },
      invalidatesTags: (result, error, { deviceID }) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
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
          dispatch(
            deviceApi.util.updateQueryData(
              "getDeviceList",
              undefined,
              draft => {
                draft[
                  draft.findIndex(({ id }) => id === deviceID)
                ].profile_image = profile_image;
              },
            ),
          );
        } catch (error: any) {
          if (shouldInvalidateDeviceList(error)) {
            dispatch(
              deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
            );
          }
        }
      },
    }),

    getDeviceSetting: builder.query<
      DeviceSetting<AreaResponse> & {
        setting_confirmation: boolean;
      },
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
        } catch (error: any) {
          if (shouldInvalidateDeviceList(error)) {
            dispatch(
              deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
            );
          }
        }
      },
    }),

    updateDeviceSetting: builder.mutation<
      void,
      {
        deviceID: number;
        body: DeviceSetting<Omit<AreaResponse, "thumbnail">>;
      }
    >({
      query: ({ deviceID, body }) => ({
        url: `/device/${deviceID}/setting/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { deviceID }) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    updateCollectionPeriod: builder.mutation<
      void,
      { deviceID: number; period: number }
    >({
      query: ({ deviceID, period }) => ({
        url: `/device/${deviceID}/setting/collection-period/`,
        method: "PUT",
        body: { collection_period: period },
      }),
      onQueryStarted: async (
        { deviceID, period },
        { dispatch, queryFulfilled },
      ) => {
        const deviceListPutResult = dispatch(
          deviceApi.util.updateQueryData("getDeviceList", undefined, draft => {
            draft[
              draft.findIndex(device => device.id === deviceID)
            ].collection_period = period;
          }),
        );
        const deviceSettingPutResult = dispatch(
          deviceApi.util.updateQueryData(
            "getDeviceSetting",
            deviceID,
            draft => {
              draft.collection_period = period;
            },
          ),
        );
        queryFulfilled.catch(deviceListPutResult.undo);
        queryFulfilled.catch(deviceSettingPutResult.undo);
      },
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
        if (shouldInvalidateDeviceList(error)) {
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
          return data.sort(
            (a, b) =>
              new Date(b.start_date_time).getTime() -
              new Date(a.start_date_time).getTime(),
          );
        },
      }),
      providesTags: result => providesList(result, "Walk"),
      onQueryStarted: async ({ deviceID }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error: any) {
          if (shouldInvalidateDeviceList(error)) {
            dispatch(
              deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
            );
          }
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
        } catch (error: any) {
          if (shouldInvalidateDeviceList(error)) {
            dispatch(
              deviceApi.util.invalidateTags([{ type: "Device", id: deviceID }]),
            );
          }
        }
      },
    }),

    startWalking: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/start-walk/`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: (result, error, deviceID) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    stopWalking: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/finish-walk/`,
        method: "POST",
        body: {},
      }),
    }),

    sendWalkNotification: builder.mutation<void, number>({
      query: deviceID => ({
        url: `/device/${deviceID}/notify-walk/`,
        method: "POST",
        body: {},
      }),
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
      invalidatesTags: (result, error, { deviceID }) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
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
      invalidatesTags: (result, error, { deviceID }) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        return [];
      },
    }),

    deleteWalkRecord: builder.mutation<
      void,
      { deviceID: number; walkID: number; date: string }
    >({
      query: ({ deviceID, walkID }) => ({
        url: `/device/${deviceID}/walk/${walkID}/`,
        method: "DELETE",
      }),
      onQueryStarted: (
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
        queryFulfilled.catch(deleteResult.undo);
      },
      invalidatesTags: (result, error, { walkID, deviceID }) => {
        if (shouldInvalidateDeviceList(error)) {
          return [{ type: "Device", id: deviceID }];
        }
        if (!error || error?.data?.detail === "Walk id does not exist.") {
          return [
            { type: "Walk", id: walkID },
            { type: "Walk", id: "MONTHLY" },
          ];
        }
        return [];
      },
    }),
  }),
});

export default deviceApi;
