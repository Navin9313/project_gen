import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const UserRegister = createAsyncThunk('UserRegister', async( form, { rejectWithValue } ) => {
    try {
        const res = await axios.post("http://localhost:9000/register/register_user",form);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const UserLogin = createAsyncThunk('UserLogin', async({ email, password }) => {
    try {
        const res = await axios.post("http://localhost:9000/register/login", {
            email, password
        },
        {
            withCredentials: true
        });
        console.log(email,password);
        return res.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
})

export const ImageCreate = createAsyncThunk('ImageCreate', async( prompt ) => {
    try {
        const res = await axios.post("http://localhost:9000/register/image", {
            prompt
        });
        return res.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
})

export const interviewInsert = createAsyncThunk('interviewInsert', async( ProductData ) => {
    try {
        const res = await axios.post(`http://localhost:9000/interview/insert`,
            ProductData
        );
        return res.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
})

const AppSlice = createSlice({
    name:"n8n_ai",
    initialState:{
        user: [],
        image : [],
        isloading: false,
        iserror: false,
        interview : []
    },
    reducers:{

    },
    extraReducers:(builder) => {

        builder.addCase(interviewInsert.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(interviewInsert.fulfilled, (state, action) => {
            state.isloading = false;
            if(!Array.isArray(state.interview)){
                state.interview = [];
            }

            state.interview.push(action.payload);
        });
        builder.addCase(interviewInsert.rejected, (state,action) => {
            state.iserror = true;
            state.isloading = false;
            console.log("err",action);
        });


        builder.addCase(ImageCreate.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(ImageCreate.fulfilled, (state, action) => {
            state.isloading = false;
            if(!Array.isArray(state.image)){
                state.image = [];
            }

            state.image.push(action.payload);
        });
        builder.addCase(ImageCreate.rejected, (state,action) => {
            state.iserror = true;
            state.isloading = false;
            console.log("err",action);
        });

        builder.addCase(UserLogin.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.isloading = false;
            if(!Array.isArray(state.user)){
                state.user = [];
            }

            state.user.push(action.payload);
        });
        builder.addCase(UserLogin.rejected, (state,action) => {
            state.iserror = true;
            state.isloading = false;
            console.log("err",action);
        });

        builder.addCase(UserRegister.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(UserRegister.fulfilled, (state, action) => {
            state.isloading = false;
            if(!Array.isArray(state.user)){
                state.user = [];
            };

            state.user.push(action.payload);
        });
        builder.addCase(UserRegister.rejected, (state, action) => {
            state.isloading = false;
            state.iserror = true;
            console.log("err",action);
        });
    }
})

export default AppSlice.reducer;