import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,

    totalPrice: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((i) => i.id === item.id);

            if (existItem)
                existItem.quantity += 1;

            else
                state.cartItems.push({ ...item, quantity: 1 })

            state.totalQuantity += 1;
            state.totalPrice += item.price
        },
        removeFromCart: (state, action) => {

            const del = action.payload
            const existItem = state.cartItems.find(item => item.id === del.id)

            console.log(existItem.quantity);

            // if (existItem.quantity === 1) {
            // }
            // else {
            //     existItem.quantity--
            // }
            state.cartItems = state.cartItems.filter(item => item.id !== del.id)
            state.totalPrice -= existItem.price;
        },

        clearCart: (state, action) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalPrice = 0;
        }, increaseQty: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalPrice += item.price;
            }
        },

        decreaseQty: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= item.price;
            }
        },
    }
})

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer