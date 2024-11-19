import { createSlice } from "@reduxjs/toolkit";
import {  message } from 'antd';
const cartSlice= createSlice({
    name:"mycart",
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart:(state, actions)=>{
            const myData= state.cart.filter(key=>key.id==actions.payload.id);
            if (myData.length>=1)
            {
                message.error("This product Aleready Added!")
            }
            else 
            {
                state.cart.push(actions.payload);
                message.success("Product Added!");
            }
        },

        qntyInc:(state, actions)=>{

            for (var i=0; i<state.cart.length; i++)
            {
                if (state.cart[i].id==actions.payload.id)
                {
                    state.cart[i].qnty++;
                }
            }
        },
        qntyDec:(state, actions)=>{

            for (var i=0; i<state.cart.length; i++)
            {
                if (state.cart[i].id==actions.payload.id)
                {
                    if (state.cart[i].qnty > 1) {
                        state.cart[i].qnty--;
                    }
                    else
                    {
                        message.error("Quantity cannot be less than 1");
                    }
                }
            }
        }
    }
})
export const {addToCart, qntyInc, qntyDec} = cartSlice.actions;
export default cartSlice.reducer;