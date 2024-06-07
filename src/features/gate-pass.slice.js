  import { apiSlice } from "../app/api/apiSlice";
import { API } from "../constants/api.constants";

export const GatePassApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGatePass: builder.mutation({
      query: (params) => ({
        url: API.GET_PASS.GET_PASS,
        method: "GET",
        params: params,
      }),
    }),
    postGatePass: builder.mutation({
      query: (data) => ({
        url: API.GET_PASS.GET_PASS,
        method: "POST",
        body: data,
      }),
    }),
    putGatePass: builder.mutation({
      query: (data) => ({
        url: `${API.GET_PASS.GET_PASS}${data.id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  // These is my gate pass cofiguration mutation start
  useGetGatePassMutation,
  usePostGatePassMutation,
  usePutGatePassMutation,
  //These is my gate pass configuration mutation end
} = GatePassApiSlice;
