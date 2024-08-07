
import {  createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    isError: false,
    isAuth: false,
    token: "",
  },

  reducers: {
    
  },

});

export const authAction = authSlice.actions;
export default authSlice;
