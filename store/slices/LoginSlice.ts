import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false,
    user: null,
    token: null,
    isLoading: false,
    isAdmin: false
}

const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoading = action.payload.isLoading;
            state.isAdmin = action.payload.isAdmin;
        },
        setLogout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.isAdmin = false;
        },
    },
    
});

export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer;

