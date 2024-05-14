import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name:'tab',
    initialState:{
        isCollspased:false
    },
    reducers:{
        setCollspased(state){
            state.isCollspased = !state.isCollspased
        }
    }
})
 
export const {setCollspased} = tabSlice.actions
export default tabSlice.reducer