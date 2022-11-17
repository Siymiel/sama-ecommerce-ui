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
            // console.log("Payload", action.payload)
            state.cartQuantity += 1;
            state.products?.unshift(action.payload);
            state.total += action.payload.price * action.payload.productQuantity; //product-quantity
        },
        removeProduct: (state) => {
            state.products = []
            state.cartQuantity = 0
            state.total = 0;
        },
        addProductQty: (state, action) => {
            const product = state.products.find(product => product._id === action.payload)
            if (product) {
                product.productQuantity += 1
                state.total += product.price * 1
            }
        },
        decProductQty: (state, action) => {
            const product = state.products.find(product => product._id === action.payload)
            if (product) {
                product.productQuantity -= 1
                state.total -= product.price * 1
            }
        },

        // Delete Product from cart
        deleteProduct: (state, action) => {
            const product = state.products.find(product => product._id === action.payload)
            state.products = state.products.filter((product) => product._id !== action.payload)
            state.cartQuantity -= 1
            state.total = state.total - product.price * product.productQuantity
        },
    }
});

export const { addProduct, removeProduct, deleteProduct, addProductQty, decProductQty } = cartSlice.actions;
export default cartSlice.reducer;