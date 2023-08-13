import { comfigureStore, configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
});

window.store = store;

export default store