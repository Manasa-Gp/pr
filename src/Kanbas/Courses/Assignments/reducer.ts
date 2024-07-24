import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from './types';
const initialState: { assignments: Assignment[] } = {
  assignments: [], 
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = [
        ...state.assignments,
        {
          ...action.payload,
          _id: new Date().getTime().toString(),
        }
      ];
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(assignment => assignment._id !== action.payload);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const index = state.assignments.findIndex(assignment => assignment._id === action.payload._id);
      if (index !== -1) {
        state.assignments[index] = {
          ...state.assignments[index],
          ...action.payload
        };
      }
    },
  },
});
export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
