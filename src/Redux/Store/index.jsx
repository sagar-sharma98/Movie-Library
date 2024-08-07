import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./auth-slice";
import moviesSlice from "./movies-slice";

const store = configureStore({
    reducer: {movies: moviesSlice.reducer, auth: authSlice.reducer}
});

export default store;