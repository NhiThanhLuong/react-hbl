import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPropertyValues } from "ultis/api";
import { getPropertyKeyLabel } from "ultis/func";

export const fetchLanguages = createAsyncThunk(
  "language/fetchLanguages",
  async params =>
    await getPropertyValues({
      params: {
        ...params,
        property_name: "language",
      },
    })
);

export const languageSlice = createSlice({
  name: "language",
  initialState: {
    loading: false,
    languages: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLanguages.pending.type]: state => {
      state.loading = true;
    },
    [fetchLanguages.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.languages = getPropertyKeyLabel(payload.data);
    },
  },
});

const { reducer } = languageSlice;
export default reducer;
