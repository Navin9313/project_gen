import { configureStore } from '@reduxjs/toolkit';
import Appslice from '../src/slice'

export const store = configureStore({
    reducer:{
        user: Appslice,
    },
});
