import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartQuantity: 0, //cart-quantity
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            console.log("Payload", action.payload)
            state.cartQuantity += 1;
            state.products?.unshift(action.payload);
            state.total += action.payload.price * action.payload.productQuantity; //product-quantity
        }
    }
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;