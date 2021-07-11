import api from ".";

interface IWalk {
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

const walk = api.injectEndpoints({
  endpoints: builder => ({
    getWalk: builder.query<IWalk, string>({
      query: id => `/walk/${id}/`,
    }),
  }),
});

export const { useGetWalkQuery } = walk;
