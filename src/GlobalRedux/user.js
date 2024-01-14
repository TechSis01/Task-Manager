import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:'',
    isLoggedIn:false,
}
export const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        addNewUser:(state,action)=>{
            state.user = action.payload
            state.isLoggedIn = true
        },
        logOutUser:(state)=>{
            state.isLoggedIn = false
            state.user = ''
        }
    }
  

})

export const {addNewUser,logOutUser} = userSlice.actions
export default userSlice.reducer