import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks:{}
}
export const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
       updateTasks:(state,action)=>{
          state.tasks = action.payload
       }
       
    }
})

export const {updateTasks} = taskSlice.actions
export default taskSlice.reducer