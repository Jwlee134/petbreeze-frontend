import api, { providesList } from ".";

interface IWalkGetResponse {
  walk_summary: {
    total_time: number;
    avg_tile: number;
    total_distance: number;
    avg_distance: number;
    count: number;
  };
  walk_list: {
    id: number;
    nickname: string;
    start_date_time: null;
    walking_time: number;
  }[];
}

interface IWalkGetRequestForm {
  deviceId: string;
  month?: number;
  year?: number;
}

interface IWalkPostRequestForm {
  deviceId: string;
  start_date_time: Date;
  walking_time: number;
  distance: number;
  coordinates: number[];
}

interface IWalkDetailGetResponse {
  id: number;
  nickname: string;
  start_date_time: string;
  walking_time: number;
  distance: number;
  travel_path: string;
  image: string;
  device: number;
  user: number;
}

const walk = api.injectEndpoints({
  endpoints: builder => ({
    getWalk: builder.query<IWalkGetResponse, IWalkGetRequestForm>({
      query: ({ deviceId, month, year }) =>
        month && year
          ? `/walk/${deviceId}/?month=${month}&year=${year}`
          : `/walk/${deviceId}/`,
      providesTags: result => providesList(result?.walk_list, "Walk"),
    }),

    postWalk: builder.mutation<{ walk_id: number }, IWalkPostRequestForm>({
      query: ({
        deviceId,
        start_date_time,
        walking_time,
        distance,
        coordinates,
      }) => ({
        url: `/walk/${deviceId}/`,
        method: "POST",
        body: {
          start_date_time,
          walking_time,
          distance,
          travel_path: {
            type: "multipoint",
            coordinates,
          },
        },
      }),
      invalidatesTags: (result, error, { deviceId }) => [
        { type: "Walk", id: deviceId },
      ],
    }),

    getWalkDetail: builder.query<IWalkDetailGetResponse, { walk_id: number }>({
      query: walk_id => `/walk/${walk_id}/detail/`,
    }),

    patchWalkRecordImage: builder.query<
      IWalkDetailGetResponse,
      { walk_id: string; image: FormData }
    >({
      query: ({ walk_id, image }) => ({
        url: `/walk/${walk_id}/detail/`,
        method: "PATCH",
        body: {
          image,
        },
      }),
    }),
  }),
});

export const {
  useGetWalkQuery,
  usePostWalkMutation,
  useLazyGetWalkDetailQuery,
} = walk;
