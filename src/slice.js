import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';
import ApiClient from "./api";

export const verifyUser = createAsyncThunk('verifyUser', async() => {
    try {
        const res = await ApiClient.get("/auth/verify");
        return res.data;
    } catch (error) {
        console.log("err", error);
        throw error;
    }
})

export const LogOut = createAsyncThunk('LogOut', async() => {
    try {
        const res = await ApiClient.post("/auth/logout");
        return res.data;
    } catch (error) {
        console.log("err", error);
        throw error;
    }
})

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
        
        return res.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
})

export const ImageCreate = createAsyncThunk('ImageCreate', async( prompt ) => {
    try {
        const res = await ApiClient.post("/register/image", {
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
        const res = await ApiClient.post(`/interview/insert`,
            ProductData
        );
        return res.data;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
})

export const productdataFetch = createAsyncThunk('productdataFetch', async( selectData ) => {
    try {
        const res = await ApiClient.get(`/interview/getdata`,{
            params:{
                page:selectData.page,
                limit:selectData.limit
            }
        });
        return res.data;
    } catch (error) {
        console.log("error",error);
        return error;
    }
})


export const productEdit = createAsyncThunk('productEdit', async({ProductData, editid}) => {
    try {
        const res = await ApiClient.put(`/interview/updatedata`,{
            ProductData,
            editid
        });
        return res.data;
    } catch (error) {
        console.log("err", error);
        return error;
    }
})

export const productRemove = createAsyncThunk('productRemove', async( id ) => {
    try {
        const res = await ApiClient.delete(`/interview/deletedata`,{
            data: { id }
        });
        return res.data;
    } catch (error) {
        console.log("err", error);
        return error;
    }
})

export const productimageInsert = createAsyncThunk('productimageInsert', async( formdata ) => {
    try {
        const res = await ApiClient.post(`/interview/image/insert`, formdata);
        return res.data;
    } catch (error) {
        console.log("err", error);
        return error;
    }
})

export const productimageShow = createAsyncThunk('productimageShow', async() => {
    try {
        const res = await ApiClient.get('/interview/image/get');
        return res.data;
    } catch (error) {
        console.log("err", error);
        return error;
    }
})

const AppSlice = createSlice({
    name:"n8n_ai",
    initialState:{
        user: [],
        image : [],
        isloading: false,
        iserror: false,
        isLoggIn: false,
        isloginloading: false,
        interview : []
    },
    reducers:{

    },
    extraReducers:(builder) => {

        builder.addCase(productimageShow.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(productimageShow.fulfilled, (state, action) => {
            state.isloading = false;

            if(!Array.isArray(state.interview)){
                state.interview = [];
            }

            state.interview = action.payload;
        });
        builder.addCase(productimageShow.rejected, (state, action) => {
            state.isloading = false;
            state.iserror = true;
            console.log("err", action);
        })


        builder.addCase(productimageInsert.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(productimageInsert.fulfilled, (state, action) => {
            state.isloading = false;

            if(!Array.isArray(state.interview)){
                state.interview = [];
            }

            state.interview.push(action.payload);
        });
        builder.addCase(productimageInsert.rejected, (state, action) => {
            state.isloading = false;
            state.iserror = true;
            console.log("error", action);
        });


        builder.addCase(productRemove.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(productRemove.fulfilled, (state,action) => {
            state.isloading = false;

            if(!Array.isArray(state.interview)){
                state.interview = [];
            }

            state.interview = state.interview.filter((val) => {
                val.id !== action.payload.id
            })

        });
        builder.addCase(productRemove.rejected, (state,action) => {
            state.isloading = false;
            state.iserror = true;
            console.log("err", action);
        });

        builder.addCase(productEdit.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(productEdit.fulfilled, (state,action) => {
            state.isloading = false;

            if(!Array.isArray(state.interview)){
                state.interview = [];
            }

            const update = action.payload;

            const edit = state.interview.findIndex((val) => {
                val.id == update.id
            });

            if (edit !== -1) {
                state.interview[edit] = {
                    ...state.interview[edit],
                    ...update
                }
            } else {
                state.interview.push(update);
            }
        });
        builder.addCase(productEdit.rejected, (state,action) => {
            state.isloading = false;
            state.iserror = true;
            console.log("err", action);
        })  


        builder.addCase(productdataFetch.pending, (state) => {
            state.isloading = true;
            state.iserror = false;
        });
        builder.addCase(productdataFetch.fulfilled, (state, action) => {
            state.isloading = true;

            if(!Array.isArray(state.interview)){
                state.interview = [];
            }

            state.interview = action.payload;
        });
        builder.addCase(productdataFetch.rejected, (state, action) => {
            state.isloading = false;
            state.iserror = true;
            console.log("err",action);
        })


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

        builder.addCase(verifyUser.pending, (state) => {
            state.isLoggIn = false;
            state.isloginloading = true;
        });
        builder.addCase(verifyUser.fulfilled, (state, action) => {
            state.isLoggIn = true;
            state.isloginloading = false;
        });
        builder.addCase(verifyUser.rejected, (state, action) => {
            state.isLoggIn = false;
            state.isloginloading = false;
        });

        builder.addCase(LogOut.fulfilled, (state) => {
            state.isLoggIn = false;
        })
    }
})

export default AppSlice.reducer;